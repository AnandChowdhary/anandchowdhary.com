// Shared HTTP helpers for the smoke test and the link audit. No dependencies:
// both scripts run straight from a GitHub Actions runner with `node`.

const TIMEOUT_MS = 20_000;

/**
 * A single request, with one retry — a concurrent sweep of a few hundred URLs
 * reliably turns up the odd dropped connection that succeeds immediately
 * afterwards, and failing the build on that would train everyone to ignore it.
 */
export async function request(url, { redirect = "manual" } = {}) {
  let lastError;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await fetch(url, {
        redirect,
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      return {
        status: response.status,
        location: response.headers.get("location"),
        age: Number(response.headers.get("age") ?? "0"),
        url: response.url,
      };
    } catch (error) {
      lastError = error;
    }
  }
  return { status: 0, error: String(lastError), location: null, age: 0, url };
}

/** Runs `task` over `items` with a fixed pool, so a sweep can't hammer the CDN. */
export async function mapWithConcurrency(items, concurrency, task) {
  const results = new Array(items.length);
  let index = 0;
  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, async () => {
      while (index < items.length) {
        const current = index++;
        results[current] = await task(items[current], current);
      }
    })
  );
  return results;
}

export async function fetchSitemapPaths(baseUrl) {
  const response = await fetch(`${baseUrl}/sitemap.xml`, {
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok)
    throw new Error(`Could not read ${baseUrl}/sitemap.xml: ${response.status}`);
  const xml = await response.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((match) => match[1].trim().replace(/^https?:\/\/[^/]+/, ""))
    .map((path) => path || "/");
}
