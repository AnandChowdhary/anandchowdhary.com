import { getLifeEventByYearAndSlug } from "@/app/api";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { IconCalendarEvent } from "@tabler/icons-react";
import { notFound } from "next/navigation";

export default async function LifeYearSlug({
  params,
}: {
  params: Promise<{ year: string; slug: string }>;
}) {
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
