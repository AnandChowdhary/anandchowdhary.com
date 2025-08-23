import { getLocationByYearAndSlug } from "@/app/api";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import {
  IconCalendar,
  IconClock,
  IconGlobe,
  IconMapPin,
} from "@tabler/icons-react";
import { marked } from "marked";
import { markedSmartypants } from "marked-smartypants";
import { notFound } from "next/navigation";
import Rand from "rand-seed";

marked.use(markedSmartypants());

export default async function LocationYearSlug({
  params,
}: {
  params: Promise<{ year: string; slug: string }>;
}) {
  const { year, slug } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);
  const rand = Math.floor(new Rand(slug).next() * 100 + 1);

  const country = await getLocationByYearAndSlug(yearNumber, slug);
  if (!country) notFound();

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 space-y-32">
      <Header pathname={`/location/${year}`} />
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
              {country.timezone.name} ({country.timezone.utcOffsetStr})
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

        <div className="prose dark:prose-invert prose-headings:font-medium prose-p:first-of-type:text-lg">
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
      </main>
      <Footer />
    </div>
  );
}
