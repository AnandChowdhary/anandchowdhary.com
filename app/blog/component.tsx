import { BlogPost } from "@/app/api";
import { focusStyles } from "@/app/components/external-link";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { NavigationFooter } from "@/app/components/navigation-footer";
import { marked } from "marked";
import { markedSmartypants } from "marked-smartypants";
import Link from "next/link";
import Rand from "rand-seed";

marked.use(markedSmartypants());

const BlogThumbnail = ({
  item,
  size = "large",
}: {
  item: BlogPost;
  size?: "large" | "small";
}) => {
  const isLarge = size === "large";

  return (
    <div
      className={`pointer-events-none ${
        isLarge
          ? "aspect-video rounded-lg w-full"
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
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none text-2xl tracking-widest">
          {item.emoji}
        </div>
      )}
    </div>
  );
};

const BlogCard = ({ item }: { item: BlogPost }) => (
  <article className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-center pb-2.5 relative">
    <BlogThumbnail item={item} size="large" />
    <div className="md:col-span-2">
      <Link
        href={`/blog/${new Date(
          item.date,
        ).getUTCFullYear()}/${item.slug.replace(".md", "")}`}
        className={`${focusStyles} min-w-0 full-link flex hover:text-neutral-500`}
      >
        <div
          className="w-full"
          style={{
            maskImage: "linear-gradient(to right, black 70%, transparent 100%)",
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
);

export default async function BlogContent({
  blogDataFiltered,
  year,
  previousYear,
  nextYear,
}: {
  blogDataFiltered: BlogPost[];
  year?: string;
  previousYear?: number;
  nextYear?: number;
}) {
  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 space-y-32">
      <Header
        pathname={year ? `/blog/${year}` : "/blog"}
        description="Thoughts and insights on technology, entrepreneurship, and building products that matter."
        source="https://github.com/AnandChowdhary/blog"
        readme="https://anandchowdhary.github.io/blog/README.md"
        api="https://anandchowdhary.github.io/blog/api.json"
      />
      <main className="max-w-2xl mx-auto space-y-8 md:space-y-4">
        {blogDataFiltered.length > 3 && (
          <h2 className="text-lg font-medium text-neutral-500">Latest</h2>
        )}
        {blogDataFiltered.slice(0, 3).map((item) => (
          <BlogCard key={item.slug} item={item} />
        ))}
        {blogDataFiltered.length > 3 && (
          <div className="space-y-6 pt-8">
            <h2 className="text-lg font-medium text-neutral-500">More</h2>
            {blogDataFiltered.slice(3).map((item) => (
              <article key={item.slug} className="flex gap-5 relative">
                <BlogThumbnail item={item} size="small" />
                <div className="grow flex items-center justify-between gap-8 min-w-0">
                  <Link
                    href={`/blog/${new Date(
                      item.date,
                    ).getUTCFullYear()}/${item.slug.replace(".md", "")}`}
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
        {year && (previousYear || nextYear) && (
          <NavigationFooter
            previous={
              previousYear
                ? {
                    href: `/blog/${previousYear}`,
                    label: previousYear.toString(),
                  }
                : undefined
            }
            next={
              nextYear
                ? {
                    href: `/blog/${nextYear}`,
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
