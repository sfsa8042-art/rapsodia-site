"use client";

/*
 * FRM-1 Бронь стола [UX 7, COPY 7].
 * Контур D6: клиентская валидация (вежливая, тексты COPY) → POST
 * /api/booking (серверная валидация + Telegram) → состояния
 * отправка/успех/ошибка сети. Антиспам: honeypot + временной порог 3s
 * (без капчи — не вредим конверсии). Успех заменяет содержимое блока
 * (не модалка) [DS 8].
 * Без JS форма отправляется нативным POST на тот же роут (см. action)
 * и получает текстовый ответ — прогрессивное усиление.
 */

import { useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { Field } from "@/components/FormField";
import { Button } from "@/components/ui";
import { forms, facts, site } from "@/lib/content";
import { track } from "@/lib/track";

type Errors = Partial<Record<"name" | "phone" | "datetime" | "guests", string>>;

/* ≥10 цифр в любом формате записи */
const phoneOk = (v: string) => (v.match(/\d/g) || []).length >= 10;

const monthsRu = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];

/* «2026-08-01T19:00» → «1 августа, 19:00» — для success-текста [COPY 7] */
function humanDatetime(dt: string): string {
  const d = new Date(dt);
  if (isNaN(d.getTime())) return dt;
  const time = dt.includes("T") ? dt.split("T")[1].slice(0, 5) : "";
  return `${d.getDate()} ${monthsRu[d.getMonth()]}${time ? `, ${time}` : ""}`;
}

export default function BookingForm() {
  const [errors, setErrors] = useState<Errors>({});
  const params = useSearchParams();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "network-error">("idle");
  const [sentDt, setSentDt] = useState("");
  const startedAt = useRef(Date.now());
  const inFlight = useRef(false); // DEF-3 QA: гард дабл-клика (state обновляется асинхронно)
  const t = forms.frm1;

  /* SCN-2 [UX]: переход с карточки события предзаполняет дату (?date=…) */
  const presetDate = params.get("date");
  const defaultDatetime =
    presetDate && /^\d{4}-\d{2}-\d{2}$/.test(presetDate)
      ? `${presetDate}T19:00`
      : undefined;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inFlight.current) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) || "").trim();

    const next: Errors = {};
    if (!get("name")) next.name = t.errRequired;
    if (!phoneOk(get("phone"))) next.phone = t.errPhone;
    const dt = get("datetime");
    if (!dt) next.datetime = t.errRequired;
    else if (new Date(dt).getTime() < Date.now() - 60_000) next.datetime = t.errDate;
    if (!get("guests")) next.guests = t.errRequired;

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    inFlight.current = true;
    setStatus("sending");
    track("frm1_submit");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: get("name"),
          phone: get("phone"),
          datetime: dt,
          guests: get("guests"),
          occasion: get("occasion"),
          website: get("website"), // honeypot
          elapsed: Date.now() - startedAt.current,
        }),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setSentDt(dt);
        setStatus("success");
        track("frm1_success");
      } else {
        setStatus("network-error");
        track("frm1_error", { kind: "server" });
      }
    } catch {
      setStatus("network-error");
      track("frm1_error", { kind: "network" });
    } finally {
      inFlight.current = false;
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col gap-3 rounded-lg bg-surface p-6 lg:p-8">
        <p className="card-title">
          {t.success(facts.sla, sentDt ? humanDatetime(sentDt) : "")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} method="POST" action="/api/booking" noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="frm1-name" name="name" label={t.name} autoComplete="name" error={errors.name} />
        <Field id="frm1-phone" name="phone" type="tel" label={t.phone} autoComplete="tel" inputMode="tel" error={errors.phone} />
        <Field id="frm1-datetime" name="datetime" type="datetime-local" label={t.datetime} defaultValue={defaultDatetime} error={errors.datetime} />
        <Field id="frm1-guests" name="guests" type="number" min={1} max={130} label={t.guests} inputMode="numeric" error={errors.guests} />
      </div>
      <Field id="frm1-occasion" name="occasion" label={t.occasion} />

      {/* honeypot — вне таб-порядка и скрыт от AT */}
      <div aria-hidden className="hidden">
        <label htmlFor="frm1-website">Не заполняйте</label>
        <input id="frm1-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "network-error" && (
        <p role="alert" className="type-caption text-error">
          {t.errNetwork}{" "}
          <a href={site.phoneHref} className="underline underline-offset-4">
            {site.phone}
          </a>
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" loading={status === "sending"}>
          {t.submit}
        </Button>
        <a
          href={site.telegram}
          rel="noopener noreferrer"
          onClick={() => track("cta_tg_click", { place: "frm1" })}
          className="type-label text-action underline-offset-4 hover:underline"
        >
          Написать в Telegram
        </a>
      </div>
    </form>
  );
}
