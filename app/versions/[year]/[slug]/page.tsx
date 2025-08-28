import {
  getAllVersions,
  getVersionByYearAndSlug,
  getVersionContent,
} from "@/app/api";
import { focusStyles } from "@/app/components/external-link";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { proseClassName } from "@/app/styles";
import { VersionMetadata } from "@/app/versions/metadata";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { marked } from "marked";
import { markedSmartypants } from "marked-smartypants";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

marked.use(markedSmartypants());

type Props = {
  params: Promise<{ year: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year, slug } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);

  const version = await getVersionByYearAndSlug(yearNumber, slug);
  if (!version) notFound();
  return {
    title: `${version.title} / ${year} / Versions / Anand Chowdhary`,
    description: version.excerpt,
  };
}

export const revalidate = 60;
export async function generateStaticParams(): Promise<
  { year: string; slug: string }[]
> {
  const versions = await getAllVersions();
  return versions.map((version) => ({
    year: new Date(version.date).getUTCFullYear().toString(),
    slug: version.slug.replace(".md", ""),
  }));
}

export default async function VersionYearSlug({ params }: Props) {
  const { year, slug } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);

  const version = await getVersionByYearAndSlug(yearNumber, slug);
  if (!version) notFound();

  const allVersions = await getAllVersions();
  const currentVersionIndex = allVersions.findIndex(
    (v) => v.slug === version.slug
  );
  const previousVersion = allVersions[currentVersionIndex - 1];
  const nextVersion = allVersions[currentVersionIndex + 1];

  const versionContentText = await getVersionContent(year, version.slug);
  const versionContentHtml = await Promise.resolve(
    marked.parse(versionContentText)
  );

  const yearNavigation = { previous: previousVersion, next: nextVersion };

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 space-y-32">
      <Header pathname={`/versions/${year}`} />
      <main className="max-w-2xl mx-auto space-y-8">
        <div className="relative">
          <img
            src={`https://raw.githubusercontent.com/AnandChowdhary/versions/main/assets/${slug}/home.png`}
            alt=""
            className="w-full rounded-2xl dark:brightness-60 shadow-lg border border-neutral-200 dark:border-neutral-800"
          />
        </div>
        <header className="space-y-2">
          <h1
            className="text-2xl font-medium"
            dangerouslySetInnerHTML={{
              __html: marked.parseInline(version.title),
            }}
          />
          <VersionMetadata item={version} />
        </header>
        <div
          className={proseClassName}
          dangerouslySetInnerHTML={{ __html: versionContentHtml }}
        />
        <footer className="flex flex-col md:flex-row items-stretch md:items-center justify-between pt-8 gap-4">
          {yearNavigation.previous ? (
            <Link
              href={`/versions/${new Date(
                yearNavigation.previous.date
              ).getUTCFullYear()}/${yearNavigation.previous.slug.replace(
                ".md",
                ""
              )}`}
              className={`flex items-center gap-1 ${focusStyles} justify-center bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 py-1 pl-2 pr-4 rounded-full`}
            >
              <IconChevronLeft strokeWidth={1.5} className="h-4" />
              {yearNavigation.previous.title}
            </Link>
          ) : (
            <div className="w-4" />
          )}
          {yearNavigation.next ? (
            <Link
              href={`/versions/${new Date(
                yearNavigation.next.date
              ).getUTCFullYear()}/${yearNavigation.next.slug.replace(
                ".md",
                ""
              )}`}
              className={`flex items-center gap-1 ${focusStyles} justify-center bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 py-1 pr-2 pl-4 rounded-full`}
            >
              {yearNavigation.next.title}
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
