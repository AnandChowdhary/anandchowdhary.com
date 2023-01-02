import { Handlers, PageProps } from "https://deno.land/x/fresh@1.1.1/server.ts";
import { slugify } from "https://deno.land/x/slugify@0.3.0/mod.ts";
import smartQuotes from "https://esm.sh/smartquotes-ts@0.0.2";
import type { Timeline as ITimeline } from "https://esm.sh/timeline-types@9.0.0/index.d.ts";
import { TimelineTravel } from "https://esm.sh/timeline-types@9.0.0/index.d.ts";
import { Breadcrumbs } from "../../components/data/Breadcrumbs.tsx";
import { DataFooterLinks } from "../../components/data/DataFooterLinks.tsx";
import { SectionTitle } from "../../components/data/SectionTitle.tsx";
import { Timeline } from "../../components/data/Timeline.tsx";
import { LoadError } from "../../components/text/LoadError.tsx";
import { fetchJson } from "../../utils/data.tsx";
import { countryName } from "../../utils/string.ts";
import { getFlagUrl } from "../../utils/urls.ts";
import { toHoursAndMinutes } from "../life.tsx";

export type Datapoint = TimelineTravel["data"] & {
  updatedAt: string;
  hash: string;
};
interface LocationData {
  currentLocation: Datapoint;
  timeline: ITimeline;
}
export const handler: Handlers<LocationData> = {
  async GET(_, context) {
    const locationHistory = await fetchJson<Datapoint[]>(
      "https://anandchowdhary.github.io/location/history.json"
    );
    const props = {
      timeline: locationHistory.map(
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
      ),
      currentLocation: locationHistory[0],
    };
    return context.render(props);
  },
};

export default function Location({ data }: PageProps<LocationData>) {
  const { currentLocation, timeline } = data;

  return (
    <div class="max-w-screen-md px-4 mx-auto space-y-8 md:px-0">
      <Breadcrumbs items={[{ href: "/location", title: "Location" }]} />
      <SectionTitle
        title="Location"
        description="For over ten years, I've been tracking my real-time location, and you can follow me around the world here."
      />
      <section>
        <div class="relative bg-white rounded shadow-sm mb-2 mt-4">
          {currentLocation && (
            <img
              alt=""
              src={`https://api.mapbox.com/styles/v1/anandchowdhary/cl91jzd61002q14pm7vtwfa2l/static/${currentLocation.approximateCoordinates
                .join()
                .split(",")
                .reverse()
                .join()},12/768x384?access_token=pk.eyJ1IjoiYW5hbmRjaG93ZGhhcnkiLCJhIjoiY2w5MWpxbXZ2MDdpMzN2bW92ZnRzZ2Q4bSJ9.WMWxq61EUjQfWtntvGGNKQ`}
              class="w-full rounded-t"
            />
          )}
          <div class="p-4">
            {currentLocation ? (
              <div class="space-y-2">
                <p class="flex items-center mb-1 space-x-3 leading-5">
                  <img
                    alt=""
                    src={getFlagUrl(currentLocation.country.code)}
                    class="rounded-sm w-5"
                  />
                  <strong class="font-medium">{currentLocation.label}</strong>
                  {`, ${countryName(currentLocation.country.name)}`}
                </p>
                {currentLocation.timezone && (
                  <p class="text-sm text-gray-500">
                    {smartQuotes(
                      `It's ${new Date()
                        .toLocaleTimeString("en-US", {
                          timeStyle: "short",
                          timeZone: currentLocation.timezone?.name,
                        })
                        .toLowerCase()} (UTC ${toHoursAndMinutes(
                        currentLocation.timezone.utcOffset ?? 0
                      )})`
                    )}
                  </p>
                )}
              </div>
            ) : (
              <LoadError items="currentLocation" />
            )}
          </div>
        </div>
        <DataFooterLinks
          apiUrl="https://anandchowdhary.github.io/location/api.json"
          githubUrl="https://github.com/AnandChowdhary/location"
        />
      </section>
      <section>
        <h2 class="text-2xl font-medium">Location history</h2>
        <Timeline
          timeline={timeline}
          show={timeline}
          query=""
          yearHrefPrefix="/location"
          maxItems={10}
          hasMoreHref="special://last-archive-year"
        />
      </section>
    </div>
  );
}
