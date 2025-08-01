import { getOpenSourceByYearAndSlug } from "@/app/api";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import {
  IconBrandGithub,
  IconCode,
  IconExternalLink,
  IconGitFork,
  IconStar,
} from "@tabler/icons-react";
import { marked } from "marked";
import { markedSmartypants } from "marked-smartypants";
import { notFound } from "next/navigation";
import Rand from "rand-seed";

marked.use(markedSmartypants());

export default async function OpenSourceYearSlug({
  params,
}: {
  params: Promise<{ year: string; slug: string }>;
}) {
  const { year, slug } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);
  const rand = Math.floor(new Rand(slug).next() * 100 + 1);

  const repo = await getOpenSourceByYearAndSlug(yearNumber, slug);
  if (!repo) notFound();

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 space-y-32">
      <Header pathname={`/open-source/${year}`} />
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
        <header className="space-y-2">
          <h1
            className="text-2xl font-medium"
            dangerouslySetInnerHTML={{
              __html: marked.parseInline(repo.title),
            }}
          />
          <p className="text-neutral-500">
            {new Date(repo.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </header>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="text-sm text-neutral-500 flex items-center gap-1.5">
            <IconCode className="shrink-0" size={16} strokeWidth={1.5} />
            <div className="grow truncate">{repo.language || "Unknown"}</div>
          </div>
          <div className="text-sm text-neutral-500 flex items-center gap-1.5">
            <IconStar className="shrink-0" size={16} strokeWidth={1.5} />
            <div className="grow truncate">
              {repo.stargazers_count.toLocaleString()} stars
            </div>
          </div>
          <div className="text-sm text-neutral-500 flex items-center gap-1.5">
            <IconGitFork className="shrink-0" size={16} strokeWidth={1.5} />
            <div className="grow truncate">
              {repo.forks_count.toLocaleString()} forks
            </div>
          </div>
          <div className="text-sm text-neutral-500 flex items-center gap-1.5">
            <IconBrandGithub className="shrink-0" size={16} strokeWidth={1.5} />
            <div className="grow truncate">{repo.full_name}</div>
          </div>
        </div>

        <div className="prose dark:prose-invert prose-headings:font-medium">
          <p className="text-lg text-neutral-700 dark:text-neutral-300">
            {repo.description}
          </p>
          {repo.attributes.subtitle && (
            <p className="text-neutral-600 dark:text-neutral-400">
              {repo.attributes.subtitle}
            </p>
          )}
        </div>

        <div className="flex gap-4">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
          >
            <IconBrandGithub size={16} />
            View on GitHub
            <IconExternalLink size={14} />
          </a>
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            >
              <IconExternalLink size={16} />
              Visit Website
            </a>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
