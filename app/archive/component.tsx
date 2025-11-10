import { ArchiveItem } from "@/app/api";
import { ArchiveItemComponent } from "@/app/archive/item";
import { Container } from "@/app/components/container";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { NavigationFooter } from "@/app/components/navigation-footer";

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

  return (
    <Container>
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
                    const labels = new Map<string, number>();
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
                <ArchiveItemComponent key={index} item={item} />
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
    </Container>
  );
}
