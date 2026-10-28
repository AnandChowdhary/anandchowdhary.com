import type { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return <div className="site-container font-sans min-h-screen pb-20 gap-16 sm:p-20 p-8 space-y-32">{children}</div>;
}
