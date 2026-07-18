/*
 * PG-3 Меню [UX 4]: утилитарная + поддержка доверия. Минимальный режим,
 * пока клиент не передал позиции (content/menu.ts): честный текст +
 * телефон, не рыба. Вторичный CTA брони внизу [UX].
 */

import type { Metadata } from "next";
import { Container, ButtonLink, PageHeader, SectionHeading } from "@/components/ui";
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
          <PageHeader eyebrow="Дрова · Гриль · Своя пекарня" id="menu-h1">
            Меню — на дровах, гриле и из своей пекарни
          </PageHeader>

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
            /* Redesign v3: раскладка карты ресторана — две колонки на
               десктопе (multicol, как разворот меню), секции с моно-
               индексами, позиции с точечным лидером название …… цена */
            <div className="flex flex-col gap-2">
              <div className="lg:columns-2 lg:gap-16">
              {menu.map((section, i) => (
                <section key={section.title} aria-label={section.title} className="mb-14">
                  <SectionHeading
                    index={String(i + 1).padStart(2, "0")}
                    id={`menu-s${i + 1}`}
                    className="break-after-avoid mb-7"
                  >
                    {section.title}
                  </SectionHeading>
                  <ul className="flex flex-col gap-4">
                    {section.items.map((item) => (
                      <li key={item.name} className="flex items-baseline gap-3 break-inside-avoid">
                        <p className="type-body">{item.name}</p>
                        {/* Пустой flex-элемент в items-baseline: его базовая
                            линия — нижняя грань, точки ложатся на базовую
                            линию первой строки названия */}
                        <span
                          aria-hidden
                          className="min-w-6 flex-1 border-b border-dotted border-border-subtle"
                        />
                        <p className="type-numeric shrink-0">
                          {item.weight && (
                            <span className="text-ink-soft">{item.weight} · </span>
                          )}
                          {item.price ? `${item.price} ₽` : ""}
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
              </div>
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
