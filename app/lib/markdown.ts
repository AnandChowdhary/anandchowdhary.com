import type { Token } from "marked";

function resolveRelativeUrl(url: string, base: string): string {
  if (url.startsWith("#")) return url;
  // Protocol-relative ("//host/...") or has its own scheme (https:, mailto:, etc.) — already absolute.
  if (url.startsWith("//") || /^[a-z][a-z0-9+.-]*:/i.test(url)) return url;
  // GitHub treats a leading "/" as relative to the repo root, not the domain
  // root, so strip it before resolving — otherwise `new URL()` would resolve
  // "/assets/x.svg" against raw.githubusercontent.com's root instead of the
  // repo's directory, dropping the owner/repo/ref path entirely.
  const relative = url.startsWith("/") ? url.slice(1) : url;
  try {
    return new URL(relative, base).toString();
  } catch {
    return url;
  }
}

// GitHub renders README links/images relative to the repository, but this
// site renders the same markdown relative to anandchowdhary.com, so relative
// URLs need rewriting to point back at the actual repository. Walking
// marked's parsed tokens (rather than regex on raw markdown) handles nested
// structures correctly, e.g. badge links: [![alt](img-url)](link-url).
export function createRepositoryLinkWalker(fullName: string) {
  const blobBase = `https://github.com/${fullName}/blob/HEAD/`;
  const rawBase = `https://raw.githubusercontent.com/${fullName}/HEAD/`;
  return (token: Token) => {
    if (token.type === "link" || token.type === "def") {
      token.href = resolveRelativeUrl(token.href, blobBase);
    } else if (token.type === "image") {
      token.href = resolveRelativeUrl(token.href, rawBase);
    } else if (token.type === "html") {
      // marked treats raw HTML as an opaque blob it doesn't tokenize
      // further, so <img src="..."> / <a href="..."> need a regex pass here.
      token.text = token.text
        .replace(
          /<img([^>]*)\ssrc="([^"]+)"/g,
          (_match: string, before: string, url: string) =>
            `<img${before} src="${resolveRelativeUrl(url, rawBase)}"`
        )
        .replace(
          /<a([^>]*)\shref="([^"]+)"/g,
          (_match: string, before: string, url: string) =>
            `<a${before} href="${resolveRelativeUrl(url, blobBase)}"`
        );
    }
  };
}
