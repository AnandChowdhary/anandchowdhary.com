import { updateStorage, updateText } from "./events";

export const setupToggle = () => {
  const toggleButton = document.querySelector<HTMLButtonElement>(
    ".theme-toggle"
  );
  if (toggleButton) {
    toggleButton.addEventListener("click", function() {
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
};
