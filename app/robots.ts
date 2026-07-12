/*
 * SEO-гигиена [D8]. Staging закрывается переменной окружения
 * NEXT_PUBLIC_NOINDEX=1 (J8: staging-в-индексе).
 */

import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_PUBLIC_NOINDEX === "1") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${site.domain}/sitemap.xml`,
  };
}
