import { ArchiveItem } from "@/app/api";
import { focusStyles } from "@/app/components/external-link";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";

interface ArchiveContentProps {
  archiveData: ArchiveItem[];
  year?: string;
}

export default function ArchiveContent({
  archiveData,
  year,
}: ArchiveContentProps) {
  const yearNavigation = year
    ? {
        previous: year !== "2009" ? parseInt(year) - 1 : null,
        next:
          year !== new Date().getUTCFullYear().toString()
            ? parseInt(year) + 1
            : null,
      }
    : null;

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

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 space-y-32">
      <Header pathname={year ? `/archive/${year}` : "/archive"}>
        {year
          ? `A comprehensive archive of all my activities from ${year}`
          : "A comprehensive archive of all my activities, projects, and content"}
      </Header>
      <main className="max-w-2xl mx-auto space-y-8">
        {Object.entries(groupedByYear)
          .sort(([a], [b]) => parseInt(b) - parseInt(a))
          .map(([itemYear, items]) => (
            <div key={itemYear} className="space-y-6">
              {!year && (
                <h2 className="text-lg font-medium text-neutral-500">
                  {itemYear}
                </h2>
              )}
              {items.map((item, index) => (
                <article key={index} className="flex gap-2 relative">
                  <div className="text-neutral-500 shrink-0 flex items-center gap-2">
                    {formatType(item.type)}
                    <IconChevronRight strokeWidth={1.5} className="h-4" />
                  </div>
                  <div className="grow flex items-center justify-between gap-8 min-w-0">
                    {item.url ? (
                      <a
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
                      </a>
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
        {yearNavigation && (
          <footer className="flex items-center justify-between">
            {yearNavigation.previous && (
              <Link
                href={`/archive/${yearNavigation.previous}`}
                className={`flex items-center gap-1 ${focusStyles}`}
              >
                <IconChevronLeft strokeWidth={1.5} className="h-4" />
                {yearNavigation.previous}
              </Link>
            )}
            {yearNavigation.next && (
              <Link
                href={`/archive/${yearNavigation.next}`}
                className={`flex items-center gap-1 ${focusStyles}`}
              >
                {yearNavigation.next}
                <IconChevronRight strokeWidth={1.5} className="h-4" />
              </Link>
            )}
          </footer>
        )}
      </main>
      <Footer />
    </div>
  );
}
