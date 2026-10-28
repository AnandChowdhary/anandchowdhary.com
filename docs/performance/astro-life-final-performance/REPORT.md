# Local performance diagnostic

Started: 2026-10-26T14:21:11.389Z. Finished: 2026-10-26T14:22:10.031Z.

Base: http://localhost:4322. Source checkout: 765268ff107ec4ea90f6dffd1b98bf93f5ad8e1c; this does not establish the deployed commit.

Chrome/156.0.8078.47; Lighthouse 13.5.0; Node v22.23.4.

Sequential Lighthouse navigations; fresh Chrome process/profile per run; cold browser storage; simulated default mobile/desktop throttling; production CDN cache uncontrolled.

Nebula sandbox; physical runner location unverified. See HTTP x-vercel-id for observed CDN routing.

All cells show median (minimum–maximum). Bytes are transferred KiB; unused JS is Lighthouse estimated savings, not necessarily transferred bytes.

| Route | Device | Valid runs | Performance | LCP seconds | TBT ms | CLS | JS KiB | Total KiB |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| /life | mobile | 5 | 100 (100–100) | 1.82 (1.36–1.82) | 0 (0–0) | 0.012 (0.012–0.012) | 0.2 (0.2–0.2) | 119.3 (119.3–119.3) |
| /life | desktop | 3 | 100 (100–100) | 0.44 (0.44–0.46) | 0 (0–0) | 0.004 (0.004–0.004) | 0.2 (0.2–0.2) | 119.3 (119.3–119.3) |

## Timing and JavaScript diagnostics

TTFB is the observed LCP breakdown value; LCP/FCP/TBT use simulated throttling. Long-task timings also use Lighthouse simulation.

| Route | Device | FCP s | Observed TTFB ms | JS execution ms | Main-thread ms | Long tasks | Unused JS KiB |
|---|---|---:|---:|---:|---:|---:|---:|
| /life | mobile | 0.76 (0.75–0.76) | 35 (33–39) | 15 (13–16) | 367 (352–391) | 0 (0–1) | 0.0 (0.0–0.0) |
| /life | desktop | 0.21 (0.20–0.21) | 33 (32–39) | 0 (0–1) | 91 (88–99) | 0 (0–0) | 0.0 (0.0–0.0) |

## Transferred resources

| Route | Device | HTML KiB | CSS KiB | Images KiB | Fonts KiB | RSC requests | Preloaded images |
|---|---|---:|---:|---:|---:|---:|---:|
| /life | mobile | 9.8 (9.8–9.8) | 10.1 (10.1–10.1) | 47.8 (47.8–47.8) | 51.5 (51.5–51.5) | 0 (0–0) | 9 (9–9) |
| /life | desktop | 9.8 (9.8–9.8) | 10.1 (10.1–10.1) | 47.8 (47.8–47.8) | 51.5 (51.5–51.5) | 0 (0–0) | 9 (9–9) |

## Audit categories

| Route | Device | Accessibility | Best practices | SEO |
|---|---|---:|---:|---:|
| /life | mobile | 100 (100–100) | 96 (96–96) | 100 (100–100) |
| /life | desktop | 100 (100–100) | 96 (96–96) | 100 (100–100) |

## Repeated HTTP GET observations

Headers latency includes network overhead. Age values and HIT/STALE headers do not prove end-to-end content freshness.

| Route | Status | Vercel cache | Age seconds | Headers latency ms |
|---|---|---|---:|---:|
| /life | 200 | n/a | n/a | 35 (30–307) |

## Field data

- mobile: 429; Quota exceeded for quota metric 'Queries' and limit 'Queries per day' of service 'pagespeedonline.googleapis.com' for consumer 'project_number:583797351490'..
- desktop: 429; Quota exceeded for quota metric 'Queries' and limit 'Queries per day' of service 'pagespeedonline.googleapis.com' for consumer 'project_number:583797351490'..

A quota/API failure does not mean insufficient CrUX traffic. Lab TBT is not real-user INP. HTTP timings in manifest.json include this runner’s network overhead and are not field TTFB. Repeated GETs do not force a cold CDN cache.

## Report integrity

8 successful reports; 0 failed runs.
8 reports contain failed network requests; inspect summary.json and raw reports before interpreting scores.

Full audit details and settings are in raw/*.json.gz. summary.json contains all samples, aggregated metrics, failed requests, and audit findings. manifest.json contains provenance, warnings, repeated HTTP requests, and field-data responses.
