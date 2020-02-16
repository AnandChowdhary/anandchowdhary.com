const { readJsonSync } = require("fs-extra");
const { join } = require("path");

let cityData = [];

try {
  cityData = readJsonSync(join(__dirname, "..", "cache", "cities.json"));
} catch (error) {}

const getCityEmoji = city => {
  const thisCity = cityData.filter(i => i.slug === city);
  if (thisCity.length) return thisCity.emoji;
  return "";
};

const getCityName = city => {
  const thisCity = cityData.filter(i => i.slug === city);
  if (thisCity.length) return thisCity.title;
  return "";
};

const getCityCountry = city => {
  const thisCity = cityData.filter(i => i.slug === city);
  if (thisCity.length)
    return `<div>${thisCity.emoji} ${thisCity.country}</div>`;
  return "";
};

const getCityEmojiTitle = city => {
  const thisCity = cityData.filter(i => i.slug === city);
  if (thisCity.length) return `${thisCity.emoji} ${thisCity.country}`;
  return "";
};

module.exports = {
  getCityEmoji,
  getCityName,
  getCityCountry,
  getCityEmojiTitle
};
