import { getAllCountries } from "@/app/api";
import LocationContent from "@/app/location/component";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ year: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const year = (await params).year;
  return {
    title: `${year} / Location / Anand Chowdhary`,
    description: `Places visited by Anand Chowdhary in ${year}.`,
  };
}

export const revalidate = 60;
export async function generateStaticParams(): Promise<{ year: string }[]> {
  const countries = await getAllCountries();
  const years = Array.from(
    new Set(
      countries.map((country) =>
        new Date(country.date).getUTCFullYear().toString(),
      ),
    ),
  );
  return years.map((year) => ({ year }));
}

export default async function LocationYear({ params }: Props) {
  const { year } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);
  const allCountries = await getAllCountries();
  const yearCountriesData = allCountries.filter(
    (country) => new Date(country.date).getUTCFullYear() === yearNumber,
  );

  // Get all years that have location data
  const availableYears = Array.from(
    new Set(
      allCountries.map((country) => new Date(country.date).getUTCFullYear()),
    ),
  ).sort((a, b) => a - b);

  // Find previous and next years
  const currentYearIndex = availableYears.indexOf(yearNumber);
  const previousYear =
    currentYearIndex > 0 ? availableYears[currentYearIndex - 1] : undefined;
  const nextYear =
    currentYearIndex < availableYears.length - 1
      ? availableYears[currentYearIndex + 1]
      : undefined;

  return (
    <LocationContent
      countriesDataFiltered={yearCountriesData}
      year={year}
      previousYear={previousYear}
      nextYear={nextYear}
    />
  );
}
