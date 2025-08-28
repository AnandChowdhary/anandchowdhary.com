import {
  getAllArchiveItems,
  getAllOpenSource,
  getOpenSourceByYearAndSlug,
  getRepositoryDetails,
  getRepositoryReadMe,
} from "@/app/api";
import { ExternalLink } from "@/app/components/external-link";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { NavigationFooter } from "@/app/components/navigation-footer";
import { proseClassName, proseClassNameWithoutImages } from "@/app/styles";
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

  const allRepos = await getAllOpenSource();
  const currentRepoIndex = allRepos.findIndex((r) => r.slug === repo.slug);
  const previousRepo = allRepos[currentRepoIndex - 1];
  const nextRepo = allRepos[currentRepoIndex + 1];

  const everything = await getAllArchiveItems();
  const found = everything.find(({ source }) => source === repo.html_url);
  let image: string | undefined =
    found !== undefined &&
    typeof found?.data === "object" &&
    found.data !== null &&
    "openGraphImageUrl" in found.data &&
    typeof found.data.openGraphImageUrl === "string"
      ? found.data.openGraphImageUrl
      : undefined;

  if (
    typeof image === "string" &&
    image.startsWith("https://opengraph.githubassets.com") // Ignore default images
  )
    image = undefined;

  const details = await getRepositoryDetails(repo.full_name);
  const readMe = await getRepositoryReadMe(repo.full_name);

  const yearNavigation = { previous: previousRepo, next: nextRepo };

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 space-y-32">
      <Header pathname={`/open-source/${year}`} />
      <main className="max-w-2xl mx-auto space-y-8">
        {image ? (
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover rounded-lg dark:brightness-60 object-top"
          />
        ) : (
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
        )}
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
              <ExternalLink href={repo.html_url} className="grow truncate">
                View on GitHub
              </ExternalLink>
            </div>
          </div>
        </header>
        <div
          className={proseClassName}
          dangerouslySetInnerHTML={{
            __html: marked.parse(details ?? repo.description),
          }}
        />
        <div className="pt-8">
          <div>
            <ExternalLink
              href={repo.html_url}
              underline={false}
              className="rounded-2xl rounded-b-none border border-neutral-200 dark:border-neutral-800 px-4 py-2 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <IconBrandGithub size={16} />
                <span className="font-medium">{repo.full_name}</span>
              </span>
              <span className="text-neutral-500 font-normal">README</span>
            </ExternalLink>
          </div>
          <article
            className="border border-neutral-200 dark:border-neutral-800 rounded-2xl rounded-t-none border-t-0 p-8 shadow-sm relative overflow-hidden max-h-256"
            style={{
              maskImage:
                "linear-gradient(to bottom, black 50%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 50%, transparent 100%)",
            }}
          >
            <div
              className={`${proseClassNameWithoutImages} prose-img:hidden text-sm prose-h1:text-lg prose-h2:text-lg`}
              dangerouslySetInnerHTML={{
                __html: await Promise.resolve(marked.parse(readMe)),
              }}
            />
          </article>
        </div>
        <NavigationFooter
          previous={
            yearNavigation.previous
              ? {
                  href: `/open-source/${new Date(
                    yearNavigation.previous.date,
                  ).getUTCFullYear()}/${yearNavigation.previous.slug}`,
                  label: yearNavigation.previous.title,
                }
              : undefined
          }
          next={
            yearNavigation.next
              ? {
                  href: `/open-source/${new Date(
                    yearNavigation.next.date,
                  ).getUTCFullYear()}/${yearNavigation.next.slug}`,
                  label: yearNavigation.next.title,
                }
              : undefined
          }
        />
      </main>
      <Footer />
    </div>
  );
}
