/*
 * Статическое подтверждение для no-JS отправки FRM-1 (DEF-2 QA).
 * JS-путь показывает success внутри блока (DS 8); сюда попадает только
 * нативный POST → 303. Noindex — служебная страница.
 */

import type { Metadata } from "next";
import { Container, ButtonLink } from "@/components/ui";
import { forms, facts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Заявка принята — Рапсодия",
  robots: { index: false },
};

export default function SpasiboPage() {
  return (
    <main>
      <section className="section-loose">
        <Container className="flex flex-col gap-8">
          <h1 className="type-h2 !max-w-[40ch]" role="status">
            {forms.frm1.success(facts.sla)}
          </h1>
          <ButtonLink href="/" variant="secondary" className="self-start">
            Вернуться на главную
          </ButtonLink>
        </Container>
      </section>
    </main>
  );
}
