import { BlogPost } from "@/app/api";
import { focusStyles } from "@/app/components/external-link";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { marked } from "marked";
import { markedSmartypants } from "marked-smartypants";
import Link from "next/link";
import Rand from "rand-seed";

marked.use(markedSmartypants());

export default async function BlogContent({
  blogDataFiltered,
  year,
}: {
  blogDataFiltered: BlogPost[];
  year?: string;
}) {
  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 space-y-32">
      <Header pathname={year ? `/blog/${year}` : "/blog"} />
      <main className="max-w-2xl mx-auto space-y-4">
        {blogDataFiltered.length > 3 && (
          <h2 className="text-lg font-medium text-neutral-500">Latest</h2>
        )}
        {blogDataFiltered.slice(0, 3).map((item) => (
          <article
            key={item.slug}
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
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none text-2xl tracking-widest">
                {item.emoji}
              </div>
            </div>
            <div className="col-span-2">
              <Link
                href={`/blog/${new Date(
                  item.date
                ).getUTCFullYear()}/${item.slug.replace(".md", "")}`}
                className={`${focusStyles} full-link flex`}
              >
                <h3
                  className="truncate text-lg font-medium"
                  dangerouslySetInnerHTML={{
                    __html: marked.parseInline(item.title),
                  }}
                />
              </Link>
              <p className="text-sm text-neutral-500 mt-1 mb-2.5">
                {new Date(item.date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p
                className="line-clamp-2 text-sm text-neutral-500 pointer-events-none"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, black 0%, black 50%, transparent 50%, transparent 100%), linear-gradient(to right, black 70%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 0%, black 50%, transparent 50%, transparent 100%), linear-gradient(to right, black 70%, transparent 100%)",
                }}
                dangerouslySetInnerHTML={{
                  __html: marked.parseInline(item.excerpt),
                }}
              />
            </div>
          </article>
        ))}
        {blogDataFiltered.length > 3 && (
          <div className="space-y-6 pt-8">
            <h2 className="text-lg font-medium text-neutral-500">More</h2>
            {blogDataFiltered.slice(3).map((item) => (
              <article key={item.slug} className="flex gap-5 relative">
                <div className="aspect-square w-6 rounded-full shadow-sm shrink-0">
                  <img
                    src={`https://raw.githubusercontent.com/AnandChowdhary/blog-images/refs/heads/main/384x256/${Math.floor(
                      new Rand(item.slug).next() * 100 + 1
                    )}.png`}
                    alt=""
                    className="w-full h-full object-cover rounded-full dark:brightness-60"
                  />
                </div>
                <div className="grow flex items-center justify-between gap-8">
                  <Link
                    href={`/blog/${new Date(
                      item.date
                    ).getUTCFullYear()}/${item.slug.replace(".md", "")}`}
                    className={`${focusStyles} full-link flex grow truncate hover:text-neutral-500`}
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
                  <p className="text-sm text-neutral-500 shrink-0">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
