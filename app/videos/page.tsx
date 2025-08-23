import { getVideos } from "@/app/api";
import VideosContent from "@/app/videos/component";

export default async function Videos() {
  const videosData = await getVideos();
  return <VideosContent videosData={videosData} />;
}