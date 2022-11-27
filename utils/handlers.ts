import type { Handlers } from "$fresh/server.ts";
import frontMatter from "https://esm.sh/front-matter@4.0.2";
import type {
  Timeline,
  TimeLineItem,
} from "https://esm.sh/timeline-types@7.0.0/index.d.ts";
import { fetchJson, fetchText } from "./data.tsx";
import { render } from "./markdown.ts";

export interface SingleItemHandlerProps<T> {
  timeline: Timeline;
  content: string;
  item: T;
  previous?: T;
  next?: T;
}

export const singleItemHandler = <T extends TimeLineItem>(
  repositoryPath: string,
  timelineType: string
): Handlers<SingleItemHandlerProps<T>> => {
  return {
    async GET(_, context) {
      const [markdown, timeline] = await Promise.all([
        fetchText(
          `https://raw.githubusercontent.com/${repositoryPath}/${context.params.year}/${context.params.slug}.md`
        ),
        fetchJson<Timeline>(
          "https://anandchowdhary.github.io/everything/api.json"
        ),
      ]);
      const currentIndex = timeline.findIndex(
        ({ type, url }) =>
          type === timelineType && url && url.endsWith(context.params.slug)
      );
      const title = timeline[currentIndex].title;
      const { body } = frontMatter(markdown);
      const content = render(body.replace(`# ${title}`, ""));

      const previous = timeline
        .slice(currentIndex + 1)
        .find(({ type }) => type === timelineType) as T | undefined;
      const next = timeline
        .slice(0, currentIndex)
        .find(({ type }) => type === timelineType) as T | undefined;
      return context.render({
        timeline,
        content,
        item: timeline[currentIndex] as T,
        previous,
        next,
      });
    },
  };
};
