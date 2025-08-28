import { generateSitemap } from "@/app/llms.txt/generator";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return generateSitemap();
}
