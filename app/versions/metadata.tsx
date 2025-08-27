import { Version } from "@/app/api";
import { ExternalLink } from "@/app/components/external-link";
import {
  IconArchive,
  IconBrandGithub,
  IconCalendarEvent,
  IconClipboardTypography,
  IconCode,
  IconTool,
} from "@tabler/icons-react";

export async function VersionMetadata({
  item,
  className,
  children,
}: {
  item: Version;
  className?: string;
  children?: React.ReactNode;
}) {
  const githubUrl = `https://github.com/AnandChowdhary/versions/blob/main/versions/${new Date(
    item.date
  ).getUTCFullYear()}/${item.slug}`;
  /*"attributes": {
    "date": "2022-10-08T00:00:00.000Z",
    "title": "Alameda",
    "generator": "Deno Fresh",
    "archive": "https://web.archive.org/web/20230602043202/https://anandchowdhary.com/",
    "type": ["System"],
    "stack": ["React", "TypeScript", "Deno"],
    "domain": "anandchowdhary.com",
    "latest": true
  },*/

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
      {item.attributes.type && (
        <div className="text-sm text-neutral-500 flex items-center gap-1.5">
          <IconClipboardTypography
            className="shrink-0"
            size={16}
            strokeWidth={1.5}
          />
          <div className="grow truncate">{item.attributes.type.join(", ")}</div>
        </div>
      )}
      {item.attributes.stack && (
        <div className="text-sm text-neutral-500 flex items-center gap-1.5">
          <IconCode className="shrink-0" size={16} strokeWidth={1.5} />
          <div className="grow truncate">
            {item.attributes.stack.join(", ")}
          </div>
        </div>
      )}
      {item.attributes.generator && (
        <div className="text-sm text-neutral-500 flex items-center gap-1.5">
          <IconTool className="shrink-0" size={16} strokeWidth={1.5} />
          <div className="grow truncate">{item.attributes.generator}</div>
        </div>
      )}
      {item.attributes.archive && (
        <div className="text-sm text-neutral-500 flex items-center gap-1.5">
          <IconArchive className="shrink-0" size={16} strokeWidth={1.5} />
          <ExternalLink
            href={item.attributes.archive}
            className="grow truncate"
          >
            View on Wayback Machine
          </ExternalLink>
        </div>
      )}
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
