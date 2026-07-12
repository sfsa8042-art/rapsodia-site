/*
 * FRM-2 Заявка на банкет → Telegram. Запасная дата — страховка ASM-7.
 * Нативный POST без JS поддержан — DEF-2 QA (успех/ошибка → 303 на
 * /banket с параметром состояния).
 */

import { sanitize, escapeHtml, isSpam, sendToTelegram, parseBody } from "@/lib/telegram";

export async function POST(request: Request) {
  let raw: Record<string, unknown>;
  let isNative = false;
  try {
    [raw, isNative] = await parseBody(request);
  } catch {
    return Response.json({ ok: false, error: "Некорректный запрос" }, { status: 400 });
  }

  const redirectTo = (path: string) =>
    Response.redirect(new URL(path, request.url), 303);

  if (isSpam(raw.website, raw.elapsed as number)) {
    return isNative ? redirectTo("/spasibo-banket") : Response.json({ ok: true });
  }

  const name = sanitize(raw.name);
  const phone = sanitize(raw.phone);
  const date = sanitize(raw.date);
  const dateAlt = sanitize(raw.dateAlt);
  const guests = sanitize(raw.guests);
  const occasion = sanitize(raw.occasion);
  const comment = sanitize(raw.comment);

  if (!name || (phone.match(/\d/g) || []).length < 10 || !date || !guests || !occasion) {
    return isNative
      ? redirectTo("/oshibka-zayavki")
      : Response.json({ ok: false, error: "Заполните обязательные поля" }, { status: 400 });
  }

  const result = await sendToTelegram([
    "🎉 <b>Банкет — заявка с сайта</b>",
    "",
    `<b>Имя:</b> ${escapeHtml(name)}`,
    `<b>Телефон:</b> ${escapeHtml(phone)}`,
    `<b>Дата:</b> ${escapeHtml(date)}`,
    dateAlt ? `<b>Запасная дата:</b> ${escapeHtml(dateAlt)}` : "",
    `<b>Гостей:</b> ${escapeHtml(guests)}`,
    `<b>Повод:</b> ${escapeHtml(occasion)}`,
    comment ? `<b>Комментарий:</b> ${escapeHtml(comment)}` : "",
  ].filter(Boolean));

  if (!result.ok) {
    return isNative
      ? redirectTo("/oshibka-zayavki")
      : Response.json({ ok: false, error: "Не удалось отправить заявку" }, { status: result.status });
  }
  return isNative ? redirectTo("/spasibo-banket") : Response.json({ ok: true });
}
