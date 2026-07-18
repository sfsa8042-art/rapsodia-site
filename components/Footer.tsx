/*
 * CMP-9 Footer [DS 5]: дубль навигации → контакты → часы (type.numeric)
 * → адрес. Статичный серверный компонент.
 */

import Link from "next/link";
import LogoMark from "@/components/LogoMark";
import { nav, site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-surface pb-24 lg:pb-0">
      <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-4 py-12 lg:grid-cols-3 lg:px-8 lg:py-16">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-3" aria-label="Рапсодия — на главную">
            <LogoMark />
            <span className="type-wordmark text-ink">Рапсодия</span>
          </Link>
          {/* Redesign v3: тэглайн — антиква-курсив, фирменная интонация */}
          <p className="card-title italic text-ink-soft">{site.tagline}</p>
          <p className="type-caption text-ink-soft">{site.founded}</p>
        </div>

        <nav aria-label="Навигация в подвале">
          {/* Polish: колоночный поток — каждая колонка читается сверху вниз
              в порядке основной навигации (раньше row-major путал порядок) */}
          {/* Аудит-2: тач-таргет ≥44px — min-h-11 вместо вертикальных gap */}
          <ul className="grid grid-flow-col grid-rows-4 gap-x-8">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center type-caption text-ink-soft underline-offset-4 hover:text-ink hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3">
          <a href={site.phoneHref} className="type-numeric text-ink hover:underline">
            {site.phone}
          </a>
          <div className="flex gap-x-4">
            <a
              href={site.telegram}
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center type-caption text-ink-soft underline-offset-4 hover:text-ink hover:underline"
            >
              Telegram
            </a>
            <a
              href={site.vk}
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center type-caption text-ink-soft underline-offset-4 hover:text-ink hover:underline"
            >
              VK
            </a>
          </div>
          <dl className="flex flex-col gap-1">
            {site.hours.map((h) => (
              <div key={h.days} className="flex gap-3">
                <dt className="type-caption text-ink-soft">{h.days}</dt>
                <dd className="type-numeric text-ink">{h.time}</dd>
              </div>
            ))}
          </dl>
          <p className="type-caption text-ink-soft">{site.address}</p>
        </div>
      </div>
    </footer>
  );
}
