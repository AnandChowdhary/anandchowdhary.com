import { Project } from "@/app/api";
import { ExternalLink, underlinedLink } from "@/app/components/external-link";
import slugify from "@sindresorhus/slugify";
import {
  IconBrandGithub,
  IconCalendarEvent,
  IconTags,
} from "@tabler/icons-react";
import Link from "next/link";

export function ProjectMetadata({ item }: { item: Project }) {
  const githubUrl = `https://github.com/AnandChowdhary/projects/blob/main/projects/${new Date(
    item.date
  ).getUTCFullYear()}/${item.slug}`;
  const tags: string[] = [];
  if (item.attributes.collaborators)
    tags.push(...item.attributes.collaborators);
  if (Array.isArray(item.attributes.tags)) tags.push(...item.attributes.tags);
  if (Array.isArray(item.attributes.stack)) tags.push(...item.attributes.stack);
  if (Array.isArray(item.attributes.tools)) tags.push(...item.attributes.tools);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5 md:gap-2.5 pt-2.5">
      <div className="text-sm text-neutral-500 flex items-start gap-1.5">
        <IconCalendarEvent
          className="shrink-0 mt-0.5"
          size={16}
          strokeWidth={1.5}
        />
        <div className="grow flex flex-col gap-1">
          <Link
            href={`/projects/${new Date(
              item.date
            ).getUTCFullYear()}/${item.slug.replace(".md", "")}`}
            className={`${underlinedLink} flex truncate w-full`}
          >
            {new Date(item.date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </Link>
        </div>
      </div>
      <div className="text-sm text-neutral-500 flex items-start gap-1.5">
        <IconBrandGithub
          className="shrink-0 mt-0.5"
          size={16}
          strokeWidth={1.5}
        />
        <ExternalLink href={githubUrl} className="grow truncate">
          View on GitHub
        </ExternalLink>
      </div>
      <div className="text-sm text-neutral-500 flex items-start gap-1.5">
        <IconTags className="shrink-0 mt-0.5" size={16} strokeWidth={1.5} />
        <div className="grow flex flex-wrap gap-y-1 gap-x-2">
          {tags.map((tag) => (
            <Link
              href={`/projects/tags/${slugify(tag)}`}
              className={`${underlinedLink} flex truncate`}
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
