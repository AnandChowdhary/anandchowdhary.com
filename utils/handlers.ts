import type { HandlerContext, Handlers } from "$fresh/server.ts";
import frontMatter from "https://esm.sh/front-matter@4.0.2";
import type {
  Timeline,
  TimeLineItem,
} from "https://esm.sh/timeline-types@9.0.0/index.d.ts";
import { fetchJson, fetchText } from "./data.tsx";
import { render } from "./markdown.ts";

export interface SingleItemHandlerProps<T> {
  timeline: Timeline;
  content: string;
  item: T;
  previous?: T;
  next?: T;
}

export interface TimelineItemHandlerProps<T> {
  timeline: Timeline;
  item: T;
  previous?: T;
  next?: T;
}

export const getSingleItemData = async <T extends TimeLineItem>(
  context: HandlerContext<SingleItemHandlerProps<T>, Record<string, unknown>>,
  repositoryPath: string,
  timelineType: TimeLineItem["type"]
) => {
  const [markdown, timeline] = await Promise.all([
    fetchText(
      `https://raw.githubusercontent.com/${repositoryPath}/${context.params.year}/${context.params.slug}.md`
    ),
    fetchJson<Timeline>("https://anandchowdhary.github.io/everything/api.json"),
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

  const data = {
    timeline,
    content,
    item: timeline[currentIndex] as T,
    previous,
    next,
  };
  return data;
};

export const getTimelineItemData = async <T extends TimeLineItem>(
  context: HandlerContext<SingleItemHandlerProps<T>, Record<string, unknown>>,
  ...timelineType: TimeLineItem["type"][]
) => {
  const [timeline] = await Promise.all([
    fetchJson<Timeline>("https://anandchowdhary.github.io/everything/api.json"),
  ]);
  const currentIndex = timeline.findIndex(
    ({ type, url }) =>
      timelineType.includes(type) && url && url.endsWith(context.params.slug)
  );

  const previous = timeline
    .slice(currentIndex + 1)
    .find(({ type }) => timelineType.includes(type)) as T | undefined;
  const next = timeline
    .slice(0, currentIndex)
    .find(({ type }) => timelineType.includes(type)) as T | undefined;

  const data = {
    timeline,
    item: timeline[currentIndex] as T,
    previous,
    next,
  };
  return data;
};

export const singleItemHandler = <T extends TimeLineItem>(
  repositoryPath: string,
  timelineType: TimeLineItem["type"]
): Handlers<SingleItemHandlerProps<T>> => {
  return {
    async GET(_, context) {
      const data = await getSingleItemData(
        context,
        repositoryPath,
        timelineType
      );
      return context.render(data);
    },
  };
};

export const timelineItemHandler = <T extends TimeLineItem>(
  ...timelineType: TimeLineItem["type"][]
): Handlers<TimelineItemHandlerProps<T>> => {
  return {
    async GET(_, context) {
      const data = await getTimelineItemData(context, ...timelineType);
      return context.render(data);
    },
  };
};
