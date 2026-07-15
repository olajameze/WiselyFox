import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/shared/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();

  const paths = [
    "/",
    "/sign-up",
    "/sign-in",
    "/tutors",
    "/privacy",
    "/terms",
    "/support",
  ] as const;

  return paths.map((path) => ({
    url: `${base}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
