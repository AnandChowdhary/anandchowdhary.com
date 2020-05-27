import { debounce } from "debounce";

export const addScrollers = () => {
  const horizontalScollers = document.querySelectorAll(".horizontal-scroller");
  for (let i = 0; i < horizontalScollers.length; i++) {
    const scrollable = horizontalScollers[i];
    const scroller = horizontalScollers[i].querySelector("*");
    if (!scroller) break;
    const id = `page_${i}`;
    const nextPrev = `
      <div class="scroll-buttons">
        <button data-prev="${id}">
          <span class="sr-only">Scroll left</span>
        </button>
        <button data-next="${id}">
          <span class="sr-only">Scroll right</span>
        </button>
      </div>
    `;
    const scrollBy = scroller.getBoundingClientRect().width;
    const nextPrevContainer = document.createElement("div");
    nextPrevContainer.innerHTML = nextPrev;
    scrollable.appendChild(nextPrevContainer);
    const next = document.querySelector(`[data-next="${id}"]`);
    const prev = document.querySelector(`[data-prev="${id}"]`);
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
      debounce(function () {
        updateScroller();
      }, 250)
    );
    if (next) {
      next.addEventListener("click", function () {
        const left = scroller.scrollLeft + scrollBy;
        scroller.scrollTo({
          top: 0,
          left,
          behavior: "smooth",
        });
      });
    }
    if (prev) {
      prev.addEventListener("click", function () {
        const left = scroller.scrollLeft - scrollBy;
        scroller.scrollTo({
          top: 0,
          left,
          behavior: "smooth",
        });
      });
    }
  }
};
