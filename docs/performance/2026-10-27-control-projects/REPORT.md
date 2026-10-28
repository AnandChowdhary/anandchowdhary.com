# Production performance measurements

Started: 2026-10-27T14:29:03.814Z. Finished: 2026-10-27T14:30:32.537Z.

Base: https://anandchowdhary-pkxw7uwdl-anand-chowdharys-projects.vercel.app. Source checkout: 7d3758efad3c7dbefb97329012169a9f73b29350; this does not establish the deployed commit.

Chrome/156.0.8078.47; Lighthouse 13.5.0; Node v22.23.4.

Sequential Lighthouse navigations; fresh Chrome process/profile per run; cold browser storage; simulated default mobile/desktop throttling; production CDN cache uncontrolled.

Nebula sandbox; physical runner location unverified. See HTTP x-vercel-id for observed CDN routing.

All cells show median (minimum–maximum). Bytes are transferred KiB; unused JS is Lighthouse estimated savings, not necessarily transferred bytes.

| Route | Device | Valid runs | Performance | LCP seconds | TBT ms | CLS | JS KiB | Total KiB |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| /projects | mobile | 5 | 75 (75–75) | 10.59 (10.37–10.61) | 0 (0–67) | 0.000 (0.000–0.000) | 2.4 (2.4–2.4) | 7650.0 (7650.0–7650.0) |
| /projects | desktop | 3 | 80 (80–82) | 3.68 (3.21–3.69) | 36 (10–76) | 0.000 (0.000–0.000) | 25.3 (25.3–25.3) | 16218.7 (16218.7–16218.8) |

## Timing and JavaScript diagnostics

TTFB is the observed LCP breakdown value; LCP/FCP/TBT use simulated throttling. Long-task timings also use Lighthouse simulation.

| Route | Device | FCP s | Observed TTFB ms | JS execution ms | Main-thread ms | Long tasks | Unused JS KiB |
|---|---|---:|---:|---:|---:|---:|---:|
| /projects | mobile | 0.93 (0.92–0.94) | 48 (39–50) | 23 (20–25) | 625 (461–864) | 1 (0–2) | 0.0 (0.0–0.0) |
| /projects | desktop | 0.28 (0.27–0.28) | 49 (42–59) | 8 (7–8) | 449 (413–502) | 1 (1–2) | 0.0 (0.0–0.0) |

## Transferred resources

| Route | Device | HTML KiB | CSS KiB | Images KiB | Fonts KiB | RSC requests | Preloaded images |
|---|---|---:|---:|---:|---:|---:|---:|
| /projects | mobile | 9.1 (9.1–9.1) | 10.6 (10.6–10.6) | 7576.3 (7576.3–7576.3) | 51.5 (51.5–51.5) | 0 (0–0) | 0 (0–0) |
| /projects | desktop | 44.5 (44.5–44.5) | 10.6 (10.6–10.6) | 16086.3 (16086.3–16086.3) | 51.5 (51.5–51.5) | 0 (0–0) | 0 (0–0) |

## Audit categories

| Route | Device | Accessibility | Best practices | SEO |
|---|---|---:|---:|---:|
| /projects | mobile | 100 (100–100) | 100 (100–100) | 63 (63–63) |
| /projects | desktop | 100 (100–100) | 100 (100–100) | 63 (63–63) |

## Repeated HTTP GET observations

Headers latency includes network overhead. Age values and HIT/STALE headers do not prove end-to-end content freshness.

| Route | Status | Vercel cache | Age seconds | Headers latency ms |
|---|---|---|---:|---:|
| /projects | 200 | MISS, HIT | 0 (0–0) | 384 (36–433) |

## Field data

- mobile: request failed; see manifest for URL/origin data.
- desktop: request failed; see manifest for URL/origin data.

A quota/API failure does not mean insufficient CrUX traffic. Lab TBT is not real-user INP. HTTP timings in manifest.json include this runner’s network overhead and are not field TTFB. Repeated GETs do not force a cold CDN cache.

## Report integrity

8 successful reports; 0 failed runs.
0 reports contain failed network requests; inspect summary.json and raw reports before interpreting scores.

Full audit details and settings are in raw/*.json.gz. summary.json contains all samples, aggregated metrics, failed requests, and audit findings. manifest.json contains provenance, warnings, repeated HTTP requests, and field-data responses.
