import { getAllArchiveItems } from "@/app/api";
import ArchiveContent from "@/app/archive/component";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Archive / Anand Chowdhary",
  description:
    "Browse through archived content and past projects by Anand Chowdhary.",
};

export default async function Archive() {
  const archiveData = await getAllArchiveItems();
  return <ArchiveContent archiveData={archiveData} />;
}
