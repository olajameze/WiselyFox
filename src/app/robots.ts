import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/shared/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/parent", "/learn", "/admin", "/tutor", "/api/", "/child-sign-in"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
