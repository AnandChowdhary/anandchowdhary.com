import { getPress, getPressItemByYearAndSlug } from "@/app/api";
import { ExternalLink } from "@/app/components/external-link";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import {
  IconAward,
  IconBuilding,
  IconCalendarEvent,
  IconExternalLink,
  IconMicrophone,
  IconNews,
  IconUser,
} from "@tabler/icons-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ year: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year, slug } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);

  const pressItem = await getPressItemByYearAndSlug(yearNumber, slug);
  if (!pressItem) notFound();
  return {
    title: `${pressItem.title} / ${year} / Press / Anand Chowdhary`,
    description: pressItem.description ?? `Press coverage: ${pressItem.title}`,
  };
}

export const revalidate = 60;
export async function generateStaticParams() {
  const pressItems = await getPress();
  return [
    ...pressItems.awards.map((item) => ({
      year: new Date(item.date).getUTCFullYear().toString(),
      slug: item.slug,
    })),
    ...pressItems.podcasts.map((item) => ({
      year: new Date(item.date).getUTCFullYear().toString(),
      slug: item.slug,
    })),
    ...pressItems.features.map((item) => ({
      year: new Date(item.date).getUTCFullYear().toString(),
      slug: item.slug,
    })),
  ];
}

export default async function PressYearSlug({ params }: Props) {
  const { year, slug } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);

  const pressItem = await getPressItemByYearAndSlug(yearNumber, slug);
  if (!pressItem) notFound();

  // Get the appropriate icon based on category
  const CategoryIcon =
    pressItem.category === "award"
      ? IconAward
      : pressItem.category === "podcast"
      ? IconMicrophone
      : IconNews;

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 space-y-32">
      <Header pathname={`/press`} />
      <main className="max-w-2xl mx-auto space-y-8">
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-neutral-500">
            <CategoryIcon size={20} strokeWidth={1.5} />
            <span className="text-sm font-medium capitalize">
              {pressItem.category}
            </span>
          </div>

          <h1 className="text-2xl font-medium">{pressItem.title}</h1>

          <div className="grid grid-cols-2 gap-2.5 pt-2.5">
            <div className="text-sm text-neutral-500 flex items-center gap-1.5">
              <IconCalendarEvent
                className="shrink-0"
                size={16}
                strokeWidth={1.5}
              />
              <div className="grow truncate">
                {new Date(pressItem.date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>

            <div className="text-sm text-neutral-500 flex items-center gap-1.5">
              <IconBuilding className="shrink-0" size={16} strokeWidth={1.5} />
              <div className="grow truncate">{pressItem.publisher}</div>
            </div>

            {pressItem.author && (
              <div className="text-sm text-neutral-500 flex items-center gap-1.5">
                <IconUser className="shrink-0" size={16} strokeWidth={1.5} />
                <div className="grow truncate">{pressItem.author}</div>
              </div>
            )}

            {pressItem.href && (
              <div className="text-sm text-neutral-500 flex items-center gap-1.5">
                <IconExternalLink
                  className="shrink-0"
                  size={16}
                  strokeWidth={1.5}
                />
                <ExternalLink href={pressItem.href} className="grow truncate">
                  View on {new URL(pressItem.href).hostname.replace("www.", "")}
                </ExternalLink>
              </div>
            )}
          </div>
        </header>

        {pressItem.description && (
          <div className="prose dark:prose-invert prose-headings:font-medium prose-p:first-of-type:text-lg">
            <p>{pressItem.description}</p>
          </div>
        )}

        {pressItem.embed && (
          <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={pressItem.embed}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {!pressItem.description && !pressItem.embed && (
          <div className="prose dark:prose-invert prose-headings:font-medium prose-p:first-of-type:text-lg">
            <p className="text-neutral-500">
              This {pressItem.category} was featured in {pressItem.publisher}
              {pressItem.author && ` by ${pressItem.author}`} on{" "}
              {new Date(pressItem.date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              .
            </p>
            {pressItem.href && (
              <p>
                <ExternalLink href={pressItem.href}>
                  View the original {pressItem.category} →
                </ExternalLink>
              </p>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
