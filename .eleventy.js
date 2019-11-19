module.exports = (eleventyConfig) => {
  eleventyConfig.addNunjucksFilter("place", value => {
    switch (value) {
      case "san-francisco-bay-area":
        return "🇺🇸 San Francisco Bay Area";
      case "new-delhi":
        return "🇮🇳 New Delhi";
      case "eindhoven":
        return "🇳🇱 Eindhoven";
      case "kanpur":
        return "🇮🇳 Kanpur";
      case "enschede":
        return "🇺🇸 Enschede";
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
