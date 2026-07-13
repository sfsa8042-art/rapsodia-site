/*
 * PG-7 Контакты [UX 4]: заголовок-факт «Как до нас добраться» [COPY §5],
 * адрес, телефон, часы (type.numeric), ссылки на карты.
 * Карта — официальный Яндекс-виджет с меткой заведения [ФАКТУРА:
 * rapsodia.ru]; iframe с фиксированным аспектом (анти-CLS) и loading=lazy
 * (не грузится до подхода к вьюпорту — бюджет страницы). Кнопка
 * «Проложить маршрут» открывает Яндекс.Карты в режиме маршрута к точке.
 */

import type { Metadata } from "next";
import { Container, ButtonLink } from "@/components/ui";
import MobileActionBar from "@/components/MobileActionBar";
import MapEmbed from "@/components/MapEmbed";
import { site, pg1 } from "@/lib/content";

export const metadata: Metadata = {
  title: "Контакты и как добраться — Рапсодия, Зеленоград",
  description:
    "Ресторан Рапсодия: Зеленоград, к2309а, ТЦ «Столица», 2 этаж. Телефон, часы работы, Telegram и VK.",
  alternates: { canonical: "/kontakty" },
};

export default function ContactsPage() {
  return (
    <main>
      <section className="section-base" aria-labelledby="contacts-h1">
        <Container className="flex flex-col gap-8">
          <h1 id="contacts-h1" className="type-display">
            Как до нас добраться
          </h1>

          <div className="grid gap-10 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <p className="type-body">{site.address}</p>
              <a href={site.phoneHref} className="type-numeric-display text-action hover:underline">
                {site.phone}
              </a>
              <a href={site.emailHref} className="type-body text-action underline-offset-4 hover:underline">
                {site.email}
              </a>
              <a
                href={site.yandexRoute}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-(--control-h) items-center justify-center self-start rounded-md bg-action px-6 type-label text-on-action transition-colors duration-(--motion-fast) hover:bg-action-hover"
              >
                Проложить маршрут
              </a>
              <div className="flex flex-wrap gap-5">
                <a href={site.telegram} rel="noopener noreferrer" className="type-label text-action underline-offset-4 hover:underline">
                  Telegram
                </a>
                <a href={site.vk} rel="noopener noreferrer" className="type-label text-action underline-offset-4 hover:underline">
                  VK
                </a>
                <a href={site.gisUrl} rel="noopener noreferrer" className="type-label text-action underline-offset-4 hover:underline">
                  Открыть в 2ГИС
                </a>
              </div>
            </div>

            <dl className="flex flex-col gap-2 self-start rounded-lg bg-surface p-6">
              <p className="type-caption font-semibold text-ink">Часы работы</p>
              {site.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-6">
                  <dt className="type-body text-ink-soft">{h.days}</dt>
                  <dd className="type-numeric">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Официальная карта с меткой [ФАКТУРА: rapsodia.ru], по клику */}
          <MapEmbed
            src={site.yandexMap}
            title="Ресторан Рапсодия на карте — Зеленоград, ТЦ «Столица»"
            caption={site.address}
          />

          <ButtonLink href="/#bron" className="self-start">
            {pg1.hero.cta}
          </ButtonLink>
        </Container>
      </section>
      <MobileActionBar />
    </main>
  );
}
