# Production performance measurements

Started: 2026-10-31T15:58:52.999Z. Finished: 2026-10-31T16:01:38.731Z.

Base: https://anandchowdhary.com. Source checkout: dd84546ac1a07803caf734153a241d6915895848; this does not establish the deployed commit.

Chrome/156.0.8078.47; Lighthouse 13.5.0; Node v24.22.1.

Sequential Lighthouse navigations; fresh Chrome process/profile per run; cold browser storage; simulated default mobile/desktop throttling; production CDN cache uncontrolled.

Nebula sandbox; physical runner location unverified. See HTTP x-vercel-id for observed CDN routing.

All cells show median (minimum–maximum). Bytes are transferred KiB; unused JS is Lighthouse estimated savings, not necessarily transferred bytes.

| Route | Device | Valid runs | Performance | LCP seconds | TBT ms | CLS | JS KiB | Total KiB |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| / | mobile | 3 | 100 (100–100) | 1.88 (1.48–1.90) | 12 (10–15) | 0.000 (0.000–0.000) | 74.6 (74.4–74.7) | 1338.5 (1338.3–1338.6) |
| /blog | mobile | 3 | 99 (98–99) | 2.27 (2.22–2.38) | 0 (0–0) | 0.000 (0.000–0.000) | 0.0 (0.0–0.0) | 2736.8 (2736.6–2736.8) |
| /blog/2026/future-ai-native-work | mobile | 3 | 100 (100–100) | 1.23 (1.21–1.28) | 0 (0–0) | 0.000 (0.000–0.000) | 0.0 (0.0–0.0) | 76.0 (76.0–76.0) |
| /blog/2019/state-of-the-podcasts-2019 | mobile | 3 | 100 (100–100) | 1.28 (1.27–1.30) | 0 (0–0) | 0.000 (0.000–0.000) | 0.0 (0.0–0.0) | 220.5 (220.3–220.6) |
| /projects | mobile | 3 | 100 (100–100) | 1.43 (1.42–1.44) | 0 (0–0) | 0.000 (0.000–0.000) | 0.0 (0.0–0.0) | 429.5 (429.5–429.6) |
| /life | mobile | 3 | 100 (100–100) | 1.39 (1.28–1.68) | 0 (0–0) | 0.000 (0.000–0.000) | 0.0 (0.0–0.0) | 120.2 (120.2–120.2) |

## Timing and JavaScript diagnostics

TTFB is the observed LCP breakdown value; LCP/FCP/TBT use simulated throttling. Long-task timings also use Lighthouse simulation.

| Route | Device | FCP s | Observed TTFB ms | JS execution ms | Main-thread ms | Long tasks | Unused JS KiB |
|---|---|---:|---:|---:|---:|---:|---:|
| / | mobile | 0.98 (0.96–1.01) | 152 (109–216) | 162 (158–165) | 1733 (1722–1858) | 2 (2–3) | 36.9 (36.9–36.9) |
| /blog | mobile | 0.92 (0.91–0.98) | 203 (125–228) | 12 (11–13) | 524 (509–534) | 2 (2–2) | 0.0 (0.0–0.0) |
| /blog/2026/future-ai-native-work | mobile | 0.93 (0.91–0.98) | 199 (91–258) | 15 (14–16) | 233 (231–301) | 0 (0–1) | 0.0 (0.0–0.0) |
| /blog/2019/state-of-the-podcasts-2019 | mobile | 0.98 (0.97–1.00) | 259 (199–262) | 23 (22–24) | 363 (304–370) | 1 (0–1) | 0.0 (0.0–0.0) |
| /projects | mobile | 0.98 (0.97–0.99) | 226 (225–266) | 18 (17–19) | 353 (340–363) | 0 (0–0) | 0.0 (0.0–0.0) |
| /life | mobile | 0.93 (0.90–0.98) | 256 (134–390) | 11 (10–11) | 357 (353–416) | 1 (1–2) | 0.0 (0.0–0.0) |

## Transferred resources

| Route | Device | HTML KiB | CSS KiB | Images KiB | Fonts KiB | RSC requests | Preloaded images |
|---|---|---:|---:|---:|---:|---:|---:|
| / | mobile | 12.0 (12.0–12.0) | 10.3 (10.3–10.5) | 1190.0 (1189.8–1190.3) | 51.5 (51.5–51.6) | 0 (0–0) | 45 (45–45) |
| /blog | mobile | 9.0 (9.0–9.0) | 10.3 (10.3–10.4) | 2665.4 (2665.3–2665.5) | 51.6 (51.5–51.7) | 0 (0–0) | 42 (42–42) |
| /blog/2026/future-ai-native-work | mobile | 12.0 (11.9–12.0) | 10.4 (10.3–10.4) | 1.7 (1.7–1.8) | 51.5 (51.5–51.7) | 0 (0–0) | 1 (1–1) |
| /blog/2019/state-of-the-podcasts-2019 | mobile | 8.3 (8.2–8.3) | 10.3 (10.3–10.3) | 149.9 (149.6–149.9) | 51.7 (51.6–51.7) | 0 (0–0) | 1 (1–1) |
| /projects | mobile | 12.5 (12.5–12.5) | 10.3 (10.3–10.3) | 354.8 (354.7–354.8) | 51.6 (51.5–51.6) | 0 (0–0) | 1 (1–1) |
| /life | mobile | 12.0 (12.0–12.0) | 10.3 (10.3–10.3) | 45.9 (45.9–45.9) | 51.6 (51.6–51.6) | 0 (0–0) | 8 (8–8) |

## Audit categories

| Route | Device | Accessibility | Best practices | SEO |
|---|---|---:|---:|---:|
| / | mobile | 100 (100–100) | 96 (96–96) | 100 (100–100) |
| /blog | mobile | 100 (100–100) | 100 (100–100) | 100 (100–100) |
| /blog/2026/future-ai-native-work | mobile | 100 (100–100) | 100 (100–100) | 100 (100–100) |
| /blog/2019/state-of-the-podcasts-2019 | mobile | 100 (100–100) | 100 (100–100) | 100 (100–100) |
| /projects | mobile | 100 (100–100) | 100 (100–100) | 100 (100–100) |
| /life | mobile | 100 (100–100) | 100 (100–100) | 100 (100–100) |

## Repeated HTTP GET observations

Headers latency includes network overhead. Age values and HIT/STALE headers do not prove end-to-end content freshness.

| Route | Status | Vercel cache | Age seconds | Headers latency ms |
|---|---|---|---:|---:|
| / | 200 | n/a | 0 (0–0) | 12 (11–203) |
| /blog | 200 | n/a | 0 (0–0) | 260 (204–289) |
| /blog/2026/future-ai-native-work | 200 | n/a | 0 (0–0) | 178 (144–366) |
| /blog/2019/state-of-the-podcasts-2019 | 200 | n/a | 0 (0–0) | 267 (137–267) |
| /projects | 200 | n/a | 0 (0–0) | 212 (51–276) |
| /life | 200 | n/a | 0 (0–0) | 202 (76–211) |

## Field data

- mobile: 429; Quota exceeded for quota metric 'Queries' and limit 'Queries per day' of service 'pagespeedonline.googleapis.com' for consumer 'project_number:583797351490'..
- desktop: 429; Quota exceeded for quota metric 'Queries' and limit 'Queries per day' of service 'pagespeedonline.googleapis.com' for consumer 'project_number:583797351490'..

A quota/API failure does not mean insufficient CrUX traffic. Lab TBT is not real-user INP. HTTP timings in manifest.json include this runner’s network overhead and are not field TTFB. Repeated GETs do not force a cold CDN cache.

## Report integrity

18 successful reports; 0 failed runs.
3 reports contain failed network requests; inspect summary.json and raw reports before interpreting scores.

Full audit details and settings are in raw/*.json.gz. summary.json contains all samples, aggregated metrics, failed requests, and audit findings. manifest.json contains provenance, warnings, repeated HTTP requests, and field-data responses.
