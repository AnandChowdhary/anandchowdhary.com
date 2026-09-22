import type { Token } from "marked";
import sanitizeHtml from "sanitize-html";

// README markup that GitHub itself renders, minus anything scriptable. The
// defaults already cover headings, lists, tables and inline formatting; these
// are the extras READMEs lean on — images and badges above all, plus the
// <details> blocks this site reads its embed copy out of.
const allowedTags = [
  ...sanitizeHtml.defaults.allowedTags,
  "audio",
  "del",
  "details",
  "img",
  "input",
  "ins",
  "picture",
  "source",
  "summary",
  "video",
];

const allowedAttributes: sanitizeHtml.IOptions["allowedAttributes"] = {
  "*": [
    "align",
    "class",
    // Repo READMEs carry their own `data-*` hooks (this site reads the
    // `data-embed` block out of them), and they render nothing by themselves.
    "data-*",
    "dir",
    "height",
    "id",
    "lang",
    "style",
    "title",
    "width",
  ],
  a: ["href", "name", "rel", "target"],
  audio: ["controls", "loop", "src"],
  details: ["open"],
  img: ["alt", "decoding", "loading", "sizes", "src", "srcset"],
  // GitHub-flavoured task lists render as disabled checkboxes.
  input: ["checked", "disabled", "type"],
  ol: ["start", "type"],
  source: ["media", "sizes", "src", "srcset", "type"],
  table: ["border", "cellpadding", "cellspacing"],
  td: ["colspan", "rowspan", "valign"],
  th: ["colspan", "rowspan", "scope", "valign"],
  video: ["controls", "loop", "muted", "playsinline", "poster", "src"],
};

// The featured open-source repo list is author-curated, but its READMEs
// (rendered as HTML via dangerouslySetInnerHTML) aren't necessarily
// author-written — some are third-party/forked repos. Sanitize before
// injecting so a malicious or compromised README can't inject a script.
//
// This deliberately uses sanitize-html rather than DOMPurify: DOMPurify needs a
// DOM, which on the server means pulling jsdom into this route's serverless
// bundle, and that is the one thing this route did that every other route did
// not. sanitize-html parses with htmlparser2 instead, so no DOM is needed.
//
// `& Record<string, unknown>` is only there because @types/sanitize-html still
// predates the `allowedEmptyAttributes` option the library itself supports.
const sanitizeOptions: sanitizeHtml.IOptions & Record<string, unknown> = {
  allowedTags,
  allowedAttributes,
  // Inline styles are allowed only for the handful of declarations READMEs
  // actually use for layout, and only with values matching these patterns — an
  // unrestricted `style` would let a README position an invisible overlay over
  // the page.
  allowedStyles: {
    "*": {
      "text-align": [/^(?:left|right|center|justify)$/],
      width: [/^\d+(?:\.\d+)?(?:px|em|rem|%)$/],
      height: [/^\d+(?:\.\d+)?(?:px|em|rem|%)$/],
      "max-width": [/^\d+(?:\.\d+)?(?:px|em|rem|%)$/],
    },
  },
  // Valueless HTML attributes are dropped unless they're listed here, which
  // would quietly turn README task lists into unchecked, clickable checkboxes.
  allowedEmptyAttributes: [
    "alt",
    "checked",
    "controls",
    "disabled",
    "loop",
    "muted",
    "open",
    "playsinline",
  ],
  allowedSchemes: ["http", "https", "mailto", "tel"],
  // Inline data URIs are common in badges, and an <img> can't execute script
  // from one.
  allowedSchemesByTag: { img: ["data", "http", "https"] },
};

export function sanitizeRepositoryHtml(html: string): string {
  return sanitizeHtml(html, sanitizeOptions);
}

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
