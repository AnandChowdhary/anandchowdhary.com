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
};

generateSitemap();
