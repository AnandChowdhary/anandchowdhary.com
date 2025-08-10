import { getAllCountries } from "@/app/api";
import LocationContent from "@/app/location/component";
import { notFound } from "next/navigation";

export default async function LocationYear({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
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
