/*
 * PG-5 Галерея [UX 4]: минимальный режим — честное сообщение о съёмке
 * (CMP-4 missing), без стоковых подмен. Подписи по факту [COPY §5].
 * Фото клиента подключаются в content/gallery.ts без правки страницы.
 */

import type { Metadata } from "next";
import Image from "next/image";
import { Container, ButtonLink, PageHeader } from "@/components/ui";
import MediaModule from "@/components/MediaModule";
import MobileActionBar from "@/components/MobileActionBar";
import { gallery } from "@/content/gallery";
import { pg1 } from "@/lib/content";

export const metadata: Metadata = {
  title: "Галерея — зал, открытая кухня и сцена | Рапсодия, Зеленоград",
  description:
    "Фотографии ресторана Рапсодия в Зеленограде: зал, открытая кухня с дровяной печью, сцена и концертный свет.",
  alternates: { canonical: "/galereya" },
};

export default function GalleryPage() {
  return (
    <main>
      <section className="section-base" aria-labelledby="gal-h1">
        <Container className="flex flex-col gap-8">
          <PageHeader eyebrow="Зал · Кухня · Сцена" id="gal-h1">
            Зал, кухня и сцена — как есть
          </PageHeader>

          {gallery.length === 0 ? (
            <div className="grid gap-6 sm:grid-cols-2">
              <MediaModule
                alt="Зал ресторана Рапсодия"
                aspect="4/3"
                missingLabel="Съёмка зала готовится"
              />
              <MediaModule
                alt="Открытая кухня ресторана Рапсодия"
                aspect="4/3"
                missingLabel="Съёмка кухни готовится"
              />
            </div>
          ) : (
            /* Масонри-колонки: фото в естественных пропорциях (портрет не
               обрезается), плотная премиальная раскладка [визуал по запросу] */
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
              {gallery.map((photo) => (
                <figure key={photo.src} className="mb-4 break-inside-avoid overflow-hidden rounded-lg">
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    width={photo.w}
                    height={photo.h}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-auto w-full"
                  />
                  <figcaption className="mt-2 type-caption text-ink-soft">
                    {photo.caption}
                  </figcaption>
                </figure>
              ))}
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
