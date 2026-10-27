# Local performance diagnostic

Started: 2026-10-26T14:19:24.326Z. Finished: 2026-10-26T14:20:32.763Z.

Base: http://localhost:4322. Source checkout: 765268ff107ec4ea90f6dffd1b98bf93f5ad8e1c; this does not establish the deployed commit.

Chrome/156.0.8078.47; Lighthouse 13.5.0; Node v22.23.4.

Sequential Lighthouse navigations; fresh Chrome process/profile per run; cold browser storage; simulated default mobile/desktop throttling; production CDN cache uncontrolled.

Nebula sandbox; physical runner location unverified. See HTTP x-vercel-id for observed CDN routing.

All cells show median (minimum–maximum). Bytes are transferred KiB; unused JS is Lighthouse estimated savings, not necessarily transferred bytes.

| Route | Device | Valid runs | Performance | LCP seconds | TBT ms | CLS | JS KiB | Total KiB |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| / | mobile | 5 | 98 (97–99) | 2.36 (1.96–2.45) | 14 (12–20) | 0.000 (0.000–0.000) | 72.9 (72.9–72.9) | 1342.0 (1341.9–1342.1) |
| / | desktop | 3 | 100 (100–100) | 0.56 (0.54–0.57) | 0 (0–0) | 0.000 (0.000–0.000) | 72.9 (72.9–72.9) | 1341.9 (1341.7–1341.9) |

## Timing and JavaScript diagnostics

TTFB is the observed LCP breakdown value; LCP/FCP/TBT use simulated throttling. Long-task timings also use Lighthouse simulation.

| Route | Device | FCP s | Observed TTFB ms | JS execution ms | Main-thread ms | Long tasks | Unused JS KiB |
|---|---|---:|---:|---:|---:|---:|---:|
| / | mobile | 1.43 (1.41–1.43) | 185 (95–204) | 171 (165–183) | 1028 (968–1261) | 3 (3–5) | 36.6 (36.5–36.7) |
| / | desktop | 0.34 (0.34–0.35) | 230 (154–381) | 44 (7–50) | 321 (316–329) | 0 (0–0) | 36.5 (36.5–36.5) |

## Transferred resources

| Route | Device | HTML KiB | CSS KiB | Images KiB | Fonts KiB | RSC requests | Preloaded images |
|---|---|---:|---:|---:|---:|---:|---:|
| / | mobile | 12.0 (12.0–12.0) | 10.1 (10.1–10.1) | 1195.5 (1195.4–1195.6) | 51.5 (51.5–51.5) | 0 (0–0) | 45 (45–45) |
| / | desktop | 12.0 (12.0–12.0) | 10.1 (10.1–10.1) | 1195.4 (1195.3–1195.4) | 51.5 (51.5–51.5) | 0 (0–0) | 45 (45–45) |

## Audit categories

| Route | Device | Accessibility | Best practices | SEO |
|---|---|---:|---:|---:|
| / | mobile | 100 (100–100) | 77 (77–77) | 100 (100–100) |
| / | desktop | 100 (100–100) | 77 (77–77) | 100 (100–100) |

## Repeated HTTP GET observations

Headers latency includes network overhead. Age values and HIT/STALE headers do not prove end-to-end content freshness.

| Route | Status | Vercel cache | Age seconds | Headers latency ms |
|---|---|---|---:|---:|
| / | 200 | n/a | n/a | 101 (95–438) |

## Field data

- mobile: 429; Quota exceeded for quota metric 'Queries' and limit 'Queries per day' of service 'pagespeedonline.googleapis.com' for consumer 'project_number:583797351490'..
- desktop: 429; Quota exceeded for quota metric 'Queries' and limit 'Queries per day' of service 'pagespeedonline.googleapis.com' for consumer 'project_number:583797351490'..

A quota/API failure does not mean insufficient CrUX traffic. Lab TBT is not real-user INP. HTTP timings in manifest.json include this runner’s network overhead and are not field TTFB. Repeated GETs do not force a cold CDN cache.

## Report integrity

8 successful reports; 0 failed runs.
8 reports contain failed network requests; inspect summary.json and raw reports before interpreting scores.

Full audit details and settings are in raw/*.json.gz. summary.json contains all samples, aggregated metrics, failed requests, and audit findings. manifest.json contains provenance, warnings, repeated HTTP requests, and field-data responses.
