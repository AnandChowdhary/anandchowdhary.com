import Link from "next/link";
import { ReactNode } from "react";

interface TimelineItemProps {
  icon: string;
  title: ReactNode;
  subtitle: string;
  href?: string;
  hoverLabel?: string;
  focusStyles?: string;
}

export function TimelineItem({
  icon,
  title,
  subtitle,
  href,
  hoverLabel,
  focusStyles,
}: TimelineItemProps) {
  const content = (
    <>
      <div className="grow space-y-1">
        {href ? (
          <Link href={href} className={focusStyles}>
            {title}
          </Link>
        ) : (
          <div>{title}</div>
        )}
        <div className="text-neutral-500">{subtitle}</div>
      </div>
    </>
  );

  return (
    <li className="flex relative group">
      {hoverLabel && href && (
        <div className="absolute -z-10 -top-1 -bottom-5 right-0 -left-7 bg-neutral-100 dark:bg-neutral-800 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity flex items-end pl-7 pb-1.5 text-xs font-medium text-blue-500 dark:text-blue-400">
          {hoverLabel} ▸
        </div>
      )}
      <div className="w-5 -ml-7 mr-2 flex justify-end shrink-0">{icon}</div>
      {content}
    </li>
  );
}
