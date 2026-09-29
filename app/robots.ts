import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/seo";
import { withBasePath } from "@/lib/paths";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteOrigin}${withBasePath("/sitemap.xml")}`,
  };
}
