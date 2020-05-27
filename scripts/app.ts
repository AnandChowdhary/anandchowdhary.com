import { inIframe } from "./frame";
import { ready } from "./events";
import { setupLinks, setupToggle } from "./links";
import { addScrollers } from "./scroller";
import { setupImages, checkWebP, removeWebP } from "./images";
import { infiniteScroll } from "./pagination";

const runOnPageChangeAndLoad = () => {
  setupToggle();
  setupLinks();
  setupImages();
  addScrollers();
  infiniteScroll();
  checkWebP((supports) => {
    if (!supports) removeWebP();
  });
};

const runOnFirstLoad = () => {
  if (inIframe()) document.body.classList.add("iframed");
};

ready(() => {
  runOnFirstLoad();
  runOnPageChangeAndLoad();
});
