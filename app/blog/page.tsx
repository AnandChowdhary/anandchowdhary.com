import { getAllBlogPosts } from "@/app/api";
import BlogContent from "@/app/blog/component";

export default async function Blog() {
  const blogDataFiltered = await getAllBlogPosts();
  return <BlogContent blogDataFiltered={blogDataFiltered} />;
}
