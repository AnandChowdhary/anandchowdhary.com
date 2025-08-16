import { getPress } from "@/app/api";
import PressContent from "@/app/press/component";

export default async function Press() {
  const pressData = await getPress();
  return <PressContent pressData={pressData} />;
}
