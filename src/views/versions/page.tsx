import { getAllVersions } from "@/views/api";
import { buildScreenshotOpenGraphImageUrl } from "@/views/lib/opengraph";
import VersionContent from "@/views/versions/component";
import type { Metadata } from "@/lib/metadata";

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
