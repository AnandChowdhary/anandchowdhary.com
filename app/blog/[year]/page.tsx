import { getAllBlogPosts } from "@/app/api";
import BlogContent from "@/app/blog/component";
import { notFound } from "next/navigation";

export default async function BlogYear({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);
  const blogDataFiltered = await getAllBlogPosts();
  const yearBlogData = blogDataFiltered.filter(
    (post) => new Date(post.date).getUTCFullYear() === yearNumber
  );
  return <BlogContent blogDataFiltered={yearBlogData} year={year} />;
}
