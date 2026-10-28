import { getAllThemes } from "@/views/api";
import { buildScreenshotOpenGraphImageUrl } from "@/views/lib/opengraph";
import ThemesContent from "@/views/themes/component";
import type { Metadata } from "@/lib/metadata";
import { notFound } from "@/lib/navigation";

type Props = {
  params: Promise<{ year: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const year = (await params).year;
  return {
    title: `${year} / Themes / Anand Chowdhary`,
    description: `Year of focus from ${year} by Anand Chowdhary, chosen to grow in different areas of life.`,
    openGraph: {
      images: [
        {
          url: buildScreenshotOpenGraphImageUrl(`/themes/${year}`),
        },
      ],
    },
  };
}


export default async function ThemesYear({ params }: Props) {
  const { year } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);
  const allThemes = await getAllThemes();
  const yearThemeData = allThemes.filter(
    (theme) => new Date(theme.date).getUTCFullYear() === yearNumber
  );

  const availableYears = Array.from(
    new Set(allThemes.map((theme) => new Date(theme.date).getUTCFullYear()))
  ).sort((a, b) => a - b);

  const currentYearIndex = availableYears.indexOf(yearNumber);
  const previousYear =
    currentYearIndex > 0 ? availableYears[currentYearIndex - 1] : undefined;
  const nextYear =
    currentYearIndex < availableYears.length - 1
      ? availableYears[currentYearIndex + 1]
      : undefined;

  return (
    <ThemesContent
      themesDataFiltered={yearThemeData}
      year={year}
      previousYear={previousYear}
      nextYear={nextYear}
    />
  );
}
