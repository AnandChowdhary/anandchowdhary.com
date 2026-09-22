/**
 * Full link audit — every internal URL the site publishes, plus every URL the
 * external archive feed points back at.
 *
 * This is deliberately separate from the smoke test and runs weekly rather than
 * per deploy, because most of what it catches isn't caused by a
 * commit here at all: the feed, the location history and the press list all
 * live in other repos and change on their own. That's how #301's 41 dead
 * archive links accumulated — nothing on this side had to change for them to
 * break, so nothing on this side ever noticed.
 *
 * Usage: node scripts/link-audit.mjs [baseUrl]
 */
import { fetchSitemapPaths, mapWithConcurrency, request } from "./http.mjs";

const baseUrl = (
  process.argv.find((arg) => arg.startsWith("http")) ??
  process.env.SMOKE_BASE_URL ??
  "https://anandchowdhary.com"
).replace(/\/$/, "");

const ARCHIVE_FEED = "https://anandchowdhary.github.io/everything/api.json";

/**
 * Known-dead and not this repo's to fix. `/okrs/*` has no route here at all and
 * `getAllArchiveItems` filters OKRs out, so nothing on the site links to them —
 * they only 404 if you follow the feed directly. Drop this entry once either an
 * OKRs section exists or the URLs leave the feed.
 */
const IGNORED = [/^\/okrs\//];

const feedResponse = await fetch(ARCHIVE_FEED, {
  signal: AbortSignal.timeout(20_000),
});
if (!feedResponse.ok)
  throw new Error(`Could not read the archive feed: ${feedResponse.status}`);
const feedPaths = [
  ...new Set(
    (await feedResponse.json())
      .map((item) => item.url)
      .filter(
        (url) =>
          typeof url === "string" && url.startsWith("https://anandchowdhary.com")
      )
      .map((url) => url.replace("https://anandchowdhary.com", "") || "/")
  ),
];

const sitemapPaths = await fetchSitemapPaths(baseUrl);
const paths = [...new Set([...sitemapPaths, ...feedPaths])].filter(
  (path) => !IGNORED.some((pattern) => pattern.test(path))
);

console.log(
  `Auditing ${paths.length} URLs on ${baseUrl} (${sitemapPaths.length} from the sitemap, ${feedPaths.length} from the archive feed)\n`
);

// Redirects are fine here — the alias URLs the feed uses are *meant* to 308 —
// so follow them and judge the destination.
const results = await mapWithConcurrency(paths, 8, (path) =>
  request(baseUrl + path, { redirect: "follow" }).then((result) => ({
    path,
    ...result,
  }))
);

const broken = results.filter((result) => result.status !== 200);
for (const { path, status, error } of broken)
  console.log(`FAIL  ${path} — ${error ?? `HTTP ${status}`}`);

console.log(`\n${results.length - broken.length}/${results.length} OK`);
if (broken.length) {
  console.log(`${broken.length} broken URL(s).`);
  process.exit(1);
}
console.log("No broken links.");
