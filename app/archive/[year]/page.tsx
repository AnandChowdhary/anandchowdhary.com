import { getArchiveItemsByYear } from "@/app/api";
import ArchiveContent from "@/app/archive/component";
import { notFound } from "next/navigation";

export default async function ArchiveYear({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);
  const archiveData = await getArchiveItemsByYear(yearNumber);
  if (archiveData.length === 0) notFound();
  return <ArchiveContent archiveData={archiveData} year={year} />;
}
