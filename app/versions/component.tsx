import { Version } from "@/app/api";
import { focusStyles } from "@/app/components/external-link";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { marked } from "marked";
import { markedSmartypants } from "marked-smartypants";
import Link from "next/link";

marked.use(markedSmartypants());

const VersionCard = ({ item }: { item: Version }) => (
  <article className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-center pb-2.5 relative">
    <div className="pointer-events-none aspect-video rounded-lg w-full shadow-sm relative">
      <img
        src={`https://raw.githubusercontent.com/AnandChowdhary/versions/main/assets/${item.slug.replace(
          ".md",
          ""
        )}/home.png`}
        alt=""
        className="w-full h-full object-cover rounded-lg dark:brightness-60 object-top"
      />
    </div>
    <div className="md:col-span-2">
      <Link
        href={`/versions/${new Date(
          item.date
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
          __html: marked.parseInline(item.excerpt ?? ""),
        }}
      />
    </div>
  </article>
);

export default async function VersionContent({
  versionDataFiltered,
  year,
}: {
  versionDataFiltered: Version[];
  year?: string;
}) {
  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 space-y-32">
      <Header pathname={year ? `/versions/${year}` : "/versions"}>
        Over the years, I&apos;ve designed and redesigned my personal website
        several times; I ﬁnd it to be a great way to explore new technologies.
      </Header>
      <main className="max-w-2xl mx-auto space-y-8 md:space-y-4">
        {versionDataFiltered.map((item) => (
          <VersionCard key={item.slug} item={item} />
        ))}
      </main>
      <Footer />
    </div>
  );
}
