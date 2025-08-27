import {
  getAllEvents,
  getEventByYearAndSlug,
  getEventContent,
  getTalk,
} from "@/app/api";
import { ExternalLink } from "@/app/components/external-link";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { EventMetadata } from "@/app/events/metadata";
import {
  IconBrandGithub,
  IconBrandYoutube,
  IconPresentation,
} from "@tabler/icons-react";
import { marked } from "marked";
import { markedSmartypants } from "marked-smartypants";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Rand from "rand-seed";

marked.use(markedSmartypants());

type Props = {
  params: Promise<{ year: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year, slug } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);

  const event = await getEventByYearAndSlug(yearNumber, slug);
  if (!event) notFound();
  return {
    title: `${event.title} / ${year} / Events / Anand Chowdhary`,
    description: event.excerpt,
  };
}

export const revalidate = 60;
export async function generateStaticParams(): Promise<
  { year: string; slug: string }[]
> {
  const events = await getAllEvents();
  return events.map((event) => ({
    year: new Date(event.date).getUTCFullYear().toString(),
    slug: event.slug.replace(".md", ""),
  }));
}

export default async function EventsYearSlug({ params }: Props) {
  const { year, slug } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);
  const rand = Math.floor(new Rand(`${slug}.md`).next() * 100 + 1);

  const event = await getEventByYearAndSlug(yearNumber, slug);
  if (!event) notFound();

  let talk: { content: string; slides?: string; embed?: string } | null = null;
  if (event.attributes.talk) talk = await getTalk(event.attributes.talk);

  const eventContentText = await getEventContent(year, event.slug);
  const eventContentHtml = await Promise.resolve(
    marked.parse(eventContentText)
  );

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 space-y-32">
      <Header
        pathname={`/events/${year}`}
        description="From time to time, I speak at startup events and technical conferences about engineering, design, and entrepreneurship."
      />
      <main className="max-w-2xl mx-auto space-y-8">
        <div className="relative">
          {event.attributes.coordinates && (
            <img
              src={`https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/${event.attributes.coordinates[1]},${event.attributes.coordinates[0]},15/1152x576?access_token=pk.eyJ1IjoiYW5hbmRjaG93ZGhhcnkiLCJhIjoiY2w5MWpxbXZ2MDdpMzN2bW92ZnRzZ2Q4bSJ9.WMWxq61EUjQfWtntvGGNKQ`}
              alt=""
              className="w-full h-full max-h-64 object-cover rounded-2xl absolute inset-0 z-10 mix-blend-overlay"
            />
          )}
          <img
            src={`https://raw.githubusercontent.com/AnandChowdhary/blog-images/refs/heads/main/384x256/${rand}.png`}
            alt=""
            className="w-full h-full max-h-64 object-cover rounded-2xl dark:brightness-60"
          />
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none text-5xl tracking-widest">
            {event.emoji}
          </div>
        </div>
        <header className="space-y-2">
          <h1
            className="text-2xl font-medium"
            dangerouslySetInnerHTML={{
              __html: marked.parseInline(event.title),
            }}
          />
          <EventMetadata item={event} className="grid-cols-3">
            <div className="text-sm text-neutral-500 flex items-center gap-1.5">
              <IconBrandGithub
                className="shrink-0"
                size={16}
                strokeWidth={1.5}
              />
              <ExternalLink
                className="grow truncate"
                href={`https://github.com/AnandChowdhary/events/blob/main/events/${year}/${slug}.md`}
              >
                Source on GitHub
              </ExternalLink>
            </div>
            {talk?.slides && (
              <div className="text-sm text-neutral-500 flex items-center gap-1.5">
                <IconPresentation
                  className="shrink-0"
                  size={16}
                  strokeWidth={1.5}
                />
                <ExternalLink className="grow truncate" href={talk.slides}>
                  Slides on speakerdeck.com
                </ExternalLink>
              </div>
            )}
            {event.attributes.video && (
              <div className="text-sm text-neutral-500 flex items-center gap-1.5">
                <IconBrandYoutube
                  className="shrink-0"
                  size={16}
                  strokeWidth={1.5}
                />
                <ExternalLink
                  className="grow truncate"
                  href={event.attributes.video}
                >
                  Watch on{" "}
                  {new URL(event.attributes.video).hostname.replace("www.", "")}
                </ExternalLink>
              </div>
            )}
          </EventMetadata>
        </header>
        <div
          className="prose dark:prose-invert prose-headings:font-medium prose-p:first-of-type:text-lg"
          dangerouslySetInnerHTML={{ __html: eventContentHtml }}
        />
        {event.attributes.video &&
          event.attributes.video.includes("youtube") && (
            <div className="space-y-4 mt-4">
              <h2 className="text-xl font-medium">Recording</h2>
              <iframe
                className="w-full aspect-video rounded-2xl"
                src={event.attributes.video.replace("watch?v=", "embed/")}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          )}
        {talk && (
          <div className="space-y-4 mt-4">
            <h2 className="text-xl font-medium">Talk</h2>
            <div
              className="prose dark:prose-invert prose-headings:font-medium prose-p:first-of-type:text-lg"
              dangerouslySetInnerHTML={{ __html: talk.content }}
            />
            {talk.embed && (
              <div className="space-y-4 mt-4">
                <h3 className="text-lg font-medium">Slides</h3>
                <iframe
                  className="w-full aspect-video rounded-2xl"
                  src={talk.embed}
                  allowFullScreen
                />
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
