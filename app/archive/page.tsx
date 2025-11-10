import { getAllArchiveItems } from "@/app/api";
import ArchiveContent from "@/app/archive/component";
import { buildScreenshotOpenGraphImageUrl } from "@/app/lib/opengraph";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Archive / Anand Chowdhary",
  description:
    "Browse through archived content and past projects by Anand Chowdhary.",
  openGraph: {
    images: [
      {
        url: buildScreenshotOpenGraphImageUrl("/archive"),
      },
    ],
  },
};

export default async function Archive() {
  const archiveData = await getAllArchiveItems();
  return <ArchiveContent archiveData={archiveData} />;
}
