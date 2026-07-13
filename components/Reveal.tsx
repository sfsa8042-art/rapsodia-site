"use client";

/*
 * pattern.appear [DS 9]: opacity+translateY 16px, по входу в viewport.
 * reduced-motion и no-JS обрабатываются в globals.css — компонент
 * не принимает решений о движении сам.
 */

import { useEffect, useRef, type ReactNode } from "react";

export default function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => el.classList.add("is-visible");

    // Фолбэк: без IntersectionObserver показываем сразу (не прячем контент)
    if (typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          observer.disconnect();
        }
      },
      // threshold 0 + нижний rootMargin: срабатывает, как только элемент
      // чуть вошёл снизу — надёжнее 0.12 на высоких блоках и при прыжках
      // по якорям/back-forward (12% высокого блока могли не набраться).
      { threshold: 0, rootMargin: "0px 0px -64px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
