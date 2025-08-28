import { getArchiveItemsByYear } from "@/app/api";
import ArchiveContent from "@/app/archive/component";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ year: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const year = (await params).year;
  return {
    title: `${year} / Archive / Anand Chowdhary`,
    description: `Browse through archived content and past projects from ${year} by Anand Chowdhary.`,
  };
}

export default async function ArchiveYear({ params }: Props) {
  const { year } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);
  const archiveData = await getArchiveItemsByYear(yearNumber);
  if (archiveData.length === 0) notFound();
  return <ArchiveContent archiveData={archiveData} year={year} />;
}
