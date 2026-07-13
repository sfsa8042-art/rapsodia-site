"use client";

/*
 * Карта с загрузкой по клику. iframe Яндекс.Карт при автозагрузке
 * перехватывал фокус и подскроливал страницу к себе; click-to-load это
 * устраняет и не тянет сторонний виджет, пока он не нужен (перф + приватность).
 * До клика — лёгкий плейсхолдер в фирменной среде с меткой и подписью.
 */

import { useState } from "react";

export default function MapEmbed({
  src,
  title,
  caption,
}: {
  src: string;
  title: string;
  caption: string;
}) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <div className="overflow-hidden rounded-lg border border-border-subtle">
        <iframe
          src={src}
          title={title}
          className="aspect-[16/9] w-full lg:aspect-[21/9]"
          style={{ border: 0 }}
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      aria-label={`${title}. Показать интерактивную карту`}
      className="group flex aspect-[16/9] w-full flex-col items-center justify-center gap-3 rounded-lg border border-border-subtle bg-surface transition-colors duration-(--motion-fast) hover:border-ink-soft lg:aspect-[21/9]"
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="size-9 text-action"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 21s7-5.686 7-11a7 7 0 1 0-14 0c0 5.314 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
      <span className="type-label text-action underline-offset-4 group-hover:underline">
        Показать карту
      </span>
      <span className="type-caption text-ink-soft">{caption}</span>
    </button>
  );
}
