import type { Metadata, Viewport } from "next";
import { Cormorant, Inter, PT_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { seo, site } from "@/lib/content";

/*
 * Шрифтовой конвейер [DS 3]: subset кириллица+латиница, woff2,
 * font-display: swap, self-hosting через next/font.
 * Заголовки — Cormorant (изящная антиква, тёплый ресторанный характер;
 * запрос владельца на эстетику). Тело — Inter, цифры — PT Mono.
 */
const cormorant = Cormorant({
  subsets: ["cyrillic", "latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "600"],
  variable: "--font-inter",
  display: "swap",
});

const ptMono = PT_Mono({
  subsets: ["cyrillic", "latin"],
  weight: "400",
  variable: "--font-ptmono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: seo.pg1.title,
  description: seo.pg1.description,
  openGraph: {
    title: seo.pg1.title,
    description: seo.pg1.description,
    locale: "ru_RU",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2e6d6" },
    { media: "(prefers-color-scheme: dark)", color: "#272b36" },
  ],
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Рапсодия",
  servesCuisine: ["Европейская", "Средиземноморская", "Русская"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "к2309а, ТЦ «Столица», 2 этаж",
    addressLocality: "Зеленоград, Москва",
    addressCountry: "RU",
  },
  telephone: "+79269449999",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
      opens: "12:00",
      closes: "23:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday", "Saturday"],
      opens: "12:00",
      closes: "04:00",
    },
  ],
  priceRange: "₽₽",
  url: site.domain,
};

/*
 * Тема: light — основная [DS: CLR-A], dark — ручной вечерний режим.
 * Инлайн-скрипт до отрисовки исключает мигание темы; class "js" включает
 * pattern.appear только при работающем JS (no-JS деградация штатна).
 */
const THEME_SCRIPT = `
document.documentElement.classList.add('js');
try {
  var t = localStorage.getItem('rapsodia-theme');
  if (t === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
} catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: класс js и data-theme ставятся инлайн-
    // скриптом до гидрации — ожидаемое расхождение, не баг
    // Шрифтовые переменные — на <html>, не на <body>: роли --font-heading/
    // --font-body объявлены в :root и ссылаются на них; переменная body
    // на уровне html не видна → роль вычислялась в guaranteed-invalid
    // (заголовки падали на системный гротеск)
    <html
      lang="ru"
      suppressHydrationWarning
      className={`${cormorant.variable} ${inter.variable} ${ptMono.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
