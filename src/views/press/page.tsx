import { getPress } from "@/views/api";
import { buildScreenshotOpenGraphImageUrl } from "@/views/lib/opengraph";
import PressContent from "@/views/press/component";
import type { Metadata } from "@/lib/metadata";

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
