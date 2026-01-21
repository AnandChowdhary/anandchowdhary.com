import { focusStyles } from "@/app/components/external-link";
import { NavigationLinks } from "@/app/components/navigation-links";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";

interface ThemeData {
  slug: string;
  title: string;
  date: string;
}

export function ThemesSection({ themes }: { themes: ThemeData[] }) {
  return (
    <div>
      <h2 className="font-medium text-xl">Themes</h2>
      <NavigationLinks
        source="https://github.com/AnandChowdhary/themes"
        api="https://raw.githubusercontent.com/AnandChowdhary/themes/refs/heads/main/api.json"
        readme="https://github.com/AnandChowdhary/themes/blob/refs/heads/main/README.md"
        className="mb-6 justify-start mx-0"
      />
      <div className="space-y-3">
        {themes
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .slice(0, 4)
          .map((theme) => (
            <div
              key={theme.slug}
              className="flex items-center justify-between gap-3"
            >
              <div className="truncate">{theme.title}</div>
              <div className="text-neutral-500 tabular-nums">
                {new Date(theme.date).toLocaleDateString("en-US", {
                  year: "numeric",
                })}
              </div>
            </div>
          ))}
        <Link href="/themes" className={focusStyles}>
          <div className="flex items-center gap-0.5">
            <span>More</span>
            <IconChevronRight size={12} strokeWidth={1.5} />
          </div>
        </Link>
      </div>
    </div>
  );
}
