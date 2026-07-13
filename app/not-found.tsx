/*
 * 404 [DS 8, COPY 7]: display уменьшенного порядка, текст дословно,
 * Primary + ссылки Меню/Афиша/Контакты — не тупик.
 */

import Link from "next/link";
import { Container, ButtonLink } from "@/components/ui";
import { misc } from "@/lib/content";

export default function NotFound() {
  return (
    <main>
      <section className="section-loose">
        <Container className="flex flex-col gap-8">
          <h1 className="type-h2 !max-w-[30ch]">{misc.notFound.title}</h1>
          <ButtonLink href="/#bron" className="self-start">
            {misc.notFound.cta}
          </ButtonLink>
          <nav aria-label="Полезные ссылки">
            <ul className="flex flex-wrap gap-6">
              {[
                { label: "Меню", href: "/menu" },
                { label: "Афиша", href: "/afisha" },
                { label: "Контакты", href: "/kontakty" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="type-label text-action underline-offset-4 hover:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>
    </main>
  );
}
