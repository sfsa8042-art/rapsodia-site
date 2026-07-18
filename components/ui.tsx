import Link from "next/link";
import type { ReactNode, ComponentProps } from "react";

/* Контейнер сетки [DS 4]: max-w 1280, поля 16/32 */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1280px] px-4 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

/*
 * CMP-1 Button [DS 5]. Primary — ровно один на экран (CTA-закон);
 * Secondary — сопутствующее действие; Tertiary — текстовая ссылка.
 * Высота/min-width — токены контролов; текст не переносится и не
 * усекается (норма COPY 2–4 слова).
 */
type BtnVariant = "primary" | "secondary" | "tertiary";

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-md type-label " +
  "h-(--control-h) min-w-(--control-min-w) px-6 " +
  "transition-colors duration-(--motion-fast) " +
  "active:translate-y-px motion-reduce:transition-none motion-reduce:active:translate-y-0 " +
  "disabled:cursor-not-allowed disabled:opacity-40";

const btnStyles: Record<BtnVariant, string> = {
  primary: `${btnBase} bg-action text-on-action hover:bg-action-hover`,
  secondary: `${btnBase} border border-action text-action bg-transparent hover:border-action-hover hover:text-action-hover`,
  tertiary:
    "inline-flex items-center gap-1 type-label text-action underline-offset-4 hover:underline",
};

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...props
}: {
  variant?: BtnVariant;
  className?: string;
  children: ReactNode;
} & ComponentProps<typeof Link>) {
  return (
    <Link {...props} className={`${btnStyles[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  className = "",
  loading = false,
  children,
  ...props
}: {
  variant?: BtnVariant;
  className?: string;
  loading?: boolean;
  children: ReactNode;
} & ComponentProps<"button">) {
  return (
    <button
      {...props}
      aria-busy={loading || undefined}
      disabled={props.disabled || loading}
      className={`${btnStyles[variant]} ${className}`}
    >
      {loading && (
        <span
          aria-hidden
          className="size-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none"
        />
      )}
      {children}
    </button>
  );
}

/*
 * Редакционная шапка секции [Redesign v3, Design Plan §5]: hairline-линейка
 * + моно-индекс + заголовок-антиква. Ember — только декор; в блоках с
 * primary-кнопкой не используется (§11.4) — там обычный type-h2.
 */
export function SectionHeading({
  index,
  id,
  className = "",
  children,
}: {
  index: string;
  id: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <span aria-hidden className="flex items-center gap-3">
        <span className="h-px w-8 bg-ember/70" />
        <span className="type-eyebrow text-ember">{index}</span>
      </span>
      <h2 id={id} className="type-h2">
        {children}
      </h2>
    </div>
  );
}

/* CMP-7 Divider — решётчатый мотив, только между section.dense [DS 5] */
export function GrillDivider() {
  return (
    <Container>
      <hr aria-hidden className="grill-divider" />
    </Container>
  );
}
