import { Handlers, PageProps } from "$fresh/server.ts";
import { Timeline as ITimeline } from "https://esm.sh/timeline-types@9.0.0/index.d.ts";
import { Breadcrumbs } from "../../components/data/Breadcrumbs.tsx";
import { SectionTitle } from "../../components/data/SectionTitle.tsx";
import { Timeline } from "../../components/data/Timeline.tsx";
import { ExternalLink } from "../../components/text/ExternalLink.tsx";
import { fetchJson } from "../../utils/data.tsx";

interface ArchiveData {
  timeline: ITimeline;
  query: string;
}

export const handler: Handlers<ArchiveData> = {
  async GET(request, context) {
    const timeline = await fetchJson<ITimeline>(
      "https://anandchowdhary.github.io/everything/api.json"
    );
    const props = {
      timeline,
      query: new URL(request.url).search,
    };
    return context.render(props);
  },
};

export default function Archive({ data }: PageProps<ArchiveData>) {
  const { timeline, query } = data;
  return (
    <div class="max-w-screen-md px-4 mx-auto space-y-4 md:px-0">
      <Breadcrumbs items={[{ href: "/blog", title: "Blog" }]} />
      <SectionTitle
        title="Blog"
        description="I occasionally pen down my thoughts about technology, productivity, and
        design."
      >
        <p>
          My articles, like all sections of this site, are open source and
          available on{" "}
          <ExternalLink href="https://github.com/AnandChowdhary/blog">
            GitHub
          </ExternalLink>{" "}
          as raw markdown files. In the past, I've also written articles for
          publications like{" "}
          <ExternalLink href="https://css-tricks.com/author/anandchowdhary/">
            CSS Tricks
          </ExternalLink>{" "}
          and on{" "}
          <ExternalLink href="https://medium.com/@anandchowdhary">
            Medium
          </ExternalLink>
          , and my unfiltered thoughts can be found on{" "}
          <ExternalLink href="https://twitter.com/AnandChowdhary">
            Twitter
          </ExternalLink>
          .
        </p>
      </SectionTitle>
      <Timeline
        timeline={timeline}
        show={timeline.filter(({ type }) => type === "blog-post")}
        query={query}
        yearHrefPrefix="/blog"
      />
    </div>
  );
}
