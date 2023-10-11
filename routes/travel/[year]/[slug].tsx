import type { PageProps } from "$fresh/server.ts";
import { slugify } from "https://deno.land/x/slugify@0.3.0/mod.ts";
import IconCalendarEvent from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/calendar-event.tsx";
import smartQuotes from "https://esm.sh/smartquotes-ts@0.0.2";
import type { TimelineTravel } from "https://esm.sh/timeline-types@9.0.0/index.d.ts";
import { Breadcrumbs } from "../../../components/data/Breadcrumbs.tsx";
import { PreviousNext } from "../../../components/data/PreviousNext.tsx";
import { Timeline } from "../../../components/data/Timeline.tsx";
import {
  SingleItemHandlerProps,
  timelineItemHandler,
} from "../../../utils/handlers.ts";
import { countryName } from "../../../utils/string.ts";
import { getFlagUrl } from "../../../utils/urls.ts";

export const handler = timelineItemHandler<TimelineTravel>("travel");

export default function Event({
  data,
}: PageProps<SingleItemHandlerProps<TimelineTravel>>) {
  const { timeline, item, content, previous, next } = data;
  const events = timeline.filter(
    (item) => item.type === "event" && item.data.city === data.item.data.label
  );

  return (
    <div className="max-w-screen-md px-4 mx-auto md:px-0">
      <img
        alt=""
        src={`https://api.mapbox.com/styles/v1/anandchowdhary/cl91jzd61002q14pm7vtwfa2l/static/${item.data?.approximateCoordinates
          .reverse()
          .join()},9/1024x512?access_token=pk.eyJ1IjoiYW5hbmRjaG93ZGhhcnkiLCJhIjoiY2w5MWpxbXZ2MDdpMzN2bW92ZnRzZ2Q4bSJ9.WMWxq61EUjQfWtntvGGNKQ`}
        width={1024}
        height={512}
        className="w-full rounded-lg shadow mb-4"
      />
      <Breadcrumbs
        items={[
          { title: "Travel", href: "/travel" },
          {
            title: new Date(item.date).getFullYear().toString(),
            href: `/travel/${new Date(item.date).getFullYear()}`,
          },
        ]}
      />
      <header class="post-header">
        <h1>{item.data.label}</h1>
        <ul class="text-gray-500 space-y-2">
          <li class="flex items-center space-x-2">
            <IconCalendarEvent class="h-4 w-4" />
            <span>
              {new Date(item.date).toLocaleDateString("en-US", {
                dateStyle: "long",
              })}
            </span>
          </li>
          {item.data.country && (
            <li class="flex items-center space-x-2">
              <img
                alt=""
                src={getFlagUrl(item.data.country.code)}
                class="rounded-sm w-4"
              />
              <a
                href={`/travel/countries/${slugify(
                  countryName(item.data.country.name),
                  { lower: true }
                )}`}
              >
                {countryName(item.data.country.name)}
              </a>
            </li>
          )}
        </ul>
      </header>
      <div className="longform" dangerouslySetInnerHTML={{ __html: content }} />
      {events.length > 0 && (
        <section class="mt-8">
          <h2 class="text-2xl font-semibold font-display">
            {smartQuotes(`Events in ${item.data.label}`)}
          </h2>
          <p class="text-gray-500">
            I have spoken at <strong>{events.length}</strong>{" "}
            {events.length === 1 ? "event" : "events"} in {item.data.label}.
          </p>
          <Timeline
            timeline={timeline}
            show={events}
            hideYearHeading
            query=""
            yearHrefPrefix="/events"
          />
        </section>
      )}
      <PreviousNext typeLabel="trip" previous={previous} next={next} />
    </div>
  );
}
