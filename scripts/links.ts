import { render } from "timeago.js";
import mediumZoom from "medium-zoom";
import { updateStorage, updateText } from "./events";

export const setupToggle = () => {
  const toggleButton = document.querySelector<HTMLButtonElement>(
    ".theme-toggle"
  );
  if (toggleButton) {
    toggleButton.addEventListener("click", function () {
      document.documentElement.classList.toggle("dark");
      updateStorage();
      updateText(toggleButton);
    });
    updateText(toggleButton);
  }
};

export const setupLinks = () => {
  const isExternal = (url: string) => {
    const match = url.match(
      /^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/
    );
    if (2 > match.length) return false;
    if (
      typeof match[1] === "string" &&
      match[1].length > 0 &&
      match[1].toLowerCase() !== location.protocol
    )
      return true;
    if (
      typeof match[2] === "string" &&
      match[2].length > 0 &&
      match[2].replace(
        new RegExp(
          ":(" +
            ({ "http:": 80, "https:": 443 } as { [index: string]: number })[
              location.protocol
            ] +
            ")?$"
        ),
        ""
      ) !== location.host
    )
      return true;
    return false;
  };

  const allLinks = document.querySelectorAll("a");
  const utmParams =
    "utm_source=anandchowdhary.com&utm_medium=website&utm_campaign=" +
    encodeURIComponent(document.body.className);
  for (let i = 0; allLinks.length > i; i++) {
    const link = allLinks[i];
    const linkHref = link.getAttribute("href");
    if (isExternal(linkHref)) {
      if (
        linkHref.indexOf("utm_source") === -1 &&
        linkHref.indexOf("archive.org") === -1
      ) {
        if (linkHref.indexOf("?") > -1) {
          link.setAttribute("href", linkHref + "&" + utmParams);
        } else {
          link.setAttribute("href", linkHref + "?" + utmParams);
        }
      }
      link.classList.add("external-link");
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
      link.innerHTML =
        link.innerHTML + "<span class='sr-only'> (opens in new window)</span>";
    }
  }

  // Contact page
  const inputs = document.querySelectorAll<HTMLInputElement>(
    "input[name='category']"
  );
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("change", () => {
      let value = "categoryOther";
      for (let j = 0; j < inputs.length; j++)
        if (inputs[j].checked) value = inputs[j].getAttribute("id");
      const responses = document.querySelectorAll(".response");
      for (let i = 0; i < responses.length; i++)
        responses[i].setAttribute("hidden", "hidden");
      document
        .querySelector(".response.response-" + value)
        .removeAttribute("hidden");
    });
  }

  // Life page
  const age = document.querySelector(".age");
  const birthday = new Date(1997, 11, 29).getTime();
  function updateAge() {
    const now = new Date().getTime();
    if (age) age.innerHTML = ((now - birthday) / 31556952000).toFixed(10);
  }
  if (age) {
    setInterval(() => {
      if (age) updateAge();
    }, 50);
    updateAge();
  }

  // Time ago
  const timers = document.querySelectorAll(".time-ago");
  if (timers.length) render(timers);

  // Zoomable images
  const zoomImages = document.querySelectorAll(
    ".two-images img, .three-images img, .image img:not(.real-image)"
  );
  if (zoomImages.length) mediumZoom(zoomImages);
};
