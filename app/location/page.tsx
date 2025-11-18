import { getAllLocations } from "@/app/api";
import { buildScreenshotOpenGraphImageUrl } from "@/app/lib/opengraph";
import LocationContent from "@/app/location/component";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Location / Anand Chowdhary",
  description:
    "Track Anand Chowdhary's travels and locations around the world.",
  openGraph: {
    images: [{ url: buildScreenshotOpenGraphImageUrl("/location") }],
  },
};

export default async function Location() {
  const countriesDataFiltered = await getAllLocations();
  return <LocationContent countriesDataFiltered={countriesDataFiltered} />;
}
