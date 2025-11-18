"use client";

import { Country } from "@/app/api";
import { Container } from "@/app/components/container";
import { focusStyles } from "@/app/components/external-link";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { NavigationFooter } from "@/app/components/navigation-footer";
import slugify from "@sindresorhus/slugify";
import { getCountryData, type TCountryCode } from "countries-list";
import { marked } from "marked";
import { markedSmartypants } from "marked-smartypants";
import Link from "next/link";
import { useMemo } from "react";

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
  const uniqueCountries = Array.from(
    new Set(countriesDataFiltered.map((item) => item.country_code))
  ).map((country) => getCountryData(country.toUpperCase() as TCountryCode));
  const countriesAggregated = Object.values(
    countriesDataFiltered.reduce((acc, item) => {
      if (!acc[item.label]) {
        acc[item.label] = { ...item, count: 0 };
      }
      acc[item.label].count++;
      return acc;
    }, {} as Record<string, Country & { count: number }>)
  );

  const location = [...countriesDataFiltered].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];

  const relativeFormatter = useMemo(
    () => new Intl.RelativeTimeFormat("en", { numeric: "auto" }),
    []
  );

  const getRelativeTime = (date: string) => {
    const now = new Date();
    const then = new Date(date);
    const diffInMs = now.getTime() - then.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "today";
    if (diffInDays === 1) return "yesterday";
    if (diffInDays < 7) return relativeFormatter.format(-diffInDays, "day");
    if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return relativeFormatter.format(-weeks, "week");
    }
    if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30);
      return relativeFormatter.format(-months, "month");
    }
    const years = Math.floor(diffInDays / 365);
    return relativeFormatter.format(-years, "year");
  };

  return (
    <Container>
      <Header
        pathname={year ? `/location/${year}` : "/location"}
        description="I love traveling and exploring new places, and I've been tracking my real-time location for over ten years (yes, really)."
        source="https://github.com/AnandChowdhary/location"
        readme="https://anandchowdhary.github.io/location/README.md"
        api="https://anandchowdhary.github.io/location/history-countries.json"
      />
      <main className="max-w-2xl mx-auto space-y-8">
        <section className="space-y-4">
          <h2 className="font-medium text-xl">Current location</h2>
          <div className="flex items-center gap-2">
            <img
              src={`https://raw.githubusercontent.com/iMuFeng/round-flag-icons/master/flags/${location.country_code}.svg`}
              alt={location.label}
              className="size-5 rounded-full shrink-0"
            />
            <div className="truncate">
              {location.label},{" "}
              {
                getCountryData(
                  location.country_code.toUpperCase() as TCountryCode
                ).name
              }
            </div>
            <div className="text-neutral-500 tabular-nums">
              since {getRelativeTime(location.date)}
            </div>
          </div>
        </section>
        <div className="grid md:grid-cols-2 gap-12">
          <section className="space-y-4">
            <h2 className="font-medium text-xl">New countries</h2>
            <div className="space-y-3">
              {[...uniqueCountries].reverse().map((countryData) => (
                <div
                  key={countryData.iso2}
                  className="flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={`https://raw.githubusercontent.com/iMuFeng/round-flag-icons/master/flags/${countryData.iso2.toLowerCase()}.svg`}
                      alt={countryData.name}
                      className="size-4 rounded-full"
                    />
                    <div className="truncate">{countryData.name}</div>
                  </div>
                  <div className="text-neutral-500 tabular-nums">
                    {new Date(
                      countriesDataFiltered.filter(
                        (item) =>
                          item.country_code === countryData.iso2.toLowerCase()
                      )[0].date
                    ).toLocaleDateString("en-US", { year: "numeric" })}
                  </div>
                </div>
              ))}
            </div>
          </section>
          <div className="space-y-8">
            <section className="space-y-4">
              <h2 className="font-medium text-xl">Top countries</h2>
              <div className="space-y-3">
                {[...uniqueCountries]
                  .sort((a, b) => {
                    const bCount = countriesDataFiltered.filter(
                      (item) => item.country_code === b.iso2.toLowerCase()
                    ).length;
                    const aCount = countriesDataFiltered.filter(
                      (item) => item.country_code === a.iso2.toLowerCase()
                    ).length;
                    return bCount - aCount;
                  })
                  .slice(0, 8)
                  .map((countryData) => (
                    <div
                      key={countryData.iso2}
                      className="flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={`https://raw.githubusercontent.com/iMuFeng/round-flag-icons/master/flags/${countryData.iso2.toLowerCase()}.svg`}
                          alt={countryData.name}
                          className="size-4 rounded-full"
                        />
                        <div className="truncate">{countryData.name}</div>
                      </div>
                      <div className="text-neutral-500 tabular-nums">
                        {countriesDataFiltered
                          .filter(
                            (item) =>
                              item.country_code ===
                              countryData.iso2.toLowerCase()
                          )
                          .length.toLocaleString("en-US")}{" "}
                        visits
                      </div>
                    </div>
                  ))}
              </div>
            </section>
            <section className="space-y-4">
              <h2 className="font-medium text-xl">Top places</h2>
              <div className="space-y-3">
                {[...countriesAggregated]
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 8)
                  .map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={`https://raw.githubusercontent.com/iMuFeng/round-flag-icons/master/flags/${item.country_code}.svg`}
                          alt={item.label}
                          className="size-4 rounded-full"
                        />
                        <div className="truncate">{item.label}</div>
                      </div>
                      <div className="text-neutral-500 tabular-nums">
                        {item.count.toLocaleString("en-US")} visits
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          </div>
        </div>
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
              {[...countries]
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
                      className="flex items-center justify-between gap-4 relative rounded-xl transition-colors duration-200"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <img
                          src={`https://raw.githubusercontent.com/iMuFeng/round-flag-icons/master/flags/${item.country_code}.svg`}
                          alt=""
                          className="size-5 rounded-full shrink-0"
                        />
                        <Link
                          href={`/location/${new Date(
                            item.date
                          ).getUTCFullYear()}/${slugify(item.label)}-${
                            item.country_code
                          }`}
                          className={`${focusStyles} min-w-0 full-link flex items-center`}
                        >
                          <h3
                            className="truncate font-medium"
                            dangerouslySetInnerHTML={{
                              __html: marked.parseInline(item.label),
                            }}
                          />
                          <span className="truncate text-neutral-500">
                            ,&nbsp;
                            <span
                              dangerouslySetInnerHTML={{
                                __html: marked.parseInline(countryData.name),
                              }}
                            />
                          </span>
                        </Link>
                      </div>
                      <div className="text-sm text-neutral-500 text-right shrink-0 min-w-[6.5em]">
                        {new Date(item.date).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                        })}
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
