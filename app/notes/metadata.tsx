import { Note } from "@/app/api";
import { ExternalLink } from "@/app/components/external-link";
import { IconBook2, IconBrandGithub, IconBrandX } from "@tabler/icons-react";

export function NoteMetadata({
  item,
  className,
  children,
  noteContentText,
}: {
  item: Note;
  className?: string;
  children?: React.ReactNode;
  noteContentText: string;
}) {
  const githubUrl = `https://github.com/AnandChowdhary/notes/blob/main/threads/${item.slug}.md`;

  return (
    <div className={`grid grid-cols-3 gap-2.5 pt-2.5 ${className}`}>
      <div className="text-sm text-neutral-500 flex items-center gap-1.5">
        <IconBook2 className="shrink-0" size={16} strokeWidth={1.5} />
        <div className="grow truncate">
          {noteContentText.split(/\s+/).length.toLocaleString("en-US")} words
        </div>
      </div>
      <div className="text-sm text-neutral-500 flex items-center gap-1.5">
        <IconBrandX className="shrink-0" size={16} strokeWidth={1.5} />
        <ExternalLink
          href={`https://x.com/AnandChowdhary/status/${item.slug
            .split("-")
            .pop()}`}
          className="grow truncate"
        >
          View on X
        </ExternalLink>
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
