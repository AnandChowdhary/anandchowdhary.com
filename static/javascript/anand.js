function infiniteScroll() {
  /**
   * Progressive engancement: pagination works perfectly in browsers
   * that don't support IntersectionObserver (or even JavaScript)
   * but infinite scrolls in browsers that do.
   */
  if ("IntersectionObserver" in window && "fetch" in window && "requestAnimationFrame" in window) {
    var nextPageLink = document.querySelector("a.pagination-item--next");
    var siblingArticle = document.querySelector("main#content section article");
    var appendIn = siblingArticle ? siblingArticle.parentNode : undefined;
    if (nextPageLink && appendIn) {
      let tried = false;
      var observer = new IntersectionObserver(function (entries) {
        if (tried) return;
        let intersecting = false;
        entries.forEach(function(entry) {
          if (entry.isIntersecting) intersecting = true;
        })
        if (intersecting) tried = true;
        if (!intersecting) return;
        var span = nextPageLink.querySelector("span");
        if (span) span.innerHTML = "Loading more items...";
        window.fetch(nextPageLink.getAttribute("href"))
          .then(function(result) {
            return result.text();
          })
          .then(function(html) {
            var parser = new DOMParser();
            var htmlDoc = parser.parseFromString(html, "text/html");
            var results = htmlDoc.querySelectorAll("main#content section article");
            for (var i = 0; i < results.length; i++)
              appendIn.appendChild(results[i]);
            var newPagination = htmlDoc.querySelector("main#content nav.pagination");
            var currentPagination = document.querySelector("main#content nav.pagination");
            if (currentPagination && newPagination) {
              var previousLinkNewPagination = htmlDoc.querySelector("a.pagination-item--prev");
              if (previousLinkNewPagination)
                previousLinkNewPagination.parentNode.removeChild(previousLinkNewPagination);
              currentPagination.innerHTML = newPagination.innerHTML;
              currentPagination.className = newPagination.className;
              if (!newPagination.querySelectorAll("a.pagination-item--next").length)
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
}
infiniteScroll();

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

function ready() {
  var horizontalScollers = document.querySelectorAll(".horizontal-scroller");
  for (var i = 0; i < horizontalScollers.length; i++) {
    var scrollable = horizontalScollers[i];
    var scroller = horizontalScollers[i].querySelector("*");
    if (!scroller) break;
    var id = `page_${i}`;
    var nextPrev = `
      <div class="scroll-buttons">
        <button data-prev="${id}">
          <span class="sr-only">Scroll left</span>
        </button>
        <button data-next="${id}">
          <span class="sr-only">Scroll right</span>
        </button>
      </div>
    `;
    var scrollBy = scroller.getBoundingClientRect().width;
    var nextPrevContainer = document.createElement("div");
    nextPrevContainer.innerHTML = nextPrev;
    scrollable.appendChild(nextPrevContainer);
    var next = document.querySelector(`[data-next="${id}"]`);
    var prev = document.querySelector(`[data-prev="${id}"]`);
    function updateScroller() {
      if (next) {
        if ((scroller.scrollLeft + scrollBy) >= scroller.scrollWidth) {
          next.setAttribute("hidden", "hidden");
        } else {
          next.removeAttribute("hidden");
        }
      }
      if (prev) {
        if (scroller.scrollLeft === 0) {
          prev.setAttribute("hidden", "hidden");
        } else {
          prev.removeAttribute("hidden");
        }
      }
    }
    updateScroller();
    scroller.addEventListener("scroll", debounce(function() {
      updateScroller();
    }, 250));
    if (next) {
      next.addEventListener("click", function() {
        var left = scroller.scrollLeft + scrollBy;
        scroller.scrollTo({
          top: 0,
          left,
          behavior: "smooth"
        });
      });
    }
    if (prev) {
      prev.addEventListener("click", function() {
        var left = scroller.scrollLeft - scrollBy;
        scroller.scrollTo({
          top: 0,
          left,
          behavior: "smooth"
        });
      });
    }
  }
}
ready();
