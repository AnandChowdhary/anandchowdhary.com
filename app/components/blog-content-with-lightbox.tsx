"use client";

import { useEffect, useRef } from "react";

interface BlogContentWithLightboxProps {
  html: string;
  className?: string;
}

export function BlogContentWithLightbox({
  html,
  className,
}: BlogContentWithLightboxProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const images = contentRef.current.querySelectorAll("img");
    if (images.length === 0) return;

    // Store reference to the source image for animation
    let sourceImageRect: DOMRect | null = null;
    let sourceImageElement: HTMLImageElement | null = null;

    const createLightbox = () => {
      const overlay = document.createElement("div");
      overlay.id = "image-lightbox";
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(200, 200, 200, 0.8);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        cursor: pointer;
        opacity: 0;
        transition: opacity 300ms ease-in-out;
      `;

      const img = document.createElement("img");
      img.style.cssText = `
        max-width: 90vw;
        max-height: 90vh;
        object-fit: contain;
        transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
        border-radius: 10px;
        border: 1px solid #ccc;
      `;

      const closeButton = document.createElement("button");
      closeButton.innerHTML = "×";
      closeButton.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        width: 48px;
        height: 48px;
        line-height: 1;
        z-index: 10000;
      `;

      overlay.appendChild(img);
      overlay.appendChild(closeButton);
      document.body.appendChild(overlay);

      const closeLightbox = () => {
        // Animate back to source position if available
        if (sourceImageRect && sourceImageElement) {
          const rect = sourceImageRect;
          const currentRect = sourceImageElement.getBoundingClientRect();
          const lightboxRect = img.getBoundingClientRect();

          // Calculate the translation needed to move from center to source position
          const translateX =
            currentRect.left +
            currentRect.width / 2 -
            (lightboxRect.left + lightboxRect.width / 2);
          const translateY =
            currentRect.top +
            currentRect.height / 2 -
            (lightboxRect.top + lightboxRect.height / 2);

          // Calculate scale to match source image size
          const scaleX = currentRect.width / lightboxRect.width;
          const scaleY = currentRect.height / lightboxRect.height;
          const scale = Math.min(scaleX, scaleY);

          img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
        }

        overlay.style.opacity = "0";

        setTimeout(() => {
          overlay.style.display = "none";
          document.body.style.overflow = "";
          img.style.transform = "";
          sourceImageRect = null;
          sourceImageElement = null;
        }, 300);
      };

      overlay.addEventListener("click", (e) => {
        if (e.target === overlay || e.target === closeButton) closeLightbox();
      });

      closeButton.addEventListener("click", closeLightbox);

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && overlay.style.display === "flex")
          closeLightbox();
      });

      return { overlay, img };
    };

    const { overlay, img: lightboxImg } = createLightbox();

    const handleImageClick = (
      sourceImg: HTMLImageElement,
      imageSrc: string,
      imageAlt: string
    ) => {
      // Store source image reference and position
      sourceImageElement = sourceImg;
      const rect = sourceImg.getBoundingClientRect();
      sourceImageRect = rect;

      lightboxImg.src = imageSrc;
      lightboxImg.alt = imageAlt;
      overlay.style.display = "flex";
      document.body.style.overflow = "hidden";

      // Wait for image to load and get its natural dimensions
      lightboxImg.onload = () => {
        // Calculate the final size of the lightbox image
        const maxWidth = window.innerWidth * 0.9;
        const maxHeight = window.innerHeight * 0.9;

        let finalWidth = lightboxImg.naturalWidth;
        let finalHeight = lightboxImg.naturalHeight;

        // Scale down if necessary
        if (finalWidth > maxWidth || finalHeight > maxHeight) {
          const widthRatio = maxWidth / finalWidth;
          const heightRatio = maxHeight / finalHeight;
          const ratio = Math.min(widthRatio, heightRatio);
          finalWidth *= ratio;
          finalHeight *= ratio;
        }

        // Calculate center position of the lightbox image
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // Calculate translation needed to position at source
        const translateX = rect.left + rect.width / 2 - centerX;
        const translateY = rect.top + rect.height / 2 - centerY;

        // Calculate scale to match source image size
        const scaleX = rect.width / finalWidth;
        const scaleY = rect.height / finalHeight;
        const scale = Math.min(scaleX, scaleY);

        // Set initial position (at source)
        lightboxImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;

        // Trigger animation to center
        requestAnimationFrame(() => {
          overlay.style.opacity = "1";
          requestAnimationFrame(() => {
            lightboxImg.style.transform = "translate(0, 0) scale(1)";
          });
        });
      };
    };

    images.forEach((img) => {
      const computedStyle = window.getComputedStyle(img);
      const isFullWidth =
        computedStyle.width === "100%" ||
        img.offsetWidth === img.parentElement?.offsetWidth;

      if (isFullWidth) return;

      img.style.cursor = "pointer";
      img.style.transition = "transform 200ms ease-in-out";

      img.addEventListener("click", (e) => {
        e.preventDefault();
        handleImageClick(img, img.src, img.alt);
      });
    });

    return () => {
      const existingOverlay = document.getElementById("image-lightbox");
      if (existingOverlay) existingOverlay.remove();
    };
  }, [html]);

  return (
    <div
      ref={contentRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
