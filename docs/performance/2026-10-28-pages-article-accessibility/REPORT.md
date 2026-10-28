# Production performance measurements

Started: 2026-10-28T10:33:45.643Z. Finished: 2026-10-28T10:34:55.006Z.

Base: https://anandchowdhary.github.io/anandchowdhary.com. Source checkout: c1c16b19de06203ba793db4e3ae777319d1c9470; this does not establish the deployed commit.

Chrome/156.0.8078.47; Lighthouse 13.5.0; Node v22.23.4.

Sequential Lighthouse navigations; fresh Chrome process/profile per run; cold browser storage; simulated default mobile/desktop throttling; production CDN cache uncontrolled.

Nebula sandbox; physical runner location unverified. See HTTP x-vercel-id for observed CDN routing.

All cells show median (minimum–maximum). Bytes are transferred KiB; unused JS is Lighthouse estimated savings, not necessarily transferred bytes.

| Route | Device | Valid runs | Performance | LCP seconds | TBT ms | CLS | JS KiB | Total KiB |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| /blog/2019/state-of-the-podcasts-2019 | mobile | 5 | 100 (100–100) | 1.21 (1.21–1.30) | 0 (0–0) | 0.000 (0.000–0.009) | 0.0 (0.0–0.0) | 220.6 (220.5–220.6) |
| /blog/2019/state-of-the-podcasts-2019 | desktop | 3 | 100 (100–100) | 0.29 (0.29–0.29) | 0 (0–0) | 0.000 (0.000–0.000) | 0.0 (0.0–0.0) | 235.4 (235.4–235.5) |

## Timing and JavaScript diagnostics

TTFB is the observed LCP breakdown value; LCP/FCP/TBT use simulated throttling. Long-task timings also use Lighthouse simulation.

| Route | Device | FCP s | Observed TTFB ms | JS execution ms | Main-thread ms | Long tasks | Unused JS KiB |
|---|---|---:|---:|---:|---:|---:|---:|
| /blog/2019/state-of-the-podcasts-2019 | mobile | 0.91 (0.91–1.00) | 45 (41–144) | 25 (23–52) | 353 (274–427) | 1 (0–1) | 0.0 (0.0–0.0) |
| /blog/2019/state-of-the-podcasts-2019 | desktop | 0.25 (0.25–0.25) | 40 (37–41) | 0 (0–2) | 91 (74–98) | 0 (0–0) | 0.0 (0.0–0.0) |

## Transferred resources

| Route | Device | HTML KiB | CSS KiB | Images KiB | Fonts KiB | RSC requests | Preloaded images |
|---|---|---:|---:|---:|---:|---:|---:|
| /blog/2019/state-of-the-podcasts-2019 | mobile | 8.3 (8.3–8.3) | 10.2 (10.2–10.3) | 150.0 (150.0–150.1) | 51.6 (51.5–51.7) | 0 (0–0) | 1 (1–1) |
| /blog/2019/state-of-the-podcasts-2019 | desktop | 8.3 (8.3–8.3) | 10.2 (10.2–10.2) | 164.9 (164.9–164.9) | 51.5 (51.5–51.7) | 0 (0–0) | 1 (1–1) |

## Audit categories

| Route | Device | Accessibility | Best practices | SEO |
|---|---|---:|---:|---:|
| /blog/2019/state-of-the-podcasts-2019 | mobile | 100 (100–100) | 100 (100–100) | 100 (100–100) |
| /blog/2019/state-of-the-podcasts-2019 | desktop | 100 (100–100) | 100 (100–100) | 100 (100–100) |

## Repeated HTTP GET observations

Headers latency includes network overhead. Age values and HIT/STALE headers do not prove end-to-end content freshness.

| Route | Status | Vercel cache | Age seconds | Headers latency ms |
|---|---|---|---:|---:|
| /blog/2019/state-of-the-podcasts-2019 | 200 | n/a | 0 (0–0) | 24 (22–299) |

## Field data

- mobile: 429; Quota exceeded for quota metric 'Queries' and limit 'Queries per day' of service 'pagespeedonline.googleapis.com' for consumer 'project_number:583797351490'..
- desktop: 429; Quota exceeded for quota metric 'Queries' and limit 'Queries per day' of service 'pagespeedonline.googleapis.com' for consumer 'project_number:583797351490'..

A quota/API failure does not mean insufficient CrUX traffic. Lab TBT is not real-user INP. HTTP timings in manifest.json include this runner’s network overhead and are not field TTFB. Repeated GETs do not force a cold CDN cache.

## Report integrity

8 successful reports; 0 failed runs.
0 reports contain failed network requests; inspect summary.json and raw reports before interpreting scores.

Full audit details and settings are in raw/*.json.gz. summary.json contains all samples, aggregated metrics, failed requests, and audit findings. manifest.json contains provenance, warnings, repeated HTTP requests, and field-data responses.
