import type { Handlers, PageProps } from "$fresh/server.ts";
import { slugify } from "https://deno.land/x/slugify@0.3.0/mod.ts";
import frontMatter from "https://esm.sh/front-matter@4.0.2";
import smartQuotes from "https://esm.sh/smartquotes-ts@0.0.2";
import {
  Timeline as ITimeline,
  TimelineEvent,
} from "https://esm.sh/timeline-types@8.0.0/index.d.ts";
import { Breadcrumbs } from "../../../components/data/Breadcrumbs.tsx";
import { SectionTitle } from "../../../components/data/SectionTitle.tsx";
import { Timeline } from "../../../components/data/Timeline.tsx";
import { ExternalLink } from "../../../components/text/ExternalLink.tsx";
import { fetchJson, fetchText, HttpError } from "../../../utils/data.tsx";
import { render } from "../../../utils/markdown.ts";

interface TalkData {
  attributes?: { slides?: string; embed?: string };
  content?: string;
  title?: string;
  talk: string;
  timeline: ITimeline;
}

export const handler: Handlers<TalkData> = {
  async GET(request, context) {
    const talk = context.params.talk;
    const timeline = await fetchJson<ITimeline>(
      "https://anandchowdhary.github.io/everything/api.json"
    );
    let markdown: string | undefined = undefined;
    try {
      markdown = await fetchText(
        `https://raw.githubusercontent.com/AnandChowdhary/events/main/talks/${slugify(
          talk,
          { lower: true }
        )}.md`
      );
    } catch (error) {
      if (!(error instanceof HttpError) || error.status !== 404) throw error;
    }
    const props: TalkData = {
      talk,
      timeline,
    };
    if (markdown) {
      const { body, attributes } = frontMatter(markdown);
      const title =
        Object(attributes).title ??
        body
          .split("\n")
          .find((line) => line.startsWith("# "))
          ?.replace("# ", "") ??
        talk;
      const content = render(body.replace(`# ${title}`, ""));
      props.attributes = Object(attributes);
      props.content = content;
      props.title = title;
    }
    return context.render(props);
  },
};

export default function Archive({ data }: PageProps<TalkData>) {
  const { attributes, content, talk, timeline, title: originalTitle } = data;
  const alsoShownAt = timeline.filter(
    (found) =>
      found.type === "event" &&
      slugify(found.data.talk ?? "", { lower: true }) === talk
  );
  const title =
    originalTitle ?? (alsoShownAt[0] as TimelineEvent)?.data?.talk ?? talk;

  return (
    <div class="max-w-screen-md px-4 mx-auto space-y-4 md:px-0">
      <Breadcrumbs
        items={[
          { href: "/events", title: "Events" },
          { href: "/events/talks", title: "Talks" },
          { href: `/events/talks/${talk}`, title: title },
        ]}
      />
      <SectionTitle title={title} />
      <section class="mt-8">
        {content && (
          <div
            className="longform"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
        {attributes && attributes.slides && (
          <div class="mt-8">
            <h3 class="text-xl font-semibold font-display">Slides</h3>
            <p class="mb-4 text-gray-500">
              {smartQuotes(
                "The most recent version of this talk's slides are available on "
              )}
              <ExternalLink href={attributes.slides}>
                {new URL(attributes.slides).hostname.replace(/^www\./, "")}
              </ExternalLink>
              .
            </p>
            {attributes.embed && (
              <iframe
                class="w-full rounded-lg shadow bg-white"
                allowFullScreen
                style={{ aspectRatio: "16/9" }}
                src={`${attributes.embed ?? attributes.embed}${
                  (attributes.embed ?? attributes.embed ?? "").includes("?")
                    ? "&"
                    : "?"
                }title=false&skipResize=true`}
                allow="encrypted-media;"
              />
            )}
          </div>
        )}
        {alsoShownAt.length > 0 && (
          <div class="mt-8">
            <h3 class="text-xl font-semibold font-display">Presentations</h3>
            <p class="text-gray-500">
              This talk was presented at <strong>{alsoShownAt.length}</strong>{" "}
              {alsoShownAt.length === 1 ? "event" : "events"}.
            </p>
            <Timeline
              timeline={timeline}
              show={alsoShownAt}
              hideYearHeading
              query=""
              yearHrefPrefix="/events"
            />
          </div>
        )}
      </section>
    </div>
  );
}
