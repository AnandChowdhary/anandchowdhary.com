import { getVideoByYearAndSlug, getVideos } from "@/app/api";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { proseClassName } from "@/app/styles";
import { VideoMetadata } from "@/app/videos/metadata";
import { marked } from "marked";
import { markedSmartypants } from "marked-smartypants";
import { Metadata } from "next";
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

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 space-y-32">
      <Header
        pathname={`/videos/${year}`}
        description="A collection of videos featuring my talks, interviews, and appearances discussing technology, accessibility, and entrepreneurship."
      />
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
      </main>
      <Footer />
    </div>
  );
}
