import { type ReactNode } from "react";

interface TimelineItemProps {
  icon: string;
  title: ReactNode;
  subtitle: string;
  contentOnly?: boolean;
  counter?: string;
  counterValue?: number;
  counterTotal?: number;
}

export function TimelineItem({ icon, title, subtitle, contentOnly, counter, counterValue, counterTotal }: TimelineItemProps) {
  const content = (
    <>
      <div className="grow space-y-1 tabular-nums">
        <div>{title}</div>
        <div className="text-neutral-500">{subtitle}</div>
      </div>
    </>
  );

  const children = <><div className="w-5 -ml-7 mr-2 flex justify-end shrink-0">{icon}</div>{content}</>;
  if (contentOnly) return children;
  return <li className="flex relative group" data-counter={counter} data-counter-value={counterValue} data-counter-total={counterTotal}>{children}</li>;
}
