"use client";

import { useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import { Suspense } from "react";

export function Container({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <ContainerContent isScreenshotMode={false}>{children}</ContainerContent>
      }
    >
      <ContainerContentWithParams>{children}</ContainerContentWithParams>
    </Suspense>
  );
}

function ContainerContentWithParams({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const isScreenshotMode = searchParams.get("screenshot") === "true";
  return (
    <ContainerContent isScreenshotMode={isScreenshotMode}>
      {children}
    </ContainerContent>
  );
}

function ContainerContent({
  children,
  isScreenshotMode,
}: {
  children: ReactNode;
  isScreenshotMode: boolean;
}) {
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
