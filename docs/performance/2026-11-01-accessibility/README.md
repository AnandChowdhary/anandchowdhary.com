# Dependency maintenance and accessibility

## Dependency alerts

Dependabot alerts 239 (esbuild development-server file reads on Windows) and
240 (selector parser CPU exhaustion) were present in the root lockfile.
Updated `tsx` 4.21.0 → 4.23.15, resolving esbuild 0.28.2. Tailwind Typography
still pins selector parser 6.0.10, so a documented root override selects patched
6.1.5. Remove that override when Typography permits a patched version itself.
No major framework upgrade was needed. Root and performance-tool npm audits
both report zero vulnerabilities after these changes.

## Audit and fixes

The initial axe 4.14.0 audit checked 12 representative routes in desktop light
and mobile dark. It found insufficient muted-text contrast in dark mode,
missing top-level headings/landmarks, duplicate unnamed navigation regions and
horizontal overflow on the life dashboard. A generated-HTML scan extended the
landmark fixes to all pages sharing the document shell.

- Added a native, initially off-screen “Skip to content” link. Each page's one
  main landmark is its focusable target; keyboard activation requires no script.
- Added screen-reader headings to listing pages, corrected card heading levels,
  and added main landmarks to About, Now, Mentoring, Contact and the 404 page.
- Raised dark muted-copy contrast and corrected light/dark link hover colors.
  Strengthened the shared keyboard focus ring contrast.
- Named each life-dashboard source navigation and allowed its grid children to
  shrink, so long text no longer widens the mobile viewport.
- Kept search's DOM hook as a data attribute so its main landmark has one ID.

`scripts/performance/accessibility.mjs` checks representative routes with axe
WCAG 2 A/AA, 2.1 A/AA and best-practice rules. It also checks one main/heading,
viewport overflow, and that Tab then Enter exposes and activates the skip link.
The weekly **Production accessibility** workflow checks the public site and
retains detailed JSON for 30 days. Static build verification requires one
focusable skip target on every document carrying the skip link.

```sh
npm ci --prefix scripts/performance
node scripts/performance/accessibility.mjs http://localhost:4322 /tmp/accessibility.json
```

The detailed JSON includes incomplete rules for human review. Automated passes
and browser keyboard checks do not establish complete WCAG conformance or
substitute for testing with assistive technology.

Final local/public results and workflow links are recorded below after release.

Manual follow-up to axe's incomplete contrast checks: video duration labels
previously depended on each thumbnail under a translucent background; they now
use an opaque dark background with white text. The decorative About “Alt” badge
also gets explicit contrasting foreground colors. Hacker News point counts use
the verified muted-text palette; axe still reports their masked neighboring
links as an overlap requiring review. These incomplete results are retained,
not disabled or counted as automated contrast passes.

The expanded layout check also found hidden Archive and Food chart tooltips
extending the mobile scroll area. Below 640px they now appear as bounded bottom
callouts; desktop positioning remains anchored to the chart.

## Local validation

All 50 route/theme checks pass after the landmark, contrast and overflow fixes:
25 routes, each in desktop light (1280×900) and mobile dark (390×844). The
[before](before.json) and [after](after.json) summaries retain counts and
incomplete rules. Hovered links pass additional light/dark contrast checks.
Skip links also pass without JavaScript, including under the project Pages
prefix on Home, Contact, Search and 404. The prefixed build verifies and smokes
successfully.

Astro check: zero errors/warnings/hints. All 40 tests pass; all 809 URLs pass.
Existing search, interactions, topics and reader/image browser suites pass.
Generated shell pages have one main landmark and one focusable skip destination.
The two final badge color changes are checked separately before publication;
this 50-check local summary precedes those changes.

The final badge retest passes axe on Videos and About in both themes. Video
contrast incompletes are eliminated; the decorative About badge remains an
incomplete overlap check despite its explicit palette.
