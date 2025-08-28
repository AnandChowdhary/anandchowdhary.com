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

export default async function LocationYear({ params }: Props) {
  const { year } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);
  const countriesDataFiltered = await getAllCountries();
  const yearCountriesData = countriesDataFiltered.filter(
    (country) => new Date(country.date).getUTCFullYear() === yearNumber
  );
  return (
    <LocationContent countriesDataFiltered={yearCountriesData} year={year} />
  );
}
