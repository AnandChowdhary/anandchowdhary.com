import {
  getAllBlogPosts,
  getBlogPostByYearAndSlug,
  getBlogPostContent,
} from "@/app/api";
import { BlogMetadata } from "@/app/blog/metadata";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { proseClassName } from "@/app/styles";
import { marked } from "marked";
import { markedSmartypants } from "marked-smartypants";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Rand from "rand-seed";

marked.use(markedSmartypants());

type Props = {
  params: Promise<{ year: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year, slug } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);

  const post = await getBlogPostByYearAndSlug(yearNumber, slug);
  if (!post) notFound();
  return {
    title: `${post.title} / ${year} / Blog / Anand Chowdhary`,
    description: post.excerpt,
  };
}

export const revalidate = 60;
export async function generateStaticParams(): Promise<
  { year: string; slug: string }[]
> {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    year: new Date(post.date).getUTCFullYear().toString(),
    slug: post.slug.replace(".md", ""),
  }));
}

export default async function BlogYearSlug({ params }: Props) {
  const { year, slug } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);
  const rand = Math.floor(new Rand(`${slug}.md`).next() * 100 + 1);

  const post = await getBlogPostByYearAndSlug(yearNumber, slug);
  if (!post) notFound();

  const postContentText = await getBlogPostContent(year, post.slug);
  const postContentHtml = await Promise.resolve(marked.parse(postContentText));

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 space-y-32">
      <Header
        pathname={`/blog/${year}`}
        description="Thoughts and insights on technology, entrepreneurship, and building products that matter."
        source="https://github.com/AnandChowdhary/blog"
        readme="https://anandchowdhary.github.io/blog/README.md"
        api="https://anandchowdhary.github.io/blog/api.json"
      />
      <main className="max-w-2xl mx-auto space-y-8">
        <div className="relative">
          <img
            src={`https://raw.githubusercontent.com/AnandChowdhary/blog-images/refs/heads/main/384x256/${rand}.png`}
            alt=""
            className="w-full h-full max-h-64 object-cover rounded-2xl dark:brightness-60"
          />
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none text-5xl tracking-widest">
            {post.emoji}
          </div>
        </div>
        <header className="space-y-2">
          <h1
            className="text-2xl font-medium"
            dangerouslySetInnerHTML={{ __html: marked.parseInline(post.title) }}
          />
          <BlogMetadata item={post} postContentText={postContentText} />
        </header>
        <div
          className={proseClassName}
          dangerouslySetInnerHTML={{ __html: postContentHtml }}
        />
      </main>
      <Footer />
    </div>
  );
}
