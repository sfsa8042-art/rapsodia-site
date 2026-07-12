"use client";

/*
 * FRM-2 Заявка на банкет [UX 7, COPY 7]: длиннее FRM-1, каждое поле
 * оправдано первым звонком менеджера. Запасная дата — страховка ASM-7
 * (пересечение с концертными вечерами). Контур D6 идентичен FRM-1.
 */

import { useRef, useState, type FormEvent } from "react";
import { Field } from "@/components/FormField";
import { Button } from "@/components/ui";
import { forms, facts, pg2, site } from "@/lib/content";
import { track } from "@/lib/track";

type Errors = Partial<Record<"name" | "phone" | "date" | "guests" | "occasion", string>>;

const phoneOk = (v: string) => (v.match(/\d/g) || []).length >= 10;

export default function BanketForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "network-error">("idle");
  const startedAt = useRef(Date.now());
  const inFlight = useRef(false); // DEF-3 QA
  const t = forms.frm2;
  const t1 = forms.frm1;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) || "").trim();

    const next: Errors = {};
    if (!get("name")) next.name = t1.errRequired;
    if (!phoneOk(get("phone"))) next.phone = t1.errPhone;
    const date = get("date");
    if (!date) next.date = t1.errRequired;
    else if (date < new Date().toISOString().slice(0, 10)) next.date = t1.errDate;
    if (!get("guests")) next.guests = t1.errRequired;
    if (!get("occasion")) next.occasion = t1.errRequired;

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    if (inFlight.current) return;
    inFlight.current = true;
    setStatus("sending");
    track("frm2_submit");
    try {
      const res = await fetch("/api/banket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: get("name"),
          phone: get("phone"),
          date,
          dateAlt: get("dateAlt"),
          guests: get("guests"),
          occasion: get("occasion"),
          comment: get("comment"),
          website: get("website"),
          elapsed: Date.now() - startedAt.current,
        }),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setStatus("success");
        track("frm2_success");
      } else {
        setStatus("network-error");
        track("frm2_error", { kind: "server" });
      }
    } catch {
      setStatus("network-error");
      track("frm2_error", { kind: "network" });
    } finally {
      inFlight.current = false;
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col gap-3 rounded-lg bg-surface p-6 lg:p-8">
        <p className="card-title">{t.success(facts.sla)}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} method="POST" action="/api/banket" noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="frm2-name" name="name" label={t.name} autoComplete="name" error={errors.name} />
        <Field id="frm2-phone" name="phone" type="tel" label={t.phone} autoComplete="tel" inputMode="tel" error={errors.phone} />
        <Field id="frm2-date" name="date" type="date" label={t.date} error={errors.date} />
        <Field id="frm2-date-alt" name="dateAlt" type="date" label={t.dateAlt} />
        <Field id="frm2-guests" name="guests" type="number" min={1} max={130} label={t.guests} inputMode="numeric" error={errors.guests} />
        <Field id="frm2-occasion" name="occasion" label={t.occasion} error={errors.occasion} />
      </div>
      <Field id="frm2-comment" name="comment" label={t.comment} textarea />

      <div aria-hidden className="hidden">
        <label htmlFor="frm2-website">Не заполняйте</label>
        <input id="frm2-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="type-caption text-ink-soft">{pg2.form.note}</p>

      {status === "network-error" && (
        <p role="alert" className="type-caption text-error">
          {t1.errNetwork}{" "}
          <a href={site.phoneHref} className="underline underline-offset-4">
            {site.phone}
          </a>
        </p>
      )}

      <Button type="submit" loading={status === "sending"} className="self-start">
        {t.submit}
      </Button>
    </form>
  );
}
