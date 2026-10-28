# Production performance baseline

Started: 2026-10-26T12:10:27.931Z. Finished: 2026-10-26T12:18:02.507Z.

Base: https://anandchowdhary.com. Source checkout: 765268ff107ec4ea90f6dffd1b98bf93f5ad8e1c; this does not establish the deployed commit.

Chrome/156.0.8078.47; Lighthouse 13.5.0; Node v22.23.4.

Sequential Lighthouse navigations; fresh Chrome process/profile per run; cold browser storage; simulated default mobile/desktop throttling; production CDN cache uncontrolled.

Nebula sandbox; physical runner location unverified. See HTTP x-vercel-id for observed CDN routing.

All cells show median (minimum–maximum). Bytes are transferred KiB; unused JS is Lighthouse estimated savings, not necessarily transferred bytes.

| Route | Device | Valid runs | Performance | LCP seconds | TBT ms | CLS | JS KiB | Total KiB |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| / | mobile | 5 | 90 (82–92) | 3.27 (3.13–4.26) | 149 (133–205) | 0.000 (0.000–0.000) | 157.4 (157.4–157.4) | 1506.2 (1506.1–1507.2) |
| / | desktop | 3 | 99 (99–100) | 0.84 (0.81–0.91) | 7 (2–11) | 0.000 (0.000–0.000) | 157.4 (157.4–157.4) | 8051.2 (8051.0–8051.2) |
| /blog | mobile | 5 | 93 (91–97) | 2.99 (2.53–3.17) | 163 (106–174) | 0.000 (0.000–0.000) | 164.0 (164.0–164.0) | 3265.7 (3265.5–3266.2) |
| /blog | desktop | 3 | 100 (100–100) | 0.71 (0.64–0.75) | 5 (4–9) | 0.000 (0.000–0.000) | 164.0 (164.0–164.0) | 3320.1 (3319.8–3320.2) |
| /blog/2026/future-ai-native-work | mobile | 5 | 96 (86–96) | 2.67 (2.59–2.97) | 112 (95–187) | 0.000 (0.000–0.150) | 164.0 (163.9–164.0) | 3255.3 (3255.3–3255.4) |
| /blog/2026/future-ai-native-work | desktop | 3 | 100 (100–100) | 0.58 (0.56–0.67) | 2 (0–9) | 0.000 (0.000–0.000) | 164.0 (163.9–164.0) | 3255.5 (3255.4–3255.8) |
| /blog/2019/state-of-the-podcasts-2019 | mobile | 5 | 90 (81–95) | 3.10 (2.78–3.19) | 203 (132–266) | 0.000 (0.000–0.164) | 164.0 (164.0–164.0) | 3659.0 (3658.7–3659.4) |
| /blog/2019/state-of-the-podcasts-2019 | desktop | 3 | 100 (100–100) | 0.61 (0.61–0.62) | 3 (3–3) | 0.001 (0.001–0.001) | 164.0 (164.0–164.0) | 3659.0 (3658.9–3659.1) |
| /projects | mobile | 5 | 69 (64–94) | 11.05 (2.78–12.59) | 278 (170–446) | 0.000 (0.000–0.000) | 157.4 (157.4–157.4) | 8168.4 (8168.1–8168.4) |
| /projects | desktop | 3 | 91 (79–98) | 1.94 (1.05–3.99) | 8 (2–10) | 0.000 (0.000–0.000) | 157.4 (157.3–157.4) | 16706.5 (16705.7–16706.5) |
| /life | mobile | 5 | 96 (94–97) | 2.73 (2.51–2.87) | 109 (92–130) | 0.012 (0.012–0.025) | 188.5 (188.4–188.5) | 1141.7 (1141.4–1142.0) |
| /life | desktop | 3 | 100 (100–100) | 0.68 (0.66–0.68) | 3 (0–5) | 0.004 (0.000–0.009) | 188.5 (188.4–188.5) | 1141.6 (1141.4–1141.9) |

## Timing and JavaScript diagnostics

TTFB is the observed LCP breakdown value; LCP/FCP/TBT use simulated throttling. Long-task timings also use Lighthouse simulation.

| Route | Device | FCP s | Observed TTFB ms | JS execution ms | Main-thread ms | Long tasks | Unused JS KiB |
|---|---|---:|---:|---:|---:|---:|---:|
| / | mobile | 1.04 (0.95–1.07) | 47 (41–54) | 591 (571–637) | 1797 (1653–1876) | 5 (4–5) | 26.6 (26.5–26.6) |
| / | desktop | 0.30 (0.30–0.31) | 52 (51–53) | 191 (170–193) | 524 (513–568) | 1 (1–1) | 26.6 (26.6–26.6) |
| /blog | mobile | 0.93 (0.92–0.93) | 47 (43–48) | 554 (521–610) | 1453 (1407–1533) | 5 (5–6) | 27.5 (27.5–27.5) |
| /blog | desktop | 0.27 (0.26–0.28) | 45 (42–55) | 146 (105–162) | 386 (346–392) | 1 (1–1) | 27.5 (27.5–27.5) |
| /blog/2026/future-ai-native-work | mobile | 0.95 (0.94–0.98) | 50 (42–55) | 542 (493–561) | 1235 (1187–1330) | 3 (3–3) | 27.5 (27.5–27.5) |
| /blog/2026/future-ai-native-work | desktop | 0.29 (0.29–0.29) | 49 (42–54) | 50 (3–91) | 311 (296–348) | 1 (1–1) | 27.5 (27.5–27.5) |
| /blog/2019/state-of-the-podcasts-2019 | mobile | 0.93 (0.92–0.94) | 46 (44–53) | 602 (569–649) | 1506 (1411–1564) | 6 (5–6) | 27.5 (27.5–27.5) |
| /blog/2019/state-of-the-podcasts-2019 | desktop | 0.26 (0.26–0.28) | 45 (44–58) | 144 (104–155) | 366 (366–375) | 1 (1–1) | 27.5 (27.5–27.5) |
| /projects | mobile | 0.95 (0.95–1.01) | 47 (42–51) | 613 (572–637) | 1566 (1466–1676) | 5 (3–6) | 27.5 (27.5–27.5) |
| /projects | desktop | 0.30 (0.29–0.42) | 47 (43–52) | 172 (121–178) | 566 (499–613) | 1 (1–2) | 27.5 (27.5–27.5) |
| /life | mobile | 0.95 (0.94–0.98) | 44 (42–50) | 525 (498–560) | 1238 (1233–1360) | 4 (3–5) | 58.2 (58.2–58.2) |
| /life | desktop | 0.29 (0.28–0.29) | 46 (45–53) | 89 (87–105) | 331 (306–344) | 1 (0–1) | 58.2 (58.2–58.2) |

## Transferred resources

| Route | Device | HTML KiB | CSS KiB | Images KiB | Fonts KiB | RSC requests | Preloaded images |
|---|---|---:|---:|---:|---:|---:|---:|
| / | mobile | 17.6 (17.6–17.6) | 10.9 (10.9–10.9) | 1240.3 (1240.3–1240.8) | 51.7 (51.7–51.8) | 7 (7–7) | 51 (51–51) |
| / | desktop | 17.6 (17.6–17.6) | 10.9 (10.9–10.9) | 7757.5 (7757.5–7757.6) | 51.7 (51.7–51.7) | 13 (13–13) | 139 (139–139) |
| /blog | mobile | 13.5 (13.5–13.5) | 10.9 (10.9–10.9) | 2984.6 (2984.5–2985.1) | 51.7 (51.7–51.7) | 7 (7–7) | 87 (87–87) |
| /blog | desktop | 13.5 (13.5–13.5) | 10.9 (10.9–10.9) | 2984.6 (2984.4–2984.7) | 51.7 (51.7–51.7) | 15 (15–15) | 87 (87–87) |
| /blog/2026/future-ai-native-work | mobile | 16.2 (16.2–16.2) | 10.9 (10.9–10.9) | 2984.4 (2984.4–2984.6) | 51.8 (51.7–51.8) | 6 (6–6) | 87 (87–87) |
| /blog/2026/future-ai-native-work | desktop | 16.2 (16.2–16.2) | 10.9 (10.9–10.9) | 2984.7 (2984.5–2985.0) | 51.7 (51.7–51.7) | 6 (6–6) | 87 (87–87) |
| /blog/2019/state-of-the-podcasts-2019 | mobile | 12.0 (12.0–12.0) | 10.9 (10.9–10.9) | 3392.6 (3392.4–3393.1) | 51.7 (51.7–51.8) | 6 (6–6) | 87 (87–87) |
| /blog/2019/state-of-the-podcasts-2019 | desktop | 12.0 (12.0–12.0) | 10.9 (10.9–10.9) | 3392.6 (3392.5–3392.8) | 51.7 (51.7–51.7) | 6 (6–6) | 87 (87–87) |
| /projects | mobile | 15.2 (15.2–15.2) | 10.9 (10.9–10.9) | 7895.7 (7895.4–7895.7) | 51.7 (51.7–51.8) | 7 (7–7) | 45 (45–45) |
| /projects | desktop | 15.2 (15.2–15.2) | 10.9 (10.9–10.9) | 16405.4 (16405.3–16405.5) | 51.8 (51.7–51.8) | 13 (12–13) | 45 (45–45) |
| /life | mobile | 15.3 (15.3–15.3) | 10.9 (10.9–10.9) | 832.2 (831.9–832.5) | 51.8 (51.7–51.8) | 7 (7–7) | 58 (58–58) |
| /life | desktop | 15.3 (15.3–15.3) | 10.9 (10.9–10.9) | 832.1 (831.9–832.4) | 51.7 (51.7–51.8) | 7 (7–7) | 58 (58–58) |

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
| / | 200 | HIT | 2003 (2002–2003) | 28 (18–101) |
| /blog | 200 | HIT | 1091 (1091–1091) | 24 (23–29) |
| /blog/2026/future-ai-native-work | 200 | HIT | 44 (44–44) | 23 (21–41) |
| /blog/2019/state-of-the-podcasts-2019 | 200 | STALE, HIT | 129 (129–129) | 35 (30–161) |
| /projects | 200 | HIT | 3350 (3350–3350) | 21 (18–35) |
| /life | 200 | HIT | 1093 (1093–1093) | 20 (18–23) |

## Field data

- mobile: 429; Quota exceeded for quota metric 'Queries' and limit 'Queries per day' of service 'pagespeedonline.googleapis.com' for consumer 'project_number:583797351490'..
- desktop: 429; Quota exceeded for quota metric 'Queries' and limit 'Queries per day' of service 'pagespeedonline.googleapis.com' for consumer 'project_number:583797351490'..

A quota/API failure does not mean insufficient CrUX traffic. Lab TBT is not real-user INP. HTTP timings in manifest.json include this runner’s network overhead and are not field TTFB. Repeated GETs do not force a cold CDN cache.

## Report integrity

48 successful reports; 0 failed runs.
48 reports contain failed network requests; inspect summary.json and raw reports before interpreting scores.

Full audit details and settings are in raw/*.json.gz. summary.json contains all samples, aggregated metrics, failed requests, and audit findings. manifest.json contains provenance, warnings, repeated HTTP requests, and field-data responses.
