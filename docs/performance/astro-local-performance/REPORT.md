# Local performance diagnostic

Started: 2026-10-26T14:10:00.303Z. Finished: 2026-10-26T14:16:20.571Z.

Base: http://localhost:4322. Source checkout: 765268ff107ec4ea90f6dffd1b98bf93f5ad8e1c; this does not establish the deployed commit.

Chrome/156.0.8078.47; Lighthouse 13.5.0; Node v22.23.4.

Sequential Lighthouse navigations; fresh Chrome process/profile per run; cold browser storage; simulated default mobile/desktop throttling; production CDN cache uncontrolled.

Nebula sandbox; physical runner location unverified. See HTTP x-vercel-id for observed CDN routing.

All cells show median (minimum–maximum). Bytes are transferred KiB; unused JS is Lighthouse estimated savings, not necessarily transferred bytes.

| Route | Device | Valid runs | Performance | LCP seconds | TBT ms | CLS | JS KiB | Total KiB |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| / | mobile | 5 | 98 (97–99) | 2.24 (1.94–2.44) | 16 (14–31) | 0.000 (0.000–0.000) | 72.9 (72.9–72.9) | 1341.8 (1341.7–1342.0) |
| / | desktop | 3 | 100 (100–100) | 0.56 (0.56–0.59) | 0 (0–0) | 0.000 (0.000–0.000) | 72.9 (72.9–72.9) | 1341.8 (1341.6–1341.9) |
| /blog | mobile | 5 | 98 (98–99) | 2.29 (2.17–2.30) | 0 (0–3) | 0.000 (0.000–0.000) | 0.2 (0.2–0.2) | 2736.2 (2736.1–2736.2) |
| /blog | desktop | 3 | 100 (100–100) | 0.59 (0.59–0.69) | 0 (0–0) | 0.000 (0.000–0.000) | 0.2 (0.2–0.2) | 2736.2 (2736.1–2736.2) |
| /blog/2026/future-ai-native-work | mobile | 5 | 100 (100–100) | 1.36 (1.35–1.36) | 0 (0–0) | 0.000 (0.000–0.000) | 0.2 (0.2–0.2) | 75.6 (75.6–75.6) |
| /blog/2026/future-ai-native-work | desktop | 3 | 100 (100–100) | 0.37 (0.36–0.38) | 0 (0–0) | 0.000 (0.000–0.000) | 0.2 (0.2–0.2) | 75.6 (75.6–75.6) |
| /blog/2019/state-of-the-podcasts-2019 | mobile | 5 | 100 (100–100) | 1.66 (1.66–1.66) | 0 (0–0) | 0.000 (0.000–0.000) | 0.2 (0.2–0.2) | 130.2 (130.2–130.2) |
| /blog/2019/state-of-the-podcasts-2019 | desktop | 3 | 100 (100–100) | 0.39 (0.39–0.40) | 0 (0–0) | 0.000 (0.000–0.000) | 0.2 (0.2–0.2) | 130.2 (130.2–130.2) |
| /projects | mobile | 5 | 100 (98–100) | 1.88 (1.81–2.24) | 0 (0–0) | 0.000 (0.000–0.000) | 0.2 (0.2–0.2) | 428.4 (428.4–428.4) |
| /projects | desktop | 3 | 100 (100–100) | 0.38 (0.36–0.39) | 0 (0–0) | 0.000 (0.000–0.000) | 0.2 (0.2–0.2) | 660.8 (660.8–660.8) |
| /life | mobile | 5 | 100 (100–100) | 1.76 (1.54–1.82) | 0 (0–0) | 0.012 (0.012–0.012) | 0.2 (0.2–0.2) | 119.2 (119.2–119.2) |
| /life | desktop | 3 | 100 (100–100) | 0.44 (0.43–0.44) | 0 (0–0) | 0.004 (0.004–0.004) | 0.2 (0.2–0.2) | 119.2 (119.2–119.2) |

## Timing and JavaScript diagnostics

TTFB is the observed LCP breakdown value; LCP/FCP/TBT use simulated throttling. Long-task timings also use Lighthouse simulation.

| Route | Device | FCP s | Observed TTFB ms | JS execution ms | Main-thread ms | Long tasks | Unused JS KiB |
|---|---|---:|---:|---:|---:|---:|---:|
| / | mobile | 1.42 (1.41–1.44) | 191 (170–303) | 186 (173–212) | 1352 (925–1535) | 3 (3–4) | 36.6 (36.5–36.7) |
| / | desktop | 0.35 (0.34–0.35) | 275 (166–326) | 7 (7–8) | 341 (277–348) | 0 (0–0) | 36.6 (36.5–36.6) |
| /blog | mobile | 0.76 (0.75–0.77) | 38 (32–42) | 17 (15–18) | 535 (507–628) | 2 (1–3) | 0.0 (0.0–0.0) |
| /blog | desktop | 0.21 (0.21–0.22) | 29 (29–39) | 5 (4–6) | 138 (131–150) | 0 (0–0) | 0.0 (0.0–0.0) |
| /blog/2026/future-ai-native-work | mobile | 0.76 (0.75–0.76) | 66 (64–81) | 20 (18–22) | 302 (226–326) | 0 (0–1) | 0.0 (0.0–0.0) |
| /blog/2026/future-ai-native-work | desktop | 0.21 (0.20–0.22) | 69 (62–137) | 0 (0–0) | 69 (60–75) | 0 (0–0) | 0.0 (0.0–0.0) |
| /blog/2019/state-of-the-podcasts-2019 | mobile | 0.76 (0.76–0.76) | 63 (61–64) | 21 (20–28) | 385 (293–405) | 1 (1–2) | 0.0 (0.0–0.0) |
| /blog/2019/state-of-the-podcasts-2019 | desktop | 0.21 (0.21–0.21) | 82 (57–127) | 0 (0–0) | 78 (74–85) | 0 (0–0) | 0.0 (0.0–0.0) |
| /projects | mobile | 0.75 (0.75–1.34) | 41 (38–53) | 22 (19–28) | 383 (295–403) | 1 (0–1) | 0.0 (0.0–0.0) |
| /projects | desktop | 0.20 (0.20–0.21) | 44 (40–50) | 1 (1–9) | 116 (108–131) | 0 (0–0) | 0.0 (0.0–0.0) |
| /life | mobile | 0.76 (0.75–0.76) | 43 (34–44) | 16 (16–18) | 426 (377–473) | 1 (0–1) | 0.0 (0.0–0.0) |
| /life | desktop | 0.21 (0.21–0.21) | 38 (37–39) | 2 (0–4) | 88 (86–110) | 0 (0–0) | 0.0 (0.0–0.0) |

## Transferred resources

| Route | Device | HTML KiB | CSS KiB | Images KiB | Fonts KiB | RSC requests | Preloaded images |
|---|---|---:|---:|---:|---:|---:|---:|
| / | mobile | 12.0 (12.0–12.0) | 10.1 (10.1–10.1) | 1195.4 (1195.3–1195.5) | 51.5 (51.5–51.5) | 0 (0–0) | 45 (45–45) |
| / | desktop | 12.0 (12.0–12.0) | 10.1 (10.1–10.1) | 1195.4 (1195.2–1195.5) | 51.5 (51.5–51.5) | 0 (0–0) | 45 (45–45) |
| /blog | mobile | 9.1 (9.1–9.1) | 10.1 (10.1–10.1) | 2665.4 (2665.3–2665.4) | 51.5 (51.5–51.5) | 0 (0–0) | 42 (42–42) |
| /blog | desktop | 9.1 (9.1–9.1) | 10.1 (10.1–10.1) | 2665.4 (2665.3–2665.4) | 51.5 (51.5–51.5) | 0 (0–0) | 42 (42–42) |
| /blog/2026/future-ai-native-work | mobile | 12.1 (12.1–12.1) | 10.1 (10.1–10.1) | 1.7 (1.7–1.7) | 51.5 (51.5–51.5) | 0 (0–0) | 1 (1–1) |
| /blog/2026/future-ai-native-work | desktop | 12.1 (12.1–12.1) | 10.1 (10.1–10.1) | 1.7 (1.7–1.7) | 51.5 (51.5–51.5) | 0 (0–0) | 1 (1–1) |
| /blog/2019/state-of-the-podcasts-2019 | mobile | 8.4 (8.4–8.4) | 10.1 (10.1–10.1) | 60.1 (60.1–60.1) | 51.5 (51.5–51.5) | 0 (0–0) | 1 (1–1) |
| /blog/2019/state-of-the-podcasts-2019 | desktop | 8.4 (8.4–8.4) | 10.1 (10.1–10.1) | 60.1 (60.1–60.1) | 51.5 (51.5–51.5) | 0 (0–0) | 1 (1–1) |
| /projects | mobile | 12.1 (12.1–12.1) | 10.1 (10.1–10.1) | 354.6 (354.6–354.6) | 51.5 (51.5–51.5) | 0 (0–0) | 1 (1–1) |
| /projects | desktop | 12.1 (12.1–12.1) | 10.1 (10.1–10.1) | 587.0 (587.0–587.0) | 51.5 (51.5–51.5) | 0 (0–0) | 1 (1–1) |
| /life | mobile | 9.7 (9.7–9.7) | 10.1 (10.1–10.1) | 47.8 (47.8–47.8) | 51.5 (51.5–51.5) | 0 (0–0) | 9 (9–9) |
| /life | desktop | 9.7 (9.7–9.7) | 10.1 (10.1–10.1) | 47.8 (47.8–47.8) | 51.5 (51.5–51.5) | 0 (0–0) | 9 (9–9) |

## Audit categories

| Route | Device | Accessibility | Best practices | SEO |
|---|---|---:|---:|---:|
| / | mobile | 98 (98–98) | 77 (77–77) | 100 (100–100) |
| / | desktop | 98 (98–98) | 77 (77–77) | 100 (100–100) |
| /blog | mobile | 100 (100–100) | 96 (96–96) | 100 (100–100) |
| /blog | desktop | 100 (100–100) | 96 (96–96) | 100 (100–100) |
| /blog/2026/future-ai-native-work | mobile | 100 (100–100) | 96 (96–96) | 100 (100–100) |
| /blog/2026/future-ai-native-work | desktop | 100 (100–100) | 96 (96–96) | 100 (100–100) |
| /blog/2019/state-of-the-podcasts-2019 | mobile | 100 (100–100) | 96 (96–96) | 100 (100–100) |
| /blog/2019/state-of-the-podcasts-2019 | desktop | 100 (100–100) | 96 (96–96) | 100 (100–100) |
| /projects | mobile | 100 (100–100) | 96 (96–96) | 100 (100–100) |
| /projects | desktop | 100 (100–100) | 96 (96–96) | 100 (100–100) |
| /life | mobile | 100 (100–100) | 96 (96–96) | 91 (91–91) |
| /life | desktop | 100 (100–100) | 96 (96–96) | 91 (91–91) |

## Repeated HTTP GET observations

Headers latency includes network overhead. Age values and HIT/STALE headers do not prove end-to-end content freshness.

| Route | Status | Vercel cache | Age seconds | Headers latency ms |
|---|---|---|---:|---:|
| / | 200 | n/a | n/a | 74 (66–140) |
| /blog | 200 | n/a | n/a | 25 (25–34) |
| /blog/2026/future-ai-native-work | 200 | n/a | n/a | 38 (38–44) |
| /blog/2019/state-of-the-podcasts-2019 | 200 | n/a | n/a | 34 (31–38) |
| /projects | 200 | n/a | n/a | 44 (40–53) |
| /life | 200 | n/a | n/a | 29 (29–30) |

## Field data

- mobile: 429; Quota exceeded for quota metric 'Queries' and limit 'Queries per day' of service 'pagespeedonline.googleapis.com' for consumer 'project_number:583797351490'..
- desktop: 429; Quota exceeded for quota metric 'Queries' and limit 'Queries per day' of service 'pagespeedonline.googleapis.com' for consumer 'project_number:583797351490'..

A quota/API failure does not mean insufficient CrUX traffic. Lab TBT is not real-user INP. HTTP timings in manifest.json include this runner’s network overhead and are not field TTFB. Repeated GETs do not force a cold CDN cache.

## Report integrity

48 successful reports; 0 failed runs.
48 reports contain failed network requests; inspect summary.json and raw reports before interpreting scores.

Full audit details and settings are in raw/*.json.gz. summary.json contains all samples, aggregated metrics, failed requests, and audit findings. manifest.json contains provenance, warnings, repeated HTTP requests, and field-data responses.
