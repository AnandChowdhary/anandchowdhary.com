import { createSearch, type SearchDocument } from '@/lib/search';

const root = document.querySelector<HTMLElement>('#site-search');
if (root) {
  const form = root.querySelector('form')!;
  const input = root.querySelector<HTMLInputElement>('#search-query')!;
  const section = root.querySelector<HTMLSelectElement>('#search-section')!;
  const results = root.querySelector<HTMLOListElement>('#search-results')!;
  const status = root.querySelector<HTMLElement>('#search-status')!;
  const browse = root.querySelector<HTMLElement>('#search-browse')!;
  let engine: Promise<ReturnType<typeof createSearch>> | undefined;
  let revision = 0;
  let timer: ReturnType<typeof setTimeout>;
  const params = new URLSearchParams(location.search);
  input.value = (params.get('q') || '').slice(0, 200);
  section.value = ['blog','projects'].includes(params.get('section') || '') ? params.get('section')! : 'all';

  function load() {
    return engine ??= (async () => {
      const response = await fetch(root!.dataset.index!);
      if (!response.ok) throw Error('Search unavailable');
      const index = await response.json() as { version: number; documents: SearchDocument[] };
      if (index.version !== 1 || !Array.isArray(index.documents) || !index.documents.every(doc =>
        typeof doc.title === 'string' && typeof doc.description === 'string' && typeof doc.text === 'string' &&
        ['blog','projects'].includes(doc.section) && typeof doc.url === 'string' && /^\/(?!\/)/.test(doc.url) && !doc.url.includes('\\'))) throw Error('Invalid search index');
      return createSearch(index.documents);
    })().catch(error => { engine = undefined; throw error; });
  }

  async function update() {
    const current = ++revision;
    const query = input.value.trim();
    const url = new URL(location.href);
    if (query) url.searchParams.set('q', query); else url.searchParams.delete('q');
    if (section.value !== 'all') url.searchParams.set('section', section.value); else url.searchParams.delete('section');
    history.replaceState(null, '', url);
    results.replaceChildren();
    browse.hidden = Boolean(query);
    if (!query) { status.textContent = 'Enter a few words to search.'; results.removeAttribute('aria-busy'); return; }
    status.textContent = 'Searching…';
    results.setAttribute('aria-busy', 'true');
    try {
      const search = await load();
      if (current !== revision) return;
      const matches = search(query, section.value);
      const shown = matches.slice(0, 30);
      for (const doc of shown) {
        const item = document.createElement('li');
        const heading = document.createElement('h2');
        const link = document.createElement('a');
        link.href = doc.url;
        link.className = 'text-lg font-medium underline underline-offset-4 hover:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-4';
        link.textContent = doc.title;
        heading.append(link);
        const label = document.createElement('p');
        label.className = 'text-xs text-neutral-500 mt-1';
        label.textContent = doc.section === 'blog' ? 'Article' : 'Project';
        const excerpt = document.createElement('p');
        excerpt.className = 'text-sm text-neutral-500 mt-2';
        excerpt.textContent = doc.description.length > 240 ? doc.description.slice(0, 240) + '…' : doc.description;
        item.append(heading, label, excerpt);
        results.append(item);
      }
      status.textContent = matches.length ? `${matches.length} result${matches.length === 1 ? '' : 's'}${matches.length > 30 ? '; showing the first 30. Add words to narrow your search.' : '.'}` : 'No results. Try fewer words or a different category.';
    } catch {
      if (current !== revision) return;
      status.textContent = 'Search could not load. Press Search to retry, or browse the links below.';
      browse.hidden = false;
    } finally { if (current === revision) results.removeAttribute('aria-busy'); }
  }
  form.addEventListener('submit', event => { event.preventDefault(); clearTimeout(timer); void update(); });
  input.addEventListener('input', () => { ++revision; clearTimeout(timer); timer = setTimeout(() => void update(), 150); });
  section.addEventListener('change', () => { clearTimeout(timer); void update(); });
  input.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown') { const first = results.querySelector('a'); if (first) { event.preventDefault(); first.focus(); } }
    if (event.key === 'Escape') { input.value = ''; clearTimeout(timer); void update(); }
  });
  if (input.value) void update();
}
