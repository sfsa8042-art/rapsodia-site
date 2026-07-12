import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

const routes = ["/", "/menu", "/afisha", "/banket", "/galereya", "/o-nas", "/kontakty"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${site.domain}${path}`,
    changeFrequency: path === "/afisha" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/banket" ? 0.8 : 0.5,
  }));
}
