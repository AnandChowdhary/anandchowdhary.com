import { getAllArchiveItems } from "@/app/api";
import ArchiveContent from "@/app/archive/component";

export default async function Archive() {
  const archiveData = await getAllArchiveItems();
  return <ArchiveContent archiveData={archiveData} />;
}
