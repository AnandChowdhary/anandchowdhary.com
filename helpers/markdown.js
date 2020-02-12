const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const hljs = require("highlight.js");

const markdownLibrary = markdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (error) {}
    }
    return "";
  }
}).use(markdownItAnchor, {
  permalink: true,
  permalinkClass: "direct-link",
  permalinkSymbol: "#"
});

module.exports = { markdownLibrary };
