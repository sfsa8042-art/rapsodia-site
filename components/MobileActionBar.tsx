"use client";

/*
 * CMP-2 Sticky CTA Bar, мобильный вариант [DS 5]:
 * нижняя панель с тёплой полупрозрачной подложкой (env 92%),
 * Primary на всю ширину, safe-area снизу. На PG-2 действие заменяется
 * на банкетное (не второй Primary).
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { pg1, pg2 } from "@/lib/content";
import { track } from "@/lib/track";

export default function MobileActionBar() {
  const pathname = usePathname();
  const isBanket = pathname === "/banket";
  const primary = isBanket
    ? { href: "/banket#zayavka", label: pg2.hero.cta }
    : { href: pathname === "/" ? "#bron" : "/#bron", label: pg1.hero.cta };

  return (
    <div className="fixed inset-x-0 bottom-0 z-100 border-t border-border-subtle bg-env/92 p-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur-sm lg:hidden">
      <Link
        href={primary.href}
        onClick={() => track("cta_bron_click", { place: "mobile_bar" })}
        className="flex h-12 w-full items-center justify-center rounded-md bg-action type-label text-on-action transition-colors duration-(--motion-fast) hover:bg-action-hover"
      >
        {primary.label}
      </Link>
    </div>
  );
}
