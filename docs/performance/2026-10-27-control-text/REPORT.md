# Production performance measurements

Started: 2026-10-27T14:27:53.599Z. Finished: 2026-10-27T14:29:00.461Z.

Base: https://anandchowdhary-pkxw7uwdl-anand-chowdharys-projects.vercel.app. Source checkout: 7d3758efad3c7dbefb97329012169a9f73b29350; this does not establish the deployed commit.

Chrome/156.0.8078.47; Lighthouse 13.5.0; Node v22.23.4.

Sequential Lighthouse navigations; fresh Chrome process/profile per run; cold browser storage; simulated default mobile/desktop throttling; production CDN cache uncontrolled.

Nebula sandbox; physical runner location unverified. See HTTP x-vercel-id for observed CDN routing.

All cells show median (minimum–maximum). Bytes are transferred KiB; unused JS is Lighthouse estimated savings, not necessarily transferred bytes.

| Route | Device | Valid runs | Performance | LCP seconds | TBT ms | CLS | JS KiB | Total KiB |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| /blog/2026/future-ai-native-work | mobile | 5 | 100 (100–100) | 1.84 (1.38–1.90) | 0 (0–0) | 0.000 (0.000–0.000) | 2.4 (2.4–2.4) | 143.0 (142.9–143.0) |
| /blog/2026/future-ai-native-work | desktop | 3 | 100 (100–100) | 0.54 (0.33–0.69) | 0 (0–0) | 0.000 (0.000–0.000) | 25.3 (25.3–25.3) | 201.6 (201.6–201.6) |

## Timing and JavaScript diagnostics

TTFB is the observed LCP breakdown value; LCP/FCP/TBT use simulated throttling. Long-task timings also use Lighthouse simulation.

| Route | Device | FCP s | Observed TTFB ms | JS execution ms | Main-thread ms | Long tasks | Unused JS KiB |
|---|---|---:|---:|---:|---:|---:|---:|
| /blog/2026/future-ai-native-work | mobile | 0.94 (0.93–1.06) | 60 (46–73) | 20 (18–21) | 279 (267–332) | 0 (0–1) | 0.0 (0.0–0.0) |
| /blog/2026/future-ai-native-work | desktop | 0.27 (0.27–0.28) | 67 (42–70) | 0 (0–0) | 116 (114–123) | 0 (0–0) | 0.0 (0.0–0.0) |

## Transferred resources

| Route | Device | HTML KiB | CSS KiB | Images KiB | Fonts KiB | RSC requests | Preloaded images |
|---|---|---:|---:|---:|---:|---:|---:|
| /blog/2026/future-ai-native-work | mobile | 12.6 (12.5–12.6) | 10.6 (10.6–10.6) | 65.8 (65.8–65.8) | 51.5 (51.5–51.6) | 0 (0–0) | 1 (1–1) |
| /blog/2026/future-ai-native-work | desktop | 47.9 (47.9–47.9) | 10.6 (10.6–10.6) | 65.8 (65.8–65.8) | 51.5 (51.5–51.5) | 0 (0–0) | 1 (1–1) |

## Audit categories

| Route | Device | Accessibility | Best practices | SEO |
|---|---|---:|---:|---:|
| /blog/2026/future-ai-native-work | mobile | 100 (100–100) | 100 (100–100) | 63 (63–63) |
| /blog/2026/future-ai-native-work | desktop | 100 (100–100) | 100 (100–100) | 63 (63–63) |

## Repeated HTTP GET observations

Headers latency includes network overhead. Age values and HIT/STALE headers do not prove end-to-end content freshness.

| Route | Status | Vercel cache | Age seconds | Headers latency ms |
|---|---|---|---:|---:|
| /blog/2026/future-ai-native-work | 200 | MISS, HIT | 0 (0–0) | 351 (48–1897) |

## Field data

- mobile: request failed; see manifest for URL/origin data.
- desktop: request failed; see manifest for URL/origin data.

A quota/API failure does not mean insufficient CrUX traffic. Lab TBT is not real-user INP. HTTP timings in manifest.json include this runner’s network overhead and are not field TTFB. Repeated GETs do not force a cold CDN cache.

## Report integrity

8 successful reports; 0 failed runs.
0 reports contain failed network requests; inspect summary.json and raw reports before interpreting scores.

Full audit details and settings are in raw/*.json.gz. summary.json contains all samples, aggregated metrics, failed requests, and audit findings. manifest.json contains provenance, warnings, repeated HTTP requests, and field-data responses.
