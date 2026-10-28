import { getVideos } from "@/views/api";
import { buildScreenshotOpenGraphImageUrl } from "@/views/lib/opengraph";
import VideosContent from "@/views/videos/component";
import type { Metadata } from "@/lib/metadata";
import { notFound } from "@/lib/navigation";

type Props = {
  params: Promise<{ year: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const year = (await params).year;
  return {
    title: `${year} / Videos / Anand Chowdhary`,
    description: `Videos featuring talks, interviews, and appearances from ${year} by Anand Chowdhary.`,
    openGraph: {
      images: [
        {
          url: buildScreenshotOpenGraphImageUrl(`/videos/${year}`),
        },
      ],
    },
  };
}


export default async function VideosYear({ params }: Props) {
  const { year } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);
  const allVideos = await getVideos();
  const yearVideosData = allVideos.filter(
    (video) => new Date(video.date).getFullYear() === yearNumber,
  );

  // Get all years that have videos
  const availableYears = Array.from(
    new Set(allVideos.map((video) => new Date(video.date).getFullYear())),
  ).sort((a, b) => a - b);

  // Find previous and next years
  const currentYearIndex = availableYears.indexOf(yearNumber);
  const previousYear =
    currentYearIndex > 0 ? availableYears[currentYearIndex - 1] : undefined;
  const nextYear =
    currentYearIndex < availableYears.length - 1
      ? availableYears[currentYearIndex + 1]
      : undefined;

  return (
    <VideosContent
      videosData={yearVideosData}
      year={year}
      previousYear={previousYear}
      nextYear={nextYear}
    />
  );
}
