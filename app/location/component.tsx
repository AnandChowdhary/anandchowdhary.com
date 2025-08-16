"use client";

import { Country } from "@/app/api";
import { focusStyles } from "@/app/components/external-link";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { ClientOnly } from "@/app/location/client-only";
import LocationMap from "@/app/location/map";
import { IconCalendar, IconFlag } from "@tabler/icons-react";
import { getCountryData, type TCountryCode } from "countries-list";
import { marked } from "marked";
import { markedSmartypants } from "marked-smartypants";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

marked.use(markedSmartypants());

export default function LocationContent({
  countriesDataFiltered,
  year,
}: {
  countriesDataFiltered: Country[];
  year?: string;
}) {
  const [center, setCenter] = useState<[number, number]>([0, 0]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const countriesDataByYear = countriesDataFiltered.reduce((acc, item) => {
    const year = new Date(item.date).getUTCFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(item);
    return acc;
  }, {} as Record<string, Country[]>);

  const allCountries = Object.entries(countriesDataByYear)
    .sort((a, b) => b[0].localeCompare(a[0]))
    .flatMap(([year, countries]) =>
      countries
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((country) => ({ ...country, year }))
    );

  const handleScroll = useCallback(() => {
    const windowHeight = window.innerHeight;
    const threshold = windowHeight * 0.3;
    let newActiveIndex = 0;
    let minDistance = Infinity;
    itemRefs.current.forEach((ref, index) => {
      if (ref) {
        const rect = ref.getBoundingClientRect();
        const distance = Math.abs(rect.top - threshold);
        if (distance < minDistance) {
          minDistance = distance;
          newActiveIndex = index;
        }
      }
    });

    if (newActiveIndex !== activeIndex) setActiveIndex(newActiveIndex);
  }, [activeIndex]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, allCountries.length);
  }, [allCountries.length]);

  useEffect(() => {
    if (allCountries.length > 0 && allCountries[0]?.coordinates)
      setCenter(allCountries[0].coordinates);
  }, [allCountries]);

  useEffect(() => {
    if (allCountries[activeIndex]?.coordinates)
      setCenter(allCountries[activeIndex].coordinates);
  }, [activeIndex, allCountries]);

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 space-y-32">
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />
      <Header pathname={year ? `/location/${year}` : "/location"}>
        I love traveling and exploring new places. Here are the countries I've
        visited over the years.
      </Header>
      <main className="max-w-3xl mx-auto space-y-8 grid grid-cols-2 gap-8">
        <div>
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
                  .map((item, index) => {
                    const countryData = getCountryData(
                      item.country_code.toUpperCase() as TCountryCode
                    );
                    if (!countryData) return null;

                    const globalIndex = allCountries.findIndex(
                      (country) =>
                        country.date === item.date && country.slug === item.slug
                    );

                    return (
                      <article
                        key={`${item.date}-${item.slug}`}
                        ref={(el) => {
                          itemRefs.current[globalIndex] = el as HTMLDivElement;
                        }}
                        className={`grid grid-cols-2 gap-8 items-center relative rounded-xl p-4 transition-colors duration-200 ${
                          activeIndex === globalIndex ? "bg-slate-100" : ""
                        }`}
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
                                {new Date(item.date).toLocaleDateString(
                                  "en-US",
                                  { day: "numeric", month: "long" }
                                )}
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
        </div>
        <div>
          <div className="top-8 w-full sticky rounded-xl overflow-hidden">
            <ClientOnly>
              <LocationMap center={center} />
            </ClientOnly>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
