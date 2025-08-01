import { GenericItem, GenericSection } from "@/app/components/generic-section";

interface Theme extends GenericItem {}

export async function ThemesSection() {
  const themes = await fetch(
    "https://anandchowdhary.github.io/themes/api.json",
    { next: { revalidate: 36000 } }
  );
  const themesData = (await themes.json()) as Theme[];
  const themesDataSorted = themesData.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const getThemeTitle = (theme: Theme) => theme.title;
  const getThemeSubtitle = (theme: Theme) =>
    `Year of ${theme.title.replace("Year of ", "")}`;

  return (
    <GenericSection
      title="themes"
      subtitle="/themes"
      items={themesDataSorted}
      description="Each year I choose a theme to focus on and grow in different areas of my life."
      linkText="Go to themes"
      getItemTitle={getThemeTitle}
      getItemSubtitle={getThemeSubtitle}
    />
  );
}
