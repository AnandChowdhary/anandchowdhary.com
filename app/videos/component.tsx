import { Video } from "@/app/api";
import { focusStyles } from "@/app/components/external-link";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { NavigationFooter } from "@/app/components/navigation-footer";
import { VideoMetadata } from "@/app/videos/metadata";
import { marked } from "marked";
import { markedSmartypants } from "marked-smartypants";
import Link from "next/link";

marked.use(markedSmartypants());

const VideoCard = ({ item }: { item: Video }) => (
  <article className="relative space-y-4">
    <div className="pointer-events-none aspect-video rounded-lg shadow-sm relative">
      {item.img ? (
        <img
          src={item.img}
          alt=""
          className="w-full h-full object-cover rounded-lg dark:brightness-60"
        />
      ) : (
        <div className="w-full h-full bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center">
          <svg
            className="w-8 h-8 text-neutral-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}
      {item.duration && (
        <div className="absolute bottom-1 right-1 bg-neutral-800/30 backdrop-blur-sm text-white text-xs px-1 py-0.5 rounded">
          {item.duration}
        </div>
      )}
    </div>
    <Link
      href={`/videos/${new Date(item.date).getFullYear()}/${item.slug}`}
      className={`${focusStyles} min-w-0 full-link flex hover:text-neutral-500`}
    >
      <div
        className="w-full"
        style={{
          maskImage: "linear-gradient(to right, black 70%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, black 70%, transparent 100%)",
        }}
      >
        <h3
          className="truncate font-medium"
          dangerouslySetInnerHTML={{
            __html: marked.parseInline(item.title),
          }}
        />
      </div>
    </Link>
    <VideoMetadata
      item={item}
      compact
      className="lg:grid-cols-1 text-xs -mt-5"
    />
  </article>
);

export default async function VideosContent({
  videosData,
  year,
  previousYear,
  nextYear,
}: {
  videosData: Video[];
  year?: string;
  previousYear?: number;
  nextYear?: number;
}) {
  const sortedVideos = [...videosData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 space-y-32">
      <Header
        pathname={year ? `/videos/${year}` : "/videos"}
        description="A collection of videos featuring my talks, interviews, and appearances discussing technology, accessibility, and entrepreneurship."
      />

      <main className="max-w-5xl mx-auto space-y-4">
        <div className="grid grid-cols-3 gap-8">
          {sortedVideos.map((item) => (
            <VideoCard key={item.slug} item={item} />
          ))}
        </div>
        {year && (previousYear || nextYear) && (
          <NavigationFooter
            previous={
              previousYear
                ? {
                    href: `/videos/${previousYear}`,
                    label: previousYear.toString(),
                  }
                : undefined
            }
            next={
              nextYear
                ? {
                    href: `/videos/${nextYear}`,
                    label: nextYear.toString(),
                  }
                : undefined
            }
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
