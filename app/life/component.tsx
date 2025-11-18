import {
  getAllCodingTime,
  getAllLocations,
  getAllSleepTime,
  getAllThemes,
  getAllTopArtists,
  getAllWalkingSteps,
  LifeEvent,
} from "@/app/api";
import { Container } from "@/app/components/container";
import { focusStyles } from "@/app/components/external-link";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { NavigationFooter } from "@/app/components/navigation-footer";
import { NavigationLinks } from "@/app/components/navigation-links";
import { IconChevronRight } from "@tabler/icons-react";
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
  const countriesDataFiltered = await getAllLocations();
  const themes = await getAllThemes();

  return (
    <Container>
      <Header
        pathname={year ? `/life/${year}` : "/life"}
        description="I track all my life data on GitHub; here's a summary of my location, music, work, health, and milestones."
      />
      <main className="max-w-2xl mx-auto space-y-12 br">
        <div className="space-y-2">
          <h2 className="font-medium text-xl">GitHub</h2>
          <img
            src="https://github-contributions-api.deno.dev/AnandChowdhary.svg"
            alt="GitHub Contributions"
            className="w-full -mx-2.5"
          />
        </div>
        <div>
          <h2 className="font-medium text-xl">Location</h2>
          <div className="inline-flex">
            <NavigationLinks
              source="https://github.com/AnandChowdhary/location"
              readme="https://anandchowdhary.github.io/location/README.md"
              api="https://anandchowdhary.github.io/location/history-countries.json"
              className="mb-6 justify-start mx-0"
            />
          </div>
          <div className="grid grid-cols-5 gap-8">
            {countriesDataFiltered
              .sort((a, b) => b.date.localeCompare(a.date))
              .slice(0, 4)
              .map((country, index) => (
                <div key={country.hash}>
                  <img
                    src={`https://raw.githubusercontent.com/iMuFeng/round-flag-icons/master/flags/${country.country_code}.svg`}
                    alt={country.label}
                    className="size-7 rounded-full mb-2"
                  />
                  <div className="truncate">{country.label}</div>
                  <div className="text-neutral-500 tabular-nums text-sm">
                    {index === 0
                      ? "Now"
                      : new Date(country.date).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                        })}
                  </div>
                </div>
              ))}
            <div>
              <div className="h-7 mb-2" />
              <div className="flex items-center gap-0.5">
                <Link href="/location" className={focusStyles}>
                  More
                </Link>
                <IconChevronRight size={12} strokeWidth={1.5} />
              </div>
              <div className="text-neutral-500 tabular-nums text-sm">
                {countriesDataFiltered.length.toLocaleString("en-US")} places
              </div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
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
                  (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
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
                .slice(-5)
                .reverse()
                .map(([month, time]) => (
                  <div
                    key={month}
                    className="flex items-center gap-3 justify-between"
                  >
                    <div className="truncate">
                      {humanizeDuration(time * 1000, { round: true })
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
                      {humanizeDuration(time * 1000, { round: true })
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
    </Container>
  );
}
