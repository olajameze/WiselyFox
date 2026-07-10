import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "WiselyFox, Adaptive Learning",
    short_name: "WiselyFox",
    description: "Child safe, parent guided adaptive learning for mobile, tablet, and desktop.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    display_override: ["standalone", "browser"],
    orientation: "any",
    background_color: "#fffbf5",
    theme_color: "#1746a0",
    categories: ["education", "kids"],
    lang: "en-GB",
    dir: "ltr",
    prefer_related_applications: false,
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "Learn home",
        short_name: "Learn",
        url: "/learn",
        description: "Open your learning dashboard",
      },
      {
        name: "Parent dashboard",
        short_name: "Parent",
        url: "/parent",
        description: "View progress and settings",
      },
      {
        name: "Admin console",
        short_name: "Admin",
        url: "/admin",
        description: "Manage users, tutors, and system health",
      },
      {
        name: "Focus timer",
        short_name: "Focus",
        url: "/learn/focus",
        description: "Start a focus session",
      },
    ],
  };
}
