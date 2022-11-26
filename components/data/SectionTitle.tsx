import type { ComponentChildren } from "preact";

interface SectionTitleProps {
  title: string;
  description: string;
  children?: ComponentChildren;
}

export function SectionTitle({
  title,
  description,
  children,
}: SectionTitleProps) {
  return (
    <header class="space-y-2">
      <h1 class="text-4xl font-semibold font-display">{title}</h1>
      <p class="text-xl leading-relaxed">{description}</p>
      {children}
    </header>
  );
}
