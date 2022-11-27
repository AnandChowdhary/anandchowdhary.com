import type { PageProps } from "$fresh/server.ts";
import { slugify } from "https://deno.land/x/slugify@0.3.0/mod.ts";
import IconBrandZoom from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/brand-zoom.tsx";
import IconCalendarEvent from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/calendar-event.tsx";
import IconMapPin from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/map-pin.tsx";
import IconVideo from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/video.tsx";
import smartQuotes from "https://esm.sh/smartquotes-ts@0.0.2";
import type {
  TimelineEvent,
  TimelineTravel,
} from "https://esm.sh/timeline-types@7.0.0/index.d.ts";
import { Fragment } from "preact";
import { Breadcrumbs } from "../../../components/data/Breadcrumbs.tsx";
import { PreviousNext } from "../../../components/data/PreviousNext.tsx";
import { Timeline } from "../../../components/data/Timeline.tsx";
import { ExternalLink } from "../../../components/text/ExternalLink.tsx";
import {
  singleItemHandler,
  SingleItemHandlerProps,
} from "../../../utils/handlers.ts";
import { countryName } from "../../../utils/string.ts";
import { getFlagUrl } from "../../../utils/urls.ts";

export const handler = singleItemHandler<TimelineEvent>(
  "AnandChowdhary/events/main/events",
  "event"
);

export default function Event({
  data,
}: PageProps<SingleItemHandlerProps<TimelineEvent>>) {
  const { timeline, item, content, previous, next } = data;
  const cityTravel = timeline.find(
    (found) =>
      item.data.country &&
      found.type === "travel" &&
      found.data.country.code.toLowerCase() ===
        item.data.country.toLowerCase() &&
      found.data.label === item.data.city
  );
  const countryTravel = (
    timeline.find(
      (found) =>
        item.data.country &&
        found.type === "travel" &&
        found.data.country.code.toLowerCase() ===
          item.data.country.toLowerCase()
    ) as TimelineTravel | undefined
  )?.data?.country;
  const alsoShownAt = timeline.filter(
    (found) => found.type === "event" && found.data.talk === item.data.talk
  );

  return (
    <div className="max-w-screen-md px-4 mx-auto md:px-0">
      <Breadcrumbs
        items={[
          { title: "Events", href: "/events" },
          {
            title: new Date(item.date).getFullYear().toString(),
            href: `/events/${new Date(item.date).getFullYear()}`,
          },
        ]}
      />
      <header class="post-header">
        <h1>{item.title}</h1>
        <ul class="text-gray-500">
          {item.data.event && (
            <li class="flex items-center space-x-2">
              <IconCalendarEvent class="h-4 w-4" />
              <span>{item.data.event}</span>
            </li>
          )}
          {item.data.video &&
            new URL(item.data.video).hostname.replace(/^www\./, "") !==
              "youtube.com" && (
              <li class="flex items-center space-x-2">
                <IconVideo class="h-4 w-4" />
                <ExternalLink href={item.data.video}>{`Watch video on ${new URL(
                  item.data.video
                ).hostname.replace(/^www\./, "")}`}</ExternalLink>
              </li>
            )}
          {item.data.venue && (
            <li class="flex items-center space-x-2">
              <IconMapPin class="h-4 w-4" />
              <span>{item.data.venue}</span>
            </li>
          )}
          {item.data.remote && (
            <li class="flex items-center space-x-2">
              <IconBrandZoom class="h-4 w-4" />
              <span>Remote/virtual event</span>
            </li>
          )}
          {item.data.city && (
            <li class="flex items-center space-x-2">
              {item.data.country && (
                <img
                  alt=""
                  src={getFlagUrl(item.data.country)}
                  class="rounded-sm w-4"
                />
              )}
              {cityTravel ? (
                <a href={new URL(cityTravel.url).pathname}>{item.data.city}</a>
              ) : (
                <span>{item.data.city}</span>
              )}
              {countryTravel && (
                <a
                  href={`/travel/countries/${slugify(
                    countryName(countryTravel.name),
                    { lower: true }
                  )}`}
                >
                  {countryName(countryTravel.name)}
                </a>
              )}
            </li>
          )}
        </ul>
      </header>
      <div className="longform" dangerouslySetInnerHTML={{ __html: content }} />
      {item.data.video &&
        new URL(item.data.video).hostname.replace(/^www\./, "") ===
          "youtube.com" && (
          <div class="mt-8 space-y-4">
            <h2 class="text-2xl font-semibold font-display">Watch recording</h2>
            <iframe
              class="w-full rounded-lg shadow bg-white"
              style={{ aspectRatio: "16/9" }}
              src={`https://www.youtube-nocookie.com/embed/${new URL(
                item.data.video
              ).searchParams.get(
                "v"
              )}?autoplay=0&fs=1&iv_load_policy=1&showinfo=1&rel=0&cc_load_policy=1`}
            />
          </div>
        )}
      {item.data.talk && (
        <div class="mt-8">
          <h2 class="text-2xl font-semibold font-display mb-4">
            {smartQuotes(`About the talk "${item.data.talk}"`)}
          </h2>
          {alsoShownAt.length > 1 && (
            <Fragment>
              <h3 class="text-xl font-semibold font-display">Presentations</h3>
              <p>
                This talk was presented as{" "}
                <strong>{alsoShownAt.length - 1}</strong> other{" "}
                {alsoShownAt.length === 2 ? "event" : "events"}:
              </p>
              <Timeline
                timeline={timeline}
                show={alsoShownAt}
                hideYearHeading
                query=""
                yearHrefPrefix="/events"
              />
            </Fragment>
          )}
        </div>
      )}
      <PreviousNext type="event" previous={previous} next={next} />
    </div>
  );
}
