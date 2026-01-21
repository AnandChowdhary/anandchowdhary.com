import { focusStyles } from "@/app/components/external-link";
import { NavigationLinks } from "@/app/components/navigation-links";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";

interface LocationData {
  hash: string;
  country_code: string;
  label: string;
  date: string;
}

export function LocationSection({
  countriesDataFiltered,
}: {
  countriesDataFiltered: LocationData[];
}) {
  return (
    <div>
      <h2 className="font-medium text-xl">Location</h2>
      <div className="inline-flex">
        <NavigationLinks
          source="https://github.com/AnandChowdhary/location"
          readme="https://anandchowdhary.github.io/location/README.md"
          api="https://anandchowdhary.github.io/location/history-countries.json"
          className="mb-6 justify-start mx-0"
        />
      </div>
      <div className="grid grid-cols-5 gap-8">
        {countriesDataFiltered
          .sort((a, b) => b.date.localeCompare(a.date))
          .slice(0, 4)
          .map((country, index) => (
            <div key={country.hash}>
              <img
                src={`https://raw.githubusercontent.com/iMuFeng/round-flag-icons/master/flags/${country.country_code}.svg`}
                alt={country.label}
                className="size-7 rounded-full mb-2"
              />
              <div className="truncate">{country.label}</div>
              <div className="text-neutral-500 tabular-nums text-sm">
                {index === 0
                  ? "Now"
                  : new Date(country.date).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                    })}
              </div>
            </div>
          ))}
        <div>
          <div className="h-7 mb-2" />
          <div className="flex items-center gap-0.5">
            <Link href="/location" className={focusStyles}>
              More
            </Link>
            <IconChevronRight size={12} strokeWidth={1.5} />
          </div>
          <div className="text-neutral-500 tabular-nums text-sm">
            {countriesDataFiltered.length.toLocaleString("en-US")} places
          </div>
        </div>
      </div>
    </div>
  );
}
