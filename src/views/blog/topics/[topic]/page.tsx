import { getAllBlogPosts } from '@/views/api';
import { publishedTopics, blogPostPath } from '@/lib/blog-topics';
import { Header } from '@/views/components/header';
import { Footer } from '@/views/components/footer';
import { Container } from '@/views/components/container';
import { focusStyles } from '@/views/components/external-link';
import { notFound } from '@/lib/navigation';
type Props = { params: Promise<{ topic: string }> };
async function topicData(props: Props) {
  const { topic: slug } = await props.params;
  const topic = publishedTopics(await getAllBlogPosts()).find(topic => topic.slug === slug);
  if (!topic) notFound();
  return topic;
}
export async function generateMetadata(props: Props) {
  const topic = await topicData(props);
  const title = `${topic.title} / Topics / Blog / Anand Chowdhary`;
  const description = topic.description;
  return { title, description, openGraph: { title, description, url: `https://anandchowdhary.com/blog/topics/${topic.slug}`, type: 'website' as const }, twitter: { card: 'summary', title, description } };
}
export default async function Topic(props: Props) {
  const topic = await topicData(props);
  return <Container>
    <Header pathname="/blog/topics" description={topic.description} />
    <main className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-2xl font-medium">{topic.title}</h1>
      <p className="text-sm text-neutral-500">A curated reading order. <a className={`${focusStyles} underline`} href="/blog/topics">Explore all topics</a></p>
      <ol className="space-y-6">{topic.posts.map(post => <li key={post.slug}>
        <h2 className="text-lg font-medium"><a href={blogPostPath(post)} className={`${focusStyles} underline underline-offset-4 hover:text-neutral-500`}>{post.title}</a></h2>
        <p className="text-sm text-neutral-500 mt-1">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</p>
        <p className="text-sm text-neutral-500 mt-2 line-clamp-3">{post.excerpt}</p>
      </li>)}</ol>
    </main>
    <Footer />
  </Container>;
}
