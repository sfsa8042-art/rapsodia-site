/*
 * Статическая страница ошибки для no-JS отправки форм (DEF-2 QA):
 * лид не потерян молча — телефон как резервный канал [D9 Development].
 */

import type { Metadata } from "next";
import { Container, ButtonLink } from "@/components/ui";
import { forms, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Не получилось отправить заявку — Рапсодия",
  robots: { index: false },
};

export default function OshibkaZayavkiPage() {
  return (
    <main>
      <section className="section-loose">
        <Container className="flex flex-col gap-8">
          <h1 className="type-h2 !max-w-[40ch]">{forms.frm1.errNetwork}</h1>
          <a href={site.phoneHref} className="type-numeric-display text-action hover:underline">
            {site.phone}
          </a>
          <ButtonLink href="/#bron" variant="secondary" className="self-start">
            Попробовать ещё раз
          </ButtonLink>
        </Container>
      </section>
    </main>
  );
}
