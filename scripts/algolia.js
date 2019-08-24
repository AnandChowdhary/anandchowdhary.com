const dotenv = require("dotenv");
const path = require("path");
const algolia = require("algoliasearch");
const read = require("recursive-readdir");
const fs = require("fs");
const fm = require("front-matter");
const slugify = require("slugify");
const MarkdownIt = require("markdown-it");
const md = new MarkdownIt();

dotenv.config();

if (!process.env.ALGOLIA_KEY) return console.log("No Algolia API key found");

const client = algolia("DT9D119WOJ", process.env.ALGOLIA_KEY);
const index = client.initIndex("anand-chowdhary");

const objects = [];

const contentPath = path.join(__dirname, "..", "content");

read(contentPath, ((error, files) => {
  files = files.filter(f => f.endsWith(".md"));
  files.forEach(filePath => {
    const contents = fm(fs.readFileSync(filePath).toString());
    const slug = filePath.replace(path.join(__dirname, "..", "content"), "").replace(".md", "").replace(".html", "");
    if (!contents.attributes.draft) {
      const text = md.render(contents.body.replace(/(?<=\{\{).*(?=\}\})/g, ""));
      const body = trimmedString = text.length > 5000 ? text.substring(0, 5000) + "..." : text.substring(0, 5000);
      const data = {
        body,
        url: "https://anandchowdhary.com" + slug.replace("_index", "") + "/",
        objectID: slugify(slug)
      };
      [
        "title",
        "tags",
        "intro",
        "subcategory",
        "work",
        "timeline",
        "client",
        "date"
      ].forEach(i => {
        if (contents.attributes[i]) data[i] = contents.attributes[i];
      });
      if (data.date) data.date = Math.ceil(new Date(data.date).getTime() / 1000);
      objects.push(data);
    }
  });
  index.addObjects(objects, (err, content) => {
    console.log("Updated Algolia index!");
  });
}));
