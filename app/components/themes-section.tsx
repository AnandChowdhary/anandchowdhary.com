import { getAllThemes, Theme } from "@/app/api";
import { GenericSection } from "@/app/components/generic-section";

export async function ThemesSection() {
  const themesDataSorted = await getAllThemes();
  const getThemeTitle = (theme: Theme) => theme.title;
  const getThemeSubtitle = (theme: Theme) =>
    `Year of ${theme.title.replace("Year of ", "")}`;

  return (
    <GenericSection
      title="themes"
      subtitle="/themes"
      items={themesDataSorted}
      description="Each year I choose a theme to focus on and grow in different areas of my life."
      linkText="Go to /themes"
      getItemTitle={getThemeTitle}
      getItemSubtitle={getThemeSubtitle}
    />
  );
}
