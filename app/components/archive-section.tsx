import { ArchiveItem, getAllArchiveItems } from "@/app/api";
import { GenericSectionContainer } from "@/app/components/generic-section";
import humanizeDuration from "humanize-duration";

const formatType = (type: string) => {
  if (type === "open-source-project") return "Created";
  if (type === "event") return "Spoke at";
  if (type === "book") return "Read";
  if (type === "travel") return "Traveled to";
  if (type === "life-event") return "Had";
  if (type === "blog-post") return "Wrote";
  if (type === "okr") return "Set OKR";
  if (type === "theme") return "Set theme";
  if (type === "podcast-interview") return "Interviewed on";
  if (type === "version") return "Released";
  if (type === "project") return "Worked on";
  if (type === "press-feature") return "Featured in";
  if (type === "award") return "Received award";
  if (type === "video") return "Featured in video";
  if (type === "hacker-news") return "Featured on Hacker News";
  return type;
};

export async function ArchiveSection() {
  const archiveItems = await getAllArchiveItems();
  const recentArchiveItems = archiveItems
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);
  const getArchiveItemTitle = (item: ArchiveItem) =>
    formatType(item.type) + " " + item.title.replace("AnandChowdhary/", "");
  const getArchiveItemSubtitle = (item: ArchiveItem) =>
    humanizeDuration(new Date().getTime() - new Date(item.date).getTime(), {
      language: "en",
      round: true,
      units: ["y", "w", "d"],
    }).split(",")[0] + " ago";

  return (
    <GenericSectionContainer
      title="archive"
      subtitle="/archive"
      description="A comprehensive archive of all my activities in one place in reverse chronological order."
      linkText="Go to /archive"
      href={`/archive/${new Date().getFullYear()}`}
    >
      <ul className="text-xs space-y-1 text-neutral-600 dark:text-neutral-400 pointer-events-none">
        {recentArchiveItems.slice(0, 4).map((item, index) => (
          <li
            key={item.url}
            className="flex items-center gap-2 justify-between relative"
          >
            <div className="shrink-0">
              <div className="w-2 h-2 rounded-full bg-neutral-300" />
            </div>
            <div className="truncate grow">{getArchiveItemTitle(item)}</div>
            <div className="shrink-0 text-neutral-500">
              {getArchiveItemSubtitle(item)}
            </div>
            {index !== 0 && (
              <div className="w-px absolute left-1 -top-1.5 bottom-3.5 bg-neutral-300 -ml-[0.5px] -z-10" />
            )}
          </li>
        ))}
      </ul>
    </GenericSectionContainer>
  );
}
