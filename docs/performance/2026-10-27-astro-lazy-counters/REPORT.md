# Production performance measurements

Started: 2026-10-27T14:12:13.772Z. Finished: 2026-10-27T14:19:56.705Z.

Base: https://anandchowdhary-6e0j2fvpf-anand-chowdharys-projects.vercel.app. Source checkout: 765268ff107ec4ea90f6dffd1b98bf93f5ad8e1c; this does not establish the deployed commit.

Chrome/156.0.8078.47; Lighthouse 13.5.0; Node v22.23.4.

Sequential Lighthouse navigations; fresh Chrome process/profile per run; cold browser storage; simulated default mobile/desktop throttling; production CDN cache uncontrolled.

Nebula sandbox; physical runner location unverified. See HTTP x-vercel-id for observed CDN routing.

All cells show median (minimum–maximum). Bytes are transferred KiB; unused JS is Lighthouse estimated savings, not necessarily transferred bytes.

| Route | Device | Valid runs | Performance | LCP seconds | TBT ms | CLS | JS KiB | Total KiB |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| / | mobile | 5 | 99 (99–99) | 2.04 (1.95–2.16) | 15 (13–22) | 0.000 (0.000–0.000) | 78.1 (78.1–78.1) | 1345.7 (1345.5–1345.7) |
| / | desktop | 3 | 100 (100–100) | 0.52 (0.51–0.54) | 0 (0–0) | 0.000 (0.000–0.000) | 101.0 (101.0–101.0) | 1404.3 (1404.3–1404.5) |
| /blog | mobile | 5 | 99 (97–99) | 2.04 (2.01–2.53) | 0 (0–0) | 0.000 (0.000–0.000) | 2.4 (2.4–2.4) | 2737.7 (2737.7–2737.8) |
| /blog | desktop | 3 | 100 (100–100) | 0.60 (0.58–0.67) | 0 (0–0) | 0.000 (0.000–0.000) | 25.3 (25.3–25.3) | 2796.4 (2796.4–2796.4) |
| /blog/2026/future-ai-native-work | mobile | 5 | 100 (100–100) | 1.24 (1.23–1.59) | 0 (0–0) | 0.000 (0.000–0.000) | 2.4 (2.4–2.4) | 79.1 (79.0–79.1) |
| /blog/2026/future-ai-native-work | desktop | 3 | 100 (100–100) | 0.32 (0.31–0.33) | 0 (0–0) | 0.000 (0.000–0.000) | 25.3 (25.3–25.3) | 137.8 (137.7–137.8) |
| /blog/2019/state-of-the-podcasts-2019 | mobile | 5 | 100 (100–100) | 1.22 (1.22–1.27) | 0 (0–0) | 0.000 (0.000–0.000) | 2.4 (2.4–2.5) | 223.2 (223.2–223.2) |
| /blog/2019/state-of-the-podcasts-2019 | desktop | 3 | 100 (100–100) | 0.30 (0.30–0.52) | 0 (0–0) | 0.000 (0.000–0.039) | 25.3 (25.3–25.3) | 296.7 (296.6–296.7) |
| /projects | mobile | 5 | 100 (100–100) | 1.38 (1.37–1.39) | 0 (0–0) | 0.000 (0.000–0.000) | 2.4 (2.4–2.4) | 429.8 (429.8–430.0) |
| /projects | desktop | 3 | 100 (100–100) | 0.36 (0.34–0.37) | 0 (0–0) | 0.000 (0.000–0.000) | 25.3 (25.3–25.3) | 719.5 (719.5–719.5) |
| /life | mobile | 5 | 100 (99–100) | 1.78 (1.76–1.99) | 0 (0–0) | 0.012 (0.000–0.012) | 2.4 (2.4–2.4) | 121.3 (121.3–121.3) |
| /life | desktop | 3 | 100 (100–100) | 0.56 (0.49–0.56) | 0 (0–0) | 0.004 (0.004–0.004) | 25.3 (25.3–25.3) | 179.9 (179.9–180.0) |

## Timing and JavaScript diagnostics

TTFB is the observed LCP breakdown value; LCP/FCP/TBT use simulated throttling. Long-task timings also use Lighthouse simulation.

| Route | Device | FCP s | Observed TTFB ms | JS execution ms | Main-thread ms | Long tasks | Unused JS KiB |
|---|---|---:|---:|---:|---:|---:|---:|
| / | mobile | 0.95 (0.94–1.06) | 45 (44–53) | 177 (169–190) | 1526 (1507–1752) | 3 (2–4) | 37.5 (37.5–37.5) |
| / | desktop | 0.29 (0.28–0.29) | 46 (44–60) | 45 (44–49) | 481 (461–523) | 0 (0–0) | 37.5 (37.5–37.5) |
| /blog | mobile | 0.93 (0.93–0.94) | 43 (40–65) | 16 (14–17) | 481 (435–614) | 1 (1–2) | 0.0 (0.0–0.0) |
| /blog | desktop | 0.27 (0.27–0.29) | 43 (42–46) | 4 (4–4) | 184 (177–188) | 0 (0–0) | 0.0 (0.0–0.0) |
| /blog/2026/future-ai-native-work | mobile | 0.94 (0.93–0.94) | 42 (40–48) | 19 (18–21) | 319 (245–339) | 0 (0–1) | 0.0 (0.0–0.0) |
| /blog/2026/future-ai-native-work | desktop | 0.28 (0.27–0.29) | 47 (44–52) | 0 (0–2) | 115 (102–135) | 0 (0–0) | 0.0 (0.0–0.0) |
| /blog/2019/state-of-the-podcasts-2019 | mobile | 0.92 (0.92–0.97) | 44 (41–47) | 25 (25–27) | 340 (296–367) | 0 (0–1) | 0.0 (0.0–0.0) |
| /blog/2019/state-of-the-podcasts-2019 | desktop | 0.26 (0.26–0.26) | 48 (43–64) | 2 (0–7) | 137 (119–144) | 0 (0–0) | 0.0 (0.0–0.0) |
| /projects | mobile | 0.93 (0.92–0.94) | 45 (40–50) | 24 (21–27) | 363 (335–385) | 0 (0–1) | 0.0 (0.0–0.0) |
| /projects | desktop | 0.28 (0.26–0.28) | 44 (41–50) | 7 (7–8) | 159 (156–173) | 0 (0–0) | 0.0 (0.0–0.0) |
| /life | mobile | 0.94 (0.93–0.94) | 43 (40–44) | 16 (15–19) | 390 (346–454) | 0 (0–1) | 0.0 (0.0–0.0) |
| /life | desktop | 0.29 (0.29–0.29) | 47 (46–48) | 4 (3–4) | 158 (130–160) | 0 (0–0) | 0.0 (0.0–0.0) |

## Transferred resources

| Route | Device | HTML KiB | CSS KiB | Images KiB | Fonts KiB | RSC requests | Preloaded images |
|---|---|---:|---:|---:|---:|---:|---:|
| / | mobile | 11.0 (11.0–11.1) | 10.6 (10.6–10.6) | 1194.3 (1194.2–1194.4) | 51.5 (51.5–51.6) | 0 (0–0) | 45 (45–45) |
| / | desktop | 46.4 (46.4–46.4) | 10.6 (10.6–10.6) | 1194.3 (1194.2–1194.4) | 51.5 (51.5–51.5) | 0 (0–0) | 45 (45–45) |
| /blog | mobile | 7.9 (7.9–7.9) | 10.6 (10.6–10.6) | 2665.2 (2665.2–2665.3) | 51.5 (51.5–51.5) | 0 (0–0) | 42 (42–42) |
| /blog | desktop | 43.3 (43.3–43.3) | 10.6 (10.6–10.6) | 2665.2 (2665.2–2665.3) | 51.5 (51.5–51.5) | 0 (0–0) | 42 (42–42) |
| /blog/2026/future-ai-native-work | mobile | 12.7 (12.7–12.7) | 10.6 (10.6–10.6) | 1.8 (1.8–1.8) | 51.5 (51.5–51.5) | 0 (0–0) | 1 (1–1) |
| /blog/2026/future-ai-native-work | desktop | 48.1 (48.1–48.1) | 10.6 (10.6–10.6) | 1.8 (1.8–1.8) | 51.5 (51.5–51.5) | 0 (0–0) | 1 (1–1) |
| /blog/2019/state-of-the-podcasts-2019 | mobile | 8.9 (8.9–8.9) | 10.6 (10.6–10.6) | 149.7 (149.6–149.7) | 51.5 (51.5–51.5) | 0 (0–0) | 1 (1–1) |
| /blog/2019/state-of-the-podcasts-2019 | desktop | 44.3 (44.3–44.3) | 10.6 (10.6–10.6) | 164.5 (164.5–164.5) | 51.5 (51.5–51.5) | 0 (0–0) | 1 (1–1) |
| /projects | mobile | 11.2 (11.2–11.3) | 10.6 (10.6–10.6) | 354.0 (354.0–354.1) | 51.5 (51.5–51.5) | 0 (0–0) | 1 (1–1) |
| /projects | desktop | 46.6 (46.6–46.6) | 10.6 (10.6–10.6) | 584.9 (584.9–585.0) | 51.5 (51.5–51.5) | 0 (0–0) | 1 (1–1) |
| /life | mobile | 8.9 (8.9–9.0) | 10.6 (10.6–10.6) | 47.8 (47.8–47.8) | 51.5 (51.5–51.6) | 0 (0–0) | 9 (9–9) |
| /life | desktop | 44.3 (44.2–44.3) | 10.6 (10.6–10.6) | 47.8 (47.8–47.8) | 51.5 (51.5–51.5) | 0 (0–0) | 9 (9–9) |

## Audit categories

| Route | Device | Accessibility | Best practices | SEO |
|---|---|---:|---:|---:|
| / | mobile | 100 (100–100) | 96 (96–96) | 63 (63–63) |
| / | desktop | 100 (100–100) | 96 (96–96) | 63 (63–63) |
| /blog | mobile | 100 (100–100) | 100 (100–100) | 63 (63–63) |
| /blog | desktop | 100 (100–100) | 100 (100–100) | 63 (63–63) |
| /blog/2026/future-ai-native-work | mobile | 100 (100–100) | 100 (100–100) | 63 (63–63) |
| /blog/2026/future-ai-native-work | desktop | 100 (100–100) | 100 (100–100) | 63 (63–63) |
| /blog/2019/state-of-the-podcasts-2019 | mobile | 99 (99–99) | 100 (100–100) | 63 (63–63) |
| /blog/2019/state-of-the-podcasts-2019 | desktop | 99 (99–99) | 100 (100–100) | 63 (63–63) |
| /projects | mobile | 100 (100–100) | 100 (100–100) | 63 (63–63) |
| /projects | desktop | 100 (100–100) | 100 (100–100) | 63 (63–63) |
| /life | mobile | 100 (100–100) | 96 (96–96) | 63 (63–63) |
| /life | desktop | 100 (100–100) | 96 (96–96) | 63 (63–63) |

## Repeated HTTP GET observations

Headers latency includes network overhead. Age values and HIT/STALE headers do not prove end-to-end content freshness.

| Route | Status | Vercel cache | Age seconds | Headers latency ms |
|---|---|---|---:|---:|
| / | 200 | MISS, HIT | 0 (0–0) | 359 (328–2330) |
| /blog | 200 | MISS, HIT | 0 (0–0) | 431 (40–440) |
| /blog/2026/future-ai-native-work | 200 | MISS, HIT | 0 (0–0) | 241 (148–344) |
| /blog/2019/state-of-the-podcasts-2019 | 200 | MISS, HIT | 0 (0–0) | 285 (35–298) |
| /projects | 200 | MISS, HIT | 0 (0–0) | 285 (38–426) |
| /life | 200 | MISS, HIT | 0 (0–0) | 419 (35–421) |

## Field data

- mobile: request failed; see manifest for URL/origin data.
- desktop: request failed; see manifest for URL/origin data.

A quota/API failure does not mean insufficient CrUX traffic. Lab TBT is not real-user INP. HTTP timings in manifest.json include this runner’s network overhead and are not field TTFB. Repeated GETs do not force a cold CDN cache.

## Report integrity

48 successful reports; 0 failed runs.
16 reports contain failed network requests; inspect summary.json and raw reports before interpreting scores.

Full audit details and settings are in raw/*.json.gz. summary.json contains all samples, aggregated metrics, failed requests, and audit findings. manifest.json contains provenance, warnings, repeated HTTP requests, and field-data responses.
