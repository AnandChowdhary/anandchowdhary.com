import { getAllThemes } from "@/views/api";
import { TimelineItem } from "@/views/components/timeline-item";

export async function TimelineItemTheme() {
  const themes = await getAllThemes();
  const theme = themes[0];
  if (!theme) return null;
  return (
    <TimelineItem
      icon="🌈"
      title={theme.title}
      subtitle={`Yearly theme for ${new Date(theme.date).getFullYear()}`}
    />
  );
}
