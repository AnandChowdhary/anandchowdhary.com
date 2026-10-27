# Production performance measurements

Started: 2026-10-27T14:20:00.461Z. Finished: 2026-10-27T14:27:49.833Z.

Base: https://anandchowdhary.com. Source checkout: 765268ff107ec4ea90f6dffd1b98bf93f5ad8e1c; this does not establish the deployed commit.

Chrome/156.0.8078.47; Lighthouse 13.5.0; Node v22.23.4.

Sequential Lighthouse navigations; fresh Chrome process/profile per run; cold browser storage; simulated default mobile/desktop throttling; production CDN cache uncontrolled.

Nebula sandbox; physical runner location unverified. See HTTP x-vercel-id for observed CDN routing.

All cells show median (minimum–maximum). Bytes are transferred KiB; unused JS is Lighthouse estimated savings, not necessarily transferred bytes.

| Route | Device | Valid runs | Performance | LCP seconds | TBT ms | CLS | JS KiB | Total KiB |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| / | mobile | 5 | 88 (85–92) | 3.65 (3.06–3.86) | 192 (160–221) | 0.000 (0.000–0.000) | 157.4 (157.4–157.4) | 1506.4 (1506.1–1506.5) |
| / | desktop | 3 | 100 (100–100) | 0.72 (0.64–0.77) | 7 (6–13) | 0.000 (0.000–0.000) | 157.4 (157.4–157.4) | 8069.2 (8068.8–8070.3) |
| /blog | mobile | 5 | 93 (92–95) | 2.81 (2.65–3.04) | 177 (143–240) | 0.000 (0.000–0.000) | 164.1 (164.0–164.1) | 3265.6 (3265.5–3265.8) |
| /blog | desktop | 3 | 100 (100–100) | 0.69 (0.68–0.72) | 8 (7–8) | 0.000 (0.000–0.000) | 164.1 (164.0–164.1) | 3319.9 (3319.0–3319.9) |
| /blog/2026/future-ai-native-work | mobile | 5 | 96 (86–97) | 2.60 (2.51–2.92) | 104 (83–187) | 0.000 (0.000–0.150) | 164.0 (163.9–164.1) | 3255.6 (3255.1–3255.9) |
| /blog/2026/future-ai-native-work | desktop | 3 | 100 (100–100) | 0.57 (0.56–0.63) | 4 (2–6) | 0.000 (0.000–0.000) | 164.0 (163.9–164.0) | 3255.3 (3255.1–3255.6) |
| /blog/2019/state-of-the-podcasts-2019 | mobile | 5 | 84 (81–88) | 3.06 (2.95–3.15) | 242 (167–267) | 0.164 (0.000–0.164) | 164.0 (164.0–164.0) | 3659.2 (3658.9–3659.2) |
| /blog/2019/state-of-the-podcasts-2019 | desktop | 3 | 100 (98–100) | 0.60 (0.60–0.70) | 5 (4–5) | 0.001 (0.001–0.082) | 164.0 (164.0–164.1) | 3659.0 (3658.9–3659.0) |
| /projects | mobile | 5 | 65 (65–90) | 11.05 (2.62–12.86) | 411 (294–429) | 0.000 (0.000–0.000) | 157.4 (157.4–157.5) | 8168.2 (8168.2–8168.5) |
| /projects | desktop | 3 | 100 (97–100) | 0.63 (0.61–1.31) | 24 (18–33) | 0.000 (0.000–0.000) | 157.4 (157.4–157.4) | 16706.5 (16706.4–16706.7) |
| /life | mobile | 5 | 95 (94–95) | 2.79 (2.74–2.83) | 134 (105–152) | 0.012 (0.012–0.025) | 188.5 (188.4–188.5) | 1141.6 (1141.2–1141.9) |
| /life | desktop | 3 | 100 (100–100) | 0.68 (0.65–0.69) | 6 (6–10) | 0.009 (0.004–0.009) | 188.5 (188.5–188.5) | 1141.6 (1141.6–1141.8) |

## Timing and JavaScript diagnostics

TTFB is the observed LCP breakdown value; LCP/FCP/TBT use simulated throttling. Long-task timings also use Lighthouse simulation.

| Route | Device | FCP s | Observed TTFB ms | JS execution ms | Main-thread ms | Long tasks | Unused JS KiB |
|---|---|---:|---:|---:|---:|---:|---:|
| / | mobile | 1.07 (0.98–1.10) | 46 (42–62) | 654 (638–681) | 1846 (1799–2121) | 4 (4–5) | 26.6 (26.5–26.6) |
| / | desktop | 0.31 (0.30–0.31) | 53 (48–96) | 196 (193–209) | 532 (515–627) | 1 (1–1) | 26.5 (26.5–26.6) |
| /blog | mobile | 0.93 (0.92–0.95) | 51 (42–60) | 624 (603–687) | 1560 (1550–1623) | 6 (4–6) | 27.5 (27.5–27.5) |
| /blog | desktop | 0.26 (0.26–0.27) | 45 (43–47) | 164 (151–172) | 405 (380–421) | 1 (1–1) | 27.5 (27.5–27.5) |
| /blog/2026/future-ai-native-work | mobile | 0.97 (0.94–0.98) | 44 (43–57) | 569 (545–698) | 1314 (1268–1535) | 4 (3–5) | 27.5 (27.5–27.5) |
| /blog/2026/future-ai-native-work | desktop | 0.28 (0.28–0.28) | 46 (41–50) | 98 (53–155) | 356 (327–357) | 1 (1–1) | 27.5 (27.5–27.5) |
| /blog/2019/state-of-the-podcasts-2019 | mobile | 0.93 (0.93–0.94) | 46 (40–49) | 645 (634–744) | 1664 (1550–1759) | 7 (5–7) | 27.5 (27.5–27.5) |
| /blog/2019/state-of-the-podcasts-2019 | desktop | 0.27 (0.27–0.27) | 48 (47–53) | 114 (112–152) | 383 (367–403) | 1 (1–1) | 27.5 (27.5–27.5) |
| /projects | mobile | 0.95 (0.94–1.00) | 43 (40–51) | 650 (632–753) | 1674 (1629–1906) | 5 (3–6) | 27.5 (27.5–27.5) |
| /projects | desktop | 0.29 (0.29–0.30) | 48 (47–52) | 178 (175–198) | 587 (579–608) | 2 (2–2) | 27.5 (27.5–27.5) |
| /life | mobile | 1.00 (0.95–1.01) | 45 (41–54) | 612 (544–662) | 1429 (1318–1544) | 5 (4–6) | 58.2 (58.2–58.2) |
| /life | desktop | 0.30 (0.29–0.30) | 53 (48–58) | 121 (107–185) | 380 (377–397) | 1 (1–1) | 58.2 (58.2–58.2) |

## Transferred resources

| Route | Device | HTML KiB | CSS KiB | Images KiB | Fonts KiB | RSC requests | Preloaded images |
|---|---|---:|---:|---:|---:|---:|---:|
| / | mobile | 17.6 (17.6–17.6) | 10.9 (10.9–10.9) | 1240.5 (1240.2–1240.5) | 51.7 (51.7–51.8) | 7 (7–7) | 51 (51–51) |
| / | desktop | 17.6 (17.6–17.6) | 10.9 (10.9–10.9) | 7775.5 (7775.1–7776.1) | 51.7 (51.7–51.8) | 13 (13–13) | 139 (139–139) |
| /blog | mobile | 13.5 (13.5–13.5) | 10.9 (10.9–10.9) | 2984.4 (2984.4–2984.7) | 51.7 (51.7–51.8) | 7 (7–7) | 87 (87–87) |
| /blog | desktop | 13.5 (13.5–13.5) | 10.9 (10.9–10.9) | 2984.4 (2984.3–2984.4) | 51.7 (51.7–51.7) | 15 (14–15) | 87 (87–87) |
| /blog/2026/future-ai-native-work | mobile | 16.2 (16.2–16.2) | 10.9 (10.9–10.9) | 2984.7 (2984.2–2985.0) | 51.7 (51.7–51.7) | 6 (6–6) | 87 (87–87) |
| /blog/2026/future-ai-native-work | desktop | 16.2 (16.2–16.2) | 10.9 (10.9–10.9) | 2984.4 (2984.3–2984.7) | 51.7 (51.7–51.7) | 6 (6–6) | 87 (87–87) |
| /blog/2019/state-of-the-podcasts-2019 | mobile | 12.0 (12.0–12.0) | 10.9 (10.9–10.9) | 3392.8 (3392.5–3392.8) | 51.7 (51.7–51.8) | 6 (6–6) | 87 (87–87) |
| /blog/2019/state-of-the-podcasts-2019 | desktop | 12.0 (12.0–12.0) | 10.9 (10.9–10.9) | 3392.6 (3392.6–3392.6) | 51.7 (51.7–51.7) | 6 (6–6) | 87 (87–87) |
| /projects | mobile | 15.2 (15.2–15.2) | 10.9 (10.9–10.9) | 7895.4 (7895.4–7895.7) | 51.8 (51.7–51.8) | 7 (7–7) | 45 (45–45) |
| /projects | desktop | 15.2 (15.2–15.2) | 10.9 (10.9–10.9) | 16405.3 (16405.3–16405.5) | 51.7 (51.7–51.7) | 13 (13–13) | 45 (45–45) |
| /life | mobile | 15.3 (15.3–15.3) | 10.9 (10.9–10.9) | 832.0 (831.7–832.4) | 51.7 (51.7–51.8) | 7 (7–7) | 58 (58–58) |
| /life | desktop | 15.3 (15.3–15.3) | 10.9 (10.9–10.9) | 832.1 (832.0–832.2) | 51.8 (51.7–51.8) | 7 (7–7) | 58 (58–58) |

## Audit categories

| Route | Device | Accessibility | Best practices | SEO |
|---|---|---:|---:|---:|
| / | mobile | 94 (94–94) | 73 (73–73) | 100 (100–100) |
| / | desktop | 94 (94–94) | 73 (73–73) | 100 (100–100) |
| /blog | mobile | 95 (95–95) | 73 (73–73) | 100 (100–100) |
| /blog | desktop | 95 (95–95) | 73 (73–73) | 100 (100–100) |
| /blog/2026/future-ai-native-work | mobile | 95 (95–95) | 73 (73–73) | 100 (100–100) |
| /blog/2026/future-ai-native-work | desktop | 95 (95–95) | 73 (73–73) | 100 (100–100) |
| /blog/2019/state-of-the-podcasts-2019 | mobile | 96 (96–96) | 73 (73–73) | 100 (100–100) |
| /blog/2019/state-of-the-podcasts-2019 | desktop | 96 (96–96) | 73 (73–73) | 100 (100–100) |
| /projects | mobile | 95 (95–95) | 73 (73–73) | 100 (100–100) |
| /projects | desktop | 95 (95–95) | 73 (73–73) | 100 (100–100) |
| /life | mobile | 95 (95–95) | 73 (73–73) | 91 (91–91) |
| /life | desktop | 95 (95–95) | 73 (73–73) | 91 (91–91) |

## Repeated HTTP GET observations

Headers latency includes network overhead. Age values and HIT/STALE headers do not prove end-to-end content freshness.

| Route | Status | Vercel cache | Age seconds | Headers latency ms |
|---|---|---|---:|---:|
| / | 200 | STALE | 3732 (3732–3732) | 35 (23–201) |
| /blog | 200 | HIT | 2926 (2926–2926) | 35 (22–41) |
| /blog/2026/future-ai-native-work | 200 | STALE | 1133 (1133–1133) | 24 (19–32) |
| /blog/2019/state-of-the-podcasts-2019 | 200 | STALE | 1095 (1095–1095) | 25 (23–27) |
| /projects | 200 | HIT | 2923 (2923–2923) | 25 (23–27) |
| /life | 200 | STALE | 3734 (3734–3734) | 29 (21–30) |

## Field data

- mobile: 429; Quota exceeded for quota metric 'Queries' and limit 'Queries per day' of service 'pagespeedonline.googleapis.com' for consumer 'project_number:583797351490'..
- desktop: 429; Quota exceeded for quota metric 'Queries' and limit 'Queries per day' of service 'pagespeedonline.googleapis.com' for consumer 'project_number:583797351490'..

A quota/API failure does not mean insufficient CrUX traffic. Lab TBT is not real-user INP. HTTP timings in manifest.json include this runner’s network overhead and are not field TTFB. Repeated GETs do not force a cold CDN cache.

## Report integrity

48 successful reports; 0 failed runs.
48 reports contain failed network requests; inspect summary.json and raw reports before interpreting scores.

Full audit details and settings are in raw/*.json.gz. summary.json contains all samples, aggregated metrics, failed requests, and audit findings. manifest.json contains provenance, warnings, repeated HTTP requests, and field-data responses.
