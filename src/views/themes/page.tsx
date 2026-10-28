import { getAllThemes } from "@/views/api";
import { buildScreenshotOpenGraphImageUrl } from "@/views/lib/opengraph";
import ThemesContent from "@/views/themes/component";
import type { Metadata } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Themes / Anand Chowdhary",
  description:
    "Each year I choose a theme to focus on and grow in different areas of my life. Themes act as a North Star, guiding decisions throughout the year as an alternative to traditional resolutions.",
  openGraph: {
    images: [
      {
        url: buildScreenshotOpenGraphImageUrl("/themes"),
      },
    ],
  },
};

export default async function Themes() {
  const themesDataFiltered = await getAllThemes();
  return <ThemesContent themesDataFiltered={themesDataFiltered} />;
}
