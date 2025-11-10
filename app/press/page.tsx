import { getPress } from "@/app/api";
import { buildScreenshotOpenGraphImageUrl } from "@/app/lib/opengraph";
import PressContent from "@/app/press/component";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Press / Anand Chowdhary",
  description:
    "Press coverage, media mentions, and featured articles about Anand Chowdhary.",
  openGraph: {
    images: [
      {
        url: buildScreenshotOpenGraphImageUrl("/press"),
      },
    ],
  },
};

export default async function Press() {
  const pressData = await getPress();
  return <PressContent pressData={pressData} />;
}
