import { getPress } from "@/app/api";
import PressContent from "@/app/press/component";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Press / Anand Chowdhary",
  description:
    "Press coverage, media mentions, and featured articles about Anand Chowdhary.",
};

export default async function Press() {
  const pressData = await getPress();
  return <PressContent pressData={pressData} />;
}
