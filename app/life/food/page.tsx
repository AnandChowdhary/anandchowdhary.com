import { getAllDailyNutrition } from "@/app/api";
import type { DailyNutrition } from "@/app/api";
import { Container } from "@/app/components/container";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { buildScreenshotOpenGraphImageUrl } from "@/app/lib/opengraph";
import {
  FOOD_API_URL,
  FOOD_README_URL,
  FOOD_SOURCE_URL,
  formatMacros,
  formatNumber,
  getSortedNutrition,
} from "@/app/life/components/food-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Food / Life / Anand Chowdhary",
  description:
    "Daily calories and macronutrients from Anand Chowdhary's food log.",
  openGraph: {
    images: [{ url: buildScreenshotOpenGraphImageUrl("/life/food") }],
  },
};

const getUtcDate = (date: string) => new Date(`${date}T00:00:00Z`);

const formatFullDate = (date: string) =>
  getUtcDate(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
    year: "numeric",
  });

const calorieColorStops = [
  { kcal: 1000, color: "#d1fae5" },
  { kcal: 2000, color: "#10b981" },
  { kcal: 2500, color: "#f59e0b" },
  { kcal: 3000, color: "#f43f5e" },
] as const;

const hexToRgb = (hex: string) => {
  const value = parseInt(hex.slice(1), 16);
  return {
    b: value & 255,
    g: (value >> 8) & 255,
    r: (value >> 16) & 255,
  };
};

const interpolateColor = (from: string, to: string, amount: number) => {
  const start = hexToRgb(from);
  const end = hexToRgb(to);
  const channel = (key: "r" | "g" | "b") =>
    Math.round(start[key] + (end[key] - start[key]) * amount);

  return `rgb(${channel("r")} ${channel("g")} ${channel("b")})`;
};

const getCalorieColor = (kcal: number) => {
  if (kcal <= calorieColorStops[0].kcal) return calorieColorStops[0].color;

  for (let index = 1; index < calorieColorStops.length; index += 1) {
    const start = calorieColorStops[index - 1];
    const end = calorieColorStops[index];
    if (kcal <= end.kcal) {
      return interpolateColor(
        start.color,
        end.color,
        (kcal - start.kcal) / (end.kcal - start.kcal)
      );
    }
  }

  return calorieColorStops.at(-1)?.color ?? "#f43f5e";
};

const getNutritionTitle = (date: string, nutrition?: DailyNutrition) =>
  nutrition
    ? `${formatFullDate(date)}: ${formatNumber(
        nutrition.kcal
      )} kcal; ${formatMacros(nutrition)}`
    : `${formatFullDate(date)}: no data`;

export default async function LifeFood() {
  const dailyNutrition = getSortedNutrition(await getAllDailyNutrition());
  const groupedByYear = dailyNutrition.reduce((acc, nutrition) => {
    const year = getUtcDate(nutrition.date).getUTCFullYear().toString();
    if (!acc[year]) acc[year] = [];
    acc[year].push(nutrition);
    return acc;
  }, {} as Record<string, DailyNutrition[]>);

  return (
    <Container>
      <Header
        pathname="/life/food"
        description="Daily calories and macronutrients from my food log."
        source={FOOD_SOURCE_URL}
        api={FOOD_API_URL}
        readme={FOOD_README_URL}
      />
      <main className="max-w-2xl mx-auto space-y-12">
        {Object.entries(groupedByYear)
          .sort(([a], [b]) => parseInt(b) - parseInt(a))
          .map(([year, nutritionDays]) => {
            const yearDays = [...nutritionDays].sort(
              (a, b) =>
                getUtcDate(b.date).getTime() - getUtcDate(a.date).getTime()
            );

            return (
              <section key={year} className="space-y-2">
                <h2 className="text-lg font-medium text-neutral-500">
                  {year}
                </h2>
                <div className="overflow-visible pt-2">
                  <div
                    className="flex flex-wrap items-center gap-1.5 overflow-visible"
                    role="list"
                    aria-label={`${year} food calories by day, newest first`}
                  >
                    {yearDays.map((nutrition) => {
                      const title = getNutritionTitle(
                        nutrition.date,
                        nutrition
                      );

                      return (
                        <div
                          key={nutrition.date}
                          aria-label={title}
                          className="group relative z-0 size-7 rounded-md shadow-sm ring-1 ring-white/70 hover:z-50 focus:z-50 focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:ring-black/40 sm:size-8"
                          role="listitem"
                          style={{
                            backgroundColor: getCalorieColor(nutrition.kcal),
                          }}
                          tabIndex={0}
                          title={title}
                        >
                          <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-neutral-950 px-2 py-1 text-xs text-white opacity-0 shadow-lg transition-[opacity,transform] duration-150 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100 dark:bg-neutral-100 dark:text-neutral-950">
                            <div className="font-medium">
                              {formatNumber(nutrition.kcal)} kcal
                            </div>
                            <div>{formatMacros(nutrition)}</div>
                            <div className="text-neutral-400 dark:text-neutral-600">
                              {formatFullDate(nutrition.date)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          })}
      </main>
      <Footer />
    </Container>
  );
}
