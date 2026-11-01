# Production performance measurements

Started: 2026-11-01T12:27:27.208Z. Finished: 2026-11-01T12:30:01.513Z.

Base: https://anandchowdhary.com. Source checkout: 0b694cf64d436485473ceb3c223e1c3cffdca90c; this does not establish the deployed commit.

Chrome/156.0.8078.47; Lighthouse 13.5.0; Node v24.22.1.

Sequential Lighthouse navigations; fresh Chrome process/profile per run; cold browser storage; simulated default mobile/desktop throttling; production CDN cache uncontrolled.

Nebula sandbox; physical runner location unverified. See HTTP x-vercel-id for observed CDN routing.

All cells show median (minimum–maximum). Bytes are transferred KiB; unused JS is Lighthouse estimated savings, not necessarily transferred bytes.

| Route | Device | Valid runs | Performance | LCP seconds | TBT ms | CLS | JS KiB | Total KiB |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| / | mobile | 3 | 100 (100–100) | 1.64 (1.51–1.86) | 23 (9–24) | 0.000 (0.000–0.000) | 74.7 (74.7–74.9) | 471.4 (471.2–471.4) |
| /blog | mobile | 3 | 100 (100–100) | 1.28 (1.20–1.28) | 0 (0–0) | 0.000 (0.000–0.000) | 0.0 (0.0–0.0) | 165.1 (165.1–165.4) |
| /blog/2026/future-ai-native-work | mobile | 3 | 100 (100–100) | 1.20 (1.20–1.20) | 0 (0–0) | 0.000 (0.000–0.000) | 0.0 (0.0–0.0) | 77.2 (77.2–77.2) |
| /blog/2019/state-of-the-podcasts-2019 | mobile | 3 | 100 (100–100) | 1.22 (1.20–1.23) | 0 (0–0) | 0.000 (0.000–0.000) | 0.0 (0.0–0.0) | 221.1 (221.0–221.2) |
| /projects | mobile | 3 | 100 (100–100) | 1.38 (1.35–1.41) | 0 (0–0) | 0.000 (0.000–0.000) | 0.0 (0.0–0.0) | 430.0 (429.9–430.0) |
| /life | mobile | 3 | 100 (100–100) | 1.65 (1.23–1.74) | 0 (0–0) | 0.000 (0.000–0.000) | 0.0 (0.0–0.0) | 121.9 (121.9–121.9) |

## Timing and JavaScript diagnostics

TTFB is the observed LCP breakdown value; LCP/FCP/TBT use simulated throttling. Long-task timings also use Lighthouse simulation.

| Route | Device | FCP s | Observed TTFB ms | JS execution ms | Main-thread ms | Long tasks | Unused JS KiB |
|---|---|---:|---:|---:|---:|---:|---:|
| / | mobile | 0.95 (0.91–0.96) | 30 (19–62) | 144 (144–149) | 1379 (1371–1474) | 3 (3–4) | 36.9 (36.9–36.9) |
| /blog | mobile | 0.98 (0.90–0.98) | 122 (57–139) | 29 (26–31) | 517 (421–549) | 1 (1–1) | 0.0 (0.0–0.0) |
| /blog/2026/future-ai-native-work | mobile | 0.90 (0.90–0.90) | 61 (24–91) | 16 (16–18) | 247 (230–292) | 0 (0–1) | 0.0 (0.0–0.0) |
| /blog/2019/state-of-the-podcasts-2019 | mobile | 0.92 (0.90–0.93) | 79 (68–255) | 20 (19–22) | 421 (381–431) | 1 (1–1) | 0.0 (0.0–0.0) |
| /projects | mobile | 0.93 (0.90–0.96) | 69 (66–111) | 16 (16–18) | 296 (280–299) | 0 (0–0) | 0.0 (0.0–0.0) |
| /life | mobile | 0.90 (0.90–0.93) | 70 (60–134) | 10 (10–11) | 367 (311–396) | 1 (1–1) | 0.0 (0.0–0.0) |

## Transferred resources

| Route | Device | HTML KiB | CSS KiB | Images KiB | Fonts KiB | RSC requests | Preloaded images |
|---|---|---:|---:|---:|---:|---:|---:|
| / | mobile | 11.6 (11.6–11.6) | 10.6 (10.5–10.7) | 322.8 (322.8–322.8) | 51.5 (51.5–51.7) | 0 (0–0) | 45 (45–45) |
| /blog | mobile | 9.8 (9.8–9.8) | 10.6 (10.6–10.6) | 92.8 (92.8–93.0) | 51.6 (51.6–51.6) | 0 (0–0) | 0 (0–0) |
| /blog/2026/future-ai-native-work | mobile | 12.9 (12.9–12.9) | 10.7 (10.6–10.7) | 1.7 (1.7–1.8) | 51.5 (51.5–51.6) | 0 (0–0) | 1 (1–1) |
| /blog/2019/state-of-the-podcasts-2019 | mobile | 8.6 (8.6–8.6) | 10.6 (10.6–10.7) | 150.0 (149.9–150.0) | 51.5 (51.5–51.6) | 0 (0–0) | 1 (1–1) |
| /projects | mobile | 12.6 (12.6–12.6) | 10.7 (10.6–10.7) | 354.8 (354.8–354.8) | 51.5 (51.5–51.6) | 0 (0–0) | 1 (1–1) |
| /life | mobile | 13.4 (13.4–13.4) | 10.7 (10.6–10.7) | 46.0 (45.9–46.0) | 51.5 (51.5–51.6) | 0 (0–0) | 8 (8–8) |

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
| / | 200 | n/a | 26 (26–26) | 5 (4–78) |
| /blog | 200 | n/a | 26 (26–26) | 62 (51–72) |
| /blog/2026/future-ai-native-work | 200 | n/a | 0 (0–0) | 44 (34–143) |
| /blog/2019/state-of-the-podcasts-2019 | 200 | n/a | 0 (0–0) | 104 (38–134) |
| /projects | 200 | n/a | 27 (27–27) | 80 (27–104) |
| /life | 200 | n/a | 27 (27–27) | 61 (48–61) |

## Field data

- mobile: 429; Quota exceeded for quota metric 'Queries' and limit 'Queries per day' of service 'pagespeedonline.googleapis.com' for consumer 'project_number:583797351490'..
- desktop: 429; Quota exceeded for quota metric 'Queries' and limit 'Queries per day' of service 'pagespeedonline.googleapis.com' for consumer 'project_number:583797351490'..

A quota/API failure does not mean insufficient CrUX traffic. Lab TBT is not real-user INP. HTTP timings in manifest.json include this runner’s network overhead and are not field TTFB. Repeated GETs do not force a cold CDN cache.

## Report integrity

18 successful reports; 0 failed runs.
0 reports contain failed network requests; inspect summary.json and raw reports before interpreting scores.

Full audit details and settings are in raw/*.json.gz. summary.json contains all samples, aggregated metrics, failed requests, and audit findings. manifest.json contains provenance, warnings, repeated HTTP requests, and field-data responses.
