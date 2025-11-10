import {
  getAllBlogPosts,
  getBlogPostByYearAndSlug,
  getBlogPostContent,
} from "@/app/api";
import { BlogMetadata } from "@/app/blog/metadata";
import { Container } from "@/app/components/container";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { NavigationFooter } from "@/app/components/navigation-footer";
import { buildScreenshotOpenGraphImageUrl } from "@/app/lib/opengraph";
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

  const post = await getBlogPostByYearAndSlug(yearNumber, slug, true);
  if (!post) notFound();
  return {
    title: `${post.attributes.draft ? "[DRAFT] " : ""}${
      post.title
    } / ${year} / Blog / Anand Chowdhary`,
    description: post.excerpt,
    openGraph: {
      images: [
        { url: buildScreenshotOpenGraphImageUrl(`/blog/${year}/${slug}`) },
      ],
    },
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

  const post = await getBlogPostByYearAndSlug(yearNumber, slug, true);
  if (!post) notFound();

  const allPosts = await getAllBlogPosts();
  const currentPostIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const previousPost = allPosts[currentPostIndex - 1];
  const nextPost = allPosts[currentPostIndex + 1];

  const postContentText = await getBlogPostContent(year, post.slug);
  const postContentHtml = await Promise.resolve(marked.parse(postContentText));

  const yearNavigation = { previous: previousPost, next: nextPost };

  return (
    <>
      {post.attributes.draft && (
        <div
          className="bg-amber-100 border-b border-amber-200 text-amber-700 text-xs p-3 text-center font-medium"
          role="alert"
        >
          You are viewing a{" "}
          <strong className="font-semibold">draft blog post</strong> which has
          not been published, please do not share just yet.
        </div>
      )}
      <Container>
        <Header pathname={`/blog/${year}`} />
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
              dangerouslySetInnerHTML={{
                __html: marked.parseInline(post.title),
              }}
            />
            <BlogMetadata item={post} postContentText={postContentText} />
          </header>
          <div
            className={proseClassName}
            dangerouslySetInnerHTML={{ __html: postContentHtml }}
          />
          <NavigationFooter
            previous={
              yearNavigation.previous
                ? {
                    href: `/blog/${new Date(
                      yearNavigation.previous.date
                    ).getUTCFullYear()}/${yearNavigation.previous.slug.replace(
                      ".md",
                      ""
                    )}`,
                    label: yearNavigation.previous.title,
                  }
                : undefined
            }
            next={
              yearNavigation.next
                ? {
                    href: `/blog/${new Date(
                      yearNavigation.next.date
                    ).getUTCFullYear()}/${yearNavigation.next.slug.replace(
                      ".md",
                      ""
                    )}`,
                    label: yearNavigation.next.title,
                  }
                : undefined
            }
          />
        </main>
        <Footer />
      </Container>
    </>
  );
}
