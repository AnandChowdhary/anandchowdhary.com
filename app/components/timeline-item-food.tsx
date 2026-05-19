import { getLatestDailyNutrition } from "@/app/api";
import { TimelineItem } from "@/app/components/timeline-item";

const formatNumber = (value: number, maximumFractionDigits = 0) =>
  value.toLocaleString("en-US", { maximumFractionDigits });

const formatGrams = (value: number) => `${formatNumber(value)}g`;

export async function TimelineItemFood() {
  const nutrition = await getLatestDailyNutrition();

  return (
    <TimelineItem
      icon="🍽️"
      title={
        nutrition
          ? `${formatNumber(nutrition.kcal)} kcal consumed`
          : "No food data found"
      }
      subtitle={
        nutrition
          ? `${formatGrams(nutrition.proteinG)} protein, ${formatGrams(
              nutrition.fatG
            )} fat, ${formatGrams(nutrition.carbsG)} carbs`
          : "Tracked in /food"
      }
    />
  );
}
