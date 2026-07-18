"use client";

/*
 * CMP-9 Header + CMP-2 Sticky CTA (десктоп) [DS 5].
 * На PG-2 первичное действие контекстно заменяется на банкетное
 * (замена, не второй Primary — CTA-закон).
 * Мобильное меню — нативный <dialog> (фокус-ловушка и Esc от платформы).
 * Переключатель темы: light — основная [DS CLR-A], dark — вечерний режим.
 */

import Link from "next/link";
import LogoMark from "@/components/LogoMark";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, misc, pg1, pg2 } from "@/lib/content";
import { track } from "@/lib/track";

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.getAttribute("data-theme") === "dark");
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    try {
      localStorage.setItem("rapsodia-theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      aria-label={misc.themeToggle}
      className="flex size-11 items-center justify-center rounded-md text-ink transition-colors duration-(--motion-fast) hover:bg-surface"
    >
      {dark ? (
        <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" />
        </svg>
      ) : (
        <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z" />
        </svg>
      )}
    </button>
  );
}

export default function Header() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isBanket = pathname === "/banket";

  const primary = isBanket
    ? { href: "/banket#zayavka", label: pg2.hero.cta }
    : { href: "/#bron", label: pg1.hero.cta };

  const closeMenu = () => dialogRef.current?.close();

  return (
    <header className="sticky top-0 z-100 border-b border-border-subtle bg-env/92 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center gap-4 px-4 lg:h-20 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Рапсодия — на главную">
          <LogoMark />
          <span className="type-wordmark hidden text-ink sm:block">Рапсодия</span>
        </Link>

        <nav aria-label="Основная навигация" className="mx-auto hidden lg:block">
          <ul className="flex items-center gap-6">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={`type-label transition-colors duration-(--motion-fast) hover:text-ink ${
                    pathname === item.href ? "text-ink" : "text-ink-soft"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <ThemeToggle />
          <Link
            href={primary.href}
            onClick={() => track("cta_bron_click", { place: "header" })}
            className="hidden h-12 items-center rounded-md bg-action px-6 type-label text-on-action transition-colors duration-(--motion-fast) hover:bg-action-hover lg:inline-flex"
          >
            {primary.label}
          </Link>
          <button
            type="button"
            aria-label={misc.navOpen}
            onClick={() => dialogRef.current?.showModal()}
            className="flex size-11 items-center justify-center rounded-md text-ink lg:hidden"
          >
            <svg aria-hidden viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Мобильная навигация — нативный dialog */}
      <dialog
        ref={dialogRef}
        // DEF-4 QA: страховочный Esc — native cancel может подавляться
        // без user activation (наблюдалось в CDP-среде)
        onKeyDown={(e) => e.key === "Escape" && closeMenu()}
        aria-label="Меню сайта"
        className="m-0 h-dvh max-h-none w-full max-w-none bg-env text-ink backdrop:bg-transparent"
      >
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/" onClick={closeMenu} className="flex items-center gap-3">
            <LogoMark />
            <span className="type-wordmark">Рапсодия</span>
          </Link>
          <button
            type="button"
            aria-label={misc.navClose}
            onClick={closeMenu}
            className="flex size-11 items-center justify-center rounded-md"
          >
            <svg aria-hidden viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <nav aria-label="Основная навигация" className="px-4 pt-8">
          <ul className="flex flex-col gap-6">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="type-h2 !max-w-none text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </dialog>
    </header>
  );
}
