import { getAllBlogPosts } from '@/views/api';
import { publishedTopics, blogPostPath } from '@/lib/blog-topics';
import { Header } from '@/views/components/header';
import { Footer } from '@/views/components/footer';
import { Container } from '@/views/components/container';
import { focusStyles } from '@/views/components/external-link';
const title = 'Topics / Blog / Anand Chowdhary';
const description = 'Explore curated articles about AI, design, engineering, accessibility, startups, and life.';
export const metadata = { title, description, openGraph: { title, description, url: 'https://anandchowdhary.com/blog/topics', type: 'website' as const }, twitter: { card: 'summary', title, description } };
export default async function Topics() {
  const topics = publishedTopics(await getAllBlogPosts());
  return <Container>
    <Header pathname="/blog/topics" description="A few starting points for exploring the blog, organized by subject." />
    <main id="main-content" tabIndex={-1} className="max-w-2xl mx-auto space-y-10">
      <h1 className="text-2xl font-medium">Explore by topic</h1>
      {topics.map(topic => <section key={topic.slug} className="space-y-3">
        <h2 className="text-lg font-medium"><a href={`/blog/topics/${topic.slug}`} className={`${focusStyles} underline underline-offset-4`}>{topic.title}</a></h2>
        <p className="text-sm text-neutral-500">{topic.description}</p>
        <ul className="space-y-2">{topic.posts.slice(0,3).map(post => <li key={post.slug}><a href={blogPostPath(post)} className={`${focusStyles} hover:text-neutral-500`}>{post.title}</a></li>)}</ul>
        <p className="text-sm text-neutral-500"><a href={`/blog/topics/${topic.slug}`} className={`${focusStyles} underline underline-offset-4`}>Explore {topic.posts.length} articles</a></p>
      </section>)}
      <p className="text-sm"><a href="/blog" className={`${focusStyles} underline`}>All articles by date</a></p>
    </main>
    <Footer />
  </Container>;
}
