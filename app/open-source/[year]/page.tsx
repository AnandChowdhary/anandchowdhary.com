import { getAllOpenSource } from "@/app/api";
import OpenSourceContent from "@/app/open-source/component";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ year: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const year = (await params).year;
  return {
    title: `${year} / Open Source / Anand Chowdhary`,
    description: `Open source projects and contributions from ${year} by Anand Chowdhary.`,
  };
}

export default async function OpenSourceYear({ params }: Props) {
  const { year } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);
  const reposDataFiltered = await getAllOpenSource();
  const yearReposData = reposDataFiltered.filter(
    (repo) => new Date(repo.date).getUTCFullYear() === yearNumber
  );
  return <OpenSourceContent reposDataFiltered={yearReposData} year={year} />;
}
