/*
 * PG-1 Главная [DS 7]. Визуально усиленная последовательность (запрос
 * владельца): Hero → полоса фактов → Механика → бенто «как проходит
 * вечер» → Афиша → Повод(+фото) → атмосферная полоса → Доверие →
 * CTA(FRM-1) → Вторичные пути. Статический рендер + ISR.
 */

import type { Metadata } from "next";
import {
  HeroBlock,
  StatsBand,
  MechanicsBlock,
  AtmosphereMosaic,
  AfishaTeaserBlock,
  OccasionBlock,
  AtmosphereBand,
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
      <StatsBand />
      <MechanicsBlock />
      <AtmosphereMosaic />
      <GrillDivider />
      <AfishaTeaserBlock />
      <OccasionBlock />
      <AtmosphereBand />
      <TrustBlock />
      <BookingBlock />
      <SecondaryPathsBlock />
      <MobileActionBar />
    </main>
  );
}
