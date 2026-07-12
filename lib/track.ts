/*
 * Аналитика — события сценариев по якорям (D7 Development).
 * Счётчик не подключён (нет контракта аналитики — ASM в реестре);
 * события уходят в dataLayer, чтобы подключение Метрики/GTM не требовало
 * правок компонентов. Имена — по якорям CTA/FRM.
 */

type EventName =
  | "cta_bron_click" // CTA-1
  | "cta_tg_click" // CTA-2
  | "cta_banket_teaser_click" // CTA-5
  | "frm1_submit"
  | "frm1_success"
  | "frm1_error"
  | "frm2_submit"
  | "frm2_success"
  | "frm2_error";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: EventName, payload?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
}
