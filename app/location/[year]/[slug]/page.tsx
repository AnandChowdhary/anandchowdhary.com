import { getAllLocations, getLocationByYearAndSlug } from "@/app/api";
import { focusStyles } from "@/app/components/external-link";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { proseClassName } from "@/app/styles";
import {
  IconCalendar,
  IconChevronLeft,
  IconChevronRight,
  IconClock,
  IconGlobe,
  IconMapPin,
} from "@tabler/icons-react";
import { marked } from "marked";
import { markedSmartypants } from "marked-smartypants";
import { Metadata } from "next";
import Link from "next/link";
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

  const country = await getLocationByYearAndSlug(yearNumber, slug);
  if (!country) notFound();
  return {
    title: `${country.label} / ${year} / Location / Anand Chowdhary`,
    description: `Travel to ${country.label} by Anand Chowdhary`,
  };
}

export const revalidate = 60;
export async function generateStaticParams(): Promise<
  { year: string; slug: string }[]
> {
  const locations = await getAllLocations();
  return locations.map((location) => ({
    year: new Date(location.date).getUTCFullYear().toString(),
    slug: location.slug.replace(".md", ""),
  }));
}

export default async function LocationYearSlug({ params }: Props) {
  const { year, slug } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);
  const rand = Math.floor(new Rand(slug).next() * 100 + 1);

  const country = await getLocationByYearAndSlug(yearNumber, slug);
  if (!country) notFound();

  const allLocations = await getAllLocations();
  const currentLocationIndex = allLocations.findIndex(
    (l) => l.slug === country.slug
  );
  const previousLocation = allLocations[currentLocationIndex - 1];
  const nextLocation = allLocations[currentLocationIndex + 1];

  const yearNavigation = { previous: previousLocation, next: nextLocation };

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 space-y-32">
      <Header
        pathname={`/location/${year}`}
        description="I love traveling and exploring new places. Here are the countries I've visited over the years."
        source="https://github.com/AnandChowdhary/location"
        readme="https://anandchowdhary.github.io/location/README.md"
        api="https://anandchowdhary.github.io/location/history-countries.json"
      />
      <main className="max-w-2xl mx-auto space-y-8">
        <div className="relative">
          <img
            src={`https://raw.githubusercontent.com/AnandChowdhary/blog-images/refs/heads/main/384x256/${rand}.png`}
            alt=""
            className="w-full h-full max-h-64 object-cover rounded-2xl dark:brightness-60"
          />
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none text-5xl tracking-widest">
            {country.country_emoji || "🌍"}
          </div>
        </div>
        <header className="space-y-2">
          <h1
            className="text-2xl font-medium"
            dangerouslySetInnerHTML={{
              __html: marked.parseInline(country.label),
            }}
          />
          <p className="text-neutral-500">
            {new Date(country.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </header>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="text-sm text-neutral-500 flex items-center gap-1.5">
            <IconMapPin className="shrink-0" size={16} strokeWidth={1.5} />
            <div className="grow truncate">
              {country.coordinates[0].toFixed(4)},{" "}
              {country.coordinates[1].toFixed(4)}
            </div>
          </div>
          <div className="text-sm text-neutral-500 flex items-center gap-1.5">
            <IconGlobe className="shrink-0" size={16} strokeWidth={1.5} />
            <div className="grow truncate">{country.country_code}</div>
          </div>
          <div className="text-sm text-neutral-500 flex items-center gap-1.5">
            <IconClock className="shrink-0" size={16} strokeWidth={1.5} />
            <div className="grow truncate">
              {country.timezone
                ? `${country.timezone.name} (${country.timezone.utcOffsetStr})`
                : "Unknown timezone"}
            </div>
          </div>
          <div className="text-sm text-neutral-500 flex items-center gap-1.5">
            <IconCalendar className="shrink-0" size={16} strokeWidth={1.5} />
            <div className="grow truncate">
              {new Date(country.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>

        <div className={proseClassName}>
          <p className="text-lg text-neutral-700 dark:text-neutral-300">
            {country.excerpt}
          </p>
          {country.full_label && country.full_label !== country.label && (
            <p className="text-neutral-600 dark:text-neutral-400">
              {country.full_label}
            </p>
          )}
        </div>

        <div className="flex gap-4">
          <a
            href={`https://www.google.com/maps?q=${country.coordinates[0]},${country.coordinates[1]}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
          >
            <IconMapPin size={16} />
            View on Google Maps
          </a>
        </div>
        <footer className="flex flex-col md:flex-row items-stretch md:items-center justify-between pt-8 gap-4">
          {yearNavigation.previous ? (
            <Link
              href={`/location/${new Date(
                yearNavigation.previous.date
              ).getUTCFullYear()}/${yearNavigation.previous.slug.replace(
                ".md",
                ""
              )}`}
              className={`flex items-center gap-1 ${focusStyles} justify-center bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 py-1 pl-2 pr-4 rounded-full`}
            >
              <IconChevronLeft strokeWidth={1.5} className="h-4" />
              {yearNavigation.previous.label}
            </Link>
          ) : (
            <div className="w-4" />
          )}
          {yearNavigation.next ? (
            <Link
              href={`/location/${new Date(
                yearNavigation.next.date
              ).getUTCFullYear()}/${yearNavigation.next.slug.replace(
                ".md",
                ""
              )}`}
              className={`flex items-center gap-1 ${focusStyles} justify-center bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 py-1 pr-2 pl-4 rounded-full`}
            >
              {yearNavigation.next.label}
              <IconChevronRight strokeWidth={1.5} className="h-4" />
            </Link>
          ) : (
            <div className="w-4" />
          )}
        </footer>
      </main>
      <Footer />
    </div>
  );
}
