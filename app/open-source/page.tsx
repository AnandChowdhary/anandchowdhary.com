import { getAllOpenSource } from "@/app/api";
import OpenSourceContent from "@/app/open-source/component";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Open Source / Anand Chowdhary",
  description:
    "Explore open source projects and contributions by Anand Chowdhary on GitHub.",
};

export default async function OpenSource() {
  const reposDataFiltered = await getAllOpenSource();
  return <OpenSourceContent reposDataFiltered={reposDataFiltered} />;
}
