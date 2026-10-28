/** Deployed/static preview checks: published content, real 404s, exact alias
 * destinations and (optionally) build timestamp freshness. No runtime ISR is assumed. */
import { fetchSitemapPaths, mapWithConcurrency, request } from "./http.mjs";

const baseUrl = (
  process.argv.find((arg) => arg.startsWith("http")) ??
  process.env.SMOKE_BASE_URL ??
  "https://anandchowdhary.com"
).replace(/\/$/, "");
const checkFreshness = process.argv.includes("--check-freshness");

// Sections with a /[year]/[slug] detail route. A miss under any of these must
// be a 404 from the page's own notFound(), never a 5xx.
const DYNAMIC_SECTIONS = [
  "blog",
  "books",
  "events",
  "life",
  "location",
  "notes",
  "open-source",
  "press",
  "projects",
  "themes",
  "versions",
  "videos",
];

// Index pages, including /location which the sitemap doesn't list.
const INDEX_PAGES = ["/", "/about", "/now", "/archive", "/location", ...DYNAMIC_SECTIONS.map((s) => `/${s}`)];

// Slugs the archive feed links by but this site names differently. Old entries
// only, so the expectation doesn't change as new content lands.
const KNOWN_ALIASES = [
  ["/press/2017/your-story", "/press/2017/yourstory"],
  ["/open-source/2014/essential.css", "/open-source/2014/essential-css"],
  ["/location/2014/japan", "/location/2014/tokyo-jp"],
  ["/videos/2017/bharat-hacks-live", "/videos/2017/bharathacks-live"],
];

const SAMPLES_PER_SECTION = 3;
// The audit runs weekly and the sampling is deterministic, so our own previous
// run is usually what last warmed these pages: a perfectly healthy page reads
// as ~7 days old here. Three weeks leaves room for that while still being far
// below the 45 days #301 reached.


/** Spreads the picks across each section so samples span different years. */
function sampleBySection(paths) {
  const bySection = new Map();
  for (const path of paths) {
    const segments = path.split("/").filter(Boolean);
    if (segments.length < 2) continue; // index pages are checked separately
    if (!bySection.has(segments[0])) bySection.set(segments[0], []);
    bySection.get(segments[0]).push(path);
  }
  const sampled = [];
  for (const sectionPaths of bySection.values()) {
    const step = Math.max(1, Math.floor(sectionPaths.length / SAMPLES_PER_SECTION));
    for (let i = 0, taken = 0; i < sectionPaths.length && taken < SAMPLES_PER_SECTION; i += step, taken++)
      sampled.push(sectionPaths[i]);
  }
  return sampled;
}

const failures = [];
const notes = [];

function record(ok, label, detail) {
  if (!ok) failures.push(`${label} — ${detail}`);
  console.log(`${ok ? "  ok  " : "FAIL  "}${label}${detail ? ` — ${detail}` : ""}`);
  return ok;
}

console.log(`Smoke testing ${baseUrl}\n`);

const sitemapPaths = await fetchSitemapPaths(baseUrl);
console.log(`Sitemap: ${sitemapPaths.length} URLs\n`);

console.log("Index pages");
await mapWithConcurrency(INDEX_PAGES, 6, async (path) => {
  const { status, error } = await request(baseUrl + path, { redirect: "follow" });
  record(status === 200, path, error ?? `HTTP ${status}`);
});

console.log("\nSampled detail pages");
const samples = sampleBySection(sitemapPaths);
// The age is read from this pass rather than a second one: requesting a stale
// page is itself what triggers Vercel to revalidate it, so a follow-up request
// would report the fresh copy and hide exactly what we're looking for.
const sampleResults = await mapWithConcurrency(samples, 6, async (path) => {
  const { status, age, error } = await request(baseUrl + path, { redirect: "follow" });
  const ok = record(status === 200, path, error ?? `HTTP ${status}`);
  return { path, age, ok };
});

console.log("\nUnknown slugs must return a real 404");
const year = new Date().getUTCFullYear();
const canaries = DYNAMIC_SECTIONS.map(
  (section) => `/${section}/${year}/zz-smoke-${Math.random().toString(36).slice(2, 10)}`
);
await mapWithConcurrency(canaries, 6, async (path) => {
  const { status, error } = await request(baseUrl + path, { redirect: "follow" });
  record(
    status === 404,
    path,
    error ?? (status >= 500 ? `HTTP ${status} — the route's render is throwing` : `HTTP ${status}`)
  );
});

console.log("\nSlug aliases still redirect");
await mapWithConcurrency(KNOWN_ALIASES, 6, async ([alias, canonical]) => {
  const { status, url, error } = await request(baseUrl + alias, { redirect: 'follow' });
  const root = new URL(baseUrl).pathname.replace(/\/$/, '');
  const final = new URL(url);
  const target = final.pathname.replace(root && root !== '/' ? root : '__no_prefix__','').replace(/\/$/,'');
  const ok = status === 200 && final.origin === new URL(baseUrl).origin && target === canonical;
  record(ok, alias, ok ? `redirect → ${target}` : (error ?? `HTTP ${status} → ${url}, want ${canonical}`));
});

if (checkFreshness) {
  const response = await fetch(baseUrl+'/build-info.json', { signal: AbortSignal.timeout(20000) });
  if (!response.ok) record(false, 'Build freshness', `HTTP ${response.status}`);
  else {
    const info = await response.json();
    const age = (Date.now()-Date.parse(info.builtAt))/1000;
    record(Number.isFinite(age) && age >= -300 && age < 6*3600, 'Build freshness', `built ${info.builtAt}; age ${(age/3600).toFixed(1)}h (hourly builds may be delayed)`);
  }
} else notes.push('Build timestamp freshness skipped; use --check-freshness on the deployed site.');

console.log("");
for (const note of notes) console.log(`note: ${note}`);
if (failures.length) {
  console.log(`\n${failures.length} check(s) failed:`);
  for (const failure of failures) console.log(`  - ${failure}`);
  process.exit(1);
}
console.log("All checks passed.");
