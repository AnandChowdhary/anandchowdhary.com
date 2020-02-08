import { debounce } from "debounce";

export const addScrollers = () => {
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
        if (scroller.scrollLeft + scrollBy >= scroller.scrollWidth) {
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
    scroller.addEventListener(
      "scroll",
      debounce(function() {
        updateScroller();
      }, 250)
    );
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
};
