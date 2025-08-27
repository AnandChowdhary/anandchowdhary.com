import {
  getAllVersions,
  getVersionByYearAndSlug,
  getVersionContent,
} from "@/app/api";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { VersionMetadata } from "@/app/versions/metadata";
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
  const rand = Math.floor(new Rand(`${slug}.md`).next() * 100 + 1);

  const version = await getVersionByYearAndSlug(yearNumber, slug);
  if (!version) notFound();

  const versionContentText = await getVersionContent(year, version.slug);
  const versionContentHtml = await Promise.resolve(
    marked.parse(versionContentText)
  );

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
          className="prose dark:prose-invert prose-headings:font-medium prose-p:first-of-type:text-lg prose-img:mx-auto prose-img:rounded-lg prose-img:shadow-lg prose-img:border prose-img:border-neutral-200 dark:prose-img:border-neutral-800"
          dangerouslySetInnerHTML={{ __html: versionContentHtml }}
        />
      </main>
      <Footer />
    </div>
  );
}
