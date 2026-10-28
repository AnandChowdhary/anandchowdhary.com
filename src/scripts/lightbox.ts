const content = document.querySelector<HTMLElement>('[data-lightbox-content]');
if (content) {
  const dialog = document.createElement('dialog');
  dialog.id = 'image-lightbox';
  dialog.setAttribute('aria-label', 'Image preview');
  dialog.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;max-width:none;max-height:none;margin:0;padding:0;border:0;background:rgba(200,200,200,.8);align-items:center;justify-content:center;z-index:9999;cursor:pointer;opacity:0;transition:opacity 300ms ease-in-out';
  const image = document.createElement('img');
  image.style.cssText = 'max-width:90vw;max-height:90vh;object-fit:contain;transition:transform 300ms cubic-bezier(.4,0,.2,1);border-radius:10px;border:1px solid #ccc';
  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.textContent = '×';
  closeButton.setAttribute('aria-label', 'Close image preview');
  closeButton.style.cssText = 'position:absolute;top:20px;right:20px;background:none;border:none;color:white;font-size:24px;cursor:pointer;padding:0;width:48px;height:48px;line-height:1;z-index:10000';
  dialog.append(image, closeButton);
  document.body.append(dialog);
  let source: HTMLImageElement | null = null;
  let previousOverflow = '';
  let closing = false;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const transformToSource = () => {
    if (!source) return '';
    const rect = source.getBoundingClientRect();
    const target = image.getBoundingClientRect();
    return `translate(${rect.left + rect.width / 2 - (target.left + target.width / 2)}px, ${rect.top + rect.height / 2 - (target.top + target.height / 2)}px) scale(${Math.min(rect.width / target.width, rect.height / target.height)})`;
  };
  const close = () => {
    if (!dialog.open || closing) return;
    closing = true;
    image.style.transform = reducedMotion.matches ? '' : transformToSource();
    dialog.style.opacity = '0';
    setTimeout(() => {
      dialog.close();
      dialog.style.display = 'none';
      document.body.style.overflow = previousOverflow;
      source?.focus({ preventScroll: true });
      closing = false;
    }, reducedMotion.matches ? 0 : 300);
  };
  const open = (img: HTMLImageElement) => {
    if (dialog.open) return;
    source = img;
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    image.alt = img.alt;
    image.style.transform = '';
    const reveal = () => {
      image.style.transition = 'none';
      image.style.transform = reducedMotion.matches ? '' : transformToSource();
      requestAnimationFrame(() => requestAnimationFrame(() => {
        image.style.transition = reducedMotion.matches ? 'none' : 'transform 300ms cubic-bezier(.4,0,.2,1)';
        image.style.transform = '';
        dialog.style.opacity = '1';
      }));
    };
    image.onload = reveal;
    image.onerror = close;
    image.src = img.dataset.originalSrc || img.currentSrc || img.src;
    dialog.showModal();
    dialog.style.display = 'flex';
    closeButton.focus();
    if (image.complete && image.naturalWidth) reveal();
  };
  closeButton.addEventListener('click', close);
  dialog.addEventListener('click', event => { if (event.target === dialog) close(); });
  dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'Tab') { event.preventDefault(); closeButton.focus(); }
  });
  const enhance = () => {
    content.querySelectorAll<HTMLImageElement>('img').forEach(img => {
      if (img.offsetWidth === img.parentElement?.offsetWidth || img.dataset.lightboxReady) return;
      img.dataset.lightboxReady = 'true';
      img.style.cursor = 'pointer';
      img.style.transition = 'transform 200ms ease-in-out';
      // Empty alt implies presentation. Once an image becomes a control, use
      // its authored heading/caption as its accessible name instead.
      if (!img.alt.trim()) {
        const caption = img.closest('h1,h2,h3,h4,h5,h6')?.textContent
          || img.closest('figure')?.querySelector('figcaption')?.textContent;
        img.alt = caption?.replace(/\s+/g, ' ').trim() || 'Article image';
      }
      img.tabIndex = 0;
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', img.alt ? `Enlarge image: ${img.alt}` : 'Enlarge image');
      img.addEventListener('click', event => { event.preventDefault(); open(img); });
      img.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(img); }
      });
    });
  };
  if (document.readyState === 'complete') enhance();
  else window.addEventListener('load', enhance, { once: true });
}
