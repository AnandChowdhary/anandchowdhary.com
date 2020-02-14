const { readFileSync } = require("fs-extra");
const { join } = require("path");
const { markdownLibrary } = require("./markdown");
const frontMatter = require("front-matter");
const { titleify } = require("./utils");

const cleanUrl = url => {
  url = url.endsWith("/") ? url.slice(0, -1) : url;
  url = url.startsWith("/") ? url.substr(1) : url;
  return url;
};

const getDataFromUrl = (url, titleOnly = false) => {
  url = cleanUrl(url);
  let contents;
  try {
    contents = readFileSync(join(__dirname, "..", "content", `${url}.md`));
    if (contents) return processMarkdown(contents, url, titleOnly);
  } catch (error) {}
  try {
    contents = readFileSync(
      join(__dirname, "..", "content", `${url}/index.md`)
    );
    if (contents) return processMarkdown(contents, url, titleOnly);
  } catch (error) {}
  try {
    contents = readFileSync(join(__dirname, "descriptions", `${url}.md`));
    if (contents) return processMarkdown(contents, url, titleOnly);
  } catch (error) {}
  return respond({}, url, titleOnly);
};

const truncate = input =>
  input.length > 200 ? `${input.substring(0, 200)}...` : input;

const last = arr => arr[arr.length - 1];
const breadcrumize = url => {
  const parts = url.split("/");
  for (let i = 0; i < parts.length; i++) {
    const items = parts.slice(0, i);
    parts[i] = items.join("/") + "/" + parts[i];
  }
  return parts;
};

const titles = {};
const breadcrumbTitles = {};
const descriptions = {};

const respond = (data, url, titleOnly) => {
  const TITLE = "Anand Chowdhary";
  const DESCRIPTION =
    "Anand Chowdhary is a creative technologist and entrepreneur from New Delhi, India, currently living in Enschede, the Netherlands. He is the co-founder and CEO of Oswald Labs.";
  const title =
    titles[url] || data.title || titleify(last(url.split("/")) || TITLE);
  titles[url] = title;
  if (titleOnly) return title;
  let breadcrumbTitle =
    breadcrumbTitles[url] ||
    data.breadcrumbTitle ||
    [TITLE, ...breadcrumize(url).map(i => getDataFromUrl(i, true))]
      .reverse()
      .join(" · ");
  let description =
    descriptions[url] ||
    truncate(data.description || data.excerpt || data.content || DESCRIPTION);
  if (url === "") {
    breadcrumbTitle = TITLE;
    description = DESCRIPTION;
  }
  if (data.intro) description = data.intro;
  return {
    title,
    breadcrumbTitle,
    description
  };
};

const processMarkdown = (data, url, titleOnly) => {
  const fileContents = data.toString();
  const fileInfo = frontMatter(fileContents);
  const content = markdownLibrary
    .render(fileInfo.body)
    .replace(/<[^>]*>?/gm, " ")
    .replace(/\n/g, "")
    .replace(/ +(?= )/g, "")
    .trim();
  return respond(
    {
      content,
      ...fileInfo.attributes
    },
    url,
    titleOnly
  );
};

const getSeoTitle = url => {
  const data = getDataFromUrl(url);
  return data.title;
};

const getSeoDescription = url => {
  const data = getDataFromUrl(url);
  return data.description;
};

const getSeoDetails = url => {
  const data = getDataFromUrl(url);
  console.log("data", data);
};

module.exports = { getSeoTitle, getSeoDescription };
