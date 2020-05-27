const { existsSync } = require("fs");
const { ensureDirSync } = require("fs-extra");
const download = require("download");
const { join } = require("path");
const slugify = require("slugify");

const getBingImageUrl = (args) => {
  const argArr = args.split("/");
  const query = argArr[0];
  const width = argArr.length >= 2 ? argArr[1] : 210;
  const height = argArr.length >= 3 ? argArr[2] : 210;

  const DIR = join(__dirname, "..", "cache", "images", "thumbnails");
  ensureDirSync(DIR);
  const SLUG = `${slugify(query, {
    lower: true,
    remove: /[*+~.()?#'"!:@]/g,
  })}-${width}x${height}.jpg`;
  const IMAGE = join(DIR, SLUG);
  const BING = `https://tse2.mm.bing.net/th?q=${encodeURIComponent(
    query.replace(/\'/g, "").replace(/\"/g, "")
  )}&w=${width}&h=${height}&c=7&rs=1&p=0&dpr=3&pid=1.7&mkt=en-IN&adlt=moderate`;
  const URL = `/images/cache/thumbnails/${SLUG}`;

  if (existsSync(IMAGE)) return URL;
  return BING;
};

const getDomainIcon = (domain) => {
  const DIR = join(__dirname, "..", "cache", "images", "domains");
  ensureDirSync(DIR);
  const SLUG = `${slugify(domain, {
    lower: true,
  })}.png`;
  const IMAGE = join(DIR, SLUG);
  const CLEARBIT = `https://logo.clearbit.com/${domain}`;
  const URL = `/images/cache/domains/${SLUG}`;

  if (existsSync(IMAGE)) return URL;

  try {
    download(CLEARBIT, DIR, { filename: SLUG })
      .then(() => {})
      .catch(() => console.log("Unable to download image", domain));
    return URL;
  } catch (error) {}
  return CLEARBIT;
};

module.exports = { getBingImageUrl, getDomainIcon };
