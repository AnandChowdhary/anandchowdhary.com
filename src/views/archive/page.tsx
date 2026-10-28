import { getAllArchiveItems } from "@/views/api";
import ArchiveContent from "@/views/archive/component";
import { buildScreenshotOpenGraphImageUrl } from "@/views/lib/opengraph";
import type { Metadata } from "@/lib/metadata";

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
