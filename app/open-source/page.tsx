import { getAllOpenSource } from "@/app/api";
import OpenSourceContent from "@/app/open-source/component";

export default async function OpenSource() {
  const reposDataFiltered = await getAllOpenSource();
  return <OpenSourceContent reposDataFiltered={reposDataFiltered} />;
}
