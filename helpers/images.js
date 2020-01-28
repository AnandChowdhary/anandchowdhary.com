const { existsSync } = require("fs");
const { ensureDirSync } = require("fs-extra");
const download = require("download");
const { join } = require("path");
const slugify = require("slugify");

const getBingImageUrl = args => {
  const argArr = args.split("/");
  const query = argArr[0];
  const width = argArr.length >= 2 ? argArr[1] : 210;
  const height = argArr.length >= 3 ? argArr[2] : 210;
  const DIR = join(__dirname, "..", ".cache", "bing-images");
  ensureDirSync(DIR);
  const IMAGE = join(DIR, `${slugify(query)}.jpg`);
  const BING = `https://tse2.mm.bing.net/th?q=${encodeURIComponent(query)}&w=${width}&h=${height}&c=7&rs=1&p=0&dpr=3&pid=1.7&mkt=en-IN&adlt=moderate`;

  if (existsSync(IMAGE))
    return IMAGE;
  
  try {
    download(BING).pipe(fs.createWriteStream(DIR));
      return IMAGE;
  } catch (error) {}
  return BING;
}

module.exports = { getBingImageUrl };
