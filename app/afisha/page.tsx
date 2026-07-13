/*
 * PG-4 Афиша [UX 4]: двухрежимная. Пусто → честный текст + подписка
 * (не сломанный календарь) [UX 8, COPY 7].
 */

import type { Metadata } from "next";
import { Container, ButtonLink } from "@/components/ui";
import EventCard from "@/components/EventCard";
import MobileActionBar from "@/components/MobileActionBar";
import { upcoming } from "@/content/afisha";
import { misc, site, pg1 } from "@/lib/content";

/* DEF-5 QA: см. app/page.tsx */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Афиша живой музыки — Рапсодия, Зеленоград",
  description:
    "Живые выступления по пятницам и субботам в ресторане Рапсодия, Зеленоград: сцена, концертный свет и звук. Расписание ближайших вечеров.",
  alternates: { canonical: "/afisha" },
};

export default function AfishaPage() {
  const events = upcoming();

  return (
    <main>
      <section className="section-base" aria-labelledby="afisha-h1">
        <Container className="flex flex-col gap-8">
          {/* CR-5: заголовок соответствует состоянию — пустой режим
              наследует честную интонацию минимального режима [COPY] */}
          <h1 id="afisha-h1" className="type-display">
            {events.length === 0 ? pg1.afishaMin.h2 : pg1.afishaFull.h2}
          </h1>

          {events.length === 0 ? (
            <div className="flex flex-col gap-4">
              <p className="type-body text-ink-soft">{misc.afishaEmpty}</p>
              <a
                href={site.telegram}
                rel="noopener noreferrer"
                className="type-label self-start text-action underline-offset-4 hover:underline"
              >
                Подписаться в Telegram →
              </a>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((e) => (
                <EventCard key={e.date + e.title} event={e} />
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="section-base" aria-label="Бронирование">
        <Container>
          <ButtonLink href="/#bron">{pg1.hero.cta}</ButtonLink>
        </Container>
      </section>
      <MobileActionBar />
    </main>
  );
}
