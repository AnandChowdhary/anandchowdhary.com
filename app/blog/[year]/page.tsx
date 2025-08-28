import { getAllBlogPosts } from "@/app/api";
import BlogContent from "@/app/blog/component";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ year: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const year = (await params).year;
  return {
    title: `${year} / Blog / Anand Chowdhary`,
    description: `Read articles and blog posts from ${year} by Anand Chowdhary about technology, entrepreneurship, design, and engineering.`,
  };
}

export default async function BlogYear({ params }: Props) {
  const { year } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);
  const blogDataFiltered = await getAllBlogPosts();
  const yearBlogData = blogDataFiltered.filter(
    (post) => new Date(post.date).getUTCFullYear() === yearNumber
  );
  return <BlogContent blogDataFiltered={yearBlogData} year={year} />;
}
