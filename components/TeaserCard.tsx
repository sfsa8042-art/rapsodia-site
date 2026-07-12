/*
 * CMP-6 Teaser Card [DS 5]: h2 контекстный → 1–2 предложения → Tertiary
 * со стрелкой. Ровно 2 экземпляра (банкет, меню) — BLK-PG1-07.
 */

import Link from "next/link";

export default function TeaserCard({
  h2,
  body,
  cta,
  href,
}: {
  h2: string;
  body?: string;
  cta: string;
  href: string;
}) {
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
