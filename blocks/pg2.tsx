/*
 * Блоки PG-2 «Банкеты и мероприятия» [DS 6/7, UX 4].
 * Hero-вариант «secondary»: фото компактнее (кол. 8-12), без
 * асимметричного исключения сетки. Primary страницы — банкетная заявка.
 */

import { Suspense } from "react";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import MediaModule from "@/components/MediaModule";
import Reveal from "@/components/Reveal";
import BanketForm from "@/components/BanketForm";
import { pg2, site } from "@/lib/content";

/* BLK-PG2-01 Hero банкета. CR-1: фото уходит в правый край вьюпорта,
 * высота задана — компактнее PG-1 (DS: hero-вариант «secondary»),
 * но без мёртвой пустоты. */
export function BanketHeroBlock() {
  return (
    <section className="section-loose overflow-x-clip max-lg:pt-8" aria-labelledby="pg2-h1">
      <Container className="grid items-center gap-10 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-6">
          <p className="flex items-center gap-3 type-eyebrow text-action">
            <span aria-hidden className="h-px w-10 shrink-0 bg-border-subtle" />
            {pg2.hero.eyebrow}
          </p>
          <h1 id="pg2-h1" className="type-display">
            {pg2.hero.h1}
          </h1>
          <p className="type-lead text-ink-soft">{pg2.hero.lead}</p>
          <ButtonLink href="#zayavka" className="self-start">
            {pg2.hero.cta}
          </ButtonLink>
        </div>
        <div className="lg:col-span-6 lg:mr-[calc(50%-50vw)]">
          <MediaModule
            src="/photos/kommunalnyj-stol.webp"
            alt="«Коммунальный» круглый стол в зале Рапсодии, сервированный к вечеру"
            aspect="4/3"
            missingLabel={pg2.trust.mediaMissing}
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="lg:aspect-auto lg:h-[min(56vh,520px)] lg:rounded-r-none"
          />
        </div>
      </Container>
    </section>
  );
}

/* BLK-PG2-02 Процесс: FACT-7 не получен — минимальный режим без SLA */
export function ProcessBlock() {
  return (
    <section className="section-dense" aria-labelledby="process-h2">
      <Container>
        <Reveal className="grid gap-x-10 gap-y-4 lg:grid-cols-12">
          <SectionHeading index="01" id="process-h2" className="lg:col-span-5">
            {pg2.process.h2}
          </SectionHeading>
          <div className="flex flex-col gap-4 lg:col-span-6 lg:col-start-7">
            <p className="type-body text-ink-soft">{pg2.process.body}</p>
            <p className="type-caption text-ink-soft">{pg2.process.stepsNote}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* BLK-PG2-03 Доверие банкета: CMP-4 missing до FACT-8 */
export function BanketTrustBlock() {
  return (
    <section className="section-dense" aria-labelledby="pg2-trust-h2">
      <Container className="flex flex-col gap-6">
        <Reveal>
          <SectionHeading index="02" id="pg2-trust-h2">
            {pg2.trust.h2}
          </SectionHeading>
        </Reveal>
        <Reveal>
          <MediaModule
            src="/photos/zal-banket.webp"
            alt="Зал ресторана Рапсодия с гостями в вечернем режиме"
            aspect="16/9"
            missingLabel={pg2.trust.mediaMissing}
            sizes="(min-width: 1280px) 1216px, 100vw"
          />
        </Reveal>
      </Container>
    </section>
  );
}

/* BLK-PG2-04 Контакт: минимальный режим (FACT-9 нет) — Secondary-звонок */
export function BanketContactBlock() {
  return (
    <section className="section-dense" aria-labelledby="pg2-contact-h2">
      <Container>
        <Reveal className="grid gap-x-10 gap-y-4 lg:grid-cols-12">
          <SectionHeading index="03" id="pg2-contact-h2" className="lg:col-span-5">
            {pg2.contact.h2}
          </SectionHeading>
          <div className="flex flex-col gap-4 lg:col-span-6 lg:col-start-7">
            <p className="type-body text-ink-soft">{pg2.contact.body}</p>
            <a
              href={site.phoneHref}
              className="inline-flex h-(--control-h) min-w-(--control-min-w) items-center justify-center self-start rounded-md border border-action px-6 type-label text-action transition-colors duration-(--motion-fast) hover:border-action-hover hover:text-action-hover"
            >
              {pg2.contact.cta}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* BLK-PG2-05 CTA-форма FRM-2. Suspense — требование useSearchParams
 * при пререндере (см. BookingBlock в pg1) */
export function BanketFormBlock() {
  return (
    <section id="zayavka" className="section-loose" aria-labelledby="zayavka-h2">
      <Container>
        <div className="mx-auto flex max-w-[680px] flex-col gap-8">
          <h2 id="zayavka-h2" className="type-h2">
            {pg2.form.h2}
          </h2>
          <Suspense fallback={null}>
            <BanketForm />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}
