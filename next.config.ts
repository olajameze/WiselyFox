import fs from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";

// Ensure .next directory and essential dev manifests exist on startup (avoids Windows/OneDrive ENOENT)
const dotNextDir = path.join(process.cwd(), ".next");
if (!fs.existsSync(dotNextDir)) {
  try {
    fs.mkdirSync(dotNextDir, { recursive: true });
  } catch {
    /* noop */
  }
}

const routesManifestPath = path.join(dotNextDir, "routes-manifest.json");
if (!fs.existsSync(routesManifestPath)) {
  try {
    const fallbackRoutesManifest = {
      version: 3,
      pages404: true,
      caseSensitive: false,
      basePath: "",
      redirects: [],
      headers: [],
      dynamicRoutes: [],
      staticRoutes: [],
      dataRoutes: [],
      rsc: {
        header: "RSC",
        varyHeader: "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Url",
        prefetchHeader: "Next-Router-Prefetch",
        didPostponeHeader: "x-nextjs-postponed",
        contentTypeHeader: "text/x-component",
        suffix: ".rsc",
        prefetchSuffix: ".prefetch.rsc",
      },
      rewrites: [],
    };
    fs.writeFileSync(routesManifestPath, JSON.stringify(fallbackRoutesManifest, null, 2));
  } catch {
    /* noop */
  }
}

const prerenderManifestPath = path.join(dotNextDir, "prerender-manifest.json");
if (!fs.existsSync(prerenderManifestPath)) {
  try {
    const fallbackPrerender = {
      version: 4,
      routes: {},
      dynamicRoutes: {},
      preview: {
        previewModeId: "preview-mode-id",
        previewModeSigningKey: "preview-mode-signing-key",
        previewModeEncryptionKey: "preview-mode-encryption-key",
      },
      notFoundRoutes: [],
    };
    fs.writeFileSync(prerenderManifestPath, JSON.stringify(fallbackPrerender, null, 2));
  } catch {
    /* noop */
  }
}

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
