/*
 * PG-5 Галерея [UX 4]: минимальный режим — честное сообщение о съёмке
 * (CMP-4 missing), без стоковых подмен. Подписи по факту [COPY §5].
 * Фото клиента подключаются в content/gallery.ts без правки страницы.
 */

import type { Metadata } from "next";
import { Container, ButtonLink } from "@/components/ui";
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
          <h1 id="gal-h1" className="type-display">
            Зал, кухня и сцена — как есть
          </h1>

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
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((photo) => (
                <figure key={photo.src} className="flex flex-col gap-2">
                  <MediaModule
                    src={photo.src}
                    alt={photo.caption}
                    aspect="4/3"
                    missingLabel=""
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <figcaption className="type-caption text-ink-soft">
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
