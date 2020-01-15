const { mkdirp, readFile, writeFile, readJson, readdir, exists } = require("fs-extra");
const { join } = require("path");
const { trim, titleify } = require("./utils");
const { getCityCountry } = require("./cities");
const { api } = require("./api");
const { getEventCard, getProjectCard } = require("./cards");

const getWikiSummary = async value => {
  try {
    const cachePath = join(__dirname, "..", ".cache", "wiki", `${value}.txt`);
    if (await exists(cachePath))
    return (await readFile(cachePath)).toString();
    const data = `<p>${(await api.get(`https://services.anandchowdhary.now.sh/api/wikipedia-summary?q=${encodeURIComponent(value.replace(/-/g, "_"))}`)).data} <a href="https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(value.replace(/-/g, "_"))}">Text from Wikipedia</a></p>`;
    await mkdirp(join(cachePath, ".."));
    await writeFile(cachePath, data);
    return data;
  } catch (error) {}
  return "";
}

const getEventsSummaryCity = async (allItems, value) => {
  let result = "";
  const items = allItems.filter(item => (item.data.tags || []).includes("events") && (item.data.places || []).includes(value)).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  if (items.length) {
    result += `
      <h2>Events</h2>
      <p>This is a list of events I've spoken at in ${titleify(value)}. If you want to see more of my events, visit the <a href="/events/">Speaking page</a>.</p>
      <section class="events">
        <div>${items.map(post => getEventCard(post, true)).join("")}</div>
      </section>
    `;
  }
  return result;
};

const getProjectsSummaryCity = async (allItems, value) => {
  let result = "";
  const items = allItems.filter(item => (item.data.tags || []).includes("projects") && (item.data.places || []).includes(value)).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  if (items.length) {
    result += `
      <h2>Projects</h2>
      <p>These are projects I've worked on in ${titleify(value)}. If you want to see more projects, visit the <a href="/projects/">Projects page</a>.</p>
      <section class="projects">
        <div>${items.map(post => getProjectCard(post)).join("")}</div>
      </section>
    `;
  }
  return result;
};

const getCityArchivePageData = async (allItems, city) => {
  let image = `https://tse2.mm.bing.net/th?q=${encodeURIComponent(city)}&w=100&h=100&p=0&dpr=2&adlt=moderate&c=1`;
  try {
    const files = await readFile(join(__dirname, "..", "life-data", "highlights", city, "cover.jpg"));
    image = `/images/highlights/${city}/cover.jpg`;
  } catch (error) {}
  let result = `
    <div class="content">
      <h1 class="has-icon"><img class="item-icon" alt="" src="${image}"><span>${titleify(city)}</span></h1>
      ${getCityCountry(city)}
    </div>
  `;
  let images = "";
  try {
    const files = await readdir(join(__dirname, "..", "life-data", "highlights", city));
    files.forEach(file => {
      if (file !== "cover.jpg") {
        images += `
          <img alt="" src="/images/highlights/${city}/${file}">
        `; 
      }
    });
  } catch (error) {}
  result += `
    <h2>About</h2>
    <p>${await getWikiSummary(city)}</p>
  `;
  if (images) result += `
    <h2>Highlights</h2>
    <p>These highlighted stories are from my <a href="https://www.instagram.com/anandchowdhary/">Instagram profile</a>. If you want more photos, you should follow me there.</p>
    <div class="horizontal-scroller container-large"><div class="highlighted-stories">${images}</div></div>
  `;
  result += `
    ${await getEventsSummaryCity(allItems, city)}
    ${await getProjectsSummaryCity(allItems, city)}
  `;
  return result;
};

const getWorkArchive = async (allItems, category, value) => {
  let result = `<div class="container-large small-p">
  <h1>${value}</h1>
  <nav class="filter-nav">
    <a href="/projects/">All</a>
    <a${value === "Web" ? ` class="active"` : ""} href="/projects/web">Web</a>
    <a${value === "App" ? ` class="active"` : ""} href="/projects/app">Apps</a>
    <a${value === "Branding" ? ` class="active"` : ""} href="/projects/branding">Branding</a>
    <a${value === "AI" ? ` class="active"` : ""} href="/projects/ai">AI/ML</a>
    <a${value === "IoT" ? ` class="active"` : ""} href="/projects/iot">IoT</a>
    <a${value === "VR/AR" ? ` class="active"` : ""} href="/projects/vrar">VR/AR</a>
    <a${value === "Oswald Labs" ? ` class="active"` : ""} href="/projects/oswald-labs/">Oswald Labs</a>
    <a${value === "Open source" ? ` class="active"` : ""} href="/projects/open-source/">Open source</a>
    <a${value === "Hackathon" ? ` class="active"` : ""} href="/projects/hackathon">Hackathons</a>
  </nav>
  <section class="projects">
    <div>
  `;
  const items = allItems.filter(item => (item.data[category] || []).includes(value)).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  items.forEach(project => {
    result += `${getProjectCard(project)}`;
  });
  return `${result}</div></section></div>`;
};

const getTravelTime = async (allItems, city) => {
  const data = await readJson(join(__dirname, "..", "life-data", "instagram-highlights.json"));
  let item;
  Object.keys(data).forEach(key => {
    const highlight = data[key];
    const slug = trim(highlight.meta.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""), "-");
    if (slug === city) item = highlight;
  });
  if (item) {
    const date = item.data[0].date;
    return `<time datetime="${new Date(date).toISOString()}">${new Date(
      date
    ).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric"
    })}</time>`;
  }
  const items = allItems.filter(item => (item.data.places || []).includes(city));
  if (items.length) {
    const date = items[0].date;
    return `<time datetime="${new Date(date).toISOString()}">${new Date(
      date
    ).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric"
    })}</time>`;
  }
  return "";
};

const getTravelPageItem = async (allItems, city) => {
  let image = `https://tse2.mm.bing.net/th?q=${encodeURIComponent(city)}&w=100&h=100&p=0&dpr=2&adlt=moderate&c=1`;
  try {
    const files = await readFile(join(__dirname, "..", "life-data", "highlights", city, "cover.jpg"));
    image = `/images/highlights/${city}/cover.jpg`;
  } catch (error) {}
  return `
    <article><a href="/places/${city}">
      <h2 class="has-icon"><img class="item-icon" alt="" src="${image}"><span>${titleify(city)}</span></h2>
      <div class="f">
        ${getCityCountry(city)}
        <div>${await getTravelTime(allItems, city)}</div>
      </div>
    </a></article>
  `;
}

module.exports = { getWikiSummary, getTravelPageItem, getEventsSummaryCity, getProjectsSummaryCity, getCityArchivePageData, getWorkArchive };
