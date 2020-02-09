// const recursiveReaddir = require("recursive-readdir");
// const { writeFile } = require("fs-extra");
// const { join } = require("path");

// const getAllPages = async () => {
//   return (await recursiveReaddir(join(__dirname, "..", "public")))
//     .filter(i => i.endsWith(".html"))
//     .map(i => (i.endsWith("index.html") ? i.replace("/index.html", "/") : i))
//     .map(i => i.replace(join(__dirname, "..", "public"), ""))
//     .filter(i => i !== "/admin/")
//     .map(i => `https://anandchowdhary.com${i}`);
// };

// const generateSitemap = async () => {
//   const files = await getAllPages();
//   const xml = `<?xml version="1.0" encoding="utf-8" standalone="yes" ?>
//   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
//   ${files
//     .map(
//       url => `
//   <url>
//     <loc>${url}</loc>
//   </url>
//   `
//     )
//     .join("")}
//  </urlset>`;
//   await writeFile(join(__dirname, "..", "public", "sitemap.xml"), xml);
// };

// generateSitemap();
