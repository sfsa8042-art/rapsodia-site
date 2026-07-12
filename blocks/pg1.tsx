/*
 * Блоки PG-1 «Главная» [DS 6/7, UX 4]. Ритм: loose → dense×4 → loose →
 * base (F2 «нарастающая плотность к доказательству, спад к действию»).
 * CTA-закон: Primary на странице — одно действие «Забронировать стол»
 * (hero-кнопка ведёт к #bron, кнопка формы отправляет).
 */

import { Suspense } from "react";
import { ButtonLink, Container } from "@/components/ui";
import MediaModule from "@/components/MediaModule";
import Reveal from "@/components/Reveal";
import EventCard from "@/components/EventCard";
import TeaserCard from "@/components/TeaserCard";
import BookingForm from "@/components/BookingForm";
import { pg1, site, facts, misc } from "@/lib/content";
import { upcoming } from "@/content/afisha";

/* BLK-PG1-01 Hero: сплит текст (кол. 1-5) / медиа (кол. 6-12).
 * CR-1: на ≥1024 фото — доминанта 60%+ ширины вьюпорта, уходит в правый
 * край без скругления (bleed за контейнер), высота задана — пустых зон
 * без роли нет [VD: Экран 1 — фото-модуль 60-65% ширины, асимметрия]. */
export function HeroBlock() {
  return (
    <section className="section-loose overflow-x-clip max-lg:pt-8" aria-labelledby="hero-h1">
      <Container className="grid items-center gap-10 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-5 max-lg:order-2">
          <h1 id="hero-h1" className="type-display">
            {pg1.hero.h1}
          </h1>
          <p className="type-lead text-ink-soft">{pg1.hero.lead}</p>
          <ButtonLink href="#bron" className="self-start">
            {pg1.hero.cta}
          </ButtonLink>
        </div>
        <div className="lg:col-span-7 max-lg:order-1 lg:mr-[calc(50%-50vw)]">
          {/* LCP-образ: официальное фото с rapsodia.ru (12.07.2026) —
              дровяная печь с огнём, прямое подтверждение H1 [VD: Экран 1] */}
          <MediaModule
            src="/photos/pech-ogon.jpg"
            alt="Дровяная печь ресторана Рапсодия с горящим огнём"
            aspect="4/3"
            missingLabel="Съёмка зала готовится"
            priority
            sizes="(min-width: 1024px) 62vw, 100vw"
            className="max-lg:aspect-[3/4] lg:aspect-auto lg:h-[min(70vh,660px)] lg:rounded-r-none"
          />
        </div>
      </Container>
    </section>
  );
}

/* BLK-PG1-02 Механика кухни: без CMP-7 после hero — продолжение мысли */
export function MechanicsBlock() {
  return (
    <section className="section-dense" aria-labelledby="mech-h2">
      <Container className="grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <MediaModule
              src="/photos/kuhnya-pech.webp"
              alt={pg1.mechanics.mediaAlt}
              aspect="16/9"
              missingLabel={pg1.mechanics.mediaMissing}
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
          </Reveal>
        </div>
        <div className="flex flex-col gap-4 lg:col-span-5">
          <Reveal>
            <h2 id="mech-h2" className="type-h2">
              {pg1.mechanics.h2}
            </h2>
            <p className="type-body mt-4 text-ink-soft">{pg1.mechanics.body}</p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* BLK-PG1-03 Афиша-тизер: двухрежимный [UX 8]. Пусто → честный
 * минимальный режим с подпиской, не пустая сетка. */
export function AfishaTeaserBlock() {
  const events = upcoming().slice(0, 3);

  return (
    <section className="section-dense" aria-labelledby="afisha-h2">
      <Container>
        {events.length === 0 ? (
          /* CR-3: сцена — второй герой позиции — присутствует визуально
           * даже при пустом расписании [официальное фото rapsodia.ru];
           * асимметрия зеркальна Механике (там фото слева, тут справа) */
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <Reveal className="flex flex-col gap-4 lg:col-span-5">
              <h2 id="afisha-h2" className="type-h2">
                {pg1.afishaMin.h2}
              </h2>
              <p className="type-body text-ink-soft">{pg1.afishaMin.body}</p>
              <a
                href={site.telegram}
                rel="noopener noreferrer"
                className="type-label self-start text-action underline-offset-4 hover:underline"
              >
                {pg1.afishaMin.cta} →
              </a>
            </Reveal>
            <Reveal className="lg:col-span-7">
              <MediaModule
                src="/photos/scena-koncert.jpg"
                alt="Сцена Рапсодии во время живого выступления"
                aspect="16/9"
                missingLabel="Съёмка сцены готовится"
                sizes="(min-width: 1024px) 58vw, 100vw"
              />
            </Reveal>
          </div>
        ) : (
          <Reveal className="flex flex-col gap-8">
            <h2 id="afisha-h2" className="type-h2">
              {pg1.afishaFull.h2}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((e) => (
                <EventCard key={e.date + e.title} event={e} />
              ))}
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}

/* BLK-PG1-04 Повод/атмосфера: факты текстом, без иконок [DS 6] */
export function OccasionBlock() {
  return (
    <section className="section-dense" aria-labelledby="occasion-h2">
      <Container>
        <Reveal className="flex flex-col gap-4">
          <h2 id="occasion-h2" className="type-h2">
            {pg1.occasion.h2}
          </h2>
          <p className="type-body text-ink-soft">{pg1.occasion.body}</p>
        </Reveal>
      </Container>
    </section>
  );
}

/* BLK-PG1-05 Доверие: минимальный режим до накопления отзывов [UX 8] */
export function TrustBlock() {
  return (
    <section className="section-dense" aria-labelledby="trust-h2">
      <Container>
        <Reveal className="flex flex-col gap-4">
          <h2 id="trust-h2" className="type-h2">
            {pg1.trust.h2}
          </h2>
          <p className="type-body text-ink-soft">{pg1.trust.body}</p>
          <a
            href={site.gisUrl}
            rel="noopener noreferrer"
            className="type-label self-start text-action underline-offset-4 hover:underline"
          >
            {pg1.trust.cta} →
          </a>
        </Reveal>
      </Container>
    </section>
  );
}

/* BLK-PG1-06 Первичный CTA + FRM-1: спад плотности перед действием */
export function BookingBlock() {
  return (
    <section id="bron" className="section-loose" aria-labelledby="bron-h2">
      <Container className="max-w-[760px]">
        <div className="flex flex-col gap-8">
          <h2 id="bron-h2" className="type-h2">
            {pg1.booking.h2}
          </h2>
          <Suspense fallback={null}>
            <BookingForm />
          </Suspense>
          <p className="type-caption text-ink-soft">
            {pg1.booking.slaNote(facts.sla)}
          </p>
        </div>
      </Container>
    </section>
  );
}

/* BLK-PG1-07 Вторичные пути: ровно 2 × CMP-6 */
export function SecondaryPathsBlock() {
  return (
    <section className="section-base" aria-label="Банкеты и меню">
      <Container className="grid gap-6 sm:grid-cols-2">
        <TeaserCard {...pg1.teasers.banket} />
        <TeaserCard {...pg1.teasers.menu} />
      </Container>
    </section>
  );
}
