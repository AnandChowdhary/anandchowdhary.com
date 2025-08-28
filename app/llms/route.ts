import { generateSitemap } from "@/app/llms.txt/generator";

export async function GET() {
  const sitemap = await generateSitemap();
  return new Response(
    `<h1>Links for LLMs</h1><ul>${sitemap
      .map((item) => `<li><a href="${item.url}">${item.url}</a></li>`)
      .join("\n")}</ul>`,
    {
      headers: {
        "Content-Type": "text/html",
      },
    }
  );
}
