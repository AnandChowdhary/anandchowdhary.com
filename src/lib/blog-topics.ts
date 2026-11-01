import type { BlogPost } from '@/views/api';

/** Editorial membership and reading order. New articles remain uncategorized until reviewed. */
export const blogTopics = [
  {
    slug: 'ai', title: 'AI and agents',
    description: 'Building with AI, programming agents, and the ways automation changes work.',
    articles: ['2026/future-ai-native-work', '2025/running-claude-code-in-a-loop', '2026/agentscript', '2020/automated-journalism-authorship', '2016/machine-learning-in-6-lines'],
  },
  {
    slug: 'design', title: 'Design and interfaces',
    description: 'Interfaces, typography, identity, and the details that make products easier to use.',
    articles: ['2013/design', '2017/zomato', '2015/too-simple-design', '2019/google-play-badges', '2015/naming-brands', '2015/gaana-identity', '2015/one-space-after-a-period', '2013/internet-org', '2014/on-operating-systems', '2015/apple-remote'],
  },
  {
    slug: 'engineering', title: 'Engineering and open source',
    description: 'Developer tools, open-source projects, web standards, and practical engineering lessons.',
    articles: ['2019/quarter-of-open-source', '2020/introducing-uppload-v2', '2020/microsoft-open-source', '2019/package-managers', '2019/google-docs-github', '2017/md5', '2017/utwente-peoplepages', '2013/the-death-of-www', '2025/running-claude-code-in-a-loop', '2026/agentscript'],
  },
  {
    slug: 'accessibility', title: 'Accessibility',
    description: 'Making the web work for more people, from screen readers to customizable interfaces.',
    articles: ['2019/agastya-4-augmentally', '2018/agastya-screen-reader', '2018/new-agastya', '2016/machine-learning-in-6-lines'],
  },
  {
    slug: 'startups', title: 'Startups and building products',
    description: 'Starting companies, launching products, and learning from the people building them.',
    articles: ['2026/why-i-joined-sycamore', '2023/startup-visa-application', '2021/yc-batch-size', '2016/30-billion-opportunity', '2014/classrebels', '2013/made-with-love-in-india', '2016/saga-music', '2019/twitter-subaccounts'],
  },
  {
    slug: 'reflection', title: 'Life and reflection',
    description: 'Personal updates, yearly themes, and reflections on living and working across places.',
    articles: ['2026/six-weeks-in-palo-alto', '2025/year-of-discovery', '2024/year-of-gratitude', '2022/year-of-relationships', '2021/year-of-teamwork', '2017/college', '2026/why-i-joined-sycamore'],
  },
  {
    slug: 'culture', title: 'Tools and culture',
    description: 'Podcasts, books, devices, and the tools that find a place in everyday life.',
    articles: ['2019/state-of-the-podcasts-2019', '2018/state-of-the-podcasts-2018', '2018/state-of-the-dock-2018', '2014/fleksy-keyboard', '2014/surface-pro-3', '2015/apple-remote', '2013/nineteen-eighty-four'],
  },
] as const;

export function blogPostPath(post: BlogPost) {
  return `/blog/${new Date(post.date).getUTCFullYear()}/${post.slug.replace(/\.md$/, '')}`;
}
const key = (post: BlogPost) => blogPostPath(post).slice('/blog/'.length);
export function topicsForPost(post: BlogPost) {
  return blogTopics.filter(topic => (topic.articles as readonly string[]).includes(key(post)));
}
export function publishedTopics(posts: BlogPost[]) {
  const published = new Map(posts.filter(post => !post.attributes?.draft).map(post => [key(post), post]));
  return blogTopics.map(topic => ({ ...topic, posts: topic.articles.flatMap(id => published.has(id) ? [published.get(id)!] : []) })).filter(topic => topic.posts.length > 0);
}
export function relatedReading(post: BlogPost, posts: BlogPost[], limit = 3): BlogPost[] {
  const topics = topicsForPost(post);
  if (!topics.length) return [];
  const ordered: readonly string[] = topics.flatMap(topic => [...topic.articles]);
  const unique = [...new Map(posts.map(candidate => [key(candidate), candidate])).values()];
  return unique.filter(candidate => !candidate.attributes?.draft && key(candidate) !== key(post))
    .map(candidate => ({ post: candidate, shared: topics.filter(topic => (topic.articles as readonly string[]).includes(key(candidate))).length, order: ordered.indexOf(key(candidate)) }))
    .filter(candidate => candidate.shared > 0)
    .sort((a,b) => b.shared - a.shared || a.order - b.order || blogPostPath(a.post).localeCompare(blogPostPath(b.post)))
    .slice(0, Math.max(0, limit)).map(candidate => candidate.post);
}
