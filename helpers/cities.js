const { readJsonSync, readFileSync } = require("fs-extra");
const { join } = require("path");
const { getBingImageUrl } = require("./images");

let cityData = readJsonSync(
  join(__dirname, "..", "content", "_data", "cities.json")
);

const getCityEmoji = (city) => {
  const thisCity = cityData.filter((i) => i.slug === city);
  if (thisCity.length) return thisCity[0].flag;
  return "";
};

const getCityName = (city) => {
  const thisCity = cityData.filter((i) => i.slug === city);
  if (thisCity.length) return thisCity[0].title;
  return "";
};

const getCityFirstVisited = (city) => {
  const thisCity = cityData.filter((i) => i.slug === city);
  if (thisCity.length) return thisCity[0].firstVisited;
  return "";
};

const getCityImageUrl = (city) => {
  let image = "default";
  try {
    const files = readFileSync(
      join(__dirname, "..", "life-data", "highlights", city, "cover.jpg")
    );
    image = `/images/highlights/${city}/cover.jpg`;
  } catch (error) {}
  if (image === "default") image = getBingImageUrl(`${city}/100/100`);
  return image;
};

const getCityCountry = (city) => {
  const thisCity = cityData.filter((i) => i.slug === city);
  if (thisCity.length)
    return `<div>${thisCity[0].flag} ${thisCity[0].country}</div>`;
  return "";
};

const getCityEmojiTitle = (city) => {
  const thisCity = cityData.filter((i) => i.slug === city);
  if (thisCity.length) return `${thisCity[0].flag} ${thisCity[0].title}`;
  return "";
};

module.exports = {
  getCityEmoji,
  getCityName,
  getCityCountry,
  getCityEmojiTitle,
  getCityFirstVisited,
  getCityImageUrl,
};
