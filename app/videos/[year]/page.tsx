import { getVideos } from "@/app/api";
import VideosContent from "@/app/videos/component";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ year: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const year = (await params).year;
  return {
    title: `${year} / Videos / Anand Chowdhary`,
    description: `Videos featuring talks, interviews, and appearances from ${year} by Anand Chowdhary.`,
  };
}

export const revalidate = 60;
export async function generateStaticParams(): Promise<{ year: string }[]> {
  const videos = await getVideos();
  const years = Array.from(
    new Set(videos.map((video) => new Date(video.date).getFullYear().toString()))
  );
  return years.map((year) => ({ year }));
}

export default async function VideosYear({ params }: Props) {
  const { year } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);
  const allVideos = await getVideos();
  const yearVideosData = allVideos.filter(
    (video) => new Date(video.date).getFullYear() === yearNumber
  );
  
  // Get all years that have videos
  const availableYears = Array.from(
    new Set(allVideos.map((video) => new Date(video.date).getFullYear()))
  ).sort((a, b) => a - b);
  
  // Find previous and next years
  const currentYearIndex = availableYears.indexOf(yearNumber);
  const previousYear = currentYearIndex > 0 ? availableYears[currentYearIndex - 1] : undefined;
  const nextYear = currentYearIndex < availableYears.length - 1 ? availableYears[currentYearIndex + 1] : undefined;
  
  return <VideosContent 
    videosData={yearVideosData} 
    year={year}
    previousYear={previousYear}
    nextYear={nextYear}
  />;
}