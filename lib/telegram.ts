/*
 * Доставка лидов в Telegram владельцу [TEC-3, прецедент студии —
 * Amalienau]. Токен только на сервере (.env.local / env хостинга).
 * Отказ Telegram → пользователь получает честную ошибку с телефоном
 * (лид не теряется молча) + запись в server-лог для ручного разбора.
 */

const MAX_FIELD = 200;

export function sanitize(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, MAX_FIELD);
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

/* Приём и JSON (fetch), и form-encoded (нативный POST без JS) — DEF-2 QA.
 * Возвращает [данные, isNative]: нативной отправке отвечаем 303-редиректом
 * на success-состояние страницы, а не сырым JSON. */
export async function parseBody(
  request: Request
): Promise<[Record<string, unknown>, boolean]> {
  const ct = request.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    return [(await request.json()) as Record<string, unknown>, false];
  }
  const fd = await request.formData();
  return [Object.fromEntries(fd.entries()), true];
}

/* Антиспам: honeypot заполнен или форма отправлена быстрее 3s —
 * отвечаем ok (боту незачем знать), лид не отправляем. */
export function isSpam(website: unknown, elapsed: unknown): boolean {
  if (typeof website === "string" && website.length > 0) return true;
  if (typeof elapsed === "number" && elapsed >= 0 && elapsed < 3000) return true;
  return false;
}

export async function sendToTelegram(lines: string[]): Promise<
  { ok: true } | { ok: false; status: number }
> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("Leads: TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID не заданы");
    return { ok: false, status: 500 };
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines.join("\n"),
        parse_mode: "HTML",
      }),
      signal: AbortSignal.timeout(10_000),
    });
    const result = await res.json();
    if (!res.ok || !result.ok) {
      console.error("Leads: Telegram API error", result);
      return { ok: false, status: 502 };
    }
    return { ok: true };
  } catch (error) {
    console.error("Leads: network error", error);
    return { ok: false, status: 502 };
  }
}
