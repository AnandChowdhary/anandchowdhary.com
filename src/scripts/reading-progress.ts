const progress = document.querySelector<HTMLProgressElement>('#article-reading-progress');
const body = document.querySelector<HTMLElement>('[data-article-body]');
if (progress && body) {
  progress.hidden = false;
  let frame = 0;
  const update = () => {
    frame = 0;
    const rectangle = body.getBoundingClientRect();
    const distance = rectangle.height - window.innerHeight;
    const percent = distance > 0 ? -rectangle.top / distance * 100 : rectangle.bottom <= innerHeight ? 100 : 0;
    progress.value = Math.max(0, Math.min(100, Math.round(percent)));
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  new ResizeObserver(schedule).observe(body);
  schedule();
}
