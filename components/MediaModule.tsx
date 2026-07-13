import Image from "next/image";

/*
 * CMP-4 Media Module [DS 5] — единая оболочка фото/видео.
 * Фиксированный аспект (анти-CLS), радиус lg.
 * Вариант missing — первого класса: тот же аспект, заливка surface,
 * тонкая иконка + честная подпись под контекст блока. Без моушна.
 *
 * Фото подключаются через props.src без изменения блоков (конвейер
 * next/image: AVIF/WebP, sizes, lazy/priority). Ключевые блоки закрыты
 * официальными фото с rapsodia.ru (12.07.2026, см. README §Фотографии);
 * missing остаётся для слотов без официальных кадров (DEF-7 QA:
 * комментарий актуализирован).
 */

type Aspect = "4/3" | "3/4" | "16/9";

const aspectClass: Record<Aspect, string> = {
  "4/3": "aspect-[4/3]",
  "3/4": "aspect-[3/4]",
  "16/9": "aspect-video",
};

export default function MediaModule({
  src,
  alt,
  aspect = "4/3",
  missingLabel,
  priority = false,
  sizes = "100vw",
  className = "",
}: {
  src?: string;
  alt: string;
  aspect?: Aspect;
  missingLabel: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  if (!src) {
    return (
      <div
        role="img"
        aria-label={`${alt} — ${missingLabel}`}
        className={`relative overflow-hidden rounded-lg bg-surface ${aspectClass[aspect]} ${className}`}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="size-8 text-ink-soft"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
          >
            <rect x="3" y="6" width="18" height="14" rx="2" />
            <circle cx="12" cy="13" r="3.5" />
            <path d="M8.5 6l1.2-2h4.6l1.2 2" />
          </svg>
          <p className="type-caption text-ink-soft">{missingLabel}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-lg ${aspectClass[aspect]} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        fetchPriority={priority ? "high" : undefined}
        className="object-cover"
      />
    </div>
  );
}
