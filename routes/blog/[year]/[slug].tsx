import type { PageProps } from "$fresh/server.ts";
import IconCalendarEvent from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/calendar-event.tsx";
import IconClock from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/clock.tsx";
import type { TimelineBlogPost } from "https://esm.sh/timeline-types@8.0.0/index.d.ts";
import { Breadcrumbs } from "../../../components/data/Breadcrumbs.tsx";
import { PreviousNext } from "../../../components/data/PreviousNext.tsx";
import { About } from "../../../components/text/About.tsx";
import {
  singleItemHandler,
  SingleItemHandlerProps,
} from "../../../utils/handlers.ts";

export const handler = singleItemHandler(
  "AnandChowdhary/blog/master/blog",
  "blog-post"
);

export default function Event({
  data,
}: PageProps<SingleItemHandlerProps<TimelineBlogPost>>) {
  const { item, content, previous, next } = data;

  return (
    <div className="max-w-screen-md px-4 mx-auto md:px-0">
      <Breadcrumbs
        items={[
          { title: "Blog", href: "/blog" },
          {
            title: new Date(item.date).getFullYear().toString(),
            href: `/blog/${new Date(item.date).getFullYear()}`,
          },
          {
            title: item.title,
            href: new URL(item.url).pathname,
          },
        ]}
      />
      <header class="post-header">
        <h1>{item.title}</h1>
        <ul class="text-gray-500">
          <li class="flex items-center space-x-2">
            <IconCalendarEvent class="h-4 w-4" />
            <time value={new Date(item.date).toISOString().substring(0, 10)}>
              {new Date(item.date).toLocaleDateString("en-US", {
                dateStyle: "long",
              })}
            </time>
          </li>
          <li class="flex items-center space-x-2">
            <IconClock class="h-4 w-4" />
            <span>
              {`${Math.max(2, content.split(" ").length / 250).toLocaleString(
                "en-US",
                { maximumFractionDigits: 0 }
              )} minutes reading time`}
            </span>
          </li>
        </ul>
      </header>
      <div className="longform" dangerouslySetInnerHTML={{ __html: content }} />
      <About />
      <PreviousNext typeLabel="blog" previous={previous} next={next} />
    </div>
  );
}
