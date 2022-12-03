import type { Handlers, PageProps } from "$fresh/server.ts";
import { slugify } from "https://deno.land/x/slugify@0.3.0/mod.ts";
import {
  Timeline as ITimeline,
  TimelineEvent,
} from "https://esm.sh/timeline-types@8.0.0/index.d.ts";
import { Breadcrumbs } from "../../../components/data/Breadcrumbs.tsx";
import { SectionTitle } from "../../../components/data/SectionTitle.tsx";
import { fetchJson } from "../../../utils/data.tsx";

interface TalkData {
  timeline: ITimeline;
}

export const handler: Handlers<TalkData> = {
  async GET(request, context) {
    const timeline = await fetchJson<ITimeline>(
      "https://anandchowdhary.github.io/everything/api.json"
    );
    const props = {
      timeline,
    };
    return context.render(props);
  },
};

export default function Archive({ data }: PageProps<TalkData>) {
  const { timeline } = data;

  return (
    <div class="max-w-screen-md px-4 mx-auto space-y-4 md:px-0">
      <Breadcrumbs
        items={[
          { href: "/events", title: "Events" },
          { href: "/events/talks", title: "Talks" },
        ]}
      />
      <SectionTitle title="Talks" />
      <div class="space-y-8">
        <ul class="grid grid-cols-2">
          {Array.from(
            new Set(
              timeline
                .filter((found) => found.type === "event")
                .map((item) => (item as TimelineEvent).data.talk)
                .filter((i) => !!i)
            )
          ).map((talk) => (
            <li>
              <a
                href={`/events/talks/${slugify(talk ?? "", {
                  lower: true,
                })}`}
              >
                {talk}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
