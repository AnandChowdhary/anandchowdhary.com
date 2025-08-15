import { ReactNode } from "react";

interface TimelineItemProps {
  icon: string;
  title: ReactNode;
  subtitle: string;
}

export function TimelineItem({ icon, title, subtitle }: TimelineItemProps) {
  const content = (
    <>
      <div className="grow space-y-1">
        <div>{title}</div>
        <div className="text-neutral-500">{subtitle}</div>
      </div>
    </>
  );

  return (
    <li className="flex relative group">
      <div className="w-5 -ml-7 mr-2 flex justify-end shrink-0">{icon}</div>
      {content}
    </li>
  );
}
