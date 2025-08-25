import { getLifeEventByYearAndSlug, getLifeEvents } from "@/app/api";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { IconCalendarEvent } from "@tabler/icons-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ year: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year, slug } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);

  const lifeEvent = await getLifeEventByYearAndSlug(yearNumber, slug);
  if (!lifeEvent) notFound();
  return {
    title: `${lifeEvent.title} / ${year} / Life / Anand Chowdhary`,
    description: lifeEvent.description ?? `Life event: ${lifeEvent.title}`,
  };
}

export const revalidate = 60;
export async function generateStaticParams() {
  const lifeEvents = await getLifeEvents();
  return lifeEvents.map((event) => ({
    year: new Date(event.date).getUTCFullYear().toString(),
    slug: event.slug,
  }));
}

export default async function LifeYearSlug({ params }: Props) {
  const { year, slug } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);

  const lifeEvent = await getLifeEventByYearAndSlug(yearNumber, slug);
  if (!lifeEvent) notFound();

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 space-y-32">
      <Header pathname="/life" />
      <main className="max-w-2xl mx-auto space-y-8">
        <header className="space-y-4">
          <h1 className="text-2xl font-medium">{lifeEvent.title}</h1>
          <div className="flex items-center gap-1.5 text-sm text-neutral-500">
            <IconCalendarEvent
              className="shrink-0"
              size={16}
              strokeWidth={1.5}
            />
            <div className="grow">
              {new Date(lifeEvent.date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>
        </header>

        {lifeEvent.description && (
          <div className="prose dark:prose-invert prose-headings:font-medium prose-p:first-of-type:text-lg">
            <p>{lifeEvent.description}</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
