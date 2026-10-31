# Reproducible pipeline and full generator comparison

The production candidate separates input collection from offline rendering and
converts the blog index and canonical article bodies to native Astro. It retains
Astro for production. The custom generator is a complete artifact experiment,
not a replacement being deployed.

- [Benchmark and decision](BENCHMARK.md): 12 sequential builds, same sealed inputs.
- [Raw measurements](benchmark.json).
- [Native artifact parity](native-parity.json) and [generator parity](generator-parity.json): all 1,510 routes plus 404, discovery files and optimized image bytes.
- [Native full-page visual comparison](native-visual/VISUAL.md): 24 desktop/mobile, light/dark, normal/screenshot pairs across the blog and two article styles against production; no changed pixels above the RGB threshold of 20.
- Generator smoke and link audit: all 801 published URLs pass.

See [operations](../../operations/BUILD-RELIABILITY.md) for snapshot collection,
replay, retention and limitations. Visual matrices cover representative routes;
the artifact comparison covers the full route inventory. Neither is a field
performance measurement.

The generator's [48 full-page pairs](generator-visual/VISUAL.md) cover all six
representative route types in the same eight modes. Metadata and header/main/
footer geometry match; no browser exceptions occurred. The maximum changed-pixel
fraction is 0.0052%, confined to live counter digits on the homepage (the largest
diff bounds were x189–206, y478–487). All non-home pairs have zero changed pixels
above the threshold. This is thresholded visual parity, not byte/pixel identity.

Both native and generator builds pass output verification under
`/anandchowdhary.com`, plus browser counter hydration, article/no-JavaScript
content, restored images and keyboard/pointer lightbox checks. The corresponding
`*-prefix-verify.txt` and `*-prefix-interactions.txt` record those checks.
