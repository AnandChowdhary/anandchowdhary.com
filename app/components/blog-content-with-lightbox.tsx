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
        transition: opacity 200ms ease-in-out;
      `;

      const img = document.createElement("img");
      img.style.cssText = `
        max-width: 90vw;
        max-height: 90vh;
        object-fit: contain;
        transform: scale(0.975);
        transition: transform 200ms ease-in-out;
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
        overlay.style.opacity = "0";
        img.style.transform = "scale(0.975)";
        setTimeout(() => {
          overlay.style.display = "none";
          document.body.style.overflow = "";
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

    const handleImageClick = (imageSrc: string, imageAlt: string) => {
      lightboxImg.src = imageSrc;
      lightboxImg.alt = imageAlt;
      overlay.style.display = "flex";
      document.body.style.overflow = "hidden";

      setTimeout(() => {
        overlay.style.opacity = "1";
        lightboxImg.style.transform = "scale(1)";
      }, 10);
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
        handleImageClick(img.src, img.alt);
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
