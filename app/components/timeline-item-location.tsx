import { getLocation } from "@/app/api";
import { TimelineItem } from "@/app/components/timeline-item";
import { getCountry } from "countries-and-timezones";

export async function TimelineItemLocation() {
  const location = await getLocation();
  let countryName = getCountry(location.country_code.toUpperCase())?.name;

  // All the countries starting with "the" where I am likely to be
  if (location.country_code === "nl") countryName = "the Netherlands";
  if (location.country_code === "us") countryName = "the United States";
  if (location.country_code === "gb") countryName = "the United Kingdom";
  if (location.country_code === "ae") countryName = "the Emirates";

  return (
    <TimelineItem
      icon={location.country_emoji ?? "📍"}
      title={`Currently in ${countryName ?? location.label}`}
      subtitle={`It is ${new Date().toLocaleString("en-US", {
        timeStyle: "short",
        timeZone: location.timezone.name,
      })} (UTC ${location.timezone.utcOffsetStr})`}
    />
  );
}
