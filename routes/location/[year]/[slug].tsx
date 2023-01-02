import type { Handlers, PageProps } from "$fresh/server.ts";
import { slugify } from "https://deno.land/x/slugify@0.3.0/mod.ts";
import IconCalendarEvent from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/calendar-event.tsx";
import type { TimelineTravel } from "https://esm.sh/timeline-types@9.0.0/index.d.ts";
import { Breadcrumbs } from "../../../components/data/Breadcrumbs.tsx";
import { PreviousNext } from "../../../components/data/PreviousNext.tsx";
import { fetchJson } from "../../../utils/data.tsx";
import { SingleItemHandlerProps } from "../../../utils/handlers.ts";
import { countryName } from "../../../utils/string.ts";
import { getFlagUrl } from "../../../utils/urls.ts";
import { Datapoint } from "../index.tsx";

export const handler: Handlers<SingleItemHandlerProps<TimelineTravel>> = {
  async GET(_, context) {
    const locationHistory = await fetchJson<Datapoint[]>(
      "https://anandchowdhary.github.io/location/history.json"
    );
    const timeline = locationHistory.map(
      (item) =>
        ({
          type: "travel",
          url: `https://anandchowdhary.com/location/${new Date(
            item.updatedAt
          ).getUTCFullYear()}/${slugify(
            `${item.label} ${item.hash.substring(0, 7)}`,
            { lower: true }
          )}`,
          source: "https://anandchowdhary.github.io/location/history.json",
          title: item.label,
          date: item.updatedAt,
          data: item,
        } as TimelineTravel)
    );
    const currentIndex = timeline.findIndex(
      ({ url }) => url && url.endsWith(context.params.slug)
    );
    const item = timeline[currentIndex] as TimelineTravel;
    const props = {
      timeline,
      content: "",
      item,
    };
    return context.render(props);
  },
};

export default function Event({
  data,
}: PageProps<SingleItemHandlerProps<TimelineTravel>>) {
  const { item, previous, next } = data;

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
          { title: "Location", href: "/location" },
          {
            title: new Date(item.date).getFullYear().toString(),
            href: `/location/${new Date(item.date).getFullYear()}`,
          },
        ]}
      />
      <header class="post-header">
        <h1>{item.data.label}</h1>
        <ul class="text-gray-500">
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
      <PreviousNext typeLabel="location" previous={previous} next={next} />
    </div>
  );
}
