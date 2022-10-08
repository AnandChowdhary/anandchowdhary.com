import type { Handlers, PageProps } from "$fresh/server.ts";
import { Calendar, Location } from "../../../components/Icons.tsx";
import frontMatter from "https://esm.sh/front-matter@4.0.2";
import { render } from "../../../utils/markdown.ts";

interface EventData {
  title: string;
  date: string;
  content: string;
  meta?: Record<string, string>;
  previous?: { title: string; pathname: string; date: string };
  next?: { title: string; pathname: string; date: string };
}

export const handler: Handlers<EventData> = {
  async GET(_, context) {
    const response = await fetch(
      `https://raw.githubusercontent.com/AnandChowdhary/events/main/events/${context.params.year}/${context.params.slug}.md`,
      { cache: "force-cache" }
    );
    if (!response.ok) throw new Error("Not found");
    const markdown = await response.text();
    const title = markdown
      .split("\n")
      .find((line) => line.startsWith("# "))
      ?.replace("# ", "");
    const { attributes, body } = frontMatter(markdown);
    const content = render(body.replace(`# ${title}`, ""));
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
        type === "event" && url && url.endsWith(context.params.slug)
    );
    const date =
      attributes && typeof attributes === "object" && "date" in attributes
        ? Object(attributes).date
        : timeline[currentIndex].date;
    if (!title) throw new Error("Event title not found");
    if (!date) throw new Error("Event date not found");

    const previous = timeline
      .slice(currentIndex + 1)
      .find(({ type }) => type === "event");
    const next = timeline
      .slice(0, currentIndex)
      .find(({ type }) => type === "event");
    return context.render({
      meta: attributes ? Object(attributes) : {},
      content,
      date,
      title,
      previous: previous && {
        title: previous.title,
        pathname:
          "url" in previous && previous.url
            ? new URL(previous.url).pathname
            : "",
        date: previous.date,
      },
      next: next && {
        title: next.title,
        pathname: "url" in next && next.url ? new URL(next.url).pathname : "",
        date: next.date,
      },
    });
  },
};

export default function Event({ data, params }: PageProps<EventData>) {
  const { title, content, date, meta, previous, next } = data;

  return (
    <div className="max-w-screen-md px-4 mx-auto md:px-0">
      <nav>
        <ol className="flex flex-wrap breadcrumbs">
          <li className="hidden">
            <a href="/">Anand Chowdhary</a>
          </li>
          <li>
            <a href="/events">Event</a>
          </li>
          <li>
            <a href={`/events/${params.year}`}>{params.year}</a>
          </li>
        </ol>
      </nav>
      <header class="post-header">
        <h1>{meta?.title ?? title}</h1>
        <ul class="text-gray-500">
          <li class="flex items-center space-x-2">
            <Calendar class="h-4 w-4" />
            <span>
              {new Date(date).toLocaleDateString("en-US", {
                dateStyle: "long",
              })}
            </span>
          </li>
          {meta?.venue && (
            <li class="flex items-center space-x-2">
              <Location class="h-4 w-4" />
              <span>
                {meta.venue} ({meta.country})
              </span>
            </li>
          )}
        </ul>
      </header>
      <div className="longform" dangerouslySetInnerHTML={{ __html: content }} />
      <footer className="grid md:grid-cols-2 gap-4 mt-8">
        {previous && (
          <div>
            <div>&larr; Previous event</div>
            <div className="font-medium">
              <a href={previous.pathname}>{previous.title}</a>
            </div>
            <div className="text-gray-500">
              {new Date(previous.date).toLocaleDateString("en-US", {
                dateStyle: "long",
              })}
            </div>
          </div>
        )}
        {next && (
          <div className="text-right">
            <div>Next event &rarr;</div>
            <div className="font-medium">
              <a href={next.pathname}>{next.title}</a>
            </div>
            <div className="text-gray-500">
              {new Date(next.date).toLocaleDateString("en-US", {
                dateStyle: "long",
              })}
            </div>
          </div>
        )}
      </footer>
    </div>
  );
}
