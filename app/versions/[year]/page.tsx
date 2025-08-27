import { getAllVersions } from "@/app/api";
import VersionContent from "@/app/versions/component";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ year: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const year = (await params).year;
  return {
    title: `${year} / Versions / Anand Chowdhary`,
    description: `Over the years, I've designed and redesigned my personal website several times; I ﬁnd it to be a great way to explore new technologies. Looking back, I can connect the dots for what I was interested in way back when.`,
  };
}

export default async function VersionYear({ params }: Props) {
  const { year } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);
  const versionDataFiltered = await getAllVersions();
  const yearVersionData = versionDataFiltered.filter(
    (version) => new Date(version.date).getUTCFullYear() === yearNumber
  );
  return <VersionContent versionDataFiltered={yearVersionData} year={year} />;
}
