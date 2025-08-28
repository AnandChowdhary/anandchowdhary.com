import { getAllThemes } from "@/app/api";
import ThemesContent from "@/app/themes/component";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Themes / Anand Chowdhary",
  description:
    "Each year I choose a theme to focus on and grow in different areas of my life. Themes act as a North Star, guiding decisions throughout the year as an alternative to traditional resolutions.",
};

export default async function Themes() {
  const themesDataFiltered = await getAllThemes();
  return <ThemesContent themesDataFiltered={themesDataFiltered} />;
}
