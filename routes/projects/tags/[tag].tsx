import { Handlers, PageProps } from "$fresh/server.ts";
import { slugify } from "https://deno.land/x/slugify@0.3.0/mod.ts";
import { Timeline as ITimeline } from "https://esm.sh/timeline-types@9.0.0/index.d.ts";
import { Breadcrumbs } from "../../../components/data/Breadcrumbs.tsx";
import { SectionTitle } from "../../../components/data/SectionTitle.tsx";
import { Timeline } from "../../../components/data/Timeline.tsx";
import { fetchJson, fetchText } from "../../../utils/data.tsx";
import { render } from "../../../utils/markdown.ts";

interface ArchiveData {
  timeline: ITimeline;
  tag: string;
  query: string;
  readme?: string;
}

const TAGS: Record<string, string> = {
  pabio: "Pabio",
  "oswald-labs": "Oswald Labs",
};

export const handler: Handlers<ArchiveData> = {
  async GET(request, context) {
    const timeline = await fetchJson<ITimeline>(
      "https://anandchowdhary.github.io/everything/api.json"
    );

    const tag = context.params.tag;
    let readme = Object.keys(TAGS).includes(tag)
      ? await fetchText(
          `https://raw.githubusercontent.com/AnandChowdhary/projects/main/tags/${tag}.md`
        )
      : undefined;
    if (readme) readme = readme.replace(/^# .+$/m, "");

    const props = {
      tag,
      readme,
      timeline: tag
        ? timeline.filter(({ data, type }) => {
            const allTags: string[] = [];
            if (!data) return false;
            if ("topics" in data)
              allTags.push(
                ...data.topics.map((i) => slugify(i, { lower: true }))
              );
            if ("tags" in data)
              allTags.push(
                ...data.tags.map((i) => slugify(i, { lower: true }))
              );
            return (
              (type === "open-source-project" || type === "project") &&
              allTags.includes(slugify(tag, { lower: true }))
            );
          })
        : timeline,
      query: new URL(request.url).search,
    };
    return context.render(props);
  },
};

export default function Archive({ data }: PageProps<ArchiveData>) {
  const { timeline, query, tag, readme } = data;
  const __html = readme
    ? render(readme, {
        repository: "AnandChowdhary/projects",
      })
    : undefined;

  return (
    <div class="max-w-screen-md px-4 mx-auto space-y-4 md:px-0">
      {TAGS[tag.toString()] && (
        <div className="w-full bg-white py-32 flex items-center justify-center rounded-lg shadow mb-4">
          <img
            alt=""
            class="h-12"
            src={`https://raw.githubusercontent.com/AnandChowdhary/projects/main/assets/tags/${tag.toString()}.svg`}
          />
        </div>
      )}
      <Breadcrumbs
        items={[
          { href: "/projects", title: "Projects" },
          {
            href: `/projects/${tag}`,
            title: TAGS[tag.toString()] ?? tag.toString(),
          },
        ]}
      />
      <SectionTitle title={TAGS[tag.toString()] ?? tag.toString()} />
      {__html && (
        <div className="longform pb-16" dangerouslySetInnerHTML={{ __html }} />
      )}
      <Timeline
        timeline={timeline}
        show={timeline}
        query={query}
        yearHrefPrefix="/projects"
        hideYearHeading
      />
    </div>
  );
}
