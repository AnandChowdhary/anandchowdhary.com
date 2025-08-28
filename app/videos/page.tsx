import { getVideos } from "@/app/api";
import VideosContent from "@/app/videos/component";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Videos / Anand Chowdhary",
  description:
    "Watch talks, presentations, and video content featuring Anand Chowdhary.",
};

export default async function Videos() {
  const videosData = await getVideos();
  return <VideosContent videosData={videosData} />;
}
