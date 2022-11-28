import type { PageProps } from "$fresh/server.ts";
import IconUser from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/user.tsx";
import IconNews from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/news.tsx";
import IconCalendarEvent from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/calendar-event.tsx";
import type {
  TimelineAward,
  TimelinePodcastInterview,
  TimelinePressFeature,
  TimelineTravel,
  TimelineVideo,
} from "https://esm.sh/timeline-types@8.0.0/index.d.ts";
import { Breadcrumbs } from "../../../components/data/Breadcrumbs.tsx";
import { PreviousNext } from "../../../components/data/PreviousNext.tsx";
import {
  SingleItemHandlerProps,
  timelineItemHandler,
} from "../../../utils/handlers.ts";
import { slugify } from "https://deno.land/x/slugify@0.3.0/mod.ts";
import IconClock from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/clock.tsx";
import { countryName, humanizeMmSs } from "../../../utils/string.ts";
import IconVideo from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/video.tsx";
import { ExternalLink } from "../../../components/text/ExternalLink.tsx";
import { getFlagUrl } from "../../../utils/urls.ts";

type TimelinePressItem =
  | TimelinePressFeature
  | TimelineVideo
  | TimelineAward
  | TimelinePodcastInterview;

export const handler = timelineItemHandler<TimelinePressItem>(
  "video",
  "press-feature",
  "podcast-interview",
  "award"
);

export default function SingleVideo({
  data,
}: PageProps<SingleItemHandlerProps<TimelinePressItem>>) {
  const { timeline, item, content, previous, next } = data;
  const cityTravel = timeline.find(
    (found) =>
      "country" in item.data &&
      item.data.country &&
      found.type === "travel" &&
      found.data.country.code.toLowerCase() ===
        item.data.country.toLowerCase() &&
      found.data.label === item.data.city
  );
  const countryTravel = (
    timeline.find(
      (found) =>
        "country" in item.data &&
        item.data.country &&
        found.type === "travel" &&
        found.data.country.code.toLowerCase() ===
          item.data.country.toLowerCase()
    ) as TimelineTravel | undefined
  )?.data?.country;

  return (
    <div className="max-w-screen-md px-4 mx-auto md:px-0">
      <Breadcrumbs
        items={[
          { title: "Press", href: "/press" },
          {
            title: new Date(item.date).getFullYear().toString(),
            href: `/press/${new Date(item.date).getFullYear()}`,
          },
        ]}
      />
      <header class="post-header">
        <h1>{item.title}</h1>
        <ul class="text-gray-500">
          <li class="flex items-center space-x-2">
            <IconCalendarEvent class="h-4 w-4" />
            <span>
              {new Date(item.date).toLocaleDateString("en-US", {
                dateStyle: "long",
              })}
            </span>
          </li>
          {"author" in item.data && item.data.author && (
            <li class="flex items-center space-x-2">
              <IconUser class="h-4 w-4" />
              <span>{item.data.author}</span>
            </li>
          )}
          {"duration" in item.data && item.data.duration && (
            <li class="flex items-center space-x-2">
              <IconClock class="h-4 w-4" />
              <span>{humanizeMmSs(item.data.duration)}</span>
            </li>
          )}
          {item.data.href && (
            <li class="flex items-center space-x-2">
              <IconVideo class="h-4 w-4" />
              <ExternalLink href={item.data.href}>{`View on ${new URL(
                item.data.href
              ).hostname.replace(/^www\./, "")}`}</ExternalLink>
            </li>
          )}
          {"publisher" in item.data && item.data.publisher && (
            <li class="flex items-center space-x-2">
              <IconNews class="h-4 w-4" />
              <a
                className="font-medium"
                href={`/press/publications/${slugify(item.data.publisher, {
                  lower: true,
                })}`}
              >
                {item.data.publisher}
              </a>
            </li>
          )}
          {"city" in item.data && item.data.city && (
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
      {"embed" in item.data && item.data.embed && (
        <div className="pt-2">
          <iframe
            src={item.data.embed}
            loading="lazy"
            scrolling="no"
            className="w-full overflow-hidden rounded-lg"
            style={{ height: "152px" }}
          />
        </div>
      )}
      {"href" in item.data &&
        item.data.href &&
        new URL(item.data.href).hostname.replace(/^www\./, "") ===
          "youtube.com" && (
          <iframe
            class="w-full rounded-lg shadow bg-white"
            allowFullScreen
            style={{ aspectRatio: "16/9" }}
            src={`https://www.youtube-nocookie.com/embed/${new URL(
              item.data.href
            ).searchParams.get(
              "v"
            )}?autoplay=0&fs=1&iv_load_policy=1&showinfo=1&rel=0&cc_load_policy=1`}
          />
        )}
      <PreviousNext typeLabel="feature" previous={previous} next={next} />
    </div>
  );
}
