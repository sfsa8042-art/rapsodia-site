/*
 * Блоки PG-1 «Главная» [DS 6/7, UX 4]. Ритм: loose → dense×4 → loose →
 * base (F2 «нарастающая плотность к доказательству, спад к действию»).
 * CTA-закон: Primary на странице — одно действие «Забронировать стол»
 * (hero-кнопка ведёт к #bron, кнопка формы отправляет).
 */

import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ButtonLink, Container } from "@/components/ui";
import MediaModule from "@/components/MediaModule";
import Reveal from "@/components/Reveal";
import EventCard from "@/components/EventCard";
import TeaserCard from "@/components/TeaserCard";
import BookingForm from "@/components/BookingForm";
import { pg1, site, facts } from "@/lib/content";
import { upcoming } from "@/content/afisha";

/* BLK-PG1-01 Hero: кинематографичный сплит. Слева — eyebrow + крупный
 * параллельный слоган (type-hero) + подзаголовок + два CTA. Справа —
 * фото печи, доминанта 60%+ ширины, bleed вправо, заданная высота
 * [VD: Экран 1]. Запрос владельца: больше визуала, сильнее слоган. */
export function HeroBlock() {
  return (
    <section className="section-loose overflow-x-clip max-lg:pt-8" aria-labelledby="hero-h1">
      <Container className="grid items-center gap-10 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-5 max-lg:order-2">
          <p className="type-eyebrow text-action">{pg1.hero.eyebrow}</p>
          <h1 id="hero-h1" className="type-hero">
            {pg1.hero.h1line1}
            <br />
            <span className="text-action">{pg1.hero.h1line2}</span>
          </h1>
          <p className="type-lead max-w-[46ch] text-ink-soft">{pg1.hero.lead}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <ButtonLink href="#bron">{pg1.hero.cta}</ButtonLink>
            <Link
              href="/afisha"
              className="type-label text-action underline-offset-4 hover:underline"
            >
              {pg1.hero.ctaSecondary} →
            </Link>
          </div>
        </div>
        <div className="lg:col-span-7 max-lg:order-1 lg:mr-[calc(50%-50vw)]">
          {/* LCP-образ: официальное фото с rapsodia.ru — печь с огнём */}
          <MediaModule
            src="/photos/pech-ogon.jpg"
            alt="Дровяная печь ресторана Рапсодия с горящим огнём"
            aspect="4/3"
            missingLabel="Съёмка зала готовится"
            priority
            sizes="(min-width: 1024px) 62vw, 100vw"
            className="max-lg:aspect-[3/4] lg:aspect-auto lg:h-[min(74vh,720px)] lg:rounded-r-none"
          />
        </div>
      </Container>
    </section>
  );
}

/* Полоса фактов — характерные моно-цифры, тонкий бренд-акцент между
 * hero и механикой. Разделители — решётчатый мотив на бордерах. */
export function StatsBand() {
  return (
    <section className="border-y border-border-subtle bg-surface" aria-label="Коротко о ресторане">
      <Container className="grid grid-cols-2 gap-x-6 gap-y-8 py-10 lg:grid-cols-4 lg:py-12">
        {pg1.stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-1">
            <span className="type-numeric-display text-action">{s.value}</span>
            <span className="type-caption text-ink-soft">{s.label}</span>
          </div>
        ))}
      </Container>
    </section>
  );
}

/* Бенто-мозаика «Как проходит вечер»: крупная плитка-афиша + две плитки
 * (меню/галерея). Immersive-вход в ключевые разделы — забирает силу
 * старого сайта, но премиально и с одним акцентом. */
export function AtmosphereMosaic() {
  const [big, ...rest] = pg1.atmosphere.tiles;
  return (
    <section className="section-dense" aria-labelledby="atmo-h2">
      <Container className="flex flex-col gap-8">
        <Reveal className="grid gap-x-10 gap-y-3 lg:grid-cols-12">
          <h2 id="atmo-h2" className="type-h2 lg:col-span-5">
            {pg1.atmosphere.h2}
          </h2>
          <p className="type-body text-ink-soft lg:col-span-6 lg:col-start-7">
            {pg1.atmosphere.lead}
          </p>
        </Reveal>
        <Reveal className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
          <MosaicTile tile={big} className="lg:col-span-2 lg:row-span-2 lg:min-h-[30rem]" priority />
          <MosaicTile tile={rest[0]} className="min-h-64" />
          <MosaicTile tile={rest[1]} className="min-h-64" />
        </Reveal>
      </Container>
    </section>
  );
}

function MosaicTile({
  tile,
  className = "",
  priority = false,
}: {
  tile: (typeof pg1.atmosphere.tiles)[number];
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href={tile.href}
      className={`group relative flex min-h-56 flex-col justify-end overflow-hidden rounded-lg p-6 ${className}`}
    >
      <Image
        src={tile.src}
        alt=""
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        priority={priority}
        className="object-cover transition-transform duration-(--motion-base) ease-(--ease-out-soft) group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="relative flex flex-col gap-1 text-white">
        <span className="card-title">{tile.label}</span>
        <span className="type-caption text-white/85">
          {tile.caption} <span className="group-hover:underline">→</span>
        </span>
      </div>
    </Link>
  );
}

/* Полноширинная атмосферная полоса — вечерний кадр во всю ширину с
 * короткой строкой. Immersive-пауза перед формой. */
export function AtmosphereBand() {
  return (
    <section aria-label="Атмосфера вечера" className="relative">
      <div className="relative h-[52vh] min-h-80 w-full overflow-hidden lg:h-[62vh]">
        <Image
          src={pg1.band.src}
          alt={pg1.band.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
        <div className="absolute inset-x-0 bottom-0">
          <Container className="pb-10 lg:pb-14">
            <p className="type-h2 max-w-[24ch] text-white">{pg1.band.caption}</p>
          </Container>
        </div>
      </div>
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

/* BLK-PG1-04 Повод/атмосфера: текст + фото «коммунального» стола
 * (под тему компании/повода). Больше визуала по запросу владельца. */
export function OccasionBlock() {
  return (
    <section className="section-dense" aria-labelledby="occasion-h2">
      <Container className="grid items-center gap-10 lg:grid-cols-12">
        <Reveal className="flex flex-col gap-4 lg:col-span-5 max-lg:order-2">
          <h2 id="occasion-h2" className="type-h2">
            {pg1.occasion.h2}
          </h2>
          <p className="type-body text-ink-soft">{pg1.occasion.body}</p>
        </Reveal>
        <Reveal className="lg:col-span-7 max-lg:order-1">
          <MediaModule
            src="/photos/kommunalnyj-stol.webp"
            alt="«Коммунальный» стол для большой компании в зале Рапсодии"
            aspect="16/9"
            missingLabel="Съёмка зала готовится"
            sizes="(min-width: 1024px) 58vw, 100vw"
          />
        </Reveal>
      </Container>
    </section>
  );
}

/* BLK-PG1-05 Доверие: минимальный режим до накопления отзывов [UX 8].
 * Polish: тот же редакционный сплит, что и Повод. */
export function TrustBlock() {
  return (
    <section className="section-dense" aria-labelledby="trust-h2">
      <Container>
        <Reveal className="grid gap-x-10 gap-y-4 lg:grid-cols-12">
          <h2 id="trust-h2" className="type-h2 lg:col-span-5">
            {pg1.trust.h2}
          </h2>
          <div className="flex flex-col gap-4 lg:col-span-6 lg:col-start-7">
            <p className="type-body text-ink-soft">{pg1.trust.body}</p>
            <a
              href={site.gisUrl}
              rel="noopener noreferrer"
              className="type-label self-start text-action underline-offset-4 hover:underline"
            >
              {pg1.trust.cta} →
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* BLK-PG1-06 Первичный CTA + FRM-1: спад плотности перед действием.
 * Polish: форма центрируется в комфортной мере ~640px (раньше растягивалась
 * на всю ширину контейнера — поля-переростки, ощущение незавершённости). */
export function BookingBlock() {
  return (
    <section id="bron" className="section-loose" aria-labelledby="bron-h2">
      <Container>
        <div className="mx-auto flex max-w-[640px] flex-col gap-8">
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

/* BLK-PG1-07 Вторичные пути: ровно 2 × CMP-6.
 * Polish: pt-0 — не удваиваем разрыв после section-loose формы. */
export function SecondaryPathsBlock() {
  return (
    <section className="section-base pt-0 lg:pt-0" aria-label="Банкеты и меню">
      <Container className="grid gap-6 sm:grid-cols-2">
        <TeaserCard {...pg1.teasers.banket} />
        <TeaserCard {...pg1.teasers.menu} />
      </Container>
    </section>
  );
}
