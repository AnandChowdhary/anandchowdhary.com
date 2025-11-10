import { getLifeEventByYearAndSlug, getLifeEvents } from "@/app/api";
import { Container } from "@/app/components/container";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { NavigationFooter } from "@/app/components/navigation-footer";
import { proseClassName } from "@/app/styles";
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
export async function generateStaticParams(): Promise<
  { year: string; slug: string }[]
> {
  const lifeEvents = await getLifeEvents();
  return lifeEvents.map((event) => ({
    year: new Date(event.date).getUTCFullYear().toString(),
    slug: event.slug ?? "",
  }));
}

export default async function LifeYearSlug({ params }: Props) {
  const { year, slug } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);

  const lifeEvent = await getLifeEventByYearAndSlug(yearNumber, slug);
  if (!lifeEvent) notFound();

  const allLifeEvents = await getLifeEvents();
  const currentEventIndex = allLifeEvents.findIndex(
    (e) => e.slug === lifeEvent.slug
  );
  const previousEvent = allLifeEvents[currentEventIndex - 1];
  const nextEvent = allLifeEvents[currentEventIndex + 1];

  const yearNavigation = { previous: previousEvent, next: nextEvent };

  return (
    <Container>
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
          <div className={proseClassName}>
            <p>{lifeEvent.description}</p>
          </div>
        )}
        <NavigationFooter
          previous={
            yearNavigation.previous
              ? {
                  href: `/life/${new Date(
                    yearNavigation.previous.date
                  ).getUTCFullYear()}/${yearNavigation.previous.slug}`,
                  label: yearNavigation.previous.title,
                }
              : undefined
          }
          next={
            yearNavigation.next
              ? {
                  href: `/life/${new Date(
                    yearNavigation.next.date
                  ).getUTCFullYear()}/${yearNavigation.next.slug}`,
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
