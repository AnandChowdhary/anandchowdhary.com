import { getVideoByYearAndSlug, getVideos } from "@/app/api";
import { focusStyles } from "@/app/components/external-link";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { NavigationFooter } from "@/app/components/navigation-footer";
import { proseClassName } from "@/app/styles";
import { VideoMetadata } from "@/app/videos/metadata";
import { marked } from "marked";
import { markedSmartypants } from "marked-smartypants";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

marked.use(markedSmartypants());

type Props = {
  params: Promise<{ year: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year, slug } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);

  const video = await getVideoByYearAndSlug(yearNumber, slug);
  if (!video) notFound();
  return {
    title: `${video.title} / ${year} / Videos / Anand Chowdhary`,
    description: video.description ?? `Video: ${video.title}`,
  };
}

export async function generateStaticParams(): Promise<
  { year: string; slug: string }[]
> {
  const videos = await getVideos();
  return videos.map((video) => ({
    year: new Date(video.date).getFullYear().toString(),
    slug: video.slug ?? "",
  }));
}

export default async function VideoPage({ params }: Props) {
  const { year, slug } = await params;
  const video = await getVideoByYearAndSlug(parseInt(year), slug);

  if (!video) {
    notFound();
  }

  const allVideos = await getVideos();
  const currentVideoIndex = allVideos.findIndex((v) => v.slug === video.slug);
  const previousVideo = allVideos[currentVideoIndex - 1];
  const nextVideo = allVideos[currentVideoIndex + 1];

  const yearNavigation = { previous: previousVideo, next: nextVideo };

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 space-y-32">
      <Header pathname={`/videos/${year}`} />
      <main className="max-w-2xl mx-auto space-y-8">
        {video.img && (
          <div className="relative">
            <img
              src={video.img}
              alt={video.title}
              className="w-full h-full max-h-64 object-cover rounded-2xl dark:brightness-60"
            />
          </div>
        )}
        <header className="space-y-2">
          <h1
            className="text-2xl font-medium"
            dangerouslySetInnerHTML={{
              __html: marked.parseInline(video.title),
            }}
          />
          <VideoMetadata item={video} />
        </header>
        {video.description && (
          <div
            className={proseClassName}
            dangerouslySetInnerHTML={{
              __html: marked.parse(video.description),
            }}
          />
        )}
        <NavigationFooter
          previous={
            yearNavigation.previous
              ? {
                  href: `/videos/${new Date(
                    yearNavigation.previous.date,
                  ).getFullYear()}/${yearNavigation.previous.slug}`,
                  label: yearNavigation.previous.title,
                }
              : undefined
          }
          next={
            yearNavigation.next
              ? {
                  href: `/videos/${new Date(
                    yearNavigation.next.date,
                  ).getFullYear()}/${yearNavigation.next.slug}`,
                  label: yearNavigation.next.title,
                }
              : undefined
          }
        />
      </main>
      <Footer />
    </div>
  );
}
