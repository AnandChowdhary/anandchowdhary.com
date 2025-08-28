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

export const revalidate = 60;
export async function generateStaticParams(): Promise<{ year: string }[]> {
  const posts = await getAllBlogPosts();
  const years = Array.from(
    new Set(posts.map((post) => new Date(post.date).getUTCFullYear().toString()))
  );
  return years.map((year) => ({ year }));
}

export default async function BlogYear({ params }: Props) {
  const { year } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);
  const allBlogPosts = await getAllBlogPosts();
  const yearBlogData = allBlogPosts.filter(
    (post) => new Date(post.date).getUTCFullYear() === yearNumber
  );
  
  // Get all years that have blog posts
  const availableYears = Array.from(
    new Set(allBlogPosts.map((post) => new Date(post.date).getUTCFullYear()))
  ).sort((a, b) => a - b);
  
  // Find previous and next years
  const currentYearIndex = availableYears.indexOf(yearNumber);
  const previousYear = currentYearIndex > 0 ? availableYears[currentYearIndex - 1] : undefined;
  const nextYear = currentYearIndex < availableYears.length - 1 ? availableYears[currentYearIndex + 1] : undefined;
  
  return <BlogContent 
    blogDataFiltered={yearBlogData} 
    year={year}
    previousYear={previousYear}
    nextYear={nextYear}
  />;
}
