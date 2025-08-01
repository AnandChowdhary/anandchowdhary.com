import { getAllCountries } from "@/app/api";
import { GenericSectionContainer } from "@/app/components/generic-section";

export async function TravelSection() {
  const countriesDataSorted = await getAllCountries();

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
