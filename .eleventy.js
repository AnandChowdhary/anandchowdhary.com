const axios = require("axios");
const { setupCache } = require("axios-cache-adapter");
const cache = setupCache({
  maxAge: 86400
});
const api = axios.create({
  adapter: cache.adapter
});

module.exports = eleventyConfig => {
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
        return (await api.get(`https://services.anandchowdhary.now.sh/api/wikipedia-summary?q=${encodeURIComponent(value)}`)).data
      } catch (error) {}
      return;
    }
  );
  eleventyConfig.addShortcode("excerpt", post => extractExcerpt(post));
  eleventyConfig.addNunjucksFilter("place", value => {
    switch (value) {
      case "san-francisco-bay-area":
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
