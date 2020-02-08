import { inIframe } from "./frame";
import { ready } from "./events";
import { setupLinks, setupToggle } from "./links";

const runOnPageChangeAndLoad = () => {
  setupToggle();
  setupLinks();
};

const runOnFirstLoad = () => {
  if (inIframe()) document.body.classList.add("iframed");
};

ready(() => {
  runOnFirstLoad();
  runOnPageChangeAndLoad();
});
