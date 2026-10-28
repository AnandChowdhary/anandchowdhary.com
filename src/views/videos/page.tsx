import { getVideos } from "@/views/api";
import { buildScreenshotOpenGraphImageUrl } from "@/views/lib/opengraph";
import VideosContent from "@/views/videos/component";
import type { Metadata } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Videos / Anand Chowdhary",
  description:
    "Watch talks, presentations, and video content featuring Anand Chowdhary.",
  openGraph: {
    images: [
      {
        url: buildScreenshotOpenGraphImageUrl("/videos"),
      },
    ],
  },
};

export default async function Videos() {
  const videosData = await getVideos();
  return <VideosContent videosData={videosData} />;
}
