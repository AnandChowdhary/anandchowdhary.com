const { readFile, writeJson, exists } = require("fs-extra");
const { join } = require("path");
const { safeLoad } = require("js-yaml");
const axios = require("axios");

const LIFE_DATA_DIR = join(__dirname, "..", "life-data");
const CONTENT_DATA_DIR = join(__dirname, "..", "content", "_data");

const spotifyArtists = async () => {
  const spotifyPath = join(LIFE_DATA_DIR, "top-artists.yml");
  const json = safeLoad(await readFile(spotifyPath, "utf8"));
  const longTermArtists = json.longTermArtists;
  const mediumTermArtists = json.mediumTermArtists;
  const shortTermArtists = json.shortTermArtists;
  await writeJson(join(CONTENT_DATA_DIR, "longTermArtists.json"), longTermArtists);
  await writeJson(join(CONTENT_DATA_DIR, "mediumTermArtists.json"), mediumTermArtists);
  await writeJson(join(CONTENT_DATA_DIR, "shortTermArtists.json"), shortTermArtists);
}

const spotifyTracks = async () => {
  const spotifyPath = join(LIFE_DATA_DIR, "top-tracks.yml");
  const json = safeLoad(await readFile(spotifyPath, "utf8"));
  const longTermTracks = json.longTermTracks;
  const mediumTermTracks = json.mediumTermTracks;
  const shortTermTracks = json.shortTermTracks;
  await writeJson(join(CONTENT_DATA_DIR, "longTermTracks.json"), longTermTracks);
  await writeJson(join(CONTENT_DATA_DIR, "mediumTermTracks.json"), mediumTermTracks);
  await writeJson(join(CONTENT_DATA_DIR, "shortTermTracks.json"), shortTermTracks);
}

const pocketCasts = async () => {
  const pocketCastsPodcasts = safeLoad(await readFile(join(LIFE_DATA_DIR, "podcasts.yml"), "utf8"));
  await writeJson(join(CONTENT_DATA_DIR, "pocketCastsPodcasts.json"), pocketCastsPodcasts);
  const pocketCastsHistory = safeLoad(await readFile(join(LIFE_DATA_DIR, "podcast-history.yml"), "utf8"));
  await writeJson(join(CONTENT_DATA_DIR, "pocketCastsHistory.json"), pocketCastsHistory);
}

const wakatime = async () => {
  const programming = safeLoad(await readFile(join(LIFE_DATA_DIR, "development.yml"), "utf8"));
  programming.languages = programming.languages.filter(lang => lang.text !== "0 secs");
  await writeJson(join(CONTENT_DATA_DIR, "programming.json"), programming);
}

const gmail = async () => {
  const emails = safeLoad(await readFile(join(LIFE_DATA_DIR, "emails.yml"), "utf8"));
  await writeJson(join(CONTENT_DATA_DIR, "emails.json"), emails);
}

const lastUpdated = async () => {
  const lifeDataLastUpdated = {};
  if (await exists(join(CONTENT_DATA_DIR, "lifeDataLastUpdated.json"))) return;
  for await (const file of [
    "development.yml",
    "podcasts.yml",
    "podcast-history.yml",
    "emails.yml",
    "top-artists.yml",
    "top-tracks.yml"
  ])
    lifeDataLastUpdated[file] = (await axios.get(`https://api.github.com/repos/AnandChowdhary/life-data/commits?path=${file}`)).data[0];
  await writeJson(join(CONTENT_DATA_DIR, "lifeDataLastUpdated.json"), lifeDataLastUpdated);
}

const lifeDataUtilities = async () => {
  await lastUpdated();
  await spotifyArtists();
  await spotifyTracks();
  await pocketCasts();
  await wakatime();
  await gmail();
}

lifeDataUtilities();
