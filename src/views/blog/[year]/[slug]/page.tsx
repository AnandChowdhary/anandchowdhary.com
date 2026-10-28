import { ResponsiveImage } from "@/views/components/responsive-image";
import { ARTICLE_SIZES } from "@/lib/images";
import {
  getAllBlogPosts,
  getBlogPostByYearAndSlug,
  getBlogPostContent,
} from "@/views/api";
import { BlogMetadata } from "@/views/blog/metadata";
import { BlogContentWithLightbox } from "@/views/components/blog-content-with-lightbox";
import { Container } from "@/views/components/container";
import { Footer } from "@/views/components/footer";
import { Header } from "@/views/components/header";
import { NavigationFooter } from "@/views/components/navigation-footer";
import { buildScreenshotOpenGraphImageUrl } from "@/views/lib/opengraph";
import { proseClassName } from "@/views/styles";
import { marked } from "marked";
import { markedSmartypants } from "marked-smartypants";
import type { Metadata } from "@/lib/metadata";
import { notFound } from "@/lib/navigation";
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
    openGraph: {
      images: [
        { url: buildScreenshotOpenGraphImageUrl(`/blog/${year}/${slug}`) },
      ],
    },
  };
}


export default async function BlogYearSlug({ params }: Props) {
  const { year, slug } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);
  const rand = Math.floor(new Rand(`${slug}.md`).next() * 100 + 1);

  const post = await getBlogPostByYearAndSlug(yearNumber, slug);
  if (!post) notFound();

  const allPosts = await getAllBlogPosts();
  const currentPostIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const previousPost = allPosts[currentPostIndex - 1];
  const nextPost = allPosts[currentPostIndex + 1];

  const postContentText = await getBlogPostContent(year, post.slug);
  const postContentHtml = await Promise.resolve(marked.parse(postContentText));

  const yearNavigation = { previous: previousPost, next: nextPost };

  return (
    <Container>
      <Header pathname={`/blog/${year}`} />
      <main className="max-w-2xl mx-auto space-y-8">
        <div className="relative">
          <ResponsiveImage
            sizes={ARTICLE_SIZES}
            width={384}
            height={256}
            loading="eager"
            fetchPriority="high"
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
        <BlogContentWithLightbox
          html={postContentHtml}
          className={proseClassName}
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
  );
}
