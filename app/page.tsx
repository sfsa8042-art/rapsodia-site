/*
 * PG-1 Главная [DS 7]: последовательность блоков SCN-1.
 * Hero → Механика (без разделителя) → ÷ Афиша ÷ Повод ÷ Доверие →
 * CTA (FRM-1) → Вторичные пути. Статический рендер.
 */

import type { Metadata } from "next";
import {
  HeroBlock,
  MechanicsBlock,
  AfishaTeaserBlock,
  OccasionBlock,
  TrustBlock,
  BookingBlock,
  SecondaryPathsBlock,
} from "@/blocks/pg1";
import { GrillDivider } from "@/components/ui";
import MobileActionBar from "@/components/MobileActionBar";
import { seo } from "@/lib/content";

/* DEF-5 QA: афиша-тизер фильтрует прошедшие события датой сборки —
 * ISR раз в час не даёт событиям протухать без деплоя */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: seo.pg1.title,
  description: seo.pg1.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main>
      <HeroBlock />
      <MechanicsBlock />
      <GrillDivider />
      <AfishaTeaserBlock />
      <GrillDivider />
      <OccasionBlock />
      <GrillDivider />
      <TrustBlock />
      <BookingBlock />
      <SecondaryPathsBlock />
      <MobileActionBar />
    </main>
  );
}
