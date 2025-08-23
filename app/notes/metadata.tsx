import { Note } from "@/app/api";
import {
  ExternalLink,
  focusStyles,
  underlinedLink,
} from "@/app/components/external-link";
import {
  IconBook2,
  IconBrandGithub,
  IconBrandX,
  IconCalendar,
} from "@tabler/icons-react";
import Link from "next/link";

export function NoteMetadata({
  item,
  className,
  children,
  noteContentText,
  link,
}: {
  item: Note;
  className?: string;
  children?: React.ReactNode;
  noteContentText: string;
  link: boolean;
}) {
  const githubUrl = `https://github.com/AnandChowdhary/notes/blob/main/threads/${new Date(
    item.date
  ).getUTCFullYear()}/${item.slug}.md`;

  return (
    <div className={`grid grid-cols-3 gap-2.5 pt-2.5 ${className}`}>
      <div className="text-sm text-neutral-500 flex items-center gap-1.5">
        <IconCalendar className="shrink-0" size={16} strokeWidth={1.5} />
        {link ? (
          <Link
            href={`/notes/${new Date(
              item.date
            ).getUTCFullYear()}/${item.slug.replace(".md", "")}`}
            className={`grow truncate ${focusStyles} ${underlinedLink}`}
          >
            {new Date(item.date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </Link>
        ) : (
          <div className="grow truncate">
            {new Date(item.date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
        )}
      </div>
      <div className="text-sm text-neutral-500 flex items-center gap-1.5">
        <IconBook2 className="shrink-0" size={16} strokeWidth={1.5} />
        <div className="grow truncate">
          {noteContentText.split(/\s+/).length.toLocaleString("en-US")} words
        </div>
      </div>
      {typeof item.attributes.twitter === "string" && (
        <div className="text-sm text-neutral-500 flex items-center gap-1.5">
          <IconBrandX className="shrink-0" size={16} strokeWidth={1.5} />
          <ExternalLink
            href={item.attributes.twitter}
            className="grow truncate"
          >
            Reply on X
          </ExternalLink>
        </div>
      )}
      {link && (
        <div className="text-sm text-neutral-500 flex items-center gap-1.5">
          <IconBrandGithub className="shrink-0" size={16} strokeWidth={1.5} />
          <ExternalLink href={githubUrl} className="grow truncate">
            View on GitHub
          </ExternalLink>
        </div>
      )}
      {children}
    </div>
  );
}
