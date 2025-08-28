import { getAllArchiveItems, Repository } from "@/app/api";
import { focusStyles } from "@/app/components/external-link";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { NavigationFooter } from "@/app/components/navigation-footer";
import { IconCalendar, IconCode, IconStar } from "@tabler/icons-react";
import { marked } from "marked";
import { markedSmartypants } from "marked-smartypants";
import Link from "next/link";
import Rand from "rand-seed";

marked.use(markedSmartypants());

const getEmojiFromDescription = (description: string | null) => {
  let emoji = "💻";
  let cleanDescription = description || "";

  if (description) {
    const firstWord = description.trim().split(/\s+/)[0];
    if (firstWord && !/[a-zA-Z]/.test(firstWord)) {
      emoji = firstWord;
      cleanDescription = description.replace(firstWord, "").trim();
    }
  }

  return { emoji, description: cleanDescription };
};

const RepoThumbnail = async ({
  item,
  size = "large",
}: {
  item: Repository;
  size?: "large" | "small";
}) => {
  const isLarge = size === "large";
  const { emoji } = getEmojiFromDescription(item.description);

  const everything = await getAllArchiveItems();
  const found = everything.find(({ source }) => source === item.html_url);
  let image = found?.data?.openGraphImageUrl;
  if (
    typeof image === "string" &&
    image.startsWith("https://opengraph.githubassets.com") // Ignore default images
  )
    image = undefined;

  if (image)
    return (
      <div
        className={`pointer-events-none ${
          isLarge
            ? "aspect-video rounded-lg"
            : "aspect-square w-6 h-6 rounded-full"
        } shadow-sm relative`}
      >
        <img
          src={image}
          alt=""
          className={`w-full h-full object-cover ${
            isLarge ? "rounded-lg" : "rounded-full"
          } dark:brightness-60`}
        />
      </div>
    );

  return (
    <div
      className={`pointer-events-none ${
        isLarge
          ? "aspect-video rounded-lg"
          : "aspect-square w-6 h-6 rounded-full"
      } shadow-sm relative`}
    >
      <img
        src={`https://raw.githubusercontent.com/AnandChowdhary/blog-images/refs/heads/main/384x256/${Math.floor(
          new Rand(item.slug).next() * 100 + 1,
        )}.png`}
        alt=""
        className={`w-full h-full object-cover ${
          isLarge ? "rounded-lg" : "rounded-full"
        } dark:brightness-60`}
      />
      {isLarge && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none text-4xl tracking-widest">
          {emoji}
        </div>
      )}
    </div>
  );
};

const RepoCard = ({ item }: { item: Repository }) => {
  const { description } = getEmojiFromDescription(item.description);

  return (
    <article className="grid grid-cols-3 gap-8 items-center pb-2.5 relative">
      <RepoThumbnail item={item} size="large" />
      <div className="col-span-2 space-y-2">
        <Link
          href={`/open-source/${new Date(item.created_at).getUTCFullYear()}/${
            item.slug
          }`}
          className={`${focusStyles} min-w-0 full-link flex hover:text-neutral-500`}
        >
          <div
            className="w-full"
            style={{
              maskImage:
                "linear-gradient(to right, black 70%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, black 70%, transparent 100%)",
            }}
          >
            <h3
              className="truncate text-lg font-medium"
              dangerouslySetInnerHTML={{
                __html: marked.parseInline(item.title),
              }}
            />
          </div>
        </Link>
        <div className="grid grid-cols-4">
          <div className="text-sm text-neutral-500 flex items-center gap-1.5">
            <IconCalendar className="shrink-0" size={16} strokeWidth={1.5} />
            <div className="grow truncate">
              {new Date(item.created_at).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
              })}
            </div>
          </div>
          {item.language && (
            <div className="text-sm text-neutral-500 flex items-center gap-1.5">
              <IconCode className="shrink-0" size={16} strokeWidth={1.5} />
              <div className="grow truncate">{item.language}</div>
            </div>
          )}
          <div className="text-sm text-neutral-500 flex items-center gap-1.5">
            <IconStar className="shrink-0" size={16} strokeWidth={1.5} />
            <div className="grow truncate">
              {item.stargazers_count.toLocaleString()}{" "}
              {item.stargazers_count === 1 ? "star" : "stars"}
            </div>
          </div>
        </div>
        <p
          className="pointer-events-none truncate text-sm text-neutral-500"
          dangerouslySetInnerHTML={{
            __html: marked.parseInline(description),
          }}
          style={{
            maskImage: "linear-gradient(to right, black 70%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, black 70%, transparent 100%)",
          }}
        />
      </div>
    </article>
  );
};

export default async function OpenSourceContent({
  reposDataFiltered,
  year,
  previousYear,
  nextYear,
}: {
  reposDataFiltered: Repository[];
  year?: string;
  previousYear?: number;
  nextYear?: number;
}) {
  const reposDataByYear = reposDataFiltered.reduce(
    (acc, item) => {
      const year = new Date(item.created_at).getUTCFullYear();
      if (!acc[year]) acc[year] = [];
      acc[year].push(item);
      return acc;
    },
    {} as Record<string, Repository[]>,
  );

  const reposSortedByStars = [...reposDataFiltered].sort(
    (a, b) => b.stargazers_count - a.stargazers_count,
  );
  const featuredRepos = reposSortedByStars.slice(0, 3);
  const moreRepos = reposSortedByStars
    .filter((repo) => !featuredRepos.includes(repo))
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 space-y-32">
      <Header
        pathname={year ? `/open-source/${year}` : "/open-source"}
        description="From time to time, I contribute to and maintain open-source projects related to engineering, design, and developer tools."
        source="https://github.com/AnandChowdhary"
        readme="https://anandchowdhary.github.io/featured/README.md"
        api="https://anandchowdhary.github.io/featured/repos.json"
      />
      <main className="max-w-2xl mx-auto space-y-4">
        {year ? (
          <div className="space-y-8">
            {Object.entries(reposDataByYear)
              .sort((a, b) => b[0].localeCompare(a[0]))
              .map(([year, repos]) => (
                <div key={year} className="space-y-4">
                  <h2 className="text-lg font-medium text-neutral-500">
                    <Link
                      href={`/open-source/${year}`}
                      className={`${focusStyles} flex`}
                    >
                      {year}
                    </Link>
                  </h2>
                  {repos
                    .sort(
                      (a, b) =>
                        new Date(b.created_at).getTime() -
                        new Date(a.created_at).getTime(),
                    )
                    .map((item) => (
                      <RepoCard
                        key={`${item.created_at}-${item.slug}`}
                        item={item}
                      />
                    ))}
                </div>
              ))}
          </div>
        ) : (
          <>
            {reposDataFiltered.length > 3 && (
              <h2 className="text-lg font-medium text-neutral-500">Featured</h2>
            )}
            {featuredRepos.map((item) => (
              <RepoCard key={`${item.created_at}-${item.slug}`} item={item} />
            ))}
            {moreRepos.length > 0 && (
              <div className="space-y-6 pt-8">
                <h2 className="text-lg font-medium text-neutral-500">More</h2>
                {moreRepos.map((item) => (
                  <article
                    key={`${item.created_at}-${item.slug}`}
                    className="flex gap-5 relative"
                  >
                    <RepoThumbnail item={item} size="small" />
                    <div className="grow flex items-center justify-between gap-8 min-w-0">
                      <Link
                        href={`/open-source/${new Date(
                          item.created_at,
                        ).getUTCFullYear()}/${item.slug}`}
                        className={`${focusStyles} min-w-0 full-link flex grow truncate hover:text-neutral-500`}
                        style={{
                          maskImage:
                            "linear-gradient(to right, black 70%, transparent 100%)",
                          WebkitMaskImage:
                            "linear-gradient(to right, black 70%, transparent 100%)",
                        }}
                      >
                        <h3
                          className="truncate"
                          dangerouslySetInnerHTML={{
                            __html: marked.parseInline(item.title),
                          }}
                        />
                      </Link>
                      <div className="flex items-center gap-4 text-sm text-neutral-500 shrink-0">
                        <span className="flex items-center gap-1">
                          <IconStar size={14} strokeWidth={1.5} />
                          {item.stargazers_count.toLocaleString()}
                        </span>
                        <span>
                          {new Date(item.created_at).toLocaleDateString(
                            "en-US",
                            { day: "numeric", month: "long", year: "numeric" },
                          )}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
        {year && (previousYear || nextYear) && (
          <NavigationFooter
            previous={
              previousYear
                ? {
                    href: `/open-source/${previousYear}`,
                    label: previousYear.toString(),
                  }
                : undefined
            }
            next={
              nextYear
                ? {
                    href: `/open-source/${nextYear}`,
                    label: nextYear.toString(),
                  }
                : undefined
            }
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
