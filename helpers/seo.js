const { readFileSync } = require("fs-extra");
const { join } = require("path");
const { markdownLibrary } = require("./markdown");
const frontMatter = require("front-matter");
const { titleify } = require("./utils");
const natural = require("natural");
const tokenizer = new natural.WordTokenizer();

const cleanUrl = (url) => {
  url = url.endsWith("/") ? url.slice(0, -1) : url;
  url = url.startsWith("/") ? url.substr(1) : url;
  return url;
};

const orderStringByFrequency = (string) => {
  let frequentObj = {};
  string
    .split(" ")
    .forEach((word) =>
      frequentObj[word] ? frequentObj[word]++ : (frequentObj[word] = 1)
    );
  return Object.entries(frequentObj)
    .sort((a, b) => b[1] - a[1])
    .map((arr) => arr[0])
    .join(" ");
};

const getKeywords = (text) => {
  return orderStringByFrequency(tokenizer.tokenize(text).join(" "))
    .split(" ")
    .filter((i) => i.length >= 5)
    .slice(0, 25)
    .join(", ");
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

const truncate = (input) =>
  input.length > 250 ? `${input.substring(0, 250).trim()}...` : input;

const last = (arr) => arr[arr.length - 1];
const breadcrumize = (url) => {
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
    "Anand Chowdhary is a creative technologist and entrepreneur, and the co-founder and CEO of Oswald Labs, an award-winning accessibility technology company.";
  const title =
    titles[url] || data.title || titleify(last(url.split("/")) || TITLE);
  titles[url] = title;
  if (titleOnly) return title;
  let breadcrumbTitle =
    breadcrumbTitles[url] ||
    data.breadcrumbTitle ||
    [TITLE, ...breadcrumize(url).map((i) => getDataFromUrl(i, true))]
      .reverse()
      .join(" ‹ ");
  let description =
    descriptions[url] ||
    truncate(data.description || data.excerpt || data.content || DESCRIPTION);
  if (url === "") {
    breadcrumbTitle = TITLE;
    description = DESCRIPTION;
  }
  if (data.intro) description = data.intro;
  const keywords = getKeywords(
    data.description || data.excerpt || data.content || DESCRIPTION
  );
  const imageUrl =
    data.image ||
    "https://anandchowdhary.com/images/photos/anand-chowdhary.jpg";
  return {
    title,
    breadcrumbTitle,
    description,
    keywords,
    imageUrl,
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
  let image = "";
  try {
    image =
      "https://anandchowdhary.com" +
      /<img.*?src="(.*?)"/.exec(markdownLibrary.render(fileInfo.body))[1];
  } catch (error) {}
  return respond(
    {
      content,
      image,
      ...fileInfo.attributes,
    },
    url,
    titleOnly
  );
};

const getSeoDetails = (url) => {
  const data = getDataFromUrl(url);
  return data;
};

const getSeoTags = (url) => {
  const data = getSeoDetails(url);
  const imageUrl = data.imageUrl;
  const breadcrumbTitle = data.breadcrumbTitle;
  const keywords =
    "anand chowdhary, anand, chowdhary, oswald labs, " + data.keywords;
  const description = data.description;
  return `
    <title>${breadcrumbTitle}</title>
    <meta name="description" content="${description}">
    <meta name="keywords" content="${keywords}">
    <meta name="author" content="Anand Chowdhary">
    <link rel="canonical" href="https://anandchowdhary.com${url}">
    <meta property="og:title" content="${breadcrumbTitle}">
    <meta property="og:type" content="article">
    <meta property="og:image" content="${imageUrl}">
    <meta property="og:url" content="https://anandchowdhary.com${url}">
    <meta property="og:description" content="${description}">
    <meta property="og:locale" content="en_US">
    <meta property="og:site_name" content="Anand Chowdhary">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image" content="${imageUrl}">
    <meta name="twitter:creator" content="@AnandChowdhary">
    <meta name="twitter:site" content="@AnandChowdhary">
    <meta name="twitter:url" content="https://anandchowdhary.com${url}">
    <meta name="twitter:title" content="${breadcrumbTitle}">
    <meta name="twitter:description" content="${description}">
  `;
};

module.exports = { getSeoTags, getDataFromUrl };
