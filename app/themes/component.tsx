import { Theme } from "@/app/api";
import { Container } from "@/app/components/container";
import { focusStyles } from "@/app/components/external-link";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { NavigationFooter } from "@/app/components/navigation-footer";
import { marked } from "marked";
import { markedSmartypants } from "marked-smartypants";
import Link from "next/link";
import Rand from "rand-seed";

marked.use(markedSmartypants());

const ThemeThumbnail = ({
  item,
  size = "large",
}: {
  item: Theme;
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
          new Rand(item.slug).next() * 100 + 1
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

const ThemeCard = ({ item }: { item: Theme }) => (
  <article className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-center pb-2.5 relative">
    <ThemeThumbnail item={item} size="large" />
    <div className="md:col-span-2">
      <Link
        href={`/themes/${new Date(
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

export default async function ThemesContent({
  themesDataFiltered,
  year,
  previousYear,
  nextYear,
}: {
  themesDataFiltered: Theme[];
  year?: string;
  previousYear?: number;
  nextYear?: number;
}) {
  return (
    <Container>
      <Header
        pathname={year ? `/themes/${year}` : "/themes"}
        description="Each year I choose a theme to focus on and grow in different areas of my life. Themes act as a North Star, guiding decisions throughout the year as an alternative to traditional resolutions."
        source="https://github.com/AnandChowdhary/themes"
        readme="https://anandchowdhary.github.io/themes/README.md"
        api="https://anandchowdhary.github.io/themes/api.json"
      />
      <main className="max-w-2xl mx-auto space-y-8 md:space-y-4">
        {themesDataFiltered.map((item) => (
          <ThemeCard key={item.slug} item={item} />
        ))}
        {year && (
          <NavigationFooter
            previous={
              previousYear
                ? {
                    href: `/themes/${previousYear}`,
                    label: previousYear.toString(),
                  }
                : undefined
            }
            next={
              nextYear
                ? { href: `/themes/${nextYear}`, label: nextYear.toString() }
                : undefined
            }
          />
        )}
      </main>
      <Footer />
    </Container>
  );
}
