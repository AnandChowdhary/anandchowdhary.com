import { generateSitemap } from "@/app/llms.txt/generator";

export async function GET() {
  const sitemap = await generateSitemap();
  return new Response(
    `# Anand Chowdhary\n\n## Links\n\n${sitemap
      .map((item) => `- ${item.url}`)
      .join("\n")}`,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
}
