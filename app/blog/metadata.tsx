import { BlogPost } from "@/app/api";
import { ExternalLink } from "@/app/components/external-link";
import {
  IconBook2,
  IconBrandGithub,
  IconCalendarEvent,
} from "@tabler/icons-react";

export function BlogMetadata({
  item,
  className,
  children,
  postContentText,
}: {
  item: BlogPost;
  className?: string;
  children?: React.ReactNode;
  postContentText: string;
}) {
  const githubUrl = `https://github.com/AnandChowdhary/blog/blob/main/blog/${new Date(
    item.date,
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
          {postContentText.split(/\s+/).length.toLocaleString("en-US")} words
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
