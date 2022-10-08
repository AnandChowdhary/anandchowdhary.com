// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/_app.tsx";
import * as $1 from "./routes/about.tsx";
import * as $2 from "./routes/archive/[year].tsx";
import * as $3 from "./routes/archive/index.tsx";
import * as $4 from "./routes/archive/page/[number].tsx";
import * as $5 from "./routes/blog/[year]/[slug].tsx";
import * as $6 from "./routes/contact.tsx";
import * as $7 from "./routes/data.tsx";
import * as $8 from "./routes/events/[year]/[slug].tsx";
import * as $9 from "./routes/index.tsx";
import * as $10 from "./routes/life/index.tsx";
import * as $11 from "./routes/sitemap.tsx";
import * as $12 from "./routes/sitemap.xml.tsx";
import * as $$0 from "./islands/Age.tsx";
import * as $$1 from "./islands/Filters.tsx";
import * as $$2 from "./islands/TimeAgo.tsx";

const manifest = {
  routes: {
    "./routes/_app.tsx": $0,
    "./routes/about.tsx": $1,
    "./routes/archive/[year].tsx": $2,
    "./routes/archive/index.tsx": $3,
    "./routes/archive/page/[number].tsx": $4,
    "./routes/blog/[year]/[slug].tsx": $5,
    "./routes/contact.tsx": $6,
    "./routes/data.tsx": $7,
    "./routes/events/[year]/[slug].tsx": $8,
    "./routes/index.tsx": $9,
    "./routes/life/index.tsx": $10,
    "./routes/sitemap.tsx": $11,
    "./routes/sitemap.xml.tsx": $12,
  },
  islands: {
    "./islands/Age.tsx": $$0,
    "./islands/Filters.tsx": $$1,
    "./islands/TimeAgo.tsx": $$2,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
