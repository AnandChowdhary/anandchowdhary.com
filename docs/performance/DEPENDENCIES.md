# Dependency audit assessment

The initial migration audit reported 10 affected package entries (1 low,
2 moderate, 7 high). Scoped same-major overrides now pin Vercel routing-utils'
path-to-regexp to 6.3.0 and CLI config's Zod to 4.6.6. The follow-up audit reports
**3 affected entries: 1 low, 2 moderate, 0 high, 0 critical**. These are dependency
graph counts, not separate exploit counts. Toolchain-only `scripts/performance` dependencies had no advisories.
This assessment is not a waiver of the migration's release checks.

| Advisory | Installed path | Assessment / follow-up |
|---|---|---|
| path-to-regexp backtracking, GHSA-9wv6-86v2-598j | Vercel adapter → routing-utils → 6.3.0 override | Patched within major 6; no longer reported by audit. Generated Vercel routing contract, build, all 10 contract tests, smoke and 801-URL inventory pass; deployed validation remains required. |
| Zod oversized constrained collections, GHSA-mrhx-c7xc-m3w5 | Vercel functions → OIDC → CLI config → 4.6.6 override | Patched within major 4; no longer reported by audit. Astro independently requires a patched version. |
| PostCSS selector parser complexity, GHSA-rj75-hqrm-r3gf | Tailwind typography → 6.0.10 | Build-time selector processing; current inputs are repository-controlled. Patched 7.1.6 requires a major upgrade, so do not force it without compatibility checks. |
| esbuild Windows development-server file read, GHSA-g7r4-m6w7-qqqr | build tooling → 0.27.7 | This Linux Vercel deployment does not use a public esbuild Windows dev server. Track upstream patch; avoid claiming the dependency graph is clean. |

No blanket `npm audit fix --force` or breaking override has been applied. Repeat
the audit against the final lockfile and verify production versus build-only
reachability before release. Adapter downgrades suggested automatically by audit
are not a substitute for compatible Astro/Vercel deployment validation.
