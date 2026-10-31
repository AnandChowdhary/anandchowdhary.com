import { Header } from '@/views/components/header';
import { Footer } from '@/views/components/footer';
import { focusStyles } from '@/views/components/external-link';
import { getAllBlogPosts, getAllProjects } from '@/views/api';

export const metadata = {
  title: 'Search / Anand Chowdhary',
  description: 'Search articles and projects by Anand Chowdhary.',
  robots: 'noindex, follow',
};

export default async function SearchPage() {
  const [posts, projects] = await Promise.all([getAllBlogPosts(), getAllProjects()]);
  return <div className="site-container font-sans min-h-screen pb-20 gap-16 sm:p-20 p-8 space-y-32">
    <Header pathname="/search" description="Search articles and projects, or browse something recent." />
    <main className="max-w-2xl mx-auto space-y-8" id="site-search" data-index="/search-index.json">
      <h1 className="text-2xl font-medium">Search</h1>
      <form role="search" className="space-y-4" action="/search">
        <label htmlFor="search-query" className="block text-sm font-medium">Search articles and projects</label>
        <div className="flex gap-2">
          <input id="search-query" type="search" name="q" maxLength={200} autoComplete="off" placeholder="Try AI, design, or open source" className={`${focusStyles} min-w-0 grow rounded-lg border border-neutral-300 dark:border-neutral-700 p-3`} aria-controls="search-results" />
          <button type="submit" className={`${focusStyles} rounded-lg border border-neutral-300 dark:border-neutral-700 px-4`}>Search</button>
        </div>
        <label className="flex items-center gap-3 text-sm" htmlFor="search-section">Show
          <select id="search-section" name="section" className={`${focusStyles} rounded border border-neutral-300 dark:border-neutral-700 bg-transparent p-2`}>
            <option value="all">Everything</option><option value="blog">Articles</option><option value="projects">Projects</option>
          </select>
        </label>
      </form>
      <p id="search-status" role="status" aria-live="polite" className="text-sm text-neutral-500">Enter a few words to search.</p>
      <noscript><p>Enable JavaScript to search, or browse the <a href="/archive" className="underline">archive</a>, <a href="/blog" className="underline">blog</a>, and <a href="/projects" className="underline">projects</a>.</p></noscript>
      <ol id="search-results" className="space-y-6" />
      <div id="search-browse" className="space-y-8">
        {[['Recent articles', 'blog', posts], ['Recent projects', 'projects', projects]].map(([label, section, items]) => <section key={String(section)} className="space-y-4">
          <h2 className="text-lg font-medium">{String(label)}</h2>
          <ul className="space-y-3">{(items as typeof posts).slice(0, 6).map(item => <li key={item.slug}><a className={`${focusStyles} hover:text-neutral-500 underline underline-offset-4`} href={`/${section}/${new Date(item.date).getUTCFullYear()}/${item.slug.replace(/\.md$/, '')}`}>{item.title}</a></li>)}</ul>
          <a href={`/${section}`} className={`${focusStyles} text-sm underline`}>Browse all {section === 'blog' ? 'articles' : 'projects'}</a>
        </section>)}
      </div>
    </main>
    <Footer />
  </div>;
}
