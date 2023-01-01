import { Handlers, PageProps } from "$fresh/server.ts";
import { slugify } from "https://deno.land/x/slugify@0.3.0/mod.ts";
import { Timeline as ITimeline } from "https://esm.sh/timeline-types@9.0.0/index.d.ts";
import { Breadcrumbs } from "../../../components/data/Breadcrumbs.tsx";
import { SectionTitle } from "../../../components/data/SectionTitle.tsx";
import { Timeline } from "../../../components/data/Timeline.tsx";
import { fetchJson } from "../../../utils/data.tsx";

interface ArchiveData {
  timeline: ITimeline;
  tag: string;
  query: string;
}

export const handler: Handlers<ArchiveData> = {
  async GET(request, context) {
    const timeline = await fetchJson<ITimeline>(
      "https://anandchowdhary.github.io/everything/api.json"
    );

    const tag = context.params.tag;
    const props = {
      tag,
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
  const { timeline, query, tag } = data;
  return (
    <div class="max-w-screen-md px-4 mx-auto space-y-4 md:px-0">
      <Breadcrumbs
        items={[
          { href: "/projects", title: "Projects" },
          { href: `/projects/${tag}`, title: tag.toString() },
        ]}
      />
      <SectionTitle title={tag.toString()} />
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
