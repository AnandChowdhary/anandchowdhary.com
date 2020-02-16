const { join } = require("path");
const { readJSON } = require("fs-extra");
const htmlmin = require("html-minifier");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const typeset = require("typeset");
const pluginPWA = require("eleventy-plugin-pwa");
const {
  trim,
  titleify,
  getDomainFromUrl,
  getMdDescription
} = require("./helpers/utils");
const { getCityEmojiTitle } = require("./helpers/cities");
const { getEventCard } = require("./helpers/cards");
const { getBingImageUrl, getDomainIcon } = require("./helpers/images");
const { markdownLibrary } = require("./helpers/markdown");
const {
  getTravelPageItem,
  getCityArchivePageData,
  getWorkArchive,
  getDescription,
  getProjectsSelector,
  getCollaboratorProfilePictureUrl,
  getProjectNavbar,
  getWikiSummary,
  getBlogFilterNav,
  getCityImageUrl,
  getCityCountry,
  getCityName
} = require("./helpers/templates");
const { getSeoTags } = require("./helpers/seo");

module.exports = eleventyConfig => {
  eleventyConfig.setLibrary("md", markdownLibrary);

  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginPWA);

  if (process.env.NODE_ENV === "production")
    eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
      if (outputPath.endsWith(".html")) {
        let minified = htmlmin.minify(content, {
          useShortDoctype: true,
          sortClassName: true,
          sortAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          removeComments: true,
          removeAttributeQuotes: true,
          quoteCharacter: '"',
          processScripts: ["text/javascript", "application/ld+json"],
          minifyCSS: true,
          minifyJS: true,
          conservativeCollapse: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true
        });
        return minified;
      }
      return content;
    });

  eleventyConfig.addTransform("typeset", (content, outputPath) => {
    if (outputPath.endsWith(".html")) {
      let typed = typeset(content);
      return typed;
    }
    return content;
  });

  eleventyConfig.addNunjucksFilter("removeNewLines", val =>
    val.replace(/\n/g, "")
  );
  eleventyConfig.addNunjucksFilter("domainIcon", getDomainIcon);
  eleventyConfig.addNunjucksFilter("bingImageUrl", getBingImageUrl);
  eleventyConfig.addNunjucksFilter("domainFromUrl", getDomainFromUrl);
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
      `<span class="url-icon" style="background-image: url('${getDomainIcon(
        getDomainFromUrl(value)
      )}')"></span>`
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
  eleventyConfig.addNunjucksFilter(
    "datetimemonth",
    value =>
      `<time datetime="${new Date(value).toISOString()}">${new Date(
        value
      ).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
      })}</time>`
  );
  eleventyConfig.addNunjucksFilter(
    "datetimetime",
    value =>
      `<time class="time-ago" datetime="${new Date(
        value
      ).toISOString()}">on ${new Date(value).toLocaleDateString("en-US", {
        timeZone: "UTC",
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })} UTC</time>`
  );
  eleventyConfig.addNunjucksAsyncShortcode("wiki", async value => {
    try {
      return await getWikiSummary(value);
    } catch (error) {}
    return "";
  });
  var allItems;
  eleventyConfig.addCollection("allMyContent", function(collection) {
    allItems = collection.getAll();
    return allItems;
  });

  eleventyConfig.addCollection("websiteVersions", function(collection) {
    return collection
      .getAll()
      .filter(i => i.filePathStem.startsWith("/about/versions"))
      .sort((a, b) => a.date - b.date);
  });

  eleventyConfig.addNunjucksAsyncShortcode("workTagsArchive", async value =>
    getWorkArchive(allItems, "work", value)
  );

  eleventyConfig.addNunjucksAsyncShortcode("cityImageUrl", async value =>
    getCityImageUrl(value)
  );
  eleventyConfig.addNunjucksAsyncShortcode("cityCountry", async value =>
    getCityCountry(value)
  );
  eleventyConfig.addNunjucksAsyncShortcode("cityName", async value =>
    getCityName(value)
  );
  eleventyConfig.addNunjucksAsyncShortcode("stackTagsArchive", async value =>
    getWorkArchive(allItems, "stack", value)
  );
  eleventyConfig.addNunjucksAsyncShortcode(
    "collaboratorsTagsArchive",
    async value => getWorkArchive(allItems, "collaborators", value)
  );
  eleventyConfig.addNunjucksAsyncShortcode("toolsTagsArchive", async value =>
    getWorkArchive(allItems, "tools", value)
  );
  eleventyConfig.addNunjucksShortcode("getBlogFilterNav", value =>
    getBlogFilterNav(value)
  );
  eleventyConfig.addNunjucksShortcode("getSeoTags", value => getSeoTags(value));

  eleventyConfig.addNunjucksAsyncShortcode(
    "eventRolesTagsArchive",
    async value => {
      const items = allItems
        .filter(item => (item.data.roles || []).includes(value))
        .sort((a, b) => a.date.getTime() - b.date.getTime());
      let result = `
          <header class="intro s">
            <div>
              <h1>Events ${value}</h1>
            </div>
          </header>
          <div class="container-outer">
            <section class="link-list events-list">
              ${items.map(post => getEventCard(post)).join("")}
            </section>
          </div>
        `;
      return result;
    }
  );

  eleventyConfig.addNunjucksAsyncShortcode("citiesArchive", async value => {
    let result = `${await getCityArchivePageData(allItems, value)}`;
    return result;
  });

  eleventyConfig.addNunjucksAsyncShortcode(
    "collaboratorProfilePicture",
    async value => {
      try {
        return await getCollaboratorProfilePictureUrl(value);
      } catch (error) {
        return "";
      }
    }
  );

  eleventyConfig.addNunjucksShortcode("getProjectsSelector", value => {
    try {
      return getProjectsSelector(value);
    } catch (error) {
      return "";
    }
  });

  eleventyConfig.addNunjucksShortcode("getProjectNavbar", value => {
    try {
      return getProjectNavbar(value);
    } catch (error) {
      return "";
    }
  });

  eleventyConfig.addNunjucksAsyncShortcode("collaboratorName", async value => {
    try {
      let result = "";
      if (await getDescription("projects/collaborators", value, "flag", true))
        result += `<span class="flag">${await getDescription(
          "projects/collaborators",
          value,
          "flag",
          true
        )}</span>`;
      if (await getDescription("projects/collaborators", value, "title", true))
        result += ` <span>${await getDescription(
          "projects/collaborators",
          value,
          "title",
          true
        )}</span>`;
      if (result.trim()) return result;
      return titleify(value);
    } catch (error) {
      return titleify(value);
    }
  });

  eleventyConfig.addNunjucksAsyncShortcode("travelPageItem", async value => {
    return await getTravelPageItem(value);
  });

  eleventyConfig.addNunjucksAsyncShortcode("blogTagArchive", async value => {
    const items = allItems
      .filter(item => (item.data.tags || []).includes(value))
      .sort((a, b) => a.date.getTime() - b.date.getTime());
    try {
      let result = `<header class="intro"><div class="blog-title">
        <div class="l"></div>
        <div class="r">
          <h1>Blog</h1>
          ${(await getDescription("blog", value, "content")) || ""}
          ${getBlogFilterNav(value)}
        </div>
      </div></header><div class="container m"><section class="blog-posts">`;
      items.forEach(item => {
        result += `<article>
            <div class="l">
              ${
                item.data.alias
                  ? `<h2><a href="${item.data.alias}">${item.data.title}</a></h2>`
                  : `<h2><a href="${item.url}">${item.data.title}</a></h2>`
              }
              <div>Posted on <time>${item.data.date.toLocaleDateString(
                "en-US",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric"
                }
              )}</time></div>
              ${item.data.tags
                .filter(i => i !== "blog")
                .map(
                  tag => `
                <a class="tag" href="/blog/${tag}/">${tag}</a>
              `
                )
                .join("")}
            </div>
            <div class="r">
              ${extractExcerpt(item)}
              ${
                item.data.alias
                  ? `<p><a href="${item.data.alias}">Read ${item.data.title} on ${item.data.publisher}</a></p>`
                  : `<p><a href="${item.url}">Read ${item.data.title} &rarr;</a></p>`
              }
            </div>
          </article>`;
      });
      return `${result}</section></div>`;
    } catch (error) {}
    return "";
  });
  eleventyConfig.addNunjucksAsyncShortcode("highlights", async () => {
    try {
      const file = await readJSON(
        join(__dirname, "life-data", "instagram-highlights.json")
      );
      let result = "";
      Object.keys(file).forEach(key => {
        const item = file[key];
        const slug = trim(
          item.meta.title
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, ""),
          "-"
        );
        result += `<article>
          <a href="/life/travel/${slug}/">
            <picture>
              <img src="/images/highlights/${slug}/cover.jpg" alt="" width="80" height="80" loading="lazy">
            </picture>
            <div>
              <div>${item.meta.title}</div>
              <div><time datetime="${item.data[0].date}">${new Date(
          item.data[0].date
        ).toLocaleDateString("en-US", {
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
  });
  eleventyConfig.addShortcode("excerpt", post => extractExcerpt(post));
  eleventyConfig.addNunjucksFilter("place", value => getCityEmojiTitle(value));
  eleventyConfig.addNunjucksFilter(
    "getBlogTagName",
    value => getMdDescription(`blog/${value}`).title || titleify(value)
  );
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
