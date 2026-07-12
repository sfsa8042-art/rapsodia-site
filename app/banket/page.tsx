/*
 * PG-2 Банкеты и мероприятия [DS 7, UX SCN-3].
 */

import type { Metadata } from "next";
import {
  BanketHeroBlock,
  ProcessBlock,
  BanketTrustBlock,
  BanketContactBlock,
  BanketFormBlock,
} from "@/blocks/pg2";
import { GrillDivider } from "@/components/ui";
import MobileActionBar from "@/components/MobileActionBar";
import { seo } from "@/lib/content";

export const metadata: Metadata = {
  title: seo.pg2.title,
  description: seo.pg2.description,
  alternates: { canonical: "/banket" },
};

export default function BanketPage() {
  return (
    <main>
      <BanketHeroBlock />
      <ProcessBlock />
      <GrillDivider />
      <BanketTrustBlock />
      <GrillDivider />
      <BanketContactBlock />
      <BanketFormBlock />
      <MobileActionBar />
    </main>
  );
}
