import { inIframe } from "./frame";
import { ready } from "./events";
import { setupLinks, setupToggle } from "./links";
import { addScrollers } from "./scroller";
import { infiniteScroll } from "./pagination";

const runOnPageChangeAndLoad = () => {
  setupToggle();
  setupLinks();
  addScrollers();
  infiniteScroll();
};

const runOnFirstLoad = () => {
  if (inIframe()) document.body.classList.add("iframed");
};

ready(() => {
  runOnFirstLoad();
  runOnPageChangeAndLoad();
});
