import { Handlers, PageProps } from "$fresh/server.ts";
import { Timeline } from "../../../components/data/Timeline.tsx";
import timeline from "../../../everything/api.json" assert { type: "json" };
import { Timeline as ITimeline } from "../../../utils/interfaces.ts";

interface ArchiveData {
  query: string;
  timeline: ITimeline;
}

export const handler: Handlers<ArchiveData> = {
  GET(request, context) {
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
    <div class="max-w-screen-md px-4 mx-auto space-y-12 md:px-0">
      <Timeline timeline={timeline} query={query} />
    </div>
  );
}
