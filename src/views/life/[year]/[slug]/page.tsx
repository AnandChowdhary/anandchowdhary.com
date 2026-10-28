import { getLifeEventByYearAndSlug, getLifeEvents } from "@/views/api";
import { buildScreenshotOpenGraphImageUrl } from "@/views/lib/opengraph";
import { Container } from "@/views/components/container";
import { Footer } from "@/views/components/footer";
import { Header } from "@/views/components/header";
import { NavigationFooter } from "@/views/components/navigation-footer";
import { proseClassName } from "@/views/styles";
import { IconCalendarEvent } from "@tabler/icons-react";
import type { Metadata } from "@/lib/metadata";
import { notFound } from "@/lib/navigation";

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
    openGraph: {
      images: [
        {
          url: buildScreenshotOpenGraphImageUrl(`/life/${year}/${slug}`),
        },
      ],
    },
  };
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
