/*
 * CMP-6 Teaser Card [DS 5]: h2 контекстный → 1–2 предложения → Tertiary
 * со стрелкой. Ровно 2 экземпляра (банкет, меню) — BLK-PG1-07.
 *
 * Polish: вариант с фоновым реальным фото (бенто-энергия старого сайта) —
 * когда передан image. Тёмный градиент-скрим снизу гарантирует читаемость
 * светлого текста на любом кадре; фото — декоративное (alt=""), заголовок
 * несёт смысл. Без image — прежний текстовый вариант на surface.
 */

import Link from "next/link";
import Image from "next/image";

export default function TeaserCard({
  h2,
  body,
  cta,
  href,
  image,
}: {
  h2: string;
  body?: string;
  cta: string;
  href: string;
  image?: string;
}) {
  if (image) {
    return (
      <Link
        href={href}
        className="group relative flex min-h-64 flex-col justify-end overflow-hidden rounded-lg p-6 lg:min-h-72 lg:p-8"
      >
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-(--motion-base) ease-(--ease-out-soft) group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent"
        />
        <div className="relative flex flex-col gap-2 text-white">
          <h3 className="card-title">{h2}</h3>
          {body && <p className="type-body text-white/85">{body}</p>}
          <span className="type-label mt-1 underline-offset-4 group-hover:underline">
            {cta} →
          </span>
        </div>
      </Link>
    );
  }

  return (
    <article className="flex flex-col gap-3 rounded-lg bg-surface p-6 lg:p-8">
      <h3 className="card-title">{h2}</h3>
      {body && <p className="type-body text-ink-soft">{body}</p>}
      <Link
        href={href}
        className="type-label mt-auto text-action underline-offset-4 hover:underline"
      >
        {cta} →
      </Link>
    </article>
  );
}
