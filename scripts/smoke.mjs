/**
 * Post-deploy smoke test — run against the live site, never a local build.
 *
 * The bug this exists to catch (#301) was invisible to everything that runs
 * before a deploy: `next build` prerendered all 900-odd pages happily, and the
 * pages served fine locally. The route's render only threw inside the Vercel
 * function, which meant every prerendered page kept serving its last good copy
 * while any path the build hadn't seen — every new repo — returned a 500. It
 * went unnoticed for 45 days.
 *
 * So the checks below are the ones that need a real deployment:
 *
 *   1. Sampled pages per section, read from the sitemap so the list can't rot.
 *   2. A nonexistent slug per dynamic route. This is the important one: it's
 *      the only cheap check that forces a *runtime* render, because a slug
 *      that was never built can't be served from the prerender cache. A route
 *      whose render throws answers 500 here while all its real pages look fine.
 *   3. Known slug aliases still redirect (guards the #301 lookups).
 *   4. With --check-freshness (the weekly run only, not right after a deploy,
 *      when everything is legitimately age 0): pages are still revalidating.
 *      Stale-forever pages are what "the render is broken" looks like from the
 *      outside once the prerender cache is warm.
 *
 * Usage: node scripts/smoke.mjs [baseUrl] [--check-freshness]
 */
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
const MAX_AGE_SECONDS = 21 * 24 * 60 * 60;

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
  const { status, error } = await request(baseUrl + path);
  record(status === 200, path, error ?? `HTTP ${status}`);
});

console.log("\nSampled detail pages");
const samples = sampleBySection(sitemapPaths);
// The age is read from this pass rather than a second one: requesting a stale
// page is itself what triggers Vercel to revalidate it, so a follow-up request
// would report the fresh copy and hide exactly what we're looking for.
const sampleResults = await mapWithConcurrency(samples, 6, async (path) => {
  const { status, age, error } = await request(baseUrl + path);
  const ok = record(status === 200, path, error ?? `HTTP ${status}`);
  return { path, age, ok };
});

console.log("\nUnknown slugs must 404, not 500 (forces a runtime render)");
const year = new Date().getUTCFullYear();
const canaries = DYNAMIC_SECTIONS.map(
  (section) => `/${section}/${year}/zz-smoke-${Math.random().toString(36).slice(2, 10)}`
);
await mapWithConcurrency(canaries, 6, async (path) => {
  const { status, error } = await request(baseUrl + path);
  record(
    status === 404,
    path,
    error ?? (status >= 500 ? `HTTP ${status} — the route's render is throwing` : `HTTP ${status}`)
  );
});

console.log("\nSlug aliases still redirect");
await mapWithConcurrency(KNOWN_ALIASES, 6, async ([alias, canonical]) => {
  const { status, location, error } = await request(baseUrl + alias);
  const target = location?.replace(/^https?:\/\/[^/]+/, "");
  const ok = status === 308 && target === canonical;
  record(
    ok,
    alias,
    ok
      ? `308 → ${target}`
      : (error ?? `HTTP ${status}${target ? ` → ${target}` : ""}, want 308 → ${canonical}`)
  );
});

if (checkFreshness) {
  console.log(`\nPages still revalidating (age under ${MAX_AGE_SECONDS / 86400} days)`);
  for (const { path, age, ok } of sampleResults)
    if (ok) record(age < MAX_AGE_SECONDS, path, `age ${(age / 86400).toFixed(1)}d`);
} else {
  notes.push("Freshness check skipped — pass --check-freshness on the weekly run.");
}

console.log("");
for (const note of notes) console.log(`note: ${note}`);
if (failures.length) {
  console.log(`\n${failures.length} check(s) failed:`);
  for (const failure of failures) console.log(`  - ${failure}`);
  process.exit(1);
}
console.log("All checks passed.");
