# Production performance measurements

Started: 2026-10-27T14:04:25.446Z. Finished: 2026-10-27T14:12:02.411Z.

Base: https://anandchowdhary-mx4xbr5bd-anand-chowdharys-projects.vercel.app. Source checkout: 765268ff107ec4ea90f6dffd1b98bf93f5ad8e1c; this does not establish the deployed commit.

Chrome/156.0.8078.47; Lighthouse 13.5.0; Node v22.23.4.

Sequential Lighthouse navigations; fresh Chrome process/profile per run; cold browser storage; simulated default mobile/desktop throttling; production CDN cache uncontrolled.

Nebula sandbox; physical runner location unverified. See HTTP x-vercel-id for observed CDN routing.

All cells show median (minimum–maximum). Bytes are transferred KiB; unused JS is Lighthouse estimated savings, not necessarily transferred bytes.

| Route | Device | Valid runs | Performance | LCP seconds | TBT ms | CLS | JS KiB | Total KiB |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| / | mobile | 5 | 96 (93–97) | 2.74 (2.54–3.11) | 16 (12–20) | 0.000 (0.000–0.000) | 77.1 (77.1–77.1) | 1344.6 (1344.5–1344.7) |
| / | desktop | 3 | 100 (100–100) | 0.70 (0.66–0.73) | 0 (0–0) | 0.000 (0.000–0.000) | 99.9 (99.9–99.9) | 1403.3 (1403.1–1403.4) |
| /blog | mobile | 5 | 98 (97–100) | 2.33 (1.46–2.55) | 0 (0–0) | 0.000 (0.000–0.000) | 2.4 (2.4–2.4) | 2737.8 (2737.7–2737.8) |
| /blog | desktop | 3 | 100 (100–100) | 0.64 (0.55–0.66) | 0 (0–0) | 0.000 (0.000–0.000) | 25.3 (25.3–25.3) | 2796.4 (2796.4–2796.4) |
| /blog/2026/future-ai-native-work | mobile | 5 | 100 (100–100) | 1.23 (1.22–1.24) | 0 (0–0) | 0.000 (0.000–0.000) | 2.4 (2.4–2.4) | 79.1 (79.0–79.2) |
| /blog/2026/future-ai-native-work | desktop | 3 | 100 (100–100) | 0.31 (0.30–0.58) | 0 (0–0) | 0.000 (0.000–0.002) | 25.3 (25.3–25.3) | 137.8 (137.7–137.8) |
| /blog/2019/state-of-the-podcasts-2019 | mobile | 5 | 100 (100–100) | 1.22 (1.22–1.23) | 0 (0–0) | 0.000 (0.000–0.000) | 2.4 (2.4–2.5) | 223.2 (223.2–223.2) |
| /blog/2019/state-of-the-podcasts-2019 | desktop | 3 | 100 (100–100) | 0.31 (0.30–0.32) | 0 (0–0) | 0.000 (0.000–0.000) | 25.3 (25.3–25.3) | 296.6 (296.5–296.6) |
| /projects | mobile | 5 | 100 (99–100) | 1.83 (1.38–2.11) | 0 (0–0) | 0.000 (0.000–0.000) | 2.4 (2.4–2.4) | 429.8 (429.8–430.0) |
| /projects | desktop | 3 | 100 (100–100) | 0.35 (0.35–0.36) | 0 (0–0) | 0.000 (0.000–0.000) | 25.3 (25.3–25.3) | 719.5 (719.5–719.6) |
| /life | mobile | 5 | 99 (99–100) | 2.01 (1.24–2.20) | 0 (0–0) | 0.012 (0.000–0.012) | 2.4 (2.4–2.4) | 121.3 (121.3–121.3) |
| /life | desktop | 3 | 100 (100–100) | 0.55 (0.47–0.56) | 0 (0–0) | 0.004 (0.004–0.004) | 25.3 (25.3–25.3) | 180.0 (179.9–180.0) |

## Timing and JavaScript diagnostics

TTFB is the observed LCP breakdown value; LCP/FCP/TBT use simulated throttling. Long-task timings also use Lighthouse simulation.

| Route | Device | FCP s | Observed TTFB ms | JS execution ms | Main-thread ms | Long tasks | Unused JS KiB |
|---|---|---:|---:|---:|---:|---:|---:|
| / | mobile | 1.42 (1.39–1.42) | 49 (44–74) | 182 (168–190) | 1701 (1198–1941) | 3 (3–3) | 37.5 (37.5–37.5) |
| / | desktop | 0.37 (0.37–0.39) | 52 (47–75) | 44 (43–48) | 481 (475–510) | 0 (0–0) | 37.5 (37.5–37.5) |
| /blog | mobile | 0.94 (0.93–0.94) | 44 (42–62) | 15 (14–16) | 499 (472–536) | 1 (0–1) | 0.0 (0.0–0.0) |
| /blog | desktop | 0.27 (0.27–0.28) | 48 (41–50) | 4 (2–4) | 184 (178–186) | 0 (0–0) | 0.0 (0.0–0.0) |
| /blog/2026/future-ai-native-work | mobile | 0.93 (0.92–0.94) | 46 (40–62) | 19 (18–22) | 292 (269–340) | 0 (0–1) | 0.0 (0.0–0.0) |
| /blog/2026/future-ai-native-work | desktop | 0.27 (0.26–0.58) | 51 (49–52) | 2 (0–3) | 115 (108–134) | 0 (0–0) | 0.0 (0.0–0.0) |
| /blog/2019/state-of-the-podcasts-2019 | mobile | 0.92 (0.92–0.93) | 45 (42–53) | 25 (24–28) | 320 (294–386) | 0 (0–2) | 0.0 (0.0–0.0) |
| /blog/2019/state-of-the-podcasts-2019 | desktop | 0.27 (0.26–0.27) | 43 (42–52) | 0 (0–0) | 114 (114–129) | 0 (0–0) | 0.0 (0.0–0.0) |
| /projects | mobile | 0.93 (0.93–1.21) | 47 (43–59) | 22 (21–24) | 366 (312–459) | 0 (0–1) | 0.0 (0.0–0.0) |
| /projects | desktop | 0.27 (0.27–0.27) | 42 (39–53) | 7 (2–7) | 153 (143–163) | 0 (0–0) | 0.0 (0.0–0.0) |
| /life | mobile | 0.94 (0.93–0.96) | 44 (39–64) | 14 (13–16) | 397 (345–416) | 0 (0–1) | 0.0 (0.0–0.0) |
| /life | desktop | 0.28 (0.28–0.29) | 46 (41–46) | 4 (2–4) | 146 (123–147) | 0 (0–0) | 0.0 (0.0–0.0) |

## Transferred resources

| Route | Device | HTML KiB | CSS KiB | Images KiB | Fonts KiB | RSC requests | Preloaded images |
|---|---|---:|---:|---:|---:|---:|---:|
| / | mobile | 11.1 (11.0–11.1) | 10.6 (10.6–10.6) | 1194.3 (1194.2–1194.4) | 51.5 (51.5–51.5) | 0 (0–0) | 45 (45–45) |
| / | desktop | 46.4 (46.4–46.4) | 10.6 (10.6–10.6) | 1194.4 (1194.2–1194.4) | 51.5 (51.5–51.5) | 0 (0–0) | 45 (45–45) |
| /blog | mobile | 7.9 (7.9–7.9) | 10.6 (10.6–10.6) | 2665.3 (2665.2–2665.3) | 51.5 (51.5–51.6) | 0 (0–0) | 42 (42–42) |
| /blog | desktop | 43.3 (43.3–43.3) | 10.6 (10.6–10.6) | 2665.3 (2665.3–2665.3) | 51.5 (51.5–51.6) | 0 (0–0) | 42 (42–42) |
| /blog/2026/future-ai-native-work | mobile | 12.7 (12.7–12.9) | 10.6 (10.6–10.6) | 1.8 (1.8–1.8) | 51.5 (51.5–51.5) | 0 (0–0) | 1 (1–1) |
| /blog/2026/future-ai-native-work | desktop | 48.1 (48.1–48.1) | 10.6 (10.6–10.6) | 1.8 (1.8–1.8) | 51.5 (51.5–51.5) | 0 (0–0) | 1 (1–1) |
| /blog/2019/state-of-the-podcasts-2019 | mobile | 8.9 (8.9–8.9) | 10.6 (10.6–10.6) | 149.7 (149.6–149.7) | 51.5 (51.5–51.6) | 0 (0–0) | 1 (1–1) |
| /blog/2019/state-of-the-podcasts-2019 | desktop | 44.2 (44.2–44.2) | 10.6 (10.6–10.6) | 164.4 (164.4–164.5) | 51.5 (51.5–51.6) | 0 (0–0) | 1 (1–1) |
| /projects | mobile | 11.2 (11.2–11.2) | 10.6 (10.6–10.6) | 354.0 (354.0–354.1) | 51.5 (51.5–51.5) | 0 (0–0) | 1 (1–1) |
| /projects | desktop | 46.6 (46.6–46.6) | 10.6 (10.6–10.6) | 584.9 (584.9–585.0) | 51.5 (51.5–51.6) | 0 (0–0) | 1 (1–1) |
| /life | mobile | 8.9 (8.9–8.9) | 10.6 (10.6–10.6) | 47.8 (47.8–47.8) | 51.5 (51.5–51.5) | 0 (0–0) | 9 (9–9) |
| /life | desktop | 44.3 (44.3–44.3) | 10.6 (10.6–10.6) | 47.8 (47.8–47.8) | 51.5 (51.5–51.5) | 0 (0–0) | 9 (9–9) |

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
| / | 200 | STALE | 216 (216–217) | 101 (100–176) |
| /blog | 200 | STALE | 197 (197–197) | 39 (35–43) |
| /blog/2026/future-ai-native-work | 200 | STALE | 178 (178–178) | 42 (37–43) |
| /blog/2019/state-of-the-podcasts-2019 | 200 | STALE | 159 (159–159) | 38 (35–43) |
| /projects | 200 | STALE | 140 (140–140) | 36 (36–40) |
| /life | 200 | STALE | 120 (120–120) | 36 (35–37) |

## Field data

- mobile: request failed; see manifest for URL/origin data.
- desktop: request failed; see manifest for URL/origin data.

A quota/API failure does not mean insufficient CrUX traffic. Lab TBT is not real-user INP. HTTP timings in manifest.json include this runner’s network overhead and are not field TTFB. Repeated GETs do not force a cold CDN cache.

## Report integrity

48 successful reports; 0 failed runs.
16 reports contain failed network requests; inspect summary.json and raw reports before interpreting scores.

Full audit details and settings are in raw/*.json.gz. summary.json contains all samples, aggregated metrics, failed requests, and audit findings. manifest.json contains provenance, warnings, repeated HTTP requests, and field-data responses.
