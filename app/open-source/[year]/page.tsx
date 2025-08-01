import { getAllOpenSource } from "@/app/api";
import OpenSourceContent from "@/app/open-source/component";
import { notFound } from "next/navigation";

export default async function OpenSourceYear({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);
  const reposDataFiltered = await getAllOpenSource();
  const yearReposData = reposDataFiltered.filter(
    (repo) => new Date(repo.date).getUTCFullYear() === yearNumber
  );
  return <OpenSourceContent reposDataFiltered={yearReposData} year={year} />;
}
