"use client";

import { useSearchParams } from "next/navigation";
import type { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const isScreenshotMode = searchParams.get("screenshot") === "true";
  return (
    <div
      className={`font-sans min-h-screen pb-20 gap-16 ${
        isScreenshotMode
          ? "p-8 space-y-12 [&>header]:[zoom:0.66]"
          : "sm:p-20 p-8 space-y-32"
      }`}
    >
      {children}
    </div>
  );
}
