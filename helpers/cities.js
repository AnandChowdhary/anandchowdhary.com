const { readJsonSync } = require("fs-extra");
const { join } = require("path");
const { titleify } = require("./utils");

let cityData = {};

try {
  cityData = readJsonSync(join(__dirname, "..", ".cache", "city-data.json"));
} catch (error) {};

const getCityEmoji = city => {
  if (cityData[city])
    return cityData[city].emoji;
  return "";
}

const getCityCountry = city => {
  if (cityData[city])
    return `<div>${cityData[city].emoji} ${cityData[city].country}</div>`;
  return "";
}

const getCityEmojiTitle = city => {
  let result = "";
  if (getCityEmoji(city))
    result += `${getCityEmoji(city)} `;
  result += titleify(city);
  return result;
}

module.exports = { getCityEmoji, getCityCountry, getCityEmojiTitle };
