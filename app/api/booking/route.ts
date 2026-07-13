/*
 * FRM-1 Бронь стола → Telegram. Серверная валидация обязательна
 * (D6: клиентской не существует для злоумышленника).
 * Нативный POST без JS (form-encoded) поддержан — DEF-2 QA: успех →
 * 303 на статическую /spasibo, ошибка → 303 на /oshibka-zayavki
 * (видимы без JS; лид не упирается в сырой JSON).
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
    return isNative ? redirectTo("/spasibo") : Response.json({ ok: true });
  }

  const name = sanitize(raw.name);
  const phone = sanitize(raw.phone);
  const datetime = sanitize(raw.datetime);
  const guests = sanitize(raw.guests);
  const occasion = sanitize(raw.occasion);

  if (!name || (phone.match(/\d/g) || []).length < 10 || !datetime || !guests) {
    return isNative
      ? redirectTo("/oshibka-zayavki")
      : Response.json(
          { ok: false, error: "Заполните имя, телефон, дату и число гостей" },
          { status: 400 }
        );
  }

  const result = await sendToTelegram([
    "🍽 <b>Бронь стола — заявка с сайта</b>",
    "",
    `<b>Имя:</b> ${escapeHtml(name)}`,
    `<b>Телефон:</b> ${escapeHtml(phone)}`,
    `<b>Дата и время:</b> ${escapeHtml(datetime.replace("T", " "))}`,
    `<b>Гостей:</b> ${escapeHtml(guests)}`,
    occasion ? `<b>Повод:</b> ${escapeHtml(occasion)}` : "",
  ].filter(Boolean));

  if (!result.ok) {
    return isNative
      ? redirectTo("/oshibka-zayavki")
      : Response.json(
          { ok: false, error: "Не удалось отправить заявку" },
          { status: result.status }
        );
  }
  return isNative ? redirectTo("/spasibo") : Response.json({ ok: true });
}
