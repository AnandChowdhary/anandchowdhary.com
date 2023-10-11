import type { Handlers, PageProps } from "$fresh/server.ts";
import IconCalendarEvent from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/calendar-event.tsx";
import frontMatter from "https://esm.sh/front-matter@4.0.2";
import type {
  Timeline,
  TimelineTheme,
} from "https://esm.sh/timeline-types@9.0.0/index.d.ts";
import { Breadcrumbs } from "../../components/data/Breadcrumbs.tsx";
import { PreviousNext } from "../../components/data/PreviousNext.tsx";
import { About } from "../../components/text/About.tsx";
import { fetchJson, fetchText } from "../../utils/data.tsx";
import { SingleItemHandlerProps } from "../../utils/handlers.ts";
import { render } from "../../utils/markdown.ts";

export const handler: Handlers<SingleItemHandlerProps<TimelineTheme>> = {
  async GET(_, context) {
    const [timeline] = await Promise.all([
      fetchJson<Timeline>(
        "https://anandchowdhary.github.io/everything/api.json"
      ),
    ]);
    const currentIndex = timeline.findIndex(
      ({ type, url }) =>
        type === "theme" && url && url.endsWith(context.params.slug)
    );
    const item = timeline[currentIndex] as TimelineTheme;

    const previous = timeline
      .slice(currentIndex + 1)
      .find(({ type }) => type === "theme");
    const next = timeline
      .slice(0, currentIndex)
      .find(({ type }) => type === "theme");
    const markdown = await fetchText(
      `https://raw.githubusercontent.com/AnandChowdhary/themes/main/themes/${
        context.params.slug
      }/${item.source.split("/").pop()}.md`
    );
    const { body } = frontMatter(markdown);
    const content = render(body.replace(`# ${item.title}`, ""));

    const data = {
      timeline,
      item,
      content,
      previous,
      next,
    };
    return context.render(data);
  },
};

export default function Event({
  data,
}: PageProps<SingleItemHandlerProps<TimelineTheme>>) {
  const { item, content, previous, next } = data;

  return (
    <div className="max-w-screen-md px-4 mx-auto md:px-0">
      <Breadcrumbs
        items={[
          { title: "Themes", href: "/themes" },
          {
            title: item.title,
            href: new URL(item.url).pathname,
          },
        ]}
      />
      <header class="post-header">
        <h1>{item.title}</h1>
        <ul class="text-gray-500 space-y-2">
          <li class="flex items-center space-x-2">
            <IconCalendarEvent class="h-4 w-4" />
            <time value={new Date(item.date).toISOString().substring(0, 10)}>
              {new Date(item.date).toLocaleDateString("en-US", {
                dateStyle: "long",
              })}
            </time>
          </li>
        </ul>
      </header>
      <div className="longform" dangerouslySetInnerHTML={{ __html: content }} />
      <About />
      <PreviousNext typeLabel="themes" previous={previous} next={next} />
    </div>
  );
}
