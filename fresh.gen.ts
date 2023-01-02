// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/_404.tsx";
import * as $1 from "./routes/_app.tsx";
import * as $2 from "./routes/about.tsx";
import * as $3 from "./routes/about/versions/[version].tsx";
import * as $4 from "./routes/about/versions/index.tsx";
import * as $5 from "./routes/archive/[year].tsx";
import * as $6 from "./routes/archive/index.tsx";
import * as $7 from "./routes/blog/[year]/[slug].tsx";
import * as $8 from "./routes/blog/[year]/index.tsx";
import * as $9 from "./routes/blog/index.tsx";
import * as $10 from "./routes/books/[year]/[slug].tsx";
import * as $11 from "./routes/books/[year]/index.tsx";
import * as $12 from "./routes/books/authors/[author].tsx";
import * as $13 from "./routes/books/authors/index.tsx";
import * as $14 from "./routes/books/index.tsx";
import * as $15 from "./routes/books/publishers/[publisher].tsx";
import * as $16 from "./routes/books/publishers/index.tsx";
import * as $17 from "./routes/contact.tsx";
import * as $18 from "./routes/data.tsx";
import * as $19 from "./routes/events/[year]/[slug].tsx";
import * as $20 from "./routes/events/[year]/index.tsx";
import * as $21 from "./routes/events/index.tsx";
import * as $22 from "./routes/events/talks/[talk].tsx";
import * as $23 from "./routes/events/talks/index.tsx";
import * as $24 from "./routes/health/calories.tsx";
import * as $25 from "./routes/health/index.tsx";
import * as $26 from "./routes/health/readiness.tsx";
import * as $27 from "./routes/health/sleep.tsx";
import * as $28 from "./routes/health/steps.tsx";
import * as $29 from "./routes/index.tsx";
import * as $30 from "./routes/life.tsx";
import * as $31 from "./routes/location/[year]/[slug].tsx";
import * as $32 from "./routes/location/[year]/index.tsx";
import * as $33 from "./routes/location/index.tsx";
import * as $34 from "./routes/mentoring.tsx";
import * as $35 from "./routes/okrs/[year]/[slug].tsx";
import * as $36 from "./routes/okrs/[year]/index.tsx";
import * as $37 from "./routes/okrs/index.tsx";
import * as $38 from "./routes/press/[year]/[slug].tsx";
import * as $39 from "./routes/press/[year]/index.tsx";
import * as $40 from "./routes/press/index.tsx";
import * as $41 from "./routes/projects/[year]/[slug].tsx";
import * as $42 from "./routes/projects/[year]/index.tsx";
import * as $43 from "./routes/projects/index.tsx";
import * as $44 from "./routes/projects/tags/[tag].tsx";
import * as $45 from "./routes/redirect/[path].tsx";
import * as $46 from "./routes/sitemap.tsx";
import * as $47 from "./routes/sitemap.xml.tsx";
import * as $48 from "./routes/themes/[slug].tsx";
import * as $49 from "./routes/themes/index.tsx";
import * as $50 from "./routes/travel/[year]/[slug].tsx";
import * as $51 from "./routes/travel/[year]/index.tsx";
import * as $52 from "./routes/travel/countries/[country].tsx";
import * as $53 from "./routes/travel/index.tsx";
import * as $54 from "./routes/versions/[year]/[slug].tsx";
import * as $55 from "./routes/versions/[year]/index.tsx";
import * as $56 from "./routes/versions/index.tsx";
import * as $57 from "./routes/videos/index.tsx";
import * as $$0 from "./islands/Age.tsx";
import * as $$1 from "./islands/Filters.tsx";
import * as $$2 from "./islands/Search.tsx";
import * as $$3 from "./islands/TimeAgo.tsx";

const manifest = {
  routes: {
    "./routes/_404.tsx": $0,
    "./routes/_app.tsx": $1,
    "./routes/about.tsx": $2,
    "./routes/about/versions/[version].tsx": $3,
    "./routes/about/versions/index.tsx": $4,
    "./routes/archive/[year].tsx": $5,
    "./routes/archive/index.tsx": $6,
    "./routes/blog/[year]/[slug].tsx": $7,
    "./routes/blog/[year]/index.tsx": $8,
    "./routes/blog/index.tsx": $9,
    "./routes/books/[year]/[slug].tsx": $10,
    "./routes/books/[year]/index.tsx": $11,
    "./routes/books/authors/[author].tsx": $12,
    "./routes/books/authors/index.tsx": $13,
    "./routes/books/index.tsx": $14,
    "./routes/books/publishers/[publisher].tsx": $15,
    "./routes/books/publishers/index.tsx": $16,
    "./routes/contact.tsx": $17,
    "./routes/data.tsx": $18,
    "./routes/events/[year]/[slug].tsx": $19,
    "./routes/events/[year]/index.tsx": $20,
    "./routes/events/index.tsx": $21,
    "./routes/events/talks/[talk].tsx": $22,
    "./routes/events/talks/index.tsx": $23,
    "./routes/health/calories.tsx": $24,
    "./routes/health/index.tsx": $25,
    "./routes/health/readiness.tsx": $26,
    "./routes/health/sleep.tsx": $27,
    "./routes/health/steps.tsx": $28,
    "./routes/index.tsx": $29,
    "./routes/life.tsx": $30,
    "./routes/location/[year]/[slug].tsx": $31,
    "./routes/location/[year]/index.tsx": $32,
    "./routes/location/index.tsx": $33,
    "./routes/mentoring.tsx": $34,
    "./routes/okrs/[year]/[slug].tsx": $35,
    "./routes/okrs/[year]/index.tsx": $36,
    "./routes/okrs/index.tsx": $37,
    "./routes/press/[year]/[slug].tsx": $38,
    "./routes/press/[year]/index.tsx": $39,
    "./routes/press/index.tsx": $40,
    "./routes/projects/[year]/[slug].tsx": $41,
    "./routes/projects/[year]/index.tsx": $42,
    "./routes/projects/index.tsx": $43,
    "./routes/projects/tags/[tag].tsx": $44,
    "./routes/redirect/[path].tsx": $45,
    "./routes/sitemap.tsx": $46,
    "./routes/sitemap.xml.tsx": $47,
    "./routes/themes/[slug].tsx": $48,
    "./routes/themes/index.tsx": $49,
    "./routes/travel/[year]/[slug].tsx": $50,
    "./routes/travel/[year]/index.tsx": $51,
    "./routes/travel/countries/[country].tsx": $52,
    "./routes/travel/index.tsx": $53,
    "./routes/versions/[year]/[slug].tsx": $54,
    "./routes/versions/[year]/index.tsx": $55,
    "./routes/versions/index.tsx": $56,
    "./routes/videos/index.tsx": $57,
  },
  islands: {
    "./islands/Age.tsx": $$0,
    "./islands/Filters.tsx": $$1,
    "./islands/Search.tsx": $$2,
    "./islands/TimeAgo.tsx": $$3,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
