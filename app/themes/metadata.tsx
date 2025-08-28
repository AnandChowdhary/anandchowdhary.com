import { Theme } from "@/app/api";
import { ExternalLink } from "@/app/components/external-link";
import {
  IconBook2,
  IconBrandGithub,
  IconCalendarEvent,
} from "@tabler/icons-react";

export function ThemesMetadata({
  item,
  className,
  children,
  themeContentText,
}: {
  item: Theme;
  className?: string;
  children?: React.ReactNode;
  themeContentText: string;
}) {
  const githubUrl = `https://github.com/AnandChowdhary/themes/blob/main/themes/${new Date(
    item.date
  ).getUTCFullYear()}/${item.slug}`;

  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-3 gap-1.5 md:gap-2.5 pt-2.5 ${className}`}
    >
      <div className="text-sm text-neutral-500 flex items-center gap-1.5">
        <IconCalendarEvent className="shrink-0" size={16} strokeWidth={1.5} />
        <div className="grow truncate">
          {new Date(item.date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
      </div>
      <div className="text-sm text-neutral-500 flex items-center gap-1.5">
        <IconBook2 className="shrink-0" size={16} strokeWidth={1.5} />
        <div className="grow truncate">
          {themeContentText.split(/\s+/).length.toLocaleString("en-US")} words
        </div>
      </div>
      <div className="text-sm text-neutral-500 flex items-center gap-1.5">
        <IconBrandGithub className="shrink-0" size={16} strokeWidth={1.5} />
        <ExternalLink href={githubUrl} className="grow truncate">
          View on GitHub
        </ExternalLink>
      </div>
      {children}
    </div>
  );
}
