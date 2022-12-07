import type { Handlers, PageProps } from "$fresh/server.ts";
import IconBrandGithub from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/brand-github.tsx";
import IconCalendarEvent from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/calendar-event.tsx";
import IconApiApp from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/api-app.tsx";
import IconClock from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/clock.tsx";
import IconSquareCheck from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/square-check.tsx";
import type { TimelineOkr } from "https://esm.sh/timeline-types@9.0.0/index.d.ts";
import { Breadcrumbs } from "../../../components/data/Breadcrumbs.tsx";
import { OKRCards } from "../../../components/data/OKRs.tsx";
import { PreviousNext } from "../../../components/data/PreviousNext.tsx";
import { ExternalLink } from "../../../components/text/ExternalLink.tsx";
import { imageUrl } from "../../../utils/urls.ts";

interface ProjectData {
  item: TimelineOkr;
  previous?: TimelineOkr;
  next?: TimelineOkr;
}

export const handler: Handlers<ProjectData> = {
  async GET(_, context) {
    const timeline = (await (
      await fetch("https://anandchowdhary.github.io/everything/api.json")
    ).json()) as {
      date: string;
      type: string;
      title: string;
      description?: string;
      data?: unknown;
      url?: string;
    }[];
    const currentIndex = timeline.findIndex(
      ({ type, url }) =>
        type === "okr" && url && url.endsWith(context.params.slug)
    );
    const item = timeline[currentIndex] as TimelineOkr;

    const previous = timeline
      .slice(currentIndex + 1)
      .find(({ type }) => type === "okr") as TimelineOkr;
    const next = timeline
      .slice(0, currentIndex)
      .find(({ type }) => type === "okr") as TimelineOkr;
    return context.render({
      item,
      previous,
      next,
    });
  },
};

export default function Project({ data, params }: PageProps<ProjectData>) {
  const { item, previous, next } = data;
  const year = new Date(item.date).getFullYear();
  const title = `Q${item.data.name} ${year}`;
  const quarterEnd = new Date(item.date);
  quarterEnd.setMonth(quarterEnd.getMonth() + 3);
  quarterEnd.setDate(quarterEnd.getDate() - 1);

  return (
    <div className="max-w-screen-md px-4 mx-auto md:px-0">
      <img
        alt=""
        src={imageUrl(
          `https://raw.githubusercontent.com/AnandChowdhary/okrs/main/assets/${item.url
            .split("/")
            .reverse()
            .join("/")
            .substring(0, 6)
            .split("/")
            .reverse()
            .join("-")}.png`,
          { w: "1024", h: "512", fit: "cover" }
        )}
        width={1024}
        height={512}
        className="w-full rounded-lg shadow mb-4"
      />
      <Breadcrumbs
        items={[
          { href: "/okrs", title: "OKRs" },
          { href: `/okrs/${year}`, title: year.toString() },
          {
            href: `/okrs/${year}/${item.data.name}`,
            title: title.split(" ")[0],
          },
        ]}
      />
      <header class="post-header">
        <h1>{title}</h1>
        <ul class="text-gray-500 grid grid-cols-2">
          <li class="flex items-center space-x-2">
            <IconCalendarEvent class="h-4 w-4" />
            <span>
              {`${new Date(item.date).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}-${new Date(quarterEnd).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}`}
            </span>
          </li>
          <li class="flex items-center space-x-2">
            <IconClock class="h-4 w-4" />
            <span>
              {(item.data.success * 100).toLocaleString("en-US", {
                maximumFractionDigits: 0,
              })}
              % success
            </span>
          </li>
          {quarterEnd.getTime() > Date.now() && (
            <li class="flex items-center space-x-2">
              <IconSquareCheck class="h-4 w-4" />
              <span>
                {(item.data.progress * 100).toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}
                % progress
              </span>
            </li>
          )}
          <li class="flex items-center space-x-2">
            <IconBrandGithub class="h-4 w-4" />
            <span class="space-x-2">
              <ExternalLink
                href={item.source.replace(
                  "anandchowdhary.github.io/okrs",
                  "github.com/AnandChowdhary/okrs/blob/main"
                )}
              >
                View on GitHub
              </ExternalLink>
            </span>
          </li>
          <li class="flex items-center space-x-2">
            <IconApiApp class="h-4 w-4" />
            <span class="space-x-2">
              <ExternalLink href={item.source}>API</ExternalLink>
            </span>
          </li>
        </ul>
      </header>
      <main class="mt-8">
        <OKRCards okr={item} isOpen />
      </main>
      <PreviousNext typeLabel="OKR" previous={previous} next={next} />
    </div>
  );
}
