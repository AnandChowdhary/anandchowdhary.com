export const setupImages = () => {
  const images = document.querySelectorAll("img");
  for (let i = 0; i < images.length; i++) {
    // If weserv is down, use regular url
    images[i].addEventListener("error", () => {
      const originalUrl = images[i].getAttribute("data-url");
      if (originalUrl) images[i].setAttribute("src", originalUrl);
    });
  }
};

export const checkWebP = (callback: (result: boolean) => any) => {
  const image = new Image();
  image.addEventListener("load", () => {
    if (image.width > 0 && image.height > 0) return callback(true);
    return callback(false);
  });
  image.addEventListener("error", () => callback(false));
  image.src =
    "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA";
};

export const removeWebP = () => {
  const images = document.querySelectorAll("img");
  for (let i = 0; i < images.length; i++) {
    const currentSource = images[i].getAttribute("src");
    if (currentSource.includes("&output=webp"))
      images[i].setAttribute("src", currentSource.replace("&output=webp", ""));
  }
  const backgrounds = document.querySelectorAll<HTMLDivElement>(
    `[style*='background']`
  );
  for (let i = 0; i < backgrounds.length; i++) {
    const currentStyle = backgrounds[i].getAttribute("style");
    if (currentStyle.includes("&output=webp"))
      backgrounds[i].setAttribute(
        "style",
        currentStyle.replace("&output=webp", "")
      );
  }
};

(window as any).removeWebP = removeWebP;
