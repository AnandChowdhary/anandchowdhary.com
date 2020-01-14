const axios = require("axios");
const { setupCache } = require("axios-cache-adapter");
const { join } = require("path");
const { readJSON } = require("fs-extra");
const cache = setupCache({
  maxAge: 86400
});
const api = axios.create({
  adapter: cache.adapter
});

const trim = (s, mask) => {
  while (~mask.indexOf(s[0]))
    s = s.slice(1);
  while (~mask.indexOf(s[s.length - 1]))
    s = s.slice(0, -1);
  return s;
}

module.exports = eleventyConfig => {
  eleventyConfig.addNunjucksFilter("titleify", value =>
    (value || "")
      .replace(/-/g, " ")
      .replace(/\//g, " ")
      .toLowerCase()
      .split(" ")
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ")
      .replace(/ The/g, " the")
      .replace(/ Of/g, " of")
  );
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
  eleventyConfig.addNunjucksAsyncShortcode(
    "highlights",
    async () => {
      try {
        const file = await readJSON(join(__dirname, "content", "_data", "highlights.json"));
        let result = "";
        Object.keys(file).forEach(key => {
          console.log(key);
            const item = file[key];
          const slug = trim(item.meta.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""), "-");
          result += `<article>
          <a href="/travel/${slug}">
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
  eleventyConfig.addNunjucksFilter("place", value => {
    switch (value) {
      case "sf-bay-area":
        return "🇺🇸 San Francisco Bay Area";
      case "new-delhi":
        return "🇮🇳 New Delhi";
      case "eindhoven":
        return "🇳🇱 Eindhoven";
      case "bangalore":
        return "🇮🇳 Bangalore";
      case "kanpur":
        return "🇮🇳 Kanpur";
      case "enschede":
        return "🇳🇱 Enschede";
      case "kuala-lumpur":
        return "🇲🇾 Kuala Lumpur";
      case "gurugram":
        return "🇮🇳 Gurugram";
      case "heerlen":
        return "🇳🇱 Heerlen";
      case "london":
        return "🇬🇧 London";
      case "paris":
        return "🇫🇷 Paris";
      default:
        return value;
    }
  });
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
