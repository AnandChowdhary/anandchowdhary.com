export function buildScreenshotOpenGraphImageUrl(
  path: string,
  extraSearchParams: Record<string, string | number | boolean> = {}
): string {
  const url = new URL(
    path.startsWith("http") ? path : `https://anandchowdhary.com${path}`
  );
  for (const [key, value] of Object.entries(extraSearchParams))
    url.searchParams.set(key, String(value));
  url.searchParams.set("screenshot", "true");
  return `https://v1.screenshot.11ty.dev/${encodeURIComponent(
    url.toString()
  )}/opengraph/`;
}
