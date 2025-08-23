import { getVideoByYearAndSlug, getVideos } from "@/app/api";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { VideoMetadata } from "@/app/videos/metadata";
import { marked } from "marked";
import { markedSmartypants } from "marked-smartypants";
import { notFound } from "next/navigation";

marked.use(markedSmartypants());

export async function generateStaticParams() {
  const videos = await getVideos();
  return videos.map((video) => ({
    year: new Date(video.date).getFullYear().toString(),
    slug: video.slug,
  }));
}

export default async function VideoPage({
  params,
}: {
  params: { year: string; slug: string };
}) {
  const video = await getVideoByYearAndSlug(
    parseInt(params.year),
    params.slug
  );

  if (!video) {
    notFound();
  }

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 space-y-32">
      <Header pathname={`/videos/${params.year}`} />
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
            dangerouslySetInnerHTML={{ __html: marked.parseInline(video.title) }}
          />
          <VideoMetadata item={video} />
        </header>
        {video.description && (
          <div
            className="prose dark:prose-invert prose-headings:font-medium prose-p:first-of-type:text-lg"
            dangerouslySetInnerHTML={{ __html: marked.parse(video.description) }}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}