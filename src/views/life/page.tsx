import { getLifeEvents } from "@/views/api";
import { buildScreenshotOpenGraphImageUrl } from "@/views/lib/opengraph";
import LifeContent from "@/views/life/component";
import type { Metadata } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Life / Anand Chowdhary",
  description:
    "Explore major life events and milestones in Anand Chowdhary's journey.",
  openGraph: {
    images: [{ url: buildScreenshotOpenGraphImageUrl("/life") }],
  },
};

export default async function Life() {
  const lifeEventsData = await getLifeEvents();
  return <LifeContent lifeEventsData={lifeEventsData} />;
}
