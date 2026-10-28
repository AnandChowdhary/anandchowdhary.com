# Production performance measurements

Started: 2026-10-28T10:17:04.654Z. Finished: 2026-10-28T10:24:32.876Z.

Base: https://anandchowdhary.github.io/anandchowdhary.com. Source checkout: 968a4cb1e7de3921bc1e98d3f74aee14512b6f81; this does not establish the deployed commit.

Chrome/156.0.8078.47; Lighthouse 13.5.0; Node v22.23.4.

Sequential Lighthouse navigations; fresh Chrome process/profile per run; cold browser storage; simulated default mobile/desktop throttling; production CDN cache uncontrolled.

Nebula sandbox; physical runner location unverified. See HTTP x-vercel-id for observed CDN routing.

All cells show median (minimum–maximum). Bytes are transferred KiB; unused JS is Lighthouse estimated savings, not necessarily transferred bytes.

| Route | Device | Valid runs | Performance | LCP seconds | TBT ms | CLS | JS KiB | Total KiB |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| / | mobile | 5 | 99 (98–99) | 2.21 (2.01–2.42) | 24 (17–38) | 0.000 (0.000–0.000) | 74.6 (74.5–74.7) | 1342.6 (1342.5–1342.9) |
| / | desktop | 3 | 100 (100–100) | 0.73 (0.54–0.81) | 0 (0–0) | 0.000 (0.000–0.000) | 74.6 (74.5–74.6) | 1342.5 (1342.5–1342.6) |
| /blog | mobile | 5 | 99 (99–100) | 2.14 (1.87–2.24) | 0 (0–0) | 0.000 (0.000–0.000) | 0.0 (0.0–0.0) | 2736.6 (2736.6–2736.6) |
| /blog | desktop | 3 | 100 (100–100) | 0.42 (0.40–0.59) | 0 (0–0) | 0.000 (0.000–0.000) | 0.0 (0.0–0.0) | 2736.5 (2736.4–2736.6) |
| /blog/2026/future-ai-native-work | mobile | 5 | 100 (100–100) | 1.22 (1.21–1.28) | 0 (0–0) | 0.000 (0.000–0.000) | 0.0 (0.0–0.0) | 75.9 (75.8–75.9) |
| /blog/2026/future-ai-native-work | desktop | 3 | 100 (100–100) | 0.29 (0.28–0.29) | 0 (0–0) | 0.000 (0.000–0.000) | 0.0 (0.0–0.0) | 75.8 (75.8–75.9) |
| /blog/2019/state-of-the-podcasts-2019 | mobile | 5 | 100 (100–100) | 1.29 (1.28–1.30) | 0 (0–0) | 0.000 (0.000–0.000) | 0.0 (0.0–0.0) | 220.4 (220.3–220.4) |
| /blog/2019/state-of-the-podcasts-2019 | desktop | 3 | 100 (100–100) | 0.29 (0.29–0.29) | 0 (0–0) | 0.000 (0.000–0.000) | 0.0 (0.0–0.0) | 235.0 (235.0–235.1) |
| /projects | mobile | 5 | 100 (100–100) | 1.45 (1.44–1.45) | 0 (0–0) | 0.000 (0.000–0.000) | 0.0 (0.0–0.0) | 429.4 (429.3–429.5) |
| /projects | desktop | 3 | 100 (100–100) | 0.34 (0.34–0.38) | 0 (0–0) | 0.000 (0.000–0.000) | 0.0 (0.0–0.0) | 661.7 (661.6–661.7) |
| /life | mobile | 5 | 99 (99–100) | 2.00 (1.76–2.02) | 0 (0–0) | 0.012 (0.000–0.012) | 0.0 (0.0–0.0) | 119.7 (119.7–119.8) |
| /life | desktop | 3 | 100 (100–100) | 0.54 (0.53–0.63) | 0 (0–0) | 0.004 (0.004–0.004) | 0.0 (0.0–0.0) | 119.7 (119.7–119.7) |

## Timing and JavaScript diagnostics

TTFB is the observed LCP breakdown value; LCP/FCP/TBT use simulated throttling. Long-task timings also use Lighthouse simulation.

| Route | Device | FCP s | Observed TTFB ms | JS execution ms | Main-thread ms | Long tasks | Unused JS KiB |
|---|---|---:|---:|---:|---:|---:|---:|
| / | mobile | 0.96 (0.95–1.01) | 123 (39–150) | 181 (161–189) | 1702 (1509–2066) | 4 (3–4) | 36.9 (36.9–36.9) |
| / | desktop | 0.31 (0.26–0.32) | 32 (25–41) | 44 (42–45) | 404 (402–405) | 0 (0–0) | 36.9 (36.9–36.9) |
| /blog | mobile | 0.91 (0.90–0.91) | 204 (47–219) | 13 (12–13) | 504 (458–535) | 2 (2–3) | 0.0 (0.0–0.0) |
| /blog | desktop | 0.34 (0.25–0.36) | 228 (47–233) | 2 (1–3) | 138 (108–177) | 0 (0–0) | 0.0 (0.0–0.0) |
| /blog/2026/future-ai-native-work | mobile | 0.92 (0.91–0.98) | 235 (186–358) | 19 (16–19) | 271 (236–364) | 0 (0–2) | 0.0 (0.0–0.0) |
| /blog/2026/future-ai-native-work | desktop | 0.25 (0.24–0.25) | 42 (39–48) | 0 (0–0) | 65 (64–69) | 0 (0–0) | 0.0 (0.0–0.0) |
| /blog/2019/state-of-the-podcasts-2019 | mobile | 0.99 (0.98–1.00) | 221 (196–236) | 22 (22–25) | 334 (299–348) | 0 (0–0) | 0.0 (0.0–0.0) |
| /blog/2019/state-of-the-podcasts-2019 | desktop | 0.25 (0.25–0.25) | 40 (36–46) | 0 (0–1) | 92 (87–97) | 0 (0–0) | 0.0 (0.0–0.0) |
| /projects | mobile | 1.00 (0.99–1.00) | 239 (217–268) | 20 (19–21) | 382 (289–449) | 1 (0–1) | 0.0 (0.0–0.0) |
| /projects | desktop | 0.26 (0.26–0.26) | 47 (42–52) | 7 (2–8) | 135 (111–234) | 0 (0–0) | 0.0 (0.0–0.0) |
| /life | mobile | 0.92 (0.92–0.93) | 208 (129–225) | 12 (12–14) | 372 (363–431) | 1 (1–2) | 0.0 (0.0–0.0) |
| /life | desktop | 0.36 (0.25–0.36) | 205 (40–234) | 2 (0–2) | 101 (83–116) | 0 (0–0) | 0.0 (0.0–0.0) |

## Transferred resources

| Route | Device | HTML KiB | CSS KiB | Images KiB | Fonts KiB | RSC requests | Preloaded images |
|---|---|---:|---:|---:|---:|---:|---:|
| / | mobile | 12.1 (12.1–12.1) | 10.3 (10.2–10.3) | 1194.1 (1194.0–1194.3) | 51.6 (51.5–51.7) | 0 (0–0) | 45 (45–45) |
| / | desktop | 12.1 (12.1–12.1) | 10.2 (10.2–10.2) | 1194.1 (1194.1–1194.2) | 51.5 (51.5–51.6) | 0 (0–0) | 45 (45–45) |
| /blog | mobile | 9.0 (9.0–9.1) | 10.2 (10.2–10.3) | 2665.3 (2665.3–2665.4) | 51.6 (51.6–51.7) | 0 (0–0) | 42 (42–42) |
| /blog | desktop | 9.0 (9.0–9.0) | 10.2 (10.2–10.2) | 2665.2 (2665.2–2665.4) | 51.6 (51.6–51.7) | 0 (0–0) | 42 (42–42) |
| /blog/2026/future-ai-native-work | mobile | 11.9 (11.9–11.9) | 10.2 (10.2–10.2) | 1.7 (1.7–1.8) | 51.6 (51.6–51.7) | 0 (0–0) | 1 (1–1) |
| /blog/2026/future-ai-native-work | desktop | 11.9 (11.9–11.9) | 10.2 (10.2–10.3) | 1.7 (1.7–1.8) | 51.6 (51.5–51.6) | 0 (0–0) | 1 (1–1) |
| /blog/2019/state-of-the-podcasts-2019 | mobile | 8.2 (8.2–8.2) | 10.3 (10.2–10.3) | 149.9 (149.9–149.9) | 51.5 (51.5–51.6) | 0 (0–0) | 1 (1–1) |
| /blog/2019/state-of-the-podcasts-2019 | desktop | 8.2 (8.2–8.2) | 10.2 (10.2–10.3) | 164.5 (164.5–164.7) | 51.6 (51.5–51.6) | 0 (0–0) | 1 (1–1) |
| /projects | mobile | 12.4 (12.4–12.5) | 10.2 (10.2–10.3) | 354.8 (354.7–354.8) | 51.6 (51.5–51.7) | 0 (0–0) | 1 (1–1) |
| /projects | desktop | 12.4 (12.4–12.4) | 10.2 (10.2–10.3) | 587.1 (587.0–587.1) | 51.6 (51.5–51.6) | 0 (0–0) | 1 (1–1) |
| /life | mobile | 9.7 (9.7–9.7) | 10.3 (10.2–10.3) | 47.8 (47.8–47.8) | 51.6 (51.5–51.6) | 0 (0–0) | 9 (9–9) |
| /life | desktop | 9.7 (9.7–9.7) | 10.2 (10.2–10.3) | 47.8 (47.8–47.8) | 51.6 (51.5–51.7) | 0 (0–0) | 9 (9–9) |

## Audit categories

| Route | Device | Accessibility | Best practices | SEO |
|---|---|---:|---:|---:|
| / | mobile | 100 (100–100) | 96 (96–96) | 100 (100–100) |
| / | desktop | 100 (100–100) | 96 (96–96) | 100 (100–100) |
| /blog | mobile | 100 (100–100) | 100 (100–100) | 100 (100–100) |
| /blog | desktop | 100 (100–100) | 100 (100–100) | 100 (100–100) |
| /blog/2026/future-ai-native-work | mobile | 100 (100–100) | 100 (100–100) | 100 (100–100) |
| /blog/2026/future-ai-native-work | desktop | 100 (100–100) | 100 (100–100) | 100 (100–100) |
| /blog/2019/state-of-the-podcasts-2019 | mobile | 99 (99–99) | 100 (100–100) | 100 (100–100) |
| /blog/2019/state-of-the-podcasts-2019 | desktop | 99 (99–99) | 100 (100–100) | 100 (100–100) |
| /projects | mobile | 100 (100–100) | 100 (100–100) | 100 (100–100) |
| /projects | desktop | 100 (100–100) | 100 (100–100) | 100 (100–100) |
| /life | mobile | 100 (100–100) | 96 (96–96) | 100 (100–100) |
| /life | desktop | 100 (100–100) | 96 (96–96) | 100 (100–100) |

## Repeated HTTP GET observations

Headers latency includes network overhead. Age values and HIT/STALE headers do not prove end-to-end content freshness.

| Route | Status | Vercel cache | Age seconds | Headers latency ms |
|---|---|---|---:|---:|
| / | 200 | n/a | 0 (0–0) | 14 (12–157) |
| /blog | 200 | n/a | 0 (0–0) | 40 (21–231) |
| /blog/2026/future-ai-native-work | 200 | n/a | 0 (0–0) | 19 (19–207) |
| /blog/2019/state-of-the-podcasts-2019 | 200 | n/a | 0 (0–0) | 19 (18–209) |
| /projects | 200 | n/a | 0 (0–0) | 25 (19–208) |
| /life | 200 | n/a | 0 (0–0) | 22 (21–182) |

## Field data

- mobile: 429; Quota exceeded for quota metric 'Queries' and limit 'Queries per day' of service 'pagespeedonline.googleapis.com' for consumer 'project_number:583797351490'..
- desktop: 429; Quota exceeded for quota metric 'Queries' and limit 'Queries per day' of service 'pagespeedonline.googleapis.com' for consumer 'project_number:583797351490'..

A quota/API failure does not mean insufficient CrUX traffic. Lab TBT is not real-user INP. HTTP timings in manifest.json include this runner’s network overhead and are not field TTFB. Repeated GETs do not force a cold CDN cache.

## Report integrity

48 successful reports; 0 failed runs.
16 reports contain failed network requests; inspect summary.json and raw reports before interpreting scores.

Full audit details and settings are in raw/*.json.gz. summary.json contains all samples, aggregated metrics, failed requests, and audit findings. manifest.json contains provenance, warnings, repeated HTTP requests, and field-data responses.
