# Production performance measurements

Started: 2026-11-01T12:36:19.349Z. Finished: 2026-11-01T12:38:43.299Z.

Base: https://anandchowdhary.com. Source checkout: ad623326343c898b0e560d515b3004e75a01250d; this does not establish the deployed commit.

Observed deployed commit: ad623326343c898b0e560d515b3004e75a01250d; built 2026-11-01T12:34:08.689Z; snapshot 230a705bda8060b8886eec7412ac142c205d3c84ab68604116955969d31b2c5b. Publication unchanged across measurements.

Chrome/156.0.8078.47; Lighthouse 13.5.0; Node v24.22.1.

Sequential Lighthouse navigations; fresh Chrome process/profile per run; cold browser storage; simulated default mobile/desktop throttling; production CDN cache uncontrolled.

GitHub Actions Linux X64; physical runner location unverified.

All cells show median (minimum–maximum). Bytes are transferred KiB; unused JS is Lighthouse estimated savings, not necessarily transferred bytes.

| Route | Device | Valid runs | Performance | LCP seconds | TBT ms | CLS | JS KiB | Total KiB |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| / | mobile | 3 | 100 (100–100) | 1.61 (1.60–1.74) | 8 (7–12) | 0.000 (0.000–0.000) | 74.6 (74.5–74.7) | 471.6 (471.6–471.6) |
| /blog | mobile | 3 | 100 (100–100) | 1.26 (1.21–1.26) | 0 (0–0) | 0.000 (0.000–0.000) | 0.0 (0.0–0.0) | 165.6 (165.5–165.8) |
| /blog/2026/future-ai-native-work | mobile | 3 | 100 (100–100) | 1.20 (1.20–1.20) | 0 (0–0) | 0.000 (0.000–0.000) | 0.0 (0.0–0.0) | 77.2 (77.2–77.3) |
| /blog/2019/state-of-the-podcasts-2019 | mobile | 3 | 100 (100–100) | 1.21 (1.20–1.21) | 0 (0–0) | 0.000 (0.000–0.000) | 0.0 (0.0–0.0) | 221.2 (221.1–221.2) |
| /projects | mobile | 3 | 100 (100–100) | 1.37 (1.36–1.52) | 0 (0–0) | 0.000 (0.000–0.000) | 0.0 (0.0–0.0) | 430.1 (430.1–430.1) |
| /life | mobile | 3 | 100 (100–100) | 1.39 (1.35–1.52) | 0 (0–12) | 0.000 (0.000–0.000) | 0.0 (0.0–0.0) | 121.9 (121.9–121.9) |

## Timing and JavaScript diagnostics

TTFB is the observed LCP breakdown value; LCP/FCP/TBT use simulated throttling. Long-task timings also use Lighthouse simulation.

| Route | Device | FCP s | Observed TTFB ms | JS execution ms | Main-thread ms | Long tasks | Unused JS KiB |
|---|---|---:|---:|---:|---:|---:|---:|
| / | mobile | 0.93 (0.91–0.93) | 21 (19–29) | 133 (128–137) | 1478 (1104–1517) | 3 (3–4) | 36.9 (36.9–36.9) |
| /blog | mobile | 0.96 (0.91–0.96) | 52 (30–103) | 22 (21–24) | 374 (347–515) | 0 (0–3) | 0.0 (0.0–0.0) |
| /blog/2026/future-ai-native-work | mobile | 0.90 (0.90–0.90) | 61 (60–104) | 16 (15–16) | 332 (260–343) | 1 (0–2) | 0.0 (0.0–0.0) |
| /blog/2019/state-of-the-podcasts-2019 | mobile | 0.91 (0.90–0.91) | 46 (27–93) | 19 (18–22) | 247 (240–308) | 0 (0–1) | 0.0 (0.0–0.0) |
| /projects | mobile | 0.92 (0.91–0.92) | 55 (50–77) | 13 (13–14) | 256 (254–261) | 0 (0–0) | 0.0 (0.0–0.0) |
| /life | mobile | 0.92 (0.90–0.94) | 54 (49–68) | 9 (8–9) | 476 (406–503) | 2 (1–3) | 0.0 (0.0–0.0) |

## Transferred resources

| Route | Device | HTML KiB | CSS KiB | Images KiB | Fonts KiB | RSC requests | Preloaded images |
|---|---|---:|---:|---:|---:|---:|---:|
| / | mobile | 11.6 (11.6–11.6) | 10.5 (10.5–10.6) | 323.2 (323.1–323.2) | 51.6 (51.5–51.6) | 0 (0–0) | 45 (45–45) |
| /blog | mobile | 9.8 (9.8–9.8) | 10.6 (10.6–10.7) | 93.3 (93.1–93.4) | 51.6 (51.5–51.6) | 0 (0–0) | 0 (0–0) |
| /blog/2026/future-ai-native-work | mobile | 12.9 (12.9–12.9) | 10.7 (10.6–10.7) | 1.7 (1.7–1.7) | 51.6 (51.5–51.7) | 0 (0–0) | 1 (1–1) |
| /blog/2019/state-of-the-podcasts-2019 | mobile | 8.6 (8.6–8.6) | 10.6 (10.6–10.6) | 150.0 (149.9–150.1) | 51.6 (51.6–51.7) | 0 (0–0) | 1 (1–1) |
| /projects | mobile | 12.6 (12.6–12.6) | 10.6 (10.6–10.6) | 354.9 (354.9–354.9) | 51.6 (51.6–51.6) | 0 (0–0) | 1 (1–1) |
| /life | mobile | 13.4 (13.3–13.4) | 10.6 (10.6–10.6) | 45.9 (45.9–45.9) | 51.6 (51.6–51.7) | 0 (0–0) | 8 (8–8) |

## Audit categories

| Route | Device | Accessibility | Best practices | SEO |
|---|---|---:|---:|---:|
| / | mobile | 100 (100–100) | 100 (100–100) | 100 (100–100) |
| /blog | mobile | 100 (100–100) | 100 (100–100) | 100 (100–100) |
| /blog/2026/future-ai-native-work | mobile | 100 (100–100) | 100 (100–100) | 100 (100–100) |
| /blog/2019/state-of-the-podcasts-2019 | mobile | 100 (100–100) | 100 (100–100) | 100 (100–100) |
| /projects | mobile | 100 (100–100) | 100 (100–100) | 100 (100–100) |
| /life | mobile | 100 (100–100) | 100 (100–100) | 100 (100–100) |

## Repeated HTTP GET observations

Headers latency includes network overhead. Age values and HIT/STALE headers do not prove end-to-end content freshness.

| Route | Status | Vercel cache | Age seconds | Headers latency ms |
|---|---|---|---:|---:|
| / | 200 | n/a | 0 (0–0) | 6 (5–22) |
| /blog | 200 | n/a | 0 (0–0) | 60 (44–64) |
| /blog/2026/future-ai-native-work | 200 | n/a | 0 (0–0) | 82 (35–168) |
| /blog/2019/state-of-the-podcasts-2019 | 200 | n/a | 0 (0–0) | 82 (44–131) |
| /projects | 200 | n/a | 0 (0–0) | 72 (67–74) |
| /life | 200 | n/a | 0 (0–0) | 43 (36–65) |

## Field data

- mobile: 429; Quota exceeded for quota metric 'Queries' and limit 'Queries per day' of service 'pagespeedonline.googleapis.com' for consumer 'project_number:583797351490'..
- desktop: 429; Quota exceeded for quota metric 'Queries' and limit 'Queries per day' of service 'pagespeedonline.googleapis.com' for consumer 'project_number:583797351490'..

A quota/API failure does not mean insufficient CrUX traffic. Lab TBT is not real-user INP. HTTP timings in manifest.json include this runner’s network overhead and are not field TTFB. Repeated GETs do not force a cold CDN cache.

## Report integrity

18 successful reports; 0 failed runs.
0 reports contain failed network requests; inspect summary.json and raw reports before interpreting scores.

Full audit details and settings are in raw/*.json.gz. summary.json contains all samples, aggregated metrics, failed requests, and audit findings. manifest.json contains provenance, warnings, repeated HTTP requests, and field-data responses.
