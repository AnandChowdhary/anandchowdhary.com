import { getAllBlogPosts } from "@/views/api";
import BlogContent from "@/views/blog/component";

export { metadata } from "@/lib/blog-metadata";

export default async function Blog() {
  const blogDataFiltered = await getAllBlogPosts();
  return <BlogContent blogDataFiltered={blogDataFiltered} />;
}
