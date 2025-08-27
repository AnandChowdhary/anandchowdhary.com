import {
  getAllOpenSource,
  getOpenSourceByYearAndSlug,
  getRepositoryDetails,
} from "@/app/api";
import { ExternalLink } from "@/app/components/external-link";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import {
  IconBrandGithub,
  IconCalendar,
  IconCode,
  IconGitFork,
  IconStar,
} from "@tabler/icons-react";
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

  const repo = await getOpenSourceByYearAndSlug(yearNumber, slug);
  if (!repo) notFound();
  return {
    title: `${repo.title} / ${year} / Open Source / Anand Chowdhary`,
    description: repo.description || `Open source project: ${repo.title}`,
  };
}

export const revalidate = 60;
export async function generateStaticParams(): Promise<
  { year: string; slug: string }[]
> {
  const repos = await getAllOpenSource();
  return repos.map((repo) => ({
    year: new Date(repo.date).getUTCFullYear().toString(),
    slug: repo.slug,
  }));
}

export default async function OpenSourceYearSlug({ params }: Props) {
  const { year, slug } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);
  const rand = Math.floor(new Rand(slug).next() * 100 + 1);

  const repo = await getOpenSourceByYearAndSlug(yearNumber, slug);
  if (!repo) notFound();

  const details = await getRepositoryDetails(repo.full_name);

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 space-y-32">
      <Header
        pathname={`/open-source/${year}`}
        description="From time to time, I contribute to and maintain open-source projects related to engineering, design, and developer tools."
      />
      <main className="max-w-2xl mx-auto space-y-8">
        <div className="relative">
          <img
            src={`https://raw.githubusercontent.com/AnandChowdhary/blog-images/refs/heads/main/384x256/${rand}.png`}
            alt=""
            className="w-full h-full max-h-64 object-cover rounded-2xl dark:brightness-60"
          />
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none text-5xl tracking-widest">
            {repo.emoji}
          </div>
        </div>
        <header className="space-y-4">
          <h1
            className="text-2xl font-medium"
            dangerouslySetInnerHTML={{ __html: marked.parseInline(repo.title) }}
          />
          <div className="grid grid-cols-3 gap-2">
            <div className="text-sm text-neutral-500 flex items-center gap-1.5">
              <IconCalendar className="shrink-0" size={16} strokeWidth={1.5} />
              <div className="grow truncate">
                {new Date(repo.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
            <div className="text-sm text-neutral-500 flex items-center gap-1.5">
              <IconCode className="shrink-0" size={16} strokeWidth={1.5} />
              <div className="grow truncate">{repo.language || "Unknown"}</div>
            </div>
            <div className="text-sm text-neutral-500 flex items-center gap-1.5">
              <IconStar className="shrink-0" size={16} strokeWidth={1.5} />
              <div className="grow truncate">
                {repo.stargazers_count.toLocaleString()}{" "}
                {repo.stargazers_count === 1 ? "star" : "stars"}
              </div>
            </div>
            <div className="text-sm text-neutral-500 flex items-center gap-1.5">
              <IconGitFork className="shrink-0" size={16} strokeWidth={1.5} />
              <div className="grow truncate">
                {repo.forks_count.toLocaleString()} forks
              </div>
            </div>
            <div className="text-sm text-neutral-500 flex items-center gap-1.5">
              <IconBrandGithub
                className="shrink-0"
                size={16}
                strokeWidth={1.5}
              />
              <div className="grow truncate">{repo.full_name}</div>
            </div>
          </div>
        </header>
        <div
          className="prose dark:prose-invert prose-headings:font-medium prose-p:first-of-type:text-lg"
          dangerouslySetInnerHTML={{
            __html: marked.parse(details ?? repo.description),
          }}
        />
        <footer className="flex">
          <ExternalLink
            href={repo.html_url}
            underline={false}
            className="rounded-lg border border-neutral-200 dark:border-neutral-800 px-4 py-2 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 flex items-center gap-2"
          >
            <IconBrandGithub size={16} />
            <span className="font-medium">{repo.full_name}</span>
          </ExternalLink>
        </footer>
      </main>
      <Footer />
    </div>
  );
}
