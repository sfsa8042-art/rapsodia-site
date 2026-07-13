/*
 * PG-3 Меню [UX 4]: утилитарная + поддержка доверия. Минимальный режим,
 * пока клиент не передал позиции (content/menu.ts): честный текст +
 * телефон, не рыба. Вторичный CTA брони внизу [UX].
 */

import type { Metadata } from "next";
import { Container, ButtonLink } from "@/components/ui";
import MediaModule from "@/components/MediaModule";
import MobileActionBar from "@/components/MobileActionBar";
import { menu } from "@/content/menu";
import { site, pg1 } from "@/lib/content";

export const metadata: Metadata = {
  title: "Меню — на дровах, гриле и из своей пекарни | Рапсодия, Зеленоград",
  description:
    "Меню ресторана Рапсодия в Зеленограде: блюда с дровяной печи и испанского гриля, хлеб и десерты из своей пекарни и кондитерской.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <main>
      <section className="section-base" aria-labelledby="menu-h1">
        <Container className="flex flex-col gap-6">
          <h1 id="menu-h1" className="type-display">
            Меню — на дровах, гриле и из своей пекарни
          </h1>

          {/* Атмосферный кадр кухни — визуальный якорь текстовой страницы */}
          <MediaModule
            src="/photos/kuhnya-pech.webp"
            alt="Открытая кухня с дровяной печью в ресторане Рапсодия"
            aspect="16/9"
            missingLabel="Съёмка кухни готовится"
            priority
            sizes="(min-width: 1280px) 1216px, 100vw"
          />

          {menu.length === 0 ? (
            <div className="flex flex-col gap-4">
              <p className="type-body text-ink-soft">
                Полное меню сейчас переносится на сайт. Действующее меню и
                бизнес-ланч уточняйте по телефону — ответим сразу.
              </p>
              <a href={site.phoneHref} className="type-numeric text-action hover:underline">
                {site.phone}
              </a>
            </div>
          ) : (
            <div className="flex flex-col gap-12 lg:max-w-[820px]">
              {menu.map((section) => (
                <section key={section.title} aria-label={section.title}>
                  <h2 className="type-h2 mb-6">{section.title}</h2>
                  <ul className="flex flex-col gap-4">
                    {section.items.map((item) => (
                      <li
                        key={item.name}
                        className="flex items-baseline justify-between gap-6 border-b border-border-subtle pb-4"
                      >
                        <p className="type-body">{item.name}</p>
                        <p className="type-numeric shrink-0 text-ink-soft">
                          {item.weight}
                          {item.weight && item.price ? " · " : ""}
                          {item.price ? `${item.price} ₽` : ""}
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
              {/* [ФАКТУРА: PDF меню — «Блюдо дня» в каждом разделе; 2ГИС — бизнес-ланч от 710 ₽] */}
              <p className="type-caption text-ink-soft">
                Блюдо дня — в каждом разделе, спрашивайте у официанта.
                Бизнес-ланч — по будням, от 710 ₽.
              </p>
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
