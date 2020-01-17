const {
  mkdirp,
  readFile,
  writeFile,
  readJson,
  readdir,
  exists
} = require("fs-extra");
const { join } = require("path");
const { trim, titleify } = require("./utils");
const { getCityCountry } = require("./cities");
const { api } = require("./api");
const { getEventCard, getProjectCard } = require("./cards");

const getWikiSummary = async value => {
  try {
    const cachePath = join(__dirname, "..", ".cache", "wiki", `${value}.txt`);
    if (await exists(cachePath)) return (await readFile(cachePath)).toString();
    const data = `<p>${
      (
        await api.get(
          `https://services.anandchowdhary.now.sh/api/wikipedia-summary?q=${encodeURIComponent(
            value.replace(/-/g, "_")
          )}`
        )
      ).data
    } <a href="https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(
      value.replace(/-/g, "_")
    )}">Text from Wikipedia</a></p>`;
    await mkdirp(join(cachePath, ".."));
    await writeFile(cachePath, data);
    return data;
  } catch (error) {}
  return "";
};

const getEventsSummaryCity = async (allItems, value) => {
  let result = "";
  const items = allItems
    .filter(
      item =>
        (item.data.tags || []).includes("events") &&
        (item.data.places || []).includes(value)
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  if (items.length) {
    result += `
      <h2>Events</h2>
      <p>This is a list of events I've spoken at in ${titleify(
        value
      )}. If you want to see more of my events, visit the <a href="/events/">Speaking page</a>.</p>
      <section class="events">
        <div>${items.map(post => getEventCard(post, true)).join("")}</div>
      </section>
    `;
  }
  return result;
};

const getProjectsSummaryCity = async (allItems, value) => {
  let result = "";
  const items = allItems
    .filter(
      item =>
        (item.data.tags || []).includes("projects") &&
        (item.data.places || []).includes(value)
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  if (items.length) {
    result += `
      <h2>Projects</h2>
      <p>These are projects I've worked on in ${titleify(
        value
      )}. If you want to see more projects, visit the <a href="/projects/">Projects page</a>.</p>
      <section class="projects">
        <div>${items.map(post => getProjectCard(post)).join("")}</div>
      </section>
    `;
  }
  return result;
};

const getDescription = async (type, key, k, noTag = false) => {
  if (!key) return "";
  try {
    const data = await readJson(
      join(__dirname, "..", "content", "_data", "descriptions.json")
    );
    if (key && typeof data[type][key] === "string")
      return `<p>${data[type][key]}</p>`;
    if (key && k && typeof data[type][key][k] === "string")
      return noTag ? data[type][key][k] : `<p>${data[type][key][k]}</p>`;
  } catch (error) {}
  return "";
};

const getCollaboratorProfilePictureUrl = async user => {
  try {
    const data = await readJson(
      join(__dirname, "..", "content", "_data", "descriptions.json")
    );
    const profiles = data.collaborators[user];
    if (profiles.github) return `<img class="colla-pic" alt="" src="https://unavatar.now.sh/github/${profiles.github}">`;
    if (profiles.twitter) return `<img class="colla-pic" alt="" src="https://unavatar.now.sh/twitter/${profiles.twitter}">`;
    if (profiles.instagram) return `<img class="colla-pic" alt="" src="https://unavatar.now.sh/instagram/${profiles.instagram}">`;
    if (profiles.facebook) return `<img class="colla-pic" alt="" src="https://unavatar.now.sh/facebook/${profiles.facebook}">`;
  } catch (error) {}
  return "";
};

const getCollaboratorSocialProfiles = async name => {
  try {
    const data = await readJson(
      join(__dirname, "..", "content", "_data", "descriptions.json")
    );
    const profiles = data.collaborators[name];
    let result = "<div class='collaborator-profiles social-links'>";
    if (profiles.twitter) result += `<a href="https://twitter.com/${profiles.twitter}" data-balloon="Twitter" data-balloon-pos="up"><i title="Twitter" class="fab fa-twitter"></i></a>`
    if (profiles.linkedin) result += `<a href="https://www.linkedin.com/in/${profiles.linkedin}" data-balloon="LinkedIn" data-balloon-pos="up"><i title="LinkedIn" class="fab fa-linkedin"></i></a>`
    if (profiles.github) result += `<a href="https://github.com/${profiles.github}" data-balloon="GitHub" data-balloon-pos="up"><i title="GitHub" class="fab fa-github"></i></a>`
    if (profiles.instagram) result += `<a href="https://www.instagram.com/${profiles.instagram}" data-balloon="Instagram" data-balloon-pos="up"><i title="Instagram" class="fab fa-instagram"></i></a>`
    if (profiles.facebook) result += `<a href="https://www.facebook.com/${profiles.facebook}" data-balloon="Facebook" data-balloon-pos="up"><i title="Facebook" class="fab fa-facebook"></i></a>`
    if (profiles.medium) result += `<a href="https://medium.com/${profiles.medium}" data-balloon="Medium" data-balloon-pos="up"><i title="Medium" class="fab fa-medium"></i></a>`
    if (profiles.dribbble) result += `<a href="https://dribbble.com/${profiles.dribbble}" data-balloon="Dribbble" data-balloon-pos="up"><i title="Dribbble" class="fab fa-dribbble"></i></a>`
    if (profiles.quora) result += `<a href="https://www.quora.com/${profiles.quora}" data-balloon="Quora" data-balloon-pos="up"><i title="Quora" class="fab fa-quora"></i></a>`
    if (profiles.angellist) result += `<a href="https://angel.co/${profiles.angellist}" data-balloon="Angellist" data-balloon-pos="up"><i title="Angellist" class="fab fa-angellist"></i></a>`
    result += `<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/brands.css" integrity="sha384-VGCZwiSnlHXYDojsRqeMn3IVvdzTx5JEuHgqZ3bYLCLUBV8rvihHApoA1Aso2TZA" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/fontawesome.css" integrity="sha384-GVa9GOgVQgOk+TNYXu7S/InPTfSDTtBalSgkgqQ7sCik56N9ztlkoTr2f/T44oKV" crossorigin="anonymous"></div>`;
    return result;
  } catch (error) {}
  return "";
};

const getCityArchivePageData = async (allItems, city) => {
  let image = `https://tse2.mm.bing.net/th?q=${encodeURIComponent(
    city
  )}&w=100&h=100&p=0&dpr=2&adlt=moderate&c=1`;
  try {
    const files = await readFile(
      join(__dirname, "..", "life-data", "highlights", city, "cover.jpg")
    );
    image = `/images/highlights/${city}/cover.jpg`;
  } catch (error) {}
  let result = `
    <div class="content">
      <h1 class="has-icon"><img class="item-icon" alt="" src="${image}"><span>${titleify(
    city
  )}</span></h1>
      ${getCityCountry(city)}
    </div>
  `;
  let images = "";
  try {
    const files = await readdir(
      join(__dirname, "..", "life-data", "highlights", city)
    );
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
    ${await getDescription("places", city)}
  `;
  if (images)
    result += `
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

const getProjectNavbar = value =>
  `<nav class="filter-nav">
    <a${value === "all" ? ` class="active"` : ""} href="/projects/">All</a>
    <a${value === "Web" ? ` class="active"` : ""} href="/projects/web">Web</a>
    <a${value === "App" ? ` class="active"` : ""} href="/projects/app">Apps</a>
    <a${
      value === "Branding" ? ` class="active"` : ""
    } href="/projects/branding">Branding</a>
    <a${value === "AI" ? ` class="active"` : ""} href="/projects/ai">AI/ML</a>
    <a${value === "IoT" ? ` class="active"` : ""} href="/projects/iot">IoT</a>
    <a${
      value === "VR/AR" ? ` class="active"` : ""
    } href="/projects/vrar">VR/AR</a>
    <a${
      value === "Oswald Labs" ? ` class="active"` : ""
    } href="/projects/oswald-labs/">Oswald Labs</a>
    <a${
      value === "Open source" ? ` class="active"` : ""
    } href="/projects/open-source/">Open source</a>
    <a${
      value === "Collaborators" ? ` class="active"` : ""
    } href="/projects/collaborators/">Collaborators</a>
    <a${
      value === "Collaborators" ? ` class="active"` : ""
    } href="/projects/stack/">Stack</a>
    <a${
      value === "Collaborators" ? ` class="active"` : ""
    } href="/projects/tools/">Tools</a>
  </nav>`;

const getWorkArchive = async (allItems, category, value) => {
  let result = `<div class="container-large small-p">
  <nav class="breadcrumbs">
    <a href="/projects/">Projects</a>`
  
  if (category === "work")
    result += `<a href="/projects/${value}">${(await getDescription(category, value, "name", true)) ||
    titleify(value)}</a>
    </nav>`;
  else
    result += `<a href="/projects/${category}/">${titleify(category)}</a>
    <a href="/projects/${category}/${value}">${(await getDescription(category, value, "name", true)) ||
    titleify(value)}</a>
    </nav>`;

  const TITLE = (await getDescription(category, value.toLowerCase(), "name", true)) || titleify(value);

  if (category === "collaborators") {
    result += `${await getCollaboratorProfilePictureUrl(value)}
    <h1>${await getDescription(
      "collaborators",
      value,
      "flag",
      true
    )} ${(await getDescription(category, value.toLowerCase(), "name", true)) ||
      titleify(value)}</h1>`;
  } else {
    let image = "";
    try {
      image = await getDescription(category, value.toLowerCase(), "icon", true);
    } catch (error) {}
    if (image) result += `<img class="colla-pic" alt="" src="${image}">`;
    result += `<h1>${TITLE}</h1>`;
  }

  result += `${await getDescription(category, value.toLowerCase(), "intro")}`;

  if (category === "collaborators")
    result += `${await getCollaboratorSocialProfiles(value)}
      <p>Projects we worked on together include:</p>`;
  
  if (category === "work") result += getProjectNavbar(value);
  if (category === "tools") result += `<p>Projects built using ${TITLE}:</p>`;
  if (category === "stack") result += `<p>Projects built with ${TITLE}:</p>`;

  result += `<section class="projects"><div>`;
  const items = allItems
    .filter(item => (item.data[category] || []).includes(value))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  items.forEach(project => {
    result += `${getProjectCard(project)}`;
  });
  return `${result}</div></section></div>`;
};

const getTravelTime = async (allItems, city) => {
  const data = await readJson(
    join(__dirname, "..", "life-data", "instagram-highlights.json")
  );
  let item;
  Object.keys(data).forEach(key => {
    const highlight = data[key];
    const slug = trim(
      highlight.meta.title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, ""),
      "-"
    );
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
  const items = allItems.filter(item =>
    (item.data.places || []).includes(city)
  );
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
  let image = `https://tse2.mm.bing.net/th?q=${encodeURIComponent(
    city
  )}&w=100&h=100&p=0&dpr=2&adlt=moderate&c=1`;
  try {
    const files = await readFile(
      join(__dirname, "..", "life-data", "highlights", city, "cover.jpg")
    );
    image = `/images/highlights/${city}/cover.jpg`;
  } catch (error) {}
  return `
    <article><a href="/places/${city}">
      <h2 class="has-icon"><img class="item-icon" alt="" src="${image}"><span>${titleify(
    city
  )}</span></h2>
      <div class="f">
        ${getCityCountry(city)}
        <div>${await getTravelTime(allItems, city)}</div>
      </div>
    </a></article>
  `;
};

module.exports = {
  getWikiSummary,
  getTravelPageItem,
  getEventsSummaryCity,
  getDescription,
  getProjectsSummaryCity,
  getCityArchivePageData,
  getWorkArchive,
  getCollaboratorProfilePictureUrl,
  getProjectNavbar
};
