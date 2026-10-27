import { getAllOpenSource } from "@/views/api";
import { buildScreenshotOpenGraphImageUrl } from "@/views/lib/opengraph";
import OpenSourceContent from "@/views/open-source/component";
import type { Metadata } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Open Source / Anand Chowdhary",
  description:
    "Explore open source projects and contributions by Anand Chowdhary on GitHub.",
  openGraph: {
    images: [
      {
        url: buildScreenshotOpenGraphImageUrl("/open-source"),
      },
    ],
  },
};

export default async function OpenSource() {
  const reposDataFiltered = await getAllOpenSource();
  return <OpenSourceContent reposDataFiltered={reposDataFiltered} />;
}
