const { readFile, writeJson } = require("fs-extra");
const { join } = require("path");
const { safeLoad } = require("js-yaml");

const LIFE_DATA_DIR = join(__dirname, "..", "life-data");
const CONTENT_DATA_DIR = join(__dirname, "..", "content", "_data");

const spotify = async () => {
  const spotifyPath = join(LIFE_DATA_DIR, "top-artists.yml");
  const json = safeLoad(await readFile(spotifyPath, "utf8"));
  const longTermArtists = json.longTermArtists;
  const mediumTermArtists = json.mediumTermArtists;
  const shortTermArtists = json.shortTermArtists;
  await writeJson(join(CONTENT_DATA_DIR, "longTermArtists.json"), longTermArtists);
  await writeJson(join(CONTENT_DATA_DIR, "mediumTermArtists.json"), mediumTermArtists);
  await writeJson(join(CONTENT_DATA_DIR, "shortTermArtists.json"), shortTermArtists);
}

const pocketCasts = async () => {
  const pocketCastsPodcasts = safeLoad(await readFile(join(LIFE_DATA_DIR, "podcasts.yml"), "utf8"));
  await writeJson(join(CONTENT_DATA_DIR, "pocketCastsPodcasts.json"), pocketCastsPodcasts);
  const pocketCastsHistory = safeLoad(await readFile(join(LIFE_DATA_DIR, "podcast-history.yml"), "utf8"));
  await writeJson(join(CONTENT_DATA_DIR, "pocketCastsHistory.json"), pocketCastsHistory);
}

const lifeDataUtilities = async () => {
  await spotify();
  await pocketCasts();
}

lifeDataUtilities();
