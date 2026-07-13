/*
 * PG-6 О нас [UX 4, COPY §5]: короткий блок концепции, без упоминания
 * предшественника [DIR-COPY-3]. CR-4: собственный текст Copywriting
 * (pg6 в lib/content.ts), дубли главной убраны — [ВРЕМЕННО] закрыт.
 */

import type { Metadata } from "next";
import { Container, ButtonLink } from "@/components/ui";
import MediaModule from "@/components/MediaModule";
import MobileActionBar from "@/components/MobileActionBar";
import { pg1, pg6, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "О ресторане — кухня и сцена как одна идея | Рапсодия, Зеленоград",
  description:
    "Рапсодия — ресторан в Зеленограде с открытой кухней на дровах и концертной сценой. Кухня и сцена спроектированы как единое пространство для вечера.",
  alternates: { canonical: "/o-nas" },
};

export default function AboutPage() {
  return (
    <main>
      <section className="section-base" aria-labelledby="about-h1">
        <Container className="grid items-center gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-6">
            <h1 id="about-h1" className="type-display">
              {pg6.h1}
            </h1>
            {pg6.body.map((p) => (
              <p key={p.slice(0, 20)} className="type-body text-ink-soft">
                {p}
              </p>
            ))}
            <p className="type-caption text-ink-soft">{site.founded}</p>
            <ButtonLink href="/#bron" className="self-start">
              {pg1.hero.cta}
            </ButtonLink>
          </div>
          <div className="lg:col-span-6">
            <MediaModule
              src="/photos/zal-dnem.webp"
              alt="Зал ресторана Рапсодия с открытой кухней и сценой"
              aspect="4/3"
              missingLabel="Съёмка зала готовится"
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
            />
          </div>
        </Container>
      </section>
      <MobileActionBar />
    </main>
  );
}
