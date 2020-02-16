const { readJsonSync } = require("fs-extra");
const { join } = require("path");

let cityData = readJsonSync(
  join(__dirname, "..", "content", "_data", "cities.json")
);

const getCityEmoji = city => {
  const thisCity = cityData.filter(i => i.slug === city);
  if (thisCity.length) return thisCity[0].flag;
  return "";
};

const getCityName = city => {
  const thisCity = cityData.filter(i => i.slug === city);
  if (thisCity.length) return thisCity[0].title;
  return "";
};

const getCityCountry = city => {
  const thisCity = cityData.filter(i => i.slug === city);
  if (thisCity.length)
    return `<div>${thisCity[0].flag} ${thisCity[0].country}</div>`;
  return "";
};

const getCityEmojiTitle = city => {
  const thisCity = cityData.filter(i => i.slug === city);
  if (thisCity.length) return `${thisCity[0].flag} ${thisCity[0].title}`;
  return "";
};

module.exports = {
  getCityEmoji,
  getCityName,
  getCityCountry,
  getCityEmojiTitle
};
