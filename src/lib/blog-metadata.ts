import type { Metadata } from "./metadata";
import { buildScreenshotOpenGraphImageUrl } from "@/views/lib/opengraph";

export const metadata: Metadata = {
  title: "Blog / Anand Chowdhary",
  description:
    "Read articles and blog posts by Anand Chowdhary about technology, entrepreneurship, design, and engineering.",
  openGraph: {
    images: [
      {
        url: buildScreenshotOpenGraphImageUrl("/blog"),
      },
    ],
  },
};

