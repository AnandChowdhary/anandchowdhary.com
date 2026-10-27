import { getVideoByYearAndSlug, getVideos } from "@/views/api";
import { buildScreenshotOpenGraphImageUrl } from "@/views/lib/opengraph";
import { Container } from "@/views/components/container";
import { Footer } from "@/views/components/footer";
import { Header } from "@/views/components/header";
import { NavigationFooter } from "@/views/components/navigation-footer";
import { proseClassName } from "@/views/styles";
import { VideoMetadata } from "@/views/videos/metadata";
import { marked } from "marked";
import { markedSmartypants } from "marked-smartypants";
import type { Metadata } from "@/lib/metadata";
import { notFound, permanentRedirect } from "@/lib/navigation";

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
    openGraph: {
      images: [
        {
          url: buildScreenshotOpenGraphImageUrl(`/videos/${year}/${slug}`),
        },
      ],
    },
  };
}


export default async function VideoPage({ params }: Props) {
  const { year, slug } = await params;
  const video = await getVideoByYearAndSlug(parseInt(year), slug);

  if (!video) {
    notFound();
  }
  // Slug aliases (see `slugsMatch`) resolve to the same page, so send them on
  // to the canonical URL instead of serving duplicate content.
  if (video.slug !== slug) permanentRedirect(`/videos/${year}/${video.slug}`);

  const allVideos = await getVideos();
  const currentVideoIndex = allVideos.findIndex((v) => v.slug === video.slug);
  const previousVideo = allVideos[currentVideoIndex - 1];
  const nextVideo = allVideos[currentVideoIndex + 1];

  const yearNavigation = { previous: previousVideo, next: nextVideo };

  return (
    <Container>
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
                    yearNavigation.previous.date
                  ).getFullYear()}/${yearNavigation.previous.slug}`,
                  label: yearNavigation.previous.title,
                }
              : undefined
          }
          next={
            yearNavigation.next
              ? {
                  href: `/videos/${new Date(
                    yearNavigation.next.date
                  ).getFullYear()}/${yearNavigation.next.slug}`,
                  label: yearNavigation.next.title,
                }
              : undefined
          }
        />
      </main>
      <Footer />
    </Container>
  );
}
