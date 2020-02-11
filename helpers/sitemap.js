const recursiveReaddir = require("recursive-readdir");
const { writeFile } = require("fs-extra");
const { join } = require("path");
const { object } = require("dot-object");

const getAllPages = async () => {
  return (await recursiveReaddir(join(__dirname, "..", "public")))
    .filter(i => i.endsWith(".html"))
    .map(i => (i.endsWith("index.html") ? i.replace("/index.html", "/") : i))
    .map(i => i.replace(join(__dirname, "..", "public"), ""))
    .filter(i => i !== "/admin/")
    .sort((a, b) => a.localeCompare(b));
};

const generateSitemap = async () => {
  let sitemap = {
    root: []
  };
  const files = await getAllPages();
  for await (const file of files) {
    const path = file.split("/").filter(i => i);
    if (parseInt(path[path.length - 1]) == path[path.length - 1]) continue;
    if (path.length > 1) {
      const name = path.pop();
      const slug = path.join(".");
      sitemap[slug] = sitemap[slug] || {};
      sitemap[slug][file] = true;
    } else {
      sitemap.root[file] = true;
    }
  }
  sitemap = object(sitemap);
  const HTML = addHtml(sitemap);
  await writeFile(join(__dirname, "..", "sitemap.html"), HTML);
};

let html = "";
const addHtml = object => {
  for (const key in object) {
    if (object[key] === true) {
      html += (key.match(/\//g) || []).map(i => " ").join("") + key + "\n";
    } else {
      addHtml(object[key]);
    }
  }
  return html;
};

generateSitemap();
