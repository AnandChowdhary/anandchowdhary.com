import smartQuotes from "https://esm.sh/smartquotes-ts@0.0.2";
import IconVideo from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/video.tsx";
import IconRainbow from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/rainbow.tsx";
import IconTarget from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/target.tsx";
import IconPaint from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/paint.tsx";
import IconPencil from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/pencil.tsx";
import IconDeviceLaptop from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/device-laptop.tsx";
import IconPlaneTilt from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/plane-tilt.tsx";
import IconMicrophone2 from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/microphone-2.tsx";
import IconBook from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/book.tsx";
import IconStar from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/star.tsx";
import IconAward from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/award.tsx";
import IconBrandApplePodcast from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/brand-apple-podcast.tsx";
import IconNews from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/news.tsx";
import IconBrandGithub from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/brand-github.tsx";
import type { Timeline as ITimeline } from "https://esm.sh/timeline-types@8.0.0/index.d.ts";
import { FunctionComponent } from "preact";
import Filters from "../../islands/Filters.tsx";
import { categoryData } from "../../utils/data.tsx";
import {
  TimelineAwardVisual,
  TimelineBlogPostVisual,
  TimelineBookVisual,
  TimelineEventVisual,
  TimelineLifeEventVisual,
  TimelineOkrVisual,
  TimelineOpenSourceProjectVisual,
  TimelinePodcastInterviewVisual,
  TimelinePressFeatureVisual,
  TimelineProjectVisual,
  TimelineThemeVisual,
  TimelineTravelVisual,
  TimelineVersionVisual,
  TimelineVideoVisual,
} from "./Timeline/Visuals.tsx";
import {
  TimelineAwardContent,
  TimelineBlogPostContent,
  TimelineBookContent,
  TimelineEventContent,
  TimelineLifeEventContent,
  TimelineOkrContent,
  TimelineOpenSourceProjectContent,
  TimelinePodcastInterviewContent,
  TimelinePressFeatureContent,
  TimelineProjectContent,
  TimelineThemeContent,
  TimelineTravelContent,
  TimelineVersionContent,
  TimelineVideoContent,
} from "./Timeline/Content.tsx";

export const Timeline: FunctionComponent<{
  timeline: ITimeline;
  show: ITimeline;
  query: string;
  hideYearHeading?: boolean;
  maxItems?: number;
  selected?: string[];
  hasMoreHref?: string;
  hasMoreLabel?: string;
  yearHrefPrefix: string;
}> = ({
  timeline,
  show,
  hideYearHeading,
  query,
  selected,
  maxItems,
  hasMoreHref,
  hasMoreLabel,
  yearHrefPrefix,
}) => {
  selected ??= Object.keys(categoryData);
  try {
    const parsed = new URLSearchParams(query).get("filters")?.split(",");
    if (parsed && parsed.filter((item) => item !== "").length > 0)
      selected = parsed;
  } catch (error) {
    // Ignore errors
  }

  const items = show.filter(({ type }) => selected?.includes(type));
  const visible = maxItems ? items.slice(0, maxItems) : items;
  const filteredCategories = Object.keys(categoryData).filter((key) =>
    show.find(({ type }) => type === key)
  );

  if (show.length === 0)
    return (
      <div className="py-8 text-lg text-center text-gray-400">
        <p>No items found</p>
      </div>
    );

  return (
    <div>
      {Object.keys(filteredCategories).length > 1 && (
        <Filters
          categoryData={categoryData}
          selected={selected}
          options={filteredCategories}
        />
      )}
      <div className="relative space-y-8">
        <div className="absolute top-0 w-1 bg-orange-200 bottom-6 -left-8" />
        {visible.map((item, index) => (
          <div key={item.title}>
            {(index === 0 ||
              new Date(item.date).getFullYear() !==
                new Date(visible[index - 1].date).getFullYear()) &&
              !hideYearHeading && (
                <div
                  className={`flex flex-grow -ml-12 ${index > 0 ? "pt-6" : ""}`}
                >
                  <div className="shrink-0" style={{ minWidth: "3rem" }}>
                    <div className="relative w-5 h-5 ml-2 bg-orange-600 border-4 rounded-full border-orange-50" />
                  </div>
                  <div>
                    <h3 className="mb-6 text-xl font-semibold">
                      <a
                        href={`${yearHrefPrefix}/${new Date(
                          item.date
                        ).getFullYear()}`}
                      >
                        {new Date(item.date).getFullYear()}
                      </a>
                    </h3>
                  </div>
                </div>
              )}
            <article className="sm:flex relative -ml-12">
              <div className="flex flex-grow">
                <div className="shrink-0" style={{ minWidth: "3rem" }}>
                  <div>
                    <div
                      className={`relative flex items-center justify-center text-center text-white border-4 rounded-full h-9 w-9 border-orange-50 bg-white -mt-1 z-10`}
                      style={{ backgroundColor: categoryData[item.type].color }}
                    >
                      {item.type === "theme" ? (
                        <IconRainbow class="w-4 h-4" />
                      ) : item.type === "okr" ? (
                        <IconTarget class="w-4 h-4" />
                      ) : item.type === "version" ? (
                        <IconPaint class="w-4 h-4" />
                      ) : item.type === "blog-post" ? (
                        <IconPencil class="w-4 h-4" />
                      ) : item.type === "project" ? (
                        <IconDeviceLaptop class="w-4 h-4" />
                      ) : item.type === "travel" ? (
                        <IconPlaneTilt class="w-4 h-4" />
                      ) : item.type === "event" ? (
                        <IconMicrophone2 class="w-4 h-4" />
                      ) : item.type === "book" ? (
                        <IconBook class="w-4 h-4" />
                      ) : item.type === "life-event" ? (
                        <IconStar class="w-4 h-4" />
                      ) : item.type === "video" ? (
                        <IconVideo class="w-4 h-4" />
                      ) : item.type === "award" ? (
                        <IconAward class="w-4 h-4" />
                      ) : item.type === "podcast-interview" ? (
                        <IconBrandApplePodcast class="w-4 h-4" />
                      ) : item.type === "press-feature" ? (
                        <IconNews class="w-4 h-4" />
                      ) : item.type === "open-source-project" ? (
                        <IconBrandGithub class="w-4 h-4" />
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="flex-grow">
                  <div class="grid md:grid-cols-5 gap-8">
                    <div class="col-span-3 space-y-2">
                      <div className="text-gray-500">
                        <span>
                          <span
                            class="font-medium"
                            style={{ color: categoryData[item.type].color }}
                          >
                            {categoryData[item.type].prefix}
                          </span>
                          {` on ${new Date(item.date).toLocaleDateString(
                            "en-US",
                            { dateStyle: "long" }
                          )}`}
                        </span>
                      </div>
                      {item.type !== "project" &&
                        ("url" in item &&
                        item.url &&
                        item.url.startsWith("https://anandchowdhary.com/") &&
                        item.type !== "life-event" ? (
                          <h4 className="text-lg font-medium leading-6">
                            <a href={new URL(item.url).pathname}>
                              {item.type === "travel"
                                ? smartQuotes(item.data?.label ?? item.title)
                                : smartQuotes(item.title)}
                            </a>
                          </h4>
                        ) : (
                          <h4 className="text-lg font-medium leading-6">
                            {smartQuotes(item.title)}
                          </h4>
                        ))}
                      {item.type === "okr" ? (
                        <TimelineOkrContent item={item} />
                      ) : item.type === "event" ? (
                        <TimelineEventContent item={item} timeline={timeline} />
                      ) : item.type === "project" ? (
                        <TimelineProjectContent item={item} />
                      ) : item.type === "version" ? (
                        <TimelineVersionContent item={item} />
                      ) : item.type === "blog-post" ? (
                        <TimelineBlogPostContent item={item} />
                      ) : item.type === "theme" ? (
                        <TimelineThemeContent item={item} />
                      ) : item.type === "book" ? (
                        <TimelineBookContent item={item} />
                      ) : item.type === "travel" ? (
                        <TimelineTravelContent item={item} />
                      ) : item.type === "life-event" ? (
                        <TimelineLifeEventContent item={item} />
                      ) : item.type === "video" ? (
                        <TimelineVideoContent item={item} timeline={timeline} />
                      ) : item.type === "award" ? (
                        <TimelineAwardContent item={item} />
                      ) : item.type === "podcast-interview" ? (
                        <TimelinePodcastInterviewContent item={item} />
                      ) : item.type === "press-feature" ? (
                        <TimelinePressFeatureContent item={item} />
                      ) : item.type === "open-source-project" ? (
                        <TimelineOpenSourceProjectContent item={item} />
                      ) : null}
                    </div>
                    <div class="col-span-2 flex justify-end items-start">
                      {item.type === "okr" ? (
                        <TimelineOkrVisual item={item} />
                      ) : item.type === "event" ? (
                        <TimelineEventVisual item={item} />
                      ) : item.type === "project" ? (
                        <TimelineProjectVisual item={item} />
                      ) : item.type === "version" ? (
                        <TimelineVersionVisual item={item} />
                      ) : item.type === "blog-post" ? (
                        <TimelineBlogPostVisual item={item} />
                      ) : item.type === "theme" ? (
                        <TimelineThemeVisual item={item} />
                      ) : item.type === "book" ? (
                        <TimelineBookVisual item={item} />
                      ) : item.type === "travel" ? (
                        <TimelineTravelVisual item={item} />
                      ) : item.type === "life-event" ? (
                        <TimelineLifeEventVisual item={item} />
                      ) : item.type === "video" ? (
                        <TimelineVideoVisual item={item} />
                      ) : item.type === "award" ? (
                        <TimelineAwardVisual item={item} />
                      ) : item.type === "podcast-interview" ? (
                        <TimelinePodcastInterviewVisual item={item} />
                      ) : item.type === "press-feature" ? (
                        <TimelinePressFeatureVisual item={item} />
                      ) : item.type === "open-source-project" ? (
                        <TimelineOpenSourceProjectVisual item={item} />
                      ) : null}
                    </div>
                  </div>
                </div>
                {index === visible.length - 1 && !hasMoreHref && (
                  <div class="bg-orange-50 w-9 absolute left-0 h-full top-0" />
                )}
              </div>
            </article>
          </div>
        ))}
        {hasMoreHref && (
          <div className="flex pt-4 -ml-12">
            <a
              href={
                hasMoreHref === "special://last-archive-year"
                  ? `/archive/${new Date(
                      [...visible].pop()?.date ?? 0
                    ).getUTCFullYear()}`
                  : hasMoreHref
              }
              className="relative flex items-center py-2 pr-4 text-sm bg-white rounded rounded-full shadow opacity-100"
            >
              <span className="text-lg text-center w-9">↓</span>
              <span>{hasMoreLabel ?? "View older entries"}</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
