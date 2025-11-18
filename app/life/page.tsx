import { getLifeEvents } from "@/app/api";
import { buildScreenshotOpenGraphImageUrl } from "@/app/lib/opengraph";
import LifeContent from "@/app/life/component";
import { Metadata } from "next";

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
