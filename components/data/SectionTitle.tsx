import type { ComponentChildren } from "preact";

interface SectionTitleProps {
  emoji?: string;
  title: string;
  description: string;
  children?: ComponentChildren;
}

export function SectionTitle({
  emoji,
  title,
  description,
  children,
}: SectionTitleProps) {
  return (
    <header class="space-y-2">
      <h1 class="text-4xl font-semibold font-display space-x-3">
        {emoji && <span aria-hidden="true">{emoji}</span>}
        <span>{title}</span>
      </h1>
      <p class="text-xl leading-relaxed">{description}</p>
      {children}
    </header>
  );
}
