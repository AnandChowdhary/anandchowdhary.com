# Agent instructions

This is Anand's personal website (anandchowdhary.com). Anand is the owner and
the only reviewer, so agents should ship changes end to end without waiting for
approval.

## Default workflow: change → PR → merge

When Anand asks for a change, and you are confident you understood it and the
change is correct, do all of this without stopping to ask:

1. Branch from an up-to-date `main` (`git pull`), e.g. `fix/short-description`.
2. Make the change. Keep it scoped to what was asked.
3. Verify locally:
   - `npm ci` (once), then `npm test` and `npx tsc --noEmit -p .`
   - For anything visible, run the site and look at it (see "Screenshots").
4. Commit, push and open a PR against `main` with `gh pr create`. Describe what
   changed and how you checked it, and include before/after screenshots for
   visual changes.
5. Wait for the PR checks (`gh pr checks <n> --watch`). The required one is the
   `build` job from `.github/workflows/pages.yml`.
6. When checks pass, merge with `gh pr merge <n> --squash --delete-branch`.
   (Only squash merges are enabled.) Merging to `main` deploys the site.
7. Tell Anand what shipped, with the PR link.

Stop and ask instead of merging when:

- the request is ambiguous, or there are several reasonable interpretations
  with visibly different results;
- checks fail and the fix isn't obvious, or you would need to skip or weaken
  tests to get them green;
- the change deletes content, rewrites large parts of the design, or touches
  deployment, DNS, secrets or `.github/workflows/`;
- you could not verify the result (e.g. the page wouldn't build or render).

In that case, leave the PR open and say what is blocking it.

## Style and content

It's a personal site. Don't add disclaimers, "data may be outdated" or
freshness notices, "last refreshed" timestamps, or other legal-sounding
boilerplate unless Anand asks for it.

## Screenshots

`scripts/performance/screenshot.mjs` captures desktop and mobile screenshots
of one or more paths:

```sh
npm ci --prefix scripts/performance            # once; installs puppeteer
# before: production
node scripts/performance/screenshot.mjs https://anandchowdhary.com "$TMPDIR/shots" before /location
# after: local build
npm run build && npm start &                    # serves dist on :4322
node scripts/performance/screenshot.mjs http://localhost:4322 "$TMPDIR/shots" after /location
```

For quick iteration, `npm run dev` (port 4321) also works as the "after" base.
Look at the images yourself before attaching them. Check that the change is
visible and nothing else broke.

To show them in the PR, push the images to the `pr-screenshots` branch (an
orphan branch that holds only images; pushes to it don't trigger any deploys)
under a folder named after your PR branch, then link the raw URLs:

```sh
git worktree add --orphan -b pr-screenshots "$TMPDIR/pr-shots" 2>/dev/null \
  || { git fetch origin pr-screenshots && git worktree add "$TMPDIR/pr-shots" pr-screenshots; }
mkdir -p "$TMPDIR/pr-shots/<branch>" && cp "$TMPDIR"/shots/*.png "$TMPDIR/pr-shots/<branch>/"
git -C "$TMPDIR/pr-shots" add . && git -C "$TMPDIR/pr-shots" commit -m "Screenshots for <branch>" \
  && git -C "$TMPDIR/pr-shots" push origin pr-screenshots
git worktree remove "$TMPDIR/pr-shots"
```

```markdown
| Before | After |
|---|---|
| ![](https://raw.githubusercontent.com/AnandChowdhary/anandchowdhary.com/pr-screenshots/<branch>/location-before-desktop.png) | ![](https://raw.githubusercontent.com/AnandChowdhary/anandchowdhary.com/pr-screenshots/<branch>/location-after-desktop.png) |
```

Skip screenshots for changes with no visual effect (tests, scripts, data
plumbing). Just say so in the PR.

## Related repositories

Much of the content comes from separate data repos and is fetched at build
time (see `src/views/api.ts`). For example, location labels and city aliases
live in `AnandChowdhary/location` (`overwrite.json` → `similarLabels`). When a
fix belongs in one of those repos, use the same PR → checks → merge workflow
there. Mention that its data reaches this site after its own publish workflow
and the next site build.
