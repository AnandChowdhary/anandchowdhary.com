import {
  GenericItem,
  GenericSectionContainer,
} from "@/app/components/generic-section";

interface Country extends GenericItem {
  label: string;
  coordinates: [number, number];
  date: string;
  hash: string;
  country_code: string;
  timezone_name: string;
}

export async function TravelSection() {
  const countries = await fetch(
    "https://anandchowdhary.github.io/location/history-countries.json",
    { next: { revalidate: 36000 } }
  );
  const countriesData = (await countries.json()) as Country[];

  const countriesDataWithRequiredProps = countriesData.map((country) => ({
    ...country,
    slug: country.country_code,
    path: `/travel/${country.country_code}`,
    source: "",
    date: country.date,
    excerpt: `Visited ${country.label} on ${new Date(
      country.date
    ).toLocaleDateString()}`,
  }));

  const countriesDataSorted = countriesDataWithRequiredProps.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <GenericSectionContainer
      title="travel"
      subtitle="/travel"
      description="Countries I've visited around the world."
      linkText="Go to travel"
    >
      <ul className="grid grid-cols-11 gap-2">
        {countriesDataSorted.map((country) => (
          <li key={country.slug}>
            <img
              src={`https://raw.githubusercontent.com/iMuFeng/round-flag-icons/master/flags/${country.country_code}.svg`}
              alt={country.label}
              className="w-full h-full object-cover rounded-full"
            />
          </li>
        ))}
      </ul>
    </GenericSectionContainer>
  );
}
