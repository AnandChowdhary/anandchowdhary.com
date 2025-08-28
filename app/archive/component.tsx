import { ArchiveItem } from "@/app/api";
import { focusStyles } from "@/app/components/external-link";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { NavigationFooter } from "@/app/components/navigation-footer";
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

interface ArchiveContentProps {
  archiveData: ArchiveItem[];
  year?: string;
  previousYear?: number;
  nextYear?: number;
}

export default function ArchiveContent({
  archiveData,
  year,
  previousYear,
  nextYear,
}: ArchiveContentProps) {
  const groupedByYear = archiveData.reduce((acc, item) => {
    const itemYear = new Date(item.date).getFullYear().toString();
    if (!acc[itemYear]) acc[itemYear] = [];
    acc[itemYear].push(item);
    return acc;
  }, {} as Record<string, ArchiveItem[]>);

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

  const formatLabel = (type: string): { singular: string; plural: string } => {
    if (type === "open-source-project")
      return {
        singular: "new open source project",
        plural: "new open source projects",
      };
    if (type === "event")
      return { singular: "event spoken at", plural: "events spoken at" };
    if (type === "book")
      return { singular: "book finished", plural: "books finished" };
    if (type === "travel")
      return { singular: "place traveled to", plural: "places traveled to" };
    if (type === "life-event")
      return { singular: "life event", plural: "life events" };
    if (type === "blog-post")
      return { singular: "blog post written", plural: "blog posts written" };
    if (type === "okr")
      return { singular: "OKR published", plural: "OKRs published" };
    if (type === "theme")
      return { singular: "theme published", plural: "themes published" };
    if (type === "podcast-interview")
      return { singular: "podcast interview", plural: "podcast interviews" };
    if (type === "version")
      return { singular: "version created", plural: "versions created" };
    if (type === "project")
      return { singular: "project created", plural: "projects created" };
    if (type === "press-feature")
      return { singular: "press feature", plural: "press features" };
    if (type === "award")
      return { singular: "award won", plural: "awards won" };
    if (type === "video")
      return { singular: "video published", plural: "videos published" };
    return { singular: type, plural: type };
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
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 space-y-32">
      <Header
        pathname={year ? `/archive/${year}` : "/archive"}
        description="Everything, everywhere, all at once: A comprehensive archive of all my activities, projects, writing, events, and more, in one place."
      />
      <main className="max-w-2xl mx-auto space-y-12">
        {Object.entries(groupedByYear)
          .sort(([a], [b]) => parseInt(b) - parseInt(a))
          .map(([itemYear, items]) => (
            <div key={itemYear} className="space-y-6">
              <header className="flex items-center gap-4">
                {!year && (
                  <h2 className="text-lg font-medium text-neutral-500 shrink-0">
                    {itemYear}
                  </h2>
                )}
                <div className="flex gap-1 grow">
                  {Array.from({ length: 52 }, (_, index) => {
                    const weekStart = new Date(
                      itemYear ? parseInt(itemYear) : new Date().getFullYear(),
                      0,
                      1
                    );
                    weekStart.setDate(weekStart.getDate() + index * 7);
                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekEnd.getDate() + 6);
                    const hasPassed = new Date() > weekEnd;
                    const hasContributions = items.filter((item) => {
                      const itemDate = new Date(item.date);
                      return itemDate >= weekStart && itemDate <= weekEnd;
                    });
                    let labels = new Map<string, number>();
                    hasContributions.forEach((item) => {
                      if (labels.has(item.type))
                        labels.set(item.type, (labels.get(item.type) ?? 0) + 1);
                      else labels.set(item.type, 1);
                    });
                    const label = Array.from(labels.entries())
                      .map(([label, count]) => {
                        const { singular, plural } = formatLabel(label);
                        return `${count.toLocaleString("en-US")} ${
                          count === 1 ? singular : plural
                        }`;
                      })
                      .join(", ");
                    return (
                      <div
                        key={index}
                        className={`h-4 rounded-full relative group ${
                          hasContributions.length > 0
                            ? "bg-neutral-500"
                            : hasPassed
                            ? "bg-neutral-200 dark:bg-neutral-800"
                            : "bg-neutral-50 dark:bg-neutral-900"
                        }`}
                        style={{ width: `${(100 / 52).toFixed(2)}%` }}
                      >
                        {hasPassed && hasContributions.length > 0 && (
                          <div className="absolute left-1/2 top-6 -translate-x-1/2 whitespace-nowrap flex items-center justify-center text-xs pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-neutral-100 dark:bg-neutral-900 rounded-full py-1 px-2.5 z-10">
                            {label} in the week of{" "}
                            {weekStart.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </header>
              {items.map((item, index) => (
                <article key={index} className="flex gap-2 relative">
                  <div className="text-neutral-500 shrink-0 flex items-center gap-1.5">
                    {getIconForType(item.type)}
                    {formatType(item.type)}
                    <IconChevronRight strokeWidth={1.5} className="h-4" />
                  </div>
                  <div className="grow flex items-center justify-between gap-8 min-w-0">
                    {item.url ? (
                      <Link
                        href={item.url.replace(
                          "https://anandchowdhary.com",
                          ""
                        )}
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
                      <h3 className="truncate min-w-0 flex grow">
                        {item.title}
                      </h3>
                    )}
                    <p className="text-sm text-neutral-500 shrink-0">
                      {formatDate(item.date)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ))}
        {year && (previousYear || nextYear) && (
          <NavigationFooter
            previous={
              previousYear
                ? {
                    href: `/archive/${previousYear}`,
                    label: previousYear.toString(),
                  }
                : undefined
            }
            next={
              nextYear
                ? {
                    href: `/archive/${nextYear}`,
                    label: nextYear.toString(),
                  }
                : undefined
            }
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
