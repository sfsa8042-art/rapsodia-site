/*
 * Статическое подтверждение для no-JS отправки FRM-2 (DEF-2 QA).
 */

import type { Metadata } from "next";
import { Container, ButtonLink } from "@/components/ui";
import { forms, facts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Заявка на банкет принята — Рапсодия",
  robots: { index: false },
};

export default function SpasiboBanketPage() {
  return (
    <main>
      <section className="section-loose">
        <Container className="flex flex-col gap-8">
          <h1 className="type-h2 !max-w-[40ch]" role="status">
            {forms.frm2.success(facts.sla)}
          </h1>
          <ButtonLink href="/banket" variant="secondary" className="self-start">
            Вернуться к банкетам
          </ButtonLink>
        </Container>
      </section>
    </main>
  );
}
