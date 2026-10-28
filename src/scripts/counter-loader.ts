// Fetch the counter runtime only as its server-rendered content approaches view.
// Keeping the import inside the observer also keeps React off the initial path.
let runtime: Promise<typeof import('./counters')> | undefined;
const observer = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    observer.unobserve(entry.target);
    runtime ??= import('./counters');
    void runtime.then(({ hydrate }) => hydrate(entry.target as HTMLElement));
  }
}, { rootMargin: '200px' });
document.querySelectorAll<HTMLElement>('[data-counter]').forEach(element => observer.observe(element));
