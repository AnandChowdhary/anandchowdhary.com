export interface SearchDocument {
  url: string;
  title: string;
  section: 'blog' | 'projects';
  description: string;
  text: string;
}

export function searchTerms(value: string): string[] {
  return [...new Set(value.normalize('NFKD').replace(/\p{M}/gu, '').toLocaleLowerCase('en-US').match(/[\p{L}\p{N}]+/gu) || [])];
}
const normalize = (value: string) => searchTerms(value).join(' ');

/** Build normalized strings once, only on the search page. Every query term must match. */
export function createSearch(documents: SearchDocument[]) {
  const entries = documents.map(document => ({
    document, title: normalize(document.title), description: normalize(document.description), body: normalize(document.text),
  }));
  return (query: string, section = 'all') => {
    const terms = searchTerms(query.slice(0, 200));
    if (!terms.length) return [];
    return entries.flatMap(entry => {
      if (section !== 'all' && section !== entry.document.section) return [];
      let score = 0;
      for (const term of terms) {
        if (entry.title.includes(term)) score += 10;
        else if (entry.description.includes(term)) score += 3;
        else if (entry.body.includes(term)) score += 1;
        else return [];
      }
      if (entry.title.includes(terms.join(' '))) score += 20;
      return [{ document: entry.document, score }];
    }).sort((a, b) => b.score - a.score || a.document.url.localeCompare(b.document.url)).map(result => result.document);
  };
}
