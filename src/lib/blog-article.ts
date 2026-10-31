import { getAllBlogPosts, getBlogPostByYearAndSlug, getBlogPostContent, type BlogPost } from '@/views/api';
import { notFound } from './navigation';
import { metadata as defaults } from './site-metadata';
import { buildScreenshotOpenGraphImageUrl } from '@/views/lib/opengraph';
import { ARTICLE_SIZES, optimizedImageUrl } from './images';
import { marked } from 'marked';
import { markedSmartypants } from 'marked-smartypants';
import Rand from 'rand-seed';
marked.use(markedSmartypants());
export async function blogArticle(year: string, slug: string) {
  if (!/^\d{4}$/.test(year)) notFound();
  const post = await getBlogPostByYearAndSlug(Number(year), slug);
  if (!post) notFound();
  const posts = await getAllBlogPosts();
  const index = posts.findIndex(item => item.slug === post.slug);
  const text = await getBlogPostContent(year, post.slug);
  const random = Math.floor(new Rand(`${slug}.md`).next() * 100 + 1);
  const hero = optimizedImageUrl(`https://raw.githubusercontent.com/AnandChowdhary/blog-images/refs/heads/main/384x256/${random}.png`, 384);
  const navigation = (item?: BlogPost) => item ? { href: `/blog/${new Date(item.date).getUTCFullYear()}/${item.slug.replace('.md', '')}`, label: item.title } : undefined;
  return { post, text, html: await marked.parse(text), hero, srcset: `${hero} 384w`, sizes: ARTICLE_SIZES, previous: navigation(posts[index - 1]), next: navigation(posts[index + 1]), metadata: { ...defaults, title: `${post.title} / ${year} / Blog / Anand Chowdhary`, description: post.excerpt, openGraph: { images: [{ url: buildScreenshotOpenGraphImageUrl(`/blog/${year}/${slug}`) }] } } };
}
