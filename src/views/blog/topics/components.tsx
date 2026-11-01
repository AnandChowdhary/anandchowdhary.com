import type { BlogPost } from '@/views/api';
import { blogPostPath, publishedTopics, relatedReading, topicsForPost } from '@/lib/blog-topics';
import { focusStyles } from '@/views/components/external-link';

export function TopicLinks({ post }: { post: BlogPost }) {
  const topics = topicsForPost(post);
  if (!topics.length) return null;
  return <nav aria-label="Article topics" className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-neutral-500">
    {topics.map(topic => <a key={topic.slug} href={`/blog/topics/${topic.slug}`} className={`${focusStyles} underline underline-offset-4`}>{topic.title}</a>)}
  </nav>;
}

export function RelatedReading({ post, posts }: { post: BlogPost; posts: BlogPost[] }) {
  const related = relatedReading(post, posts);
  if (!related.length) return null;
  return <section data-search-exclude aria-labelledby="related-reading-heading" className="border-t border-neutral-200 dark:border-neutral-800 pt-8 space-y-4">
    <h2 id="related-reading-heading" className="text-lg font-medium">Related reading</h2>
    <ul className="space-y-3">{related.map(item => <li key={blogPostPath(item)}><a href={blogPostPath(item)} className={`${focusStyles} underline underline-offset-4 hover:text-neutral-500`}>{item.title}</a></li>)}</ul>
  </section>;
}

export function TopicNavigation({ posts }: { posts: BlogPost[] }) {
  return <nav aria-label="Blog topics" className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-neutral-500">
    <a href="/blog/topics" className={`${focusStyles} underline underline-offset-4`}>Browse topics</a>
    {publishedTopics(posts).map(topic => <a key={topic.slug} href={`/blog/topics/${topic.slug}`} className={`${focusStyles} underline underline-offset-4`}>{topic.title}</a>)}
  </nav>;
}
