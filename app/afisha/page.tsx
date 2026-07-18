/*
 * PG-4 Афиша [UX 4]: двухрежимная. Пусто → честный текст + подписка
 * (не сломанный календарь) [UX 8, COPY 7].
 */

import type { Metadata } from "next";
import { Container, ButtonLink, PageHeader, SectionHeading } from "@/components/ui";
import EventCard from "@/components/EventCard";
import MobileActionBar from "@/components/MobileActionBar";
import { upcoming, voices } from "@/content/afisha";
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
          <PageHeader eyebrow="Пятница · Суббота · Живой звук" id="afisha-h1">
            {events.length === 0 ? pg1.afishaMin.h2 : pg1.afishaFull.h2}
          </PageHeader>

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

      {/* Голоса выходных [ФАКТУРА: карточки /afisha живого rapsodia.ru] —
          редакционная «афишная тумба»: крупные имена-антиква через
          ember-разделители, без выдуманных дат; актуальная пара
          пятница-суббота — в Telegram [UX 8] */}
      <section className="section-base border-y border-border-subtle bg-surface" aria-labelledby="voices-h2">
        <Container className="flex flex-col gap-8">
          <SectionHeading index="ПТ · СБ" id="voices-h2">
            Голоса музыкальных выходных
          </SectionHeading>
          <ul className="flex max-w-[20ch] flex-wrap items-baseline gap-x-5 gap-y-2 sm:max-w-none">
            {voices.map((v, i) => (
              <li key={v.name} className="flex items-baseline gap-x-5">
                <span className="type-display italic">{v.name}</span>
                {/* Разделитель только в строчной раскладке ≥sm: на мобильном
                    имена — столбец, точки в концах строк повисали бы */}
                {i < voices.length - 1 && (
                  <span aria-hidden className="type-display hidden text-ember sm:inline">
                    ·
                  </span>
                )}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3">
            {voices.map(
              (v) =>
                "note" in v && (
                  <p key={v.name} className="type-body text-ink-soft">
                    {v.name} — {v.note}.
                  </p>
                ),
            )}
            <p className="type-body max-w-[60ch] text-ink-soft">
              Сцена и живой звук работают по пятницам и субботам. Кто поёт в
              ближайшие выходные — публикуем в Telegram за несколько дней.
            </p>
            <a
              href={site.telegram}
              rel="noopener noreferrer"
              className="type-label self-start text-action underline-offset-4 hover:underline"
            >
              Афиша выходных в Telegram →
            </a>
          </div>
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
