import type { ArchiveItem } from "@/app/api";
import { focusStyles } from "@/app/components/external-link";
import {
  IconBook,
  IconBrandGithub,
  IconBriefcase,
  IconCalendar,
  IconChevronRight,
  IconFileText,
  IconHeart,
  IconInfoCircle,
  IconNews,
  IconPalette,
  IconPlane,
  IconPodium,
  IconTarget,
  IconTrophy,
  IconVersions,
  IconVideo,
} from "@tabler/icons-react";
import Link from "next/link";

export function ArchiveItemComponent({ item }: { item: ArchiveItem }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatType = (type: string) => {
    if (type === "open-source-project") return "Open source";
    if (type === "event") return "Event";
    if (type === "book") return "Book";
    if (type === "travel") return "Travel";
    if (type === "life-event") return "Life event";
    if (type === "blog-post") return "Blog post";
    if (type === "okr") return "OKR";
    if (type === "theme") return "Theme";
    if (type === "podcast-interview") return "Podcast";
    if (type === "version") return "Version";
    if (type === "project") return "Project";
    if (type === "press-feature") return "Press";
    if (type === "award") return "Award";
    if (type === "video") return "Video";
    return type;
  };

  const getIconForType = (type: string): React.ReactNode => {
    if (type === "open-source-project")
      return <IconBrandGithub strokeWidth={1.5} className="h-4" />;
    if (type === "event")
      return <IconCalendar strokeWidth={1.5} className="h-4" />;
    if (type === "book") return <IconBook strokeWidth={1.5} className="h-4" />;
    if (type === "travel")
      return <IconPlane strokeWidth={1.5} className="h-4" />;
    if (type === "life-event")
      return <IconHeart strokeWidth={1.5} className="h-4" />;
    if (type === "blog-post")
      return <IconFileText strokeWidth={1.5} className="h-4" />;
    if (type === "okr") return <IconTarget strokeWidth={1.5} className="h-4" />;
    if (type === "theme")
      return <IconPalette strokeWidth={1.5} className="h-4" />;
    if (type === "podcast-interview")
      return <IconPodium strokeWidth={1.5} className="h-4" />;
    if (type === "version")
      return <IconVersions strokeWidth={1.5} className="h-4" />;
    if (type === "project")
      return <IconBriefcase strokeWidth={1.5} className="h-4" />;
    if (type === "press-feature")
      return <IconNews strokeWidth={1.5} className="h-4" />;
    if (type === "award")
      return <IconTrophy strokeWidth={1.5} className="h-4" />;
    if (type === "video")
      return <IconVideo strokeWidth={1.5} className="h-4" />;
    return <IconInfoCircle strokeWidth={1.5} className="h-4" />;
  };

  return (
    <article className="flex gap-2 relative">
      <div className="text-neutral-500 shrink-0 flex items-center gap-1.5">
        {getIconForType(item.type)}
        {formatType(item.type)}
        <IconChevronRight strokeWidth={1.5} className="h-4" />
      </div>
      <div className="grow flex items-center justify-between gap-8 min-w-0">
        {item.url ? (
          <Link
            href={item.url.replace("https://anandchowdhary.com", "")}
            className={`${focusStyles} min-w-0 full-link flex grow truncate hover:text-neutral-500`}
            style={{
              maskImage:
                "linear-gradient(to right, black 70%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, black 70%, transparent 100%)",
            }}
          >
            <h3 className="truncate">{item.title}</h3>
          </Link>
        ) : (
          <h3 className="truncate min-w-0 flex grow">{item.title}</h3>
        )}
        <p className="text-sm text-neutral-500 shrink-0">
          {formatDate(item.date)}
        </p>
      </div>
    </article>
  );
}
