import { PressItem, getAllPressItems } from "@/app/api";
import { GenericSection } from "@/app/components/generic-section";

export async function PressSection() {
  const pressItems = await getAllPressItems();

  // Sort by date and take only recent items for homepage
  const recentPressItems = pressItems
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  const getPressTitle = (item: PressItem) => item.title;

  const getPressSubtitle = (item: PressItem) =>
    `${item.publisher} � ${new Date(item.date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    })}`;

  return (
    <GenericSection
      title="press"
      subtitle="/press"
      items={recentPressItems.map((item) => ({
        ...item,
        slug: item.slug || "",
        path: `/press/${item.slug}`,
        source: "press",
        excerpt: item.description || "",
        publisher: item.publisher || "",
        emoji: "🎉",
        attributes: {},
      }))}
      description="Awards, recognitions, and media coverage from my journey."
      linkText="Go to /press"
      getItemTitle={getPressTitle}
      getItemSubtitle={getPressSubtitle}
    />
  );
}
