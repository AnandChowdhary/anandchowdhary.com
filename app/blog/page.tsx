import { getAllBlogPosts } from "@/app/api";
import BlogContent from "@/app/blog/component";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog / Anand Chowdhary",
  description:
    "Read articles and blog posts by Anand Chowdhary about technology, entrepreneurship, design, and engineering.",
};

export default async function Blog() {
  const blogDataFiltered = await getAllBlogPosts();
  return <BlogContent blogDataFiltered={blogDataFiltered} />;
}
