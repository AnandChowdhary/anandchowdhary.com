export const ready = (readyFunction: any) => {
  if (document.readyState !== "loading") {
    readyFunction();
  } else if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", readyFunction);
  } else {
    (document as any).attachEvent("onreadystatechange", () => {
      if (document.readyState !== "loading") readyFunction();
    });
  }
};

export const updateStorage = () =>
  localStorage.setItem(
    "theme",
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );

export const updateText = (toggleButton: HTMLButtonElement) => {
  if (toggleButton) {
    toggleButton.setAttribute(
      "aria-label",
      document.documentElement.classList.contains("dark")
        ? "Change theme to light"
        : "Change theme to dark"
    );
    toggleButton.setAttribute(
      "title",
      document.documentElement.classList.contains("dark")
        ? "Change theme to light"
        : "Change theme to dark"
    );
  }
};
