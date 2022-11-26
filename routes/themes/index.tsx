import { Handlers, PageProps } from "$fresh/server.ts";
import { Timeline as ITimeline } from "https://esm.sh/timeline-types@7.0.0/index.d.ts";
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
      <SectionTitle
        emoji="🌈"
        title="Themes"
        description="Every year on my birthday, I reflect on the past year and set a theme for the next year."
      >
        <p>
          The idea is simple — an overarching theme acts as a North Star and
          guides you in making microdecisions. To learn more about how I think
          about themes, read my blog post{" "}
          <a href="/blog/2021/year-of-teamwork">
            2022 will be the Year of Teamwork
          </a>
          . My themes, like all sections of this site, are open source and
          available on{" "}
          <ExternalLink href="https://github.com/AnandChowdhary/themes">
            GitHub
          </ExternalLink>{" "}
          as raw markdown files. All thumbnails are generated using Stable
          Diffusion.
        </p>
      </SectionTitle>
      <Timeline
        timeline={timeline}
        show={timeline.filter(({ type }) => type === "theme")}
        query={query}
        hideYearHeading
        yearHrefPrefix="/themes"
      />
    </div>
  );
}
