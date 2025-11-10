import { getAllVersions } from "@/app/api";
import { buildScreenshotOpenGraphImageUrl } from "@/app/lib/opengraph";
import VersionContent from "@/app/versions/component";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Versions / Anand Chowdhary",
  description:
    "Over the years, I've designed and redesigned my personal website several times; I ﬁnd it to be a great way to explore new technologies. Looking back, I can connect the dots for what I was interested in way back when.",
  openGraph: {
    images: [
      {
        url: buildScreenshotOpenGraphImageUrl("/versions"),
      },
    ],
  },
};

export default async function Versions() {
  const versionDataFiltered = await getAllVersions();
  return <VersionContent versionDataFiltered={versionDataFiltered} />;
}
