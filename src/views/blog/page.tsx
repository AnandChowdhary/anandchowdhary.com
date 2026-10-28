import { getAllBlogPosts } from "@/views/api";
import { buildScreenshotOpenGraphImageUrl } from "@/views/lib/opengraph";
import BlogContent from "@/views/blog/component";
import type { Metadata } from "@/lib/metadata";

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

export default async function Blog() {
  const blogDataFiltered = await getAllBlogPosts();
  return <BlogContent blogDataFiltered={blogDataFiltered} />;
}
