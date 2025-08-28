import { getAllCountries } from "@/app/api";
import { GenericSectionContainer } from "@/app/components/generic-section";

export async function TravelSection() {
  const countriesDataSorted = await getAllCountries();

  return (
    <GenericSectionContainer
      title="location"
      subtitle="/location"
      description="For over ten years, I’ve been tracking my location as I travel around the world."
      linkText="Go to /location"
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
