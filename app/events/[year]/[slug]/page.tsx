import { getEventByYearAndSlug, getEventContent } from "@/app/api";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { marked } from "marked";
import { markedSmartypants } from "marked-smartypants";
import { notFound } from "next/navigation";
import Rand from "rand-seed";

marked.use(markedSmartypants());

export default async function EventsYearSlug({
  params,
}: {
  params: Promise<{ year: string; slug: string }>;
}) {
  const { year, slug } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);
  const rand = Math.floor(new Rand(`${slug}.md`).next() * 100 + 1);

  const event = await getEventByYearAndSlug(yearNumber, slug);
  if (!event) notFound();

  const eventContentText = await getEventContent(year, event.slug);
  const eventContentHtml = await Promise.resolve(
    marked.parse(eventContentText)
  );

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 space-y-32">
      <Header pathname={`/events/${year}`} />
      <main className="max-w-2xl mx-auto space-y-8">
        <div className="relative">
          <img
            src={`https://raw.githubusercontent.com/AnandChowdhary/blog-images/refs/heads/main/384x256/${rand}.png`}
            alt=""
            className="w-full h-full max-h-64 object-cover rounded-2xl dark:brightness-60"
          />
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none text-5xl tracking-widest">
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
          <p className="text-neutral-500">
            {new Date(event.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </header>
        <div
          className="prose dark:prose-invert prose-headings:font-medium"
          dangerouslySetInnerHTML={{ __html: eventContentHtml }}
        />
      </main>
      <Footer />
    </div>
  );
}
