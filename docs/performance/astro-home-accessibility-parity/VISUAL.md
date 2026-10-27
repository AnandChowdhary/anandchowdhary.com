# Visual comparison

2026-10-26T14:18:04.776Z to 2026-10-26T14:18:26.913Z. first viewport; Chrome/156.0.8078.47.

Reference: https://anandchowdhary.com. Candidate: http://localhost:4322.

Pixels differ when any RGB channel changes by more than 20. Live content/counters, image delivery, antialiasing and timestamps can affect results; inspect diff images and geometry before claiming parity. This report does not cover unlisted routes or content below the viewport unless full-page mode was used.

| Route | Device | Theme | Mode | Different pixels |
|---|---|---|---|---:|
| / | desktop | light | normal | 0.0139% |
| / | desktop | light | screenshot | 0.0089% |
| / | desktop | dark | normal | 0.0080% |
| / | desktop | dark | screenshot | 0.0080% |
| / | mobile | light | normal | 0.0295% |
| / | mobile | light | screenshot | 0.0474% |
| / | mobile | dark | normal | 0.0450% |
| / | mobile | dark | screenshot | 0.0422% |

Raw screenshots and highlighted diffs are saved locally in raw/. visual.json includes metadata, geometry, browser errors, requests and script URLs for each capture.
