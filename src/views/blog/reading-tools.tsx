import type { ArticleHeading } from '@/lib/article-reading';
import { focusStyles } from '@/views/components/external-link';
export function ReadingTools({ headings }: { headings: ArticleHeading[] }) {
  if (!headings.length) return null;
  return <>
    <progress id="article-reading-progress" hidden value={0} max={100} aria-label="Article reading progress" className="reading-progress" />
    <nav aria-label="On this page" data-search-exclude className="text-sm text-neutral-500">
      <details className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
        <summary className={`${focusStyles} cursor-pointer font-medium`}>On this page</summary>
        <ol className="mt-4 space-y-2">{headings.map(heading => <li key={heading.id} className={heading.depth === 3 ? 'ml-4' : ''}>
          <a href={`#${heading.id}`} className={`${focusStyles} underline underline-offset-4 hover:text-neutral-600`}>{heading.label}</a>
        </li>)}</ol>
      </details>
    </nav>
  </>;
}
