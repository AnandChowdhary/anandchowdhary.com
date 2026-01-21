import { ArchiveItem } from "@/app/api";
import { focusStyles } from "@/app/components/external-link";
import { NavigationLinks } from "@/app/components/navigation-links";

export function HackerNewsSection({
  hackerNewsItems,
}: {
  hackerNewsItems: ArchiveItem[];
}) {
  return (
    <div>
      <h2 className="font-medium text-xl">Hacker News</h2>
      <NavigationLinks
        source="https://github.com/AnandChowdhary/everything"
        api="https://anandchowdhary.github.io/everything/api.json"
        readme="https://github.com/AnandChowdhary/everything/blob/refs/heads/main/README.md"
        className="mb-6 justify-start mx-0"
      />
      <div className="space-y-3">
        {hackerNewsItems
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .map((item) => (
            <div
              key={item.url}
              className="flex items-center justify-between gap-3"
            >
              <div
                className="truncate whitespace-nowrap"
                style={{
                  maskImage:
                    "linear-gradient(to right, black 70%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to right, black 70%, transparent 100%)",
                }}
              >
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={focusStyles}
                >
                  {item.title}
                </a>
              </div>
              <div className="text-neutral-500 tabular-nums shrink-0">
                {(item.data as any)?.points || 0} pts
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
