import {
  getAllCodingTime,
  getAllSleepTime,
  getAllTopArtists,
  getAllWalkingSteps,
  LifeEvent,
} from "@/app/api";
import { focusStyles } from "@/app/components/external-link";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { NavigationFooter } from "@/app/components/navigation-footer";
import { NavigationLinks } from "@/app/components/navigation-links";
import humanizeDuration from "humanize-duration";
import Link from "next/link";

const LifeEventCard = ({
  item,
  hasMore,
}: {
  item: LifeEvent;
  hasMore: boolean;
}) => {
  const year = new Date(item.date).getFullYear();
  const permalink = `/life/${year}/${item.slug}`;

  return (
    <article className="pb-4 relative">
      <div className="flex items-start justify-between gap-4">
        <div className="shrink-0 w-3 h-3 rounded-full bg-neutral-200 dark:bg-neutral-800 mt-1" />
        {hasMore && (
          <div className="absolute left-1.25 top-5 -bottom-4 w-0.5 bg-neutral-200 dark:bg-neutral-800" />
        )}
        <div className="min-w-0 flex-1">
          <Link
            href={permalink}
            className={`${focusStyles} full-link font-medium hover:text-neutral-500`}
          >
            {item.title}
          </Link>
          <p className="text-sm text-neutral-500 mt-1">
            {new Date(item.date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          {item.description && (
            <p
              className="text-sm text-neutral-500 mt-2 truncate whitespace-nowrap pointer-events-none"
              style={{
                maskImage:
                  "linear-gradient(to right, black 70%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, black 70%, transparent 100%)",
              }}
            >
              {item.description}
            </p>
          )}
        </div>
      </div>
    </article>
  );
};

export default async function LifeContent({
  lifeEventsData,
  year,
  previousYear,
  nextYear,
}: {
  lifeEventsData: LifeEvent[];
  year?: string;
  previousYear?: number;
  nextYear?: number;
}) {
  // Group events by decade
  const eventsByDecade = lifeEventsData.reduce((acc, event) => {
    const year = new Date(event.date).getFullYear();
    const decade = Math.floor(year / 10) * 10;
    const decadeKey = `${decade}s`;
    if (!acc[decadeKey]) acc[decadeKey] = [];
    acc[decadeKey].push(event);
    return acc;
  }, {} as Record<string, LifeEvent[]>);

  // Sort events within each decade by date (newest first)
  Object.keys(eventsByDecade).forEach((decade) => {
    eventsByDecade[decade].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  });

  // Sort decades (newest first)
  const sortedDecades = Object.keys(eventsByDecade).sort((a, b) =>
    b.localeCompare(a)
  );

  const topArtists = await getAllTopArtists();
  const codingTime = await getAllCodingTime();
  const sleepTime = await getAllSleepTime();
  const walkingSteps = await getAllWalkingSteps();

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 space-y-32">
      <Header
        pathname={year ? `/life/${year}` : "/life"}
        description="Major milestones and meaningful moments that have shaped my personal and professional journey."
      />
      <main className="max-w-2xl mx-auto space-y-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-medium text-xl">Music</h2>
            <NavigationLinks
              source="https://github.com/AnandChowdhary/top-artists"
              api="https://raw.githubusercontent.com/AnandChowdhary/top-artists/refs/heads/main/api.json"
              readme="https://github.com/AnandChowdhary/top-artists/blob/refs/heads/main/README.md"
              className="mb-6 justify-start mx-0"
            />
            <div className="space-y-3">
              {topArtists.map((artist) => (
                <div key={artist.name} className="flex items-center gap-3">
                  <div className="shrink-0">
                    <img
                      alt=""
                      src={artist.img}
                      className="w-8 h-8 rounded-full shadow-xs"
                    />
                  </div>
                  <div className="truncate">{artist.name}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-medium text-xl">Coding time</h2>
            <NavigationLinks
              source="https://github.com/AnandChowdhary/life"
              api="https://raw.githubusercontent.com/AnandChowdhary/top-artists/refs/heads/main/api.json"
              readme="https://github.com/AnandChowdhary/life/blob/refs/heads/main/README.md"
              className="mb-6 justify-start mx-0"
            />
            <div className="space-y-3">
              {Object.entries(codingTime)
                .filter(([_, time]) => time > 0)
                .slice(-6)
                .map(([month, time]) => (
                  <div
                    key={month}
                    className="flex items-center gap-3 justify-between"
                  >
                    <div className="truncate">
                      {humanizeDuration(time * 1000)
                        .split(", ")
                        .slice(0, 2)
                        .join(", ")}
                    </div>
                    <div className="truncate text-neutral-500 tabular-nums">
                      {new Date(month).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                      })}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div>
            <h2 className="font-medium text-xl">Sleep</h2>
            <NavigationLinks
              source="https://github.com/AnandChowdhary/life"
              api="https://raw.githubusercontent.com/AnandChowdhary/life/refs/heads/master/data/google-fit-sleep/summary/days.json"
              readme="https://github.com/AnandChowdhary/life/blob/refs/heads/main/README.md"
              className="mb-6 justify-start mx-0"
            />
            <div className="space-y-3">
              {Object.entries(sleepTime)
                .filter(([_, time]) => time > 0)
                .slice(-6)
                .map(([month, time]) => (
                  <div
                    key={month}
                    className="flex items-center gap-3 justify-between"
                  >
                    <div className="truncate">
                      {humanizeDuration(time * 1000)
                        .split(", ")
                        .slice(0, 2)
                        .join(", ")}
                    </div>
                    <div className="truncate text-neutral-500 tabular-nums">
                      {new Date(month).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                      })}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div>
            <h2 className="font-medium text-xl">Steps</h2>
            <NavigationLinks
              source="https://github.com/AnandChowdhary/life"
              api="https://raw.githubusercontent.com/AnandChowdhary/life/refs/heads/master/data/google-fit-walking/summary/days.json"
              readme="https://github.com/AnandChowdhary/life/blob/refs/heads/main/README.md"
              className="mb-6 justify-start mx-0"
            />
            <div className="space-y-3">
              {Object.entries(walkingSteps)
                .filter(([_, steps]) => steps > 0)
                .slice(-6)
                .map(([month, steps]) => (
                  <div
                    key={month}
                    className="flex items-center gap-3 justify-between"
                  >
                    <div className="truncate">
                      {steps.toLocaleString()} steps
                    </div>
                    <div className="truncate text-neutral-500 tabular-nums">
                      {new Date(month).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                      })}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <h2 className="font-medium text-xl mb-0">Life events</h2>
        <NavigationLinks
          source="https://github.com/AnandChowdhary/everything"
          api="https://anandchowdhary.github.io/everything/data/life-events.json"
          readme="https://github.com/AnandChowdhary/everything/blob/refs/heads/main/README.md"
          className="mb-6 justify-start ml-0"
        />
        {sortedDecades.map((decade) => (
          <section key={decade} className="space-y-4">
            <h2 className="text-lg font-medium text-neutral-500">{decade}</h2>
            <div className="space-y-4">
              {eventsByDecade[decade].map((item, index, array) => (
                <LifeEventCard
                  key={`${decade}-${index}`}
                  item={item}
                  hasMore={index < array.length - 1}
                />
              ))}
            </div>
          </section>
        ))}
        {year && (previousYear || nextYear) && (
          <NavigationFooter
            previous={
              previousYear
                ? {
                    href: `/life/${previousYear}`,
                    label: previousYear.toString(),
                  }
                : undefined
            }
            next={
              nextYear
                ? {
                    href: `/life/${nextYear}`,
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
