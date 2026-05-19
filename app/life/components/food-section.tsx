import type { DailyNutrition } from "@/app/api";
import { focusStyles } from "@/app/components/external-link";
import { NavigationLinks } from "@/app/components/navigation-links";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";

const FOOD_SOURCE_URL = "https://github.com/AnandChowdhary/food";
const FOOD_API_URL = "https://anandchowdhary.github.io/food/data/daily.csv";
const FOOD_README_URL =
  "https://github.com/AnandChowdhary/food/blob/refs/heads/main/README.md";

const formatNumber = (value: number) =>
  value.toLocaleString("en-US", { maximumFractionDigits: 0 });

const formatGrams = (value: number) => `${formatNumber(value)}g`;

const formatDate = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });

const formatMacros = (nutrition: DailyNutrition) =>
  `${formatGrams(nutrition.proteinG)} protein, ${formatGrams(
    nutrition.fatG
  )} fat, ${formatGrams(nutrition.carbsG)} carbs`;

const getSortedNutrition = (dailyNutrition: DailyNutrition[]) =>
  [...dailyNutrition]
    .filter((nutrition) => nutrition.kcal > 0)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function FoodSection({
  dailyNutrition,
}: {
  dailyNutrition: DailyNutrition[];
}) {
  return (
    <div>
      <h2 className="font-medium text-xl">Food</h2>
      <NavigationLinks
        source={FOOD_SOURCE_URL}
        api={FOOD_API_URL}
        readme={FOOD_README_URL}
        className="mb-6 justify-start mx-0"
      />
      <div className="space-y-3">
        {getSortedNutrition(dailyNutrition)
          .slice(0, 3)
          .map((nutrition) => (
            <div
              key={nutrition.date}
              className="flex items-start gap-3 justify-between"
            >
              <div className="min-w-0">
                <div className="truncate">
                  {formatNumber(nutrition.kcal)} kcal
                </div>
                <div className="text-sm text-neutral-500 truncate">
                  {formatMacros(nutrition)}
                </div>
              </div>
              <div className="truncate text-neutral-500 tabular-nums">
                {formatDate(nutrition.date)}
              </div>
            </div>
          ))}
        <Link href="/life/food" className={focusStyles}>
          <div className="flex items-center gap-0.5">
            <span>More</span>
            <IconChevronRight size={12} strokeWidth={1.5} />
          </div>
        </Link>
      </div>
    </div>
  );
}

export {
  FOOD_API_URL,
  FOOD_README_URL,
  FOOD_SOURCE_URL,
  formatDate,
  formatMacros,
  formatNumber,
  getSortedNutrition,
};
