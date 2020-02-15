export const infiniteScroll = () => {
  /**
   * Progressive engancement: pagination works perfectly in browsers
   * that don't support IntersectionObserver (or even JavaScript)
   * but infinite scrolls in browsers that do.
   */
  if (
    "IntersectionObserver" in window &&
    "fetch" in window &&
    "requestAnimationFrame" in window
  ) {
    const nextPageLink = document.querySelector("a.pagination-item--next");
    const siblingArticle = document.querySelector(
      "main#content section article"
    );
    const appendIn = siblingArticle ? siblingArticle.parentNode : undefined;
    if (nextPageLink && appendIn) {
      let tried = false;
      const observer = new IntersectionObserver(function(entries) {
        if (tried) return;
        let intersecting = false;
        entries.forEach(function(entry) {
          if (entry.isIntersecting) intersecting = true;
        });
        if (intersecting) tried = true;
        if (!intersecting) return;
        const span = nextPageLink.querySelector("span");
        if (span) span.innerHTML = "Loading more items...";
        window
          .fetch(nextPageLink.getAttribute("href"))
          .then(function(result) {
            return result.text();
          })
          .then(function(html) {
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(html, "text/html");
            const results = htmlDoc.querySelectorAll(
              "main#content section article"
            );
            for (let i = 0; i < results.length; i++)
              appendIn.appendChild(results[i]);
            const newPagination = htmlDoc.querySelector(
              "main#content nav.pagination"
            );
            const currentPagination = document.querySelector(
              "main#content nav.pagination"
            );
            if (currentPagination && newPagination) {
              const previousLinkNewPagination = htmlDoc.querySelector(
                "a.pagination-item--prev"
              );
              if (previousLinkNewPagination)
                previousLinkNewPagination.parentNode.removeChild(
                  previousLinkNewPagination
                );
              currentPagination.innerHTML = newPagination.innerHTML;
              currentPagination.className = newPagination.className;
              if (
                !newPagination.querySelectorAll("a.pagination-item--next")
                  .length
              )
                currentPagination.parentNode.removeChild(currentPagination);
            }
            window.requestAnimationFrame(infiniteScroll);
          })
          .catch(function() {
            if (span) span.innerHTML = "Next";
          });
      });
      observer.observe(nextPageLink);
    }
  }
};
