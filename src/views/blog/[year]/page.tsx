import { getAllBlogPosts } from "@/views/api";
import BlogContent from "@/views/blog/component";
import { buildScreenshotOpenGraphImageUrl } from "@/views/lib/opengraph";
import type { Metadata } from "@/lib/metadata";
import { notFound, redirect } from "@/lib/navigation";

type Props = {
  params: Promise<{ year: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const year = (await params).year;
  return {
    title: `${year} / Blog / Anand Chowdhary`,
    description: `Read articles and blog posts from ${year} by Anand Chowdhary about technology, entrepreneurship, design, and engineering.`,
    openGraph: {
      images: [{ url: buildScreenshotOpenGraphImageUrl(`/blog/${year}`) }],
    },
  };
}


export default async function BlogYear({ params }: Props) {
  const { year } = await params;
  const allBlogPosts = await getAllBlogPosts();
  const foundBlogPost = allBlogPosts.find(
    (post) => post.slug.replace(".md", "") === year
  );
  if (foundBlogPost)
    redirect(
      `/blog/${new Date(
        foundBlogPost.date
      ).getUTCFullYear()}/${foundBlogPost.slug.replace(".md", "")}`
    );

  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);
  const yearBlogData = allBlogPosts.filter(
    (post) => new Date(post.date).getUTCFullYear() === yearNumber
  );

  // Get all years that have blog posts
  const availableYears = Array.from(
    new Set(allBlogPosts.map((post) => new Date(post.date).getUTCFullYear()))
  ).sort((a, b) => a - b);

  // Find previous and next years
  const currentYearIndex = availableYears.indexOf(yearNumber);
  const previousYear =
    currentYearIndex > 0 ? availableYears[currentYearIndex - 1] : undefined;
  const nextYear =
    currentYearIndex < availableYears.length - 1
      ? availableYears[currentYearIndex + 1]
      : undefined;

  return (
    <BlogContent
      blogDataFiltered={yearBlogData}
      year={year}
      previousYear={previousYear}
      nextYear={nextYear}
    />
  );
}
