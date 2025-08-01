import { Repository } from "@/app/api";
import { focusStyles } from "@/app/components/external-link";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { IconCalendar, IconCode, IconStar } from "@tabler/icons-react";
import { marked } from "marked";
import { markedSmartypants } from "marked-smartypants";
import Link from "next/link";
import Rand from "rand-seed";

marked.use(markedSmartypants());

export default async function OpenSourceContent({
  reposDataFiltered,
  year,
}: {
  reposDataFiltered: Repository[];
  year?: string;
}) {
  const reposDataByYear = reposDataFiltered.reduce((acc, item) => {
    const year = new Date(item.created_at).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(item);
    return acc;
  }, {} as Record<string, Repository[]>);

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 space-y-32">
      <Header pathname={year ? `/open-source/${year}` : "/open-source"}>
        From time to time, I contribute to and maintain open-source projects
        related to engineering, design, and developer tools.
      </Header>
      <main className="max-w-2xl mx-auto space-y-8">
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
                    new Date(a.created_at).getTime()
                )
                .map((item) => {
                  let description = item.description;
                  let emoji = "💻";

                  // If the description starts with any emoji, use it as the emoji and remove it from the description
                  if (description) {
                    const firstWord = description.trim().split(/\s+/)[0];
                    if (firstWord && !/[a-zA-Z]/.test(firstWord)) {
                      emoji = firstWord;
                      description = description.replace(firstWord, "").trim();
                    }
                  }

                  return (
                    <article
                      key={`${item.date}-${item.slug}`}
                      className="grid grid-cols-3 gap-8 items-center pb-2.5 relative"
                    >
                      <div className="aspect-video rounded-lg shadow-sm relative">
                        <img
                          src={`https://raw.githubusercontent.com/AnandChowdhary/blog-images/refs/heads/main/384x256/${Math.floor(
                            new Rand(item.slug).next() * 100 + 1
                          )}.png`}
                          alt=""
                          className="w-full h-full object-cover rounded-lg dark:brightness-60"
                        />
                        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none text-4xl tracking-widest">
                          {emoji}
                        </div>
                      </div>
                      <div className="col-span-2 space-y-2">
                        <Link
                          href={`/open-source/${new Date(
                            item.date
                          ).getUTCFullYear()}/${item.slug}`}
                          className={`${focusStyles} full-link flex`}
                        >
                          <h3
                            className="truncate text-lg font-medium"
                            dangerouslySetInnerHTML={{
                              __html: marked.parseInline(item.title),
                            }}
                          />
                        </Link>
                        <div className="grid grid-cols-4">
                          <div className="text-sm text-neutral-500 flex items-center gap-1.5">
                            <IconCalendar
                              className="shrink-0"
                              size={16}
                              strokeWidth={1.5}
                            />
                            <div className="grow truncate">
                              {new Date(item.created_at).toLocaleDateString(
                                "en-US",
                                { day: "numeric", month: "long" }
                              )}
                            </div>
                          </div>
                          {item.language && (
                            <div className="text-sm text-neutral-500 flex items-center gap-1.5">
                              <IconCode
                                className="shrink-0"
                                size={16}
                                strokeWidth={1.5}
                              />
                              <div className="grow truncate">
                                {item.language}
                              </div>
                            </div>
                          )}
                          <div className="text-sm text-neutral-500 flex items-center gap-1.5">
                            <IconStar
                              className="shrink-0"
                              size={16}
                              strokeWidth={1.5}
                            />
                            <div className="grow truncate">
                              {item.stargazers_count.toLocaleString()} stars
                            </div>
                          </div>
                        </div>
                        <p
                          className="pointer-events-none truncate"
                          dangerouslySetInnerHTML={{
                            __html: marked.parseInline(description),
                          }}
                        />
                      </div>
                    </article>
                  );
                })}
            </div>
          ))}
      </main>
      <Footer />
    </div>
  );
}
