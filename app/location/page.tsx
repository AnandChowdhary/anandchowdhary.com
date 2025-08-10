import { getAllLocations } from "@/app/api";
import LocationContent from "@/app/location/component";

export default async function Location() {
  const countriesDataFiltered = await getAllLocations();
  return <LocationContent countriesDataFiltered={countriesDataFiltered} />;
}
