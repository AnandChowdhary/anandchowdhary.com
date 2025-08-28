import {
  getAllThemes,
  getThemeByYearAndSlug,
  getThemeContent,
} from "@/app/api";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { NavigationFooter } from "@/app/components/navigation-footer";
import { proseClassName } from "@/app/styles";
import { ThemesMetadata } from "@/app/themes/metadata";
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

  const theme = await getThemeByYearAndSlug(yearNumber, slug);
  if (!theme) notFound();
  return {
    title: `${theme.title} / ${year} / Themes / Anand Chowdhary`,
    description: theme.excerpt,
  };
}

export const revalidate = 60;
export async function generateStaticParams(): Promise<
  { year: string; slug: string }[]
> {
  const themes = await getAllThemes();
  return themes.map((theme) => ({
    year: new Date(theme.date).getUTCFullYear().toString(),
    slug: theme.slug.replace(".md", ""),
  }));
}

export default async function ThemesYearSlug({ params }: Props) {
  const { year, slug } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);
  const rand = Math.floor(new Rand(`${slug}.md`).next() * 100 + 1);

  const theme = await getThemeByYearAndSlug(yearNumber, slug);
  if (!theme) notFound();

  const allThemes = await getAllThemes();
  const currentThemeIndex = allThemes.findIndex((t) => t.slug === theme.slug);
  const previousTheme = allThemes[currentThemeIndex - 1];
  const nextTheme = allThemes[currentThemeIndex + 1];

  const themeContentText = await getThemeContent(year, theme.slug);
  const themeContentHtml = await Promise.resolve(
    marked.parse(themeContentText)
  );

  const yearNavigation = { previous: previousTheme, next: nextTheme };

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 space-y-32">
      <Header pathname={`/themes/${year}`} />
      <main className="max-w-2xl mx-auto space-y-8">
        <div className="relative">
          <img
            src={`https://raw.githubusercontent.com/AnandChowdhary/blog-images/refs/heads/main/384x256/${rand}.png`}
            alt=""
            className="w-full h-full max-h-64 object-cover rounded-2xl dark:brightness-60"
          />
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none text-5xl tracking-widest">
            {theme.emoji}
          </div>
        </div>
        <header className="space-y-2">
          <h1
            className="text-2xl font-medium"
            dangerouslySetInnerHTML={{
              __html: marked.parseInline(theme.title),
            }}
          />
          <ThemesMetadata item={theme} themeContentText={themeContentText} />
        </header>
        <div
          className={proseClassName}
          dangerouslySetInnerHTML={{ __html: themeContentHtml }}
        />
        <NavigationFooter
          previous={
            yearNavigation.previous
              ? {
                  href: `/themes/${new Date(
                    yearNavigation.previous.date
                  ).getUTCFullYear()}/${yearNavigation.previous.slug.replace(
                    ".md",
                    ""
                  )}`,
                  label: yearNavigation.previous.title,
                }
              : undefined
          }
          next={
            yearNavigation.next
              ? {
                  href: `/themes/${new Date(
                    yearNavigation.next.date
                  ).getUTCFullYear()}/${yearNavigation.next.slug.replace(
                    ".md",
                    ""
                  )}`,
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
