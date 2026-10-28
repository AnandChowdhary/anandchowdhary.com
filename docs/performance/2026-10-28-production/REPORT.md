# Production performance measurements

Started: 2026-10-28T10:24:36.730Z. Finished: 2026-10-28T10:32:37.253Z.

Base: https://anandchowdhary.com. Source checkout: 968a4cb1e7de3921bc1e98d3f74aee14512b6f81; this does not establish the deployed commit.

Chrome/156.0.8078.47; Lighthouse 13.5.0; Node v22.23.4.

Sequential Lighthouse navigations; fresh Chrome process/profile per run; cold browser storage; simulated default mobile/desktop throttling; production CDN cache uncontrolled.

Nebula sandbox; physical runner location unverified. See HTTP x-vercel-id for observed CDN routing.

All cells show median (minimum–maximum). Bytes are transferred KiB; unused JS is Lighthouse estimated savings, not necessarily transferred bytes.

| Route | Device | Valid runs | Performance | LCP seconds | TBT ms | CLS | JS KiB | Total KiB |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| / | mobile | 5 | 89 (85–91) | 3.33 (3.11–3.82) | 191 (159–207) | 0.000 (0.000–0.000) | 157.4 (157.4–157.4) | 1506.5 (1506.1–1506.9) |
| / | desktop | 3 | 99 (99–100) | 0.84 (0.78–0.96) | 4 (3–6) | 0.000 (0.000–0.000) | 157.4 (157.4–157.4) | 8056.5 (8056.1–8056.7) |
| /blog | mobile | 5 | 91 (87–94) | 3.08 (2.80–3.45) | 183 (146–246) | 0.000 (0.000–0.000) | 164.1 (164.0–164.1) | 3265.7 (3265.6–3266.2) |
| /blog | desktop | 3 | 100 (100–100) | 0.74 (0.73–0.75) | 11 (7–12) | 0.000 (0.000–0.000) | 164.1 (164.0–164.1) | 3320.3 (3319.9–3320.6) |
| /blog/2026/future-ai-native-work | mobile | 5 | 95 (87–96) | 2.63 (2.51–2.98) | 139 (109–144) | 0.000 (0.000–0.150) | 164.0 (164.0–164.0) | 3255.6 (3255.4–3255.9) |
| /blog/2026/future-ai-native-work | desktop | 3 | 100 (99–100) | 0.67 (0.60–0.69) | 7 (4–11) | 0.000 (0.000–0.059) | 164.0 (164.0–164.0) | 3255.3 (3255.3–3256.0) |
| /blog/2019/state-of-the-podcasts-2019 | mobile | 5 | 83 (82–85) | 3.16 (3.10–3.16) | 218 (135–237) | 0.164 (0.156–0.164) | 164.0 (164.0–164.1) | 3659.0 (3647.0–3659.5) |
| /blog/2019/state-of-the-podcasts-2019 | desktop | 3 | 98 (98–99) | 0.69 (0.68–0.73) | 5 (5–11) | 0.082 (0.063–0.082) | 164.0 (164.0–164.0) | 3659.0 (3659.0–3659.2) |
| /projects | mobile | 5 | 93 (65–94) | 2.77 (2.76–11.53) | 206 (170–393) | 0.000 (0.000–0.000) | 157.4 (157.4–157.4) | 8168.1 (8167.9–8168.4) |
| /projects | desktop | 3 | 100 (98–100) | 0.64 (0.61–1.12) | 17 (13–56) | 0.000 (0.000–0.000) | 157.4 (157.4–157.4) | 16706.8 (16706.7–16707.1) |
| /life | mobile | 5 | 95 (95–96) | 2.78 (2.48–2.84) | 118 (102–144) | 0.025 (0.000–0.025) | 188.5 (188.5–188.6) | 1141.6 (1141.5–1141.7) |
| /life | desktop | 3 | 100 (100–100) | 0.69 (0.67–0.72) | 4 (2–9) | 0.009 (0.004–0.009) | 188.5 (188.5–188.5) | 1141.6 (1141.2–1141.7) |

## Timing and JavaScript diagnostics

TTFB is the observed LCP breakdown value; LCP/FCP/TBT use simulated throttling. Long-task timings also use Lighthouse simulation.

| Route | Device | FCP s | Observed TTFB ms | JS execution ms | Main-thread ms | Long tasks | Unused JS KiB |
|---|---|---:|---:|---:|---:|---:|---:|
| / | mobile | 1.04 (1.02–1.06) | 53 (45–66) | 639 (634–687) | 1870 (1778–2075) | 5 (4–6) | 26.6 (26.6–26.6) |
| / | desktop | 0.30 (0.29–0.31) | 46 (45–59) | 190 (187–199) | 564 (516–582) | 1 (1–1) | 26.6 (26.6–26.6) |
| /blog | mobile | 0.93 (0.92–0.93) | 47 (43–54) | 597 (578–683) | 1509 (1434–1663) | 5 (5–6) | 27.5 (27.5–27.5) |
| /blog | desktop | 0.28 (0.27–0.28) | 50 (41–69) | 157 (155–158) | 402 (390–408) | 1 (1–1) | 27.5 (27.5–27.5) |
| /blog/2026/future-ai-native-work | mobile | 0.98 (0.97–0.99) | 47 (45–55) | 602 (557–659) | 1388 (1299–1517) | 4 (3–5) | 27.5 (27.5–27.5) |
| /blog/2026/future-ai-native-work | desktop | 0.29 (0.28–0.29) | 46 (46–54) | 144 (95–169) | 334 (326–371) | 1 (1–1) | 27.5 (27.5–27.5) |
| /blog/2019/state-of-the-podcasts-2019 | mobile | 0.93 (0.92–0.94) | 50 (41–57) | 642 (572–673) | 1556 (1398–1682) | 6 (4–7) | 27.5 (27.5–27.5) |
| /blog/2019/state-of-the-podcasts-2019 | desktop | 0.28 (0.26–0.28) | 49 (44–52) | 110 (110–162) | 397 (372–405) | 1 (1–1) | 27.5 (27.5–27.5) |
| /projects | mobile | 0.97 (0.95–1.00) | 51 (46–57) | 609 (591–671) | 1670 (1579–1797) | 4 (3–6) | 27.5 (27.5–27.5) |
| /projects | desktop | 0.30 (0.28–0.30) | 45 (44–50) | 188 (159–190) | 583 (527–591) | 2 (1–2) | 27.5 (27.5–27.5) |
| /life | mobile | 0.96 (0.95–1.02) | 47 (42–51) | 599 (545–619) | 1359 (1242–1516) | 4 (2–5) | 58.2 (58.2–58.2) |
| /life | desktop | 0.28 (0.28–0.29) | 44 (43–47) | 108 (99–112) | 338 (336–338) | 1 (1–1) | 58.2 (58.2–58.2) |

## Transferred resources

| Route | Device | HTML KiB | CSS KiB | Images KiB | Fonts KiB | RSC requests | Preloaded images |
|---|---|---:|---:|---:|---:|---:|---:|
| / | mobile | 17.6 (17.6–17.6) | 10.9 (10.9–10.9) | 1240.4 (1240.1–1240.5) | 51.7 (51.7–51.8) | 7 (7–7) | 51 (51–51) |
| / | desktop | 17.6 (17.6–17.6) | 10.9 (10.9–10.9) | 7762.6 (7762.3–7762.6) | 51.7 (51.7–51.8) | 13 (13–13) | 139 (139–139) |
| /blog | mobile | 13.5 (13.5–13.5) | 10.9 (10.9–10.9) | 2984.5 (2984.4–2985.1) | 51.7 (51.7–51.8) | 7 (7–7) | 87 (87–87) |
| /blog | desktop | 13.5 (13.5–13.5) | 10.9 (10.9–10.9) | 2984.7 (2984.4–2985.1) | 51.7 (51.7–51.8) | 15 (15–15) | 87 (87–87) |
| /blog/2026/future-ai-native-work | mobile | 16.2 (16.2–16.2) | 10.9 (10.9–10.9) | 2984.7 (2984.5–2985.1) | 51.7 (51.7–51.8) | 6 (6–6) | 87 (87–87) |
| /blog/2026/future-ai-native-work | desktop | 16.2 (16.2–16.2) | 10.9 (10.9–10.9) | 2984.5 (2984.4–2985.1) | 51.7 (51.7–51.8) | 6 (6–6) | 87 (87–87) |
| /blog/2019/state-of-the-podcasts-2019 | mobile | 12.0 (12.0–12.0) | 10.9 (10.9–10.9) | 3392.5 (3380.6–3393.2) | 51.7 (51.7–51.8) | 6 (6–6) | 87 (87–87) |
| /blog/2019/state-of-the-podcasts-2019 | desktop | 12.0 (12.0–12.0) | 10.9 (10.9–10.9) | 3392.6 (3392.6–3392.8) | 51.8 (51.7–51.8) | 6 (6–6) | 87 (87–87) |
| /projects | mobile | 15.2 (15.2–15.2) | 10.9 (10.9–10.9) | 7895.3 (7895.2–7895.7) | 51.7 (51.7–51.8) | 7 (7–7) | 45 (45–45) |
| /projects | desktop | 15.2 (15.2–15.2) | 10.9 (10.9–10.9) | 16405.6 (16405.6–16405.9) | 51.7 (51.7–51.8) | 13 (13–13) | 45 (45–45) |
| /life | mobile | 15.3 (15.3–15.3) | 10.9 (10.9–10.9) | 831.9 (831.9–832.1) | 51.7 (51.7–51.8) | 7 (7–7) | 58 (58–58) |
| /life | desktop | 15.3 (15.3–15.3) | 10.9 (10.9–10.9) | 832.1 (831.7–832.1) | 51.7 (51.7–51.8) | 7 (7–7) | 58 (58–58) |

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
| / | 200 | HIT | 2306 (2306–2306) | 39 (32–149) |
| /blog | 200 | HIT | 1591 (1591–1591) | 28 (27–152) |
| /blog/2026/future-ai-native-work | 200 | STALE | 1854 (1854–1854) | 28 (19–36) |
| /blog/2019/state-of-the-podcasts-2019 | 200 | STALE | 1816 (1816–1816) | 28 (25–32) |
| /projects | 200 | HIT | 1590 (1590–1590) | 20 (19–167) |
| /life | 200 | HIT | 3123 (3123–3123) | 29 (19–42) |

## Field data

- mobile: 429; Quota exceeded for quota metric 'Queries' and limit 'Queries per day' of service 'pagespeedonline.googleapis.com' for consumer 'project_number:583797351490'..
- desktop: 429; Quota exceeded for quota metric 'Queries' and limit 'Queries per day' of service 'pagespeedonline.googleapis.com' for consumer 'project_number:583797351490'..

A quota/API failure does not mean insufficient CrUX traffic. Lab TBT is not real-user INP. HTTP timings in manifest.json include this runner’s network overhead and are not field TTFB. Repeated GETs do not force a cold CDN cache.

## Report integrity

48 successful reports; 0 failed runs.
48 reports contain failed network requests; inspect summary.json and raw reports before interpreting scores.

Full audit details and settings are in raw/*.json.gz. summary.json contains all samples, aggregated metrics, failed requests, and audit findings. manifest.json contains provenance, warnings, repeated HTTP requests, and field-data responses.
