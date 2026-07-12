/*
 * CMP-5 Event Card [DS 5]: дата приоритетна (type.numeric-display),
 * название — max 2 строки, усечение на 3-й (единственное разрешённое
 * усечение системы). Hover — сдвиг бордера, теней нет (shadow.none).
 */

import Link from "next/link";
import type { AfishaEvent } from "@/content/afisha";
import { pg1 } from "@/lib/content";

const months = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];

export function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return `${d.getDate()} ${months[d.getMonth()]}`;
}

export default function EventCard({ event }: { event: AfishaEvent }) {
  return (
    <article className="flex flex-col gap-3 rounded-lg border border-border-subtle bg-surface p-6 transition-colors duration-(--motion-fast) hover:border-ink-soft">
      <p className="type-numeric-display text-action">
        {formatDate(event.date)} · {event.time}
      </p>
      <h3 className="card-title line-clamp-2">{event.title}</h3>
      {event.genre && <p className="type-caption text-ink-soft">{event.genre}</p>}
      <Link
        href={`/?date=${event.date}#bron`}
        className="type-label mt-auto text-action underline-offset-4 hover:underline"
      >
        {pg1.afishaFull.cta} →
      </Link>
    </article>
  );
}
