"use client";

import { Country } from "@/app/api";
import { Container } from "@/app/components/container";
import { focusStyles } from "@/app/components/external-link";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { NavigationFooter } from "@/app/components/navigation-footer";
import { IconCalendar, IconFlag } from "@tabler/icons-react";
import { getCountryData, type TCountryCode } from "countries-list";
import { marked } from "marked";
import { markedSmartypants } from "marked-smartypants";
import Link from "next/link";

marked.use(markedSmartypants());

export default function LocationContent({
  countriesDataFiltered,
  year,
  previousYear,
  nextYear,
}: {
  countriesDataFiltered: Country[];
  year?: string;
  previousYear?: number;
  nextYear?: number;
}) {
  const countriesDataByYear = countriesDataFiltered.reduce((acc, item) => {
    const year = new Date(item.date).getUTCFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(item);
    return acc;
  }, {} as Record<string, Country[]>);

  return (
    <Container>
      <Header
        pathname={year ? `/location/${year}` : "/location"}
        description="I love traveling and exploring new places. Here are the countries I've visited over the years."
        source="https://github.com/AnandChowdhary/location"
        readme="https://anandchowdhary.github.io/location/README.md"
        api="https://anandchowdhary.github.io/location/history-countries.json"
      />
      <main className="max-w-2xl mx-auto space-y-8">
        {Object.entries(countriesDataByYear)
          .sort((a, b) => b[0].localeCompare(a[0]))
          .map(([year, countries]) => (
            <div key={year} className="space-y-4">
              <h2 className="text-lg font-medium text-neutral-500">
                <Link
                  href={`/location/${year}`}
                  className={`${focusStyles} flex`}
                >
                  {year}
                </Link>
              </h2>
              {countries
                .sort(
                  (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                )
                .map((item) => {
                  const countryData = getCountryData(
                    item.country_code.toUpperCase() as TCountryCode
                  );
                  if (!countryData) return null;

                  return (
                    <article
                      key={`${item.date}-${item.slug}`}
                      className="grid grid-cols-2 gap-8 items-center relative rounded-xl p-4 transition-colors duration-200"
                    >
                      <div className="aspect-video rounded-lg shadow-sm relative">
                        <img
                          src={`https://tse2.mm.bing.net/th?q=${countryData.name}+nature&w=70&h=70&c=7&rs=1&p=0&dpr=3&pid=1.7&mkt=en-IN&adlt=moderate`}
                          alt=""
                          className="w-full h-full object-cover rounded-lg brightness-60"
                        />
                        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none text-4xl tracking-widest">
                          <img
                            src={`https://raw.githubusercontent.com/iMuFeng/round-flag-icons/master/flags/${item.country_code}.svg`}
                            alt=""
                            className="w-10 h-10 rounded-full"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Link
                          href={`/location/${new Date(
                            item.date
                          ).getUTCFullYear()}/${item.slug}`}
                          className={`${focusStyles} min-w-0 full-link flex`}
                        >
                          <h3
                            className="truncate text-lg font-medium"
                            dangerouslySetInnerHTML={{
                              __html: marked.parseInline(item.label),
                            }}
                          />
                        </Link>
                        <div className="space-y-1">
                          <div className="text-sm text-neutral-500 flex items-center gap-1.5">
                            <IconCalendar
                              className="shrink-0"
                              size={16}
                              strokeWidth={1.5}
                            />
                            <div className="grow truncate">
                              {new Date(item.date).toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "long",
                              })}
                            </div>
                          </div>
                          <div className="text-sm text-neutral-500 flex items-center gap-1.5">
                            <IconFlag
                              className="shrink-0"
                              size={16}
                              strokeWidth={1.5}
                            />
                            <div className="grow truncate">
                              {marked.parseInline(countryData.name)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
            </div>
          ))}
        {year && (previousYear || nextYear) && (
          <NavigationFooter
            previous={
              previousYear
                ? {
                    href: `/location/${previousYear}`,
                    label: previousYear.toString(),
                  }
                : undefined
            }
            next={
              nextYear
                ? {
                    href: `/location/${nextYear}`,
                    label: nextYear.toString(),
                  }
                : undefined
            }
          />
        )}
      </main>
      <Footer />
    </Container>
  );
}
