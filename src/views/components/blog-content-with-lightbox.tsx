export function BlogContentWithLightbox({ html, className }: { html: string; className?: string }) {
  return <div data-lightbox-content data-article-body className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
