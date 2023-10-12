import { Handlers } from "https://deno.land/x/fresh@1.1.1/server.ts";

export const pages = {
  "/": "Homepage",
  "/about": "About",
  "/life": "Life",
  "/blog": "Blog",
  "/events": "Events",
  "/projects": "Projects",
  "/mentoring": "Mentoring",
  "/press": "Press",
  "/videos": "Videos",
  "/travel": "Travel",
  "/location": "Location",
  "/contact": "Contact",
  "/versions/": "Versions",
  "/health/calories": "Calories",
  "/health/sleep": "Sleep",
  "/health/steps": "Steps",
  "/health/readiness": "Readiness",
  "/sitemap": "Sitemap",
};

interface SitemapData {
  timeline: {
    date: string;
    type: string;
    title: string;
    description?: string;
    data?: unknown;
    url?: string;
  }[];
  types: string[];
}

export const handler: Handlers<SitemapData> = {
  async GET(request, context) {
    const timeline = (await (
      await fetch("https://anandchowdhary.github.io/everything/api.json")
    ).json()) as {
      date: string;
      type: string;
      title: string;
      description?: string;
      data?: unknown;
      url?: string;
    }[];
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset
	xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
>
${Object.keys(pages)
  .map(
    (item) => `	<url>
		<loc>https://anandchowdhary.com${item}</loc>
	</url>`
  )
  .join("\n")}
${timeline
  .map(
    (item) => `	<url>
		<loc>${item.url}</loc>
	</url>`
  )
  .join("\n")}
</urlset>
`,
      {
        headers: { "Content-Type": "text/xml" },
      }
    );
  },
};
