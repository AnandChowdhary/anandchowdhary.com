# Local performance diagnostic

Started: 2026-10-26T14:37:47.229Z. Finished: 2026-10-26T14:38:49.428Z.

Base: http://localhost:4322. Source checkout: 765268ff107ec4ea90f6dffd1b98bf93f5ad8e1c; this does not establish the deployed commit.

Chrome/156.0.8078.47; Lighthouse 13.5.0; Node v22.23.4.

Sequential Lighthouse navigations; fresh Chrome process/profile per run; cold browser storage; simulated default mobile/desktop throttling; production CDN cache uncontrolled.

Nebula sandbox; physical runner location unverified. See HTTP x-vercel-id for observed CDN routing.

All cells show median (minimum–maximum). Bytes are transferred KiB; unused JS is Lighthouse estimated savings, not necessarily transferred bytes.

| Route | Device | Valid runs | Performance | LCP seconds | TBT ms | CLS | JS KiB | Total KiB |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| /blog/2019/state-of-the-podcasts-2019 | mobile | 5 | 93 (93–93) | 3.24 (3.24–3.25) | 0 (0–1) | 0.000 (0.000–0.000) | 0.2 (0.2–0.2) | 959.9 (959.9–959.9) |
| /blog/2019/state-of-the-podcasts-2019 | desktop | 3 | 100 (100–100) | 0.63 (0.63–0.63) | 0 (0–0) | 0.000 (0.000–0.000) | 0.2 (0.2–0.2) | 959.9 (959.9–959.9) |

## Timing and JavaScript diagnostics

TTFB is the observed LCP breakdown value; LCP/FCP/TBT use simulated throttling. Long-task timings also use Lighthouse simulation.

| Route | Device | FCP s | Observed TTFB ms | JS execution ms | Main-thread ms | Long tasks | Unused JS KiB |
|---|---|---:|---:|---:|---:|---:|---:|
| /blog/2019/state-of-the-podcasts-2019 | mobile | 0.76 (0.76–0.76) | 48 (28–50) | 22 (20–32) | 361 (331–467) | 1 (0–2) | 0.0 (0.0–0.0) |
| /blog/2019/state-of-the-podcasts-2019 | desktop | 0.21 (0.20–0.21) | 53 (53–54) | 0 (0–1) | 90 (84–95) | 0 (0–0) | 0.0 (0.0–0.0) |

## Transferred resources

| Route | Device | HTML KiB | CSS KiB | Images KiB | Fonts KiB | RSC requests | Preloaded images |
|---|---|---:|---:|---:|---:|---:|---:|
| /blog/2019/state-of-the-podcasts-2019 | mobile | 8.4 (8.4–8.4) | 10.1 (10.1–10.1) | 889.8 (889.8–889.8) | 51.5 (51.5–51.5) | 0 (0–0) | 1 (1–1) |
| /blog/2019/state-of-the-podcasts-2019 | desktop | 8.4 (8.4–8.4) | 10.1 (10.1–10.1) | 889.8 (889.8–889.8) | 51.5 (51.5–51.5) | 0 (0–0) | 1 (1–1) |

## Audit categories

| Route | Device | Accessibility | Best practices | SEO |
|---|---|---:|---:|---:|
| /blog/2019/state-of-the-podcasts-2019 | mobile | 99 (99–99) | 96 (96–96) | 100 (100–100) |
| /blog/2019/state-of-the-podcasts-2019 | desktop | 99 (99–99) | 96 (96–96) | 100 (100–100) |

## Repeated HTTP GET observations

Headers latency includes network overhead. Age values and HIT/STALE headers do not prove end-to-end content freshness.

| Route | Status | Vercel cache | Age seconds | Headers latency ms |
|---|---|---|---:|---:|
| /blog/2019/state-of-the-podcasts-2019 | 200 | n/a | n/a | 31 (26–66) |

## Field data

- mobile: 429; Quota exceeded for quota metric 'Queries' and limit 'Queries per day' of service 'pagespeedonline.googleapis.com' for consumer 'project_number:583797351490'..
- desktop: 429; Quota exceeded for quota metric 'Queries' and limit 'Queries per day' of service 'pagespeedonline.googleapis.com' for consumer 'project_number:583797351490'..

A quota/API failure does not mean insufficient CrUX traffic. Lab TBT is not real-user INP. HTTP timings in manifest.json include this runner’s network overhead and are not field TTFB. Repeated GETs do not force a cold CDN cache.

## Report integrity

8 successful reports; 0 failed runs.
8 reports contain failed network requests; inspect summary.json and raw reports before interpreting scores.

Full audit details and settings are in raw/*.json.gz. summary.json contains all samples, aggregated metrics, failed requests, and audit findings. manifest.json contains provenance, warnings, repeated HTTP requests, and field-data responses.
