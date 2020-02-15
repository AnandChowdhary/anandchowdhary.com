const recursiveReaddir = require("recursive-readdir");
const { writeFile, readFile } = require("fs-extra");
const { markdownLibrary } = require("./markdown");
const { join } = require("path");
const { getDataFromUrl } = require("./seo");

const getAllPages = async () => {
  return (await recursiveReaddir(join(__dirname, "..", "public")))
    .filter(i => i.endsWith(".html"))
    .map(i => (i.endsWith("index.html") ? i.replace("/index.html", "/") : i))
    .map(i => i.replace(join(__dirname, "..", "public"), ""))
    .filter(i => i !== "/admin/")
    .sort((a, b) => a.localeCompare(b));
};

const generateSitemap = async () => {
  const files = await getAllPages();
  const newHtml = files
    .map(
      i =>
        `- [${getDataFromUrl(i)
          .breadcrumbTitle.split(" ‹ ")
          .reverse()
          .join(" › ")
          .replace("Anand Chowdhary › ", "")}](${i})`
    )
    .join("\n");
  const currentContents = (
    await readFile(join(__dirname, "..", "public", "sitemap/index.html"))
  ).toString();
  const HTML = currentContents.replace(
    "<p>REPLACE_SITEMAP</p>",
    markdownLibrary.render(newHtml)
  );
  await writeFile(join(__dirname, "..", "public", "sitemap/index.html"), HTML);
  const XML = `
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${files
    .map(
      i => `
    <url>
      <loc>https://anandchowdhary.com${i}</loc>
    </url>
  `
    )
    .join("")}
  </urlset>
  `;
  await writeFile(join(__dirname, "..", "public", "sitemap.xml"), XML);
};

generateSitemap();
