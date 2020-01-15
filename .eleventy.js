const { join } = require("path");
const { readJSON } = require("fs-extra");
const { trim, titleify } = require("./helpers/utils");
const { getCityEmojiTitle } = require("./helpers/cities");
const { api } = require("./helpers/api");
const { getEventCard } = require("./helpers/cards");
const { getTravelPageItem, getCityArchivePageData, getWorkArchive } = require("./helpers/templates");

module.exports = (eleventyConfig) => {
  eleventyConfig.addNunjucksFilter("titleify", titleify);
  eleventyConfig.addNunjucksFilter("classify", value =>
    (value || "")
      .replace("./content/", "")
      .replace(/\//g, " ")
      .replace(".md", "")
  );
  eleventyConfig.addNunjucksFilter(
    "iconify",
    value =>
      `<span class="url-icon" style="background-image: url('https://logo.clearbit.com/${
        value
          .replace(/https?:\/\//, "")
          .replace("www.", "")
          .split("/")[0]
      }')"></span>`
  );
  eleventyConfig.addNunjucksFilter(
    "datetime",
    value =>
      `<time datetime="${new Date(value).toISOString()}">${new Date(
        value
      ).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric"
      })}</time>`
  );
  eleventyConfig.addNunjucksAsyncShortcode(
    "wiki",
    async value => {
      try {
        return `<p>${(await api.get(`https://services.anandchowdhary.now.sh/api/wikipedia-summary?q=${encodeURIComponent(value)}`)).data} <a href="#">Wikipedia</a></p>`;
      } catch (error) {}
      return "";
    }
  );
  var allItems;
  eleventyConfig.addCollection("allMyContent", function(collection) {
    allItems = collection.getAll();
    return allItems;
  });

  eleventyConfig.addNunjucksAsyncShortcode(
    "workTagsArchive",
    async value => getWorkArchive(allItems, "work", value));
  eleventyConfig.addNunjucksAsyncShortcode(
    "stackTagsArchive",
    async value => getWorkArchive(allItems, "stack", value));
  eleventyConfig.addNunjucksAsyncShortcode(
    "collaboratorsTagsArchive",
    async value => getWorkArchive(allItems, "collaborators", value));
  eleventyConfig.addNunjucksAsyncShortcode(
    "toolsTagsArchive",
    async value => getWorkArchive(allItems, "tools", value));

    eleventyConfig.addNunjucksAsyncShortcode(
      "eventRolesTagsArchive",
      async value => {
        const items = allItems.filter(item => (item.data.roles || []).includes(value)).sort((a, b) => a.date.getTime() - b.date.getTime());
        let result = `
          <h1>Events ${value}</h1>
          <section class="posts">
            ${items.map(post => getEventCard(post)).join("")}
          </section>
        `;
        return result;
      });
  
      eleventyConfig.addNunjucksAsyncShortcode(
        "citiesArchive",
        async value => {
          let result = `
          <nav class="breadcrumbs">
            <a href="/places/">Travel</a>
            <a href="/places/${value}/">${value}</a>
          </nav>
          ${await getCityArchivePageData(allItems, value)}`;
          return result;
        });

  eleventyConfig.addNunjucksAsyncShortcode(
    "travelPageItem",
    async value => {
      return await getTravelPageItem(allItems, value);
    });

  eleventyConfig.addNunjucksAsyncShortcode(
    "blogTagArchive",
    async value => {
      const items = allItems.filter(item => (item.data.tags || []).includes(value)).sort((a, b) => a.date.getTime() - b.date.getTime());
      try {
        let result = `<div class="blog-title">
        <div class="l"></div>
        <div class="r">
          <h1>Blog</h1>
          <nav class="filter-nav">
            <a href="/blog/">All</a>
            <a${value === "coffee-time" ? ` class="active"` : ""} href="/blog/coffee-time/">Coffee Time</a>
            <a${value.includes("state-of-the") ? ` class="active"` : ""} href="/blog/state-of-the/">State of the X</a>
            <a${value === "code" ? ` class="active"` : ""} href="/blog/code/">Code</a>
            <a${value === "design" ? ` class="active"` : ""} href="/blog/design/">Design</a>
          </nav>
        </div>
      </div><section class="blog-posts">`;
        items.forEach(item => {
          result += `<article>
            <div class="l">
              ${item.data.alias ?
                `<h2><a href="${item.data.alias}">${item.data.title}</a></h2>` :
                `<h2><a href="${item.url}">${item.data.title}</a></h2>`
              }
              <div>Posted on <time>${item.data.date.toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year : "numeric"
              })}</time></div>
              ${item.data.tags.filter(i => i !== "blog").map(tag => `
                <a class="tag" href="/blog/${tag}">${tag}</a>
              `).join("")}
            </div>
            <div class="r">
              ${extractExcerpt(item)}
              ${item.data.alias ?
                `<p><a href="${item.data.alias}">Continue reading on ${item.data.publisher}</a></p>` :
                `<p><a href="${item.url}">Continue reading &rarr;</a></p>`
              }
            </div>
          </article>`;
        });
        return `${result}</section>`;
      } catch (error) {}
      return "";
    }
  );
  eleventyConfig.addNunjucksAsyncShortcode(
    "highlights",
    async () => {
      try {
        const file = await readJSON(join(__dirname, "life-data", "instagram-highlights.json"));
        let result = "";
        Object.keys(file).forEach(key => {
            const item = file[key];
          const slug = trim(item.meta.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""), "-");
          result += `<article>
          <a href="/places/${slug}">
            <picture>
              <img src="/images/highlights/${slug}/cover.jpg" alt="" loading="lazy">
            </picture>
            <div>
              <div>${item.meta.title}</div>
              <div><time datetime="${item.data[0].date}">${new Date(item.data[0].date).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric"
              })}</time></div>
            </div>
          </a>
        </article>`;
        });
        return result;
      } catch (error) {}
      return "";
    }
  );
  eleventyConfig.addShortcode("excerpt", post => extractExcerpt(post));
  eleventyConfig.addNunjucksFilter("place", value => getCityEmojiTitle(value));
  return {
    dir: {
      input: "content",
      output: "public",
      includes: "../includes"
    }
  };
};

/**
 * Extracts the excerpt from a document.
 *
 * @param {*} doc A real big object full of all sorts of information about a document.
 * @returns {String} the excerpt.
 * @source https://github.com/11ty/eleventy/issues/410#issuecomment-462821193
 */
function extractExcerpt(doc) {
  if (!doc.hasOwnProperty("templateContent")) {
    console.warn(
      "❌ Failed to extract excerpt: Document has no property `templateContent`."
    );
    return;
  }
  const excerptSeparator = "<!--more-->";
  const content = doc.templateContent;
  if (content.includes(excerptSeparator)) {
    return content.substring(0, content.indexOf(excerptSeparator)).trim();
  }
  const pCloseTag = "</p>";
  if (content.includes(pCloseTag)) {
    return content.substring(0, content.indexOf(pCloseTag) + pCloseTag.length);
  }
  return content;
}
