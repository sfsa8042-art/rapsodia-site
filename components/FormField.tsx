/*
 * CMP-3 Form Field [DS 5]: label всегда видим (не placeholder-only),
 * ошибка — текст + иконка (не только цвет), aria-invalid/aria-describedby.
 */

import type { ComponentProps } from "react";

const inputClass =
  "w-full rounded-md border border-border-subtle bg-surface px-4 " +
  "h-(--control-h) text-ink transition-colors duration-(--motion-fast) " +
  "focus:border-transparent " +
  "aria-invalid:border-error";

export function Field({
  id,
  label,
  error,
  hint,
  textarea = false,
  ...props
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  textarea?: boolean;
} & ComponentProps<"input"> &
  ComponentProps<"textarea">) {
  const describedBy =
    [error ? `${id}-error` : null, hint ? `${id}-hint` : null]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="type-caption font-semibold text-ink">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`${inputClass} h-28 resize-none overflow-y-auto py-3`}
          {...(props as ComponentProps<"textarea">)}
        />
      ) : (
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={inputClass}
          {...(props as ComponentProps<"input">)}
        />
      )}
      {hint && !error && (
        <p id={`${id}-hint`} className="type-caption text-ink-soft">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={`${id}-error`}
          className="type-caption flex items-start gap-1.5 text-error"
        >
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            className="mt-0.5 size-3.5 shrink-0"
            fill="currentColor"
          >
            <path d="M8 1.5 15 14H1L8 1.5Zm-.75 4.5v4h1.5V6h-1.5Zm0 5v1.5h1.5V11h-1.5Z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
