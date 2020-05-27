const { readFileSync } = require("fs-extra");
const { join } = require("path");
const { markdownLibrary } = require("./markdown");
const frontMatter = require("front-matter");

const trim = (s, mask) => {
  while (~mask.indexOf(s[0])) s = s.slice(1);
  while (~mask.indexOf(s[s.length - 1])) s = s.slice(0, -1);
  return s;
};

const titleify = (value) =>
  (value || "")
    .replace(/-/g, " ")
    .replace(/\//g, " ")
    .toLowerCase()
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ")
    .replace(/ The/g, " the")
    .replace(/ Of/g, " of");

const getDomainFromUrl = (value) =>
  value
    .replace(/https?:\/\//, "")
    .replace("www.", "")
    .split("/")[0];

const getMdDescription = (query) => {
  try {
    const fileContents = readFileSync(
      join(__dirname, "descriptions", `${query}.md`)
    ).toString("utf8");
    const fileInfo = frontMatter(fileContents);
    const content = markdownLibrary.render(fileInfo.body);
    return {
      content,
      ...fileInfo.attributes,
    };
  } catch (error) {
    return {};
  }
};

module.exports = { trim, titleify, getDomainFromUrl, getMdDescription };
