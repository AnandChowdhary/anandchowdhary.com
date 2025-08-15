import { Event } from "@/app/api";
import { focusStyles } from "@/app/components/external-link";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { EventMetadata } from "@/app/events/metadata";
import { marked } from "marked";
import { markedSmartypants } from "marked-smartypants";
import Link from "next/link";
import Rand from "rand-seed";

marked.use(markedSmartypants());

const EventThumbnail = ({
  item,
  size = "large",
}: {
  item: Event;
  size?: "large" | "small";
}) => {
  const isLarge = size === "large";
  const mapSize = isLarge ? "576x288" : "48x48";
  const mapZoom = isLarge ? 14 : 14;

  return (
    <div
      className={`pointer-events-none ${
        isLarge
          ? "aspect-video rounded-lg"
          : "aspect-square w-6 h-6 rounded-full"
      } shadow-sm relative`}
    >
      {isLarge && (
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none text-2xl tracking-widest">
          {item.emoji}
        </div>
      )}
      {item.attributes.coordinates && isLarge && (
        <img
          src={`https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/${item.attributes.coordinates[1]},${item.attributes.coordinates[0]},${mapZoom}/${mapSize}?access_token=pk.eyJ1IjoiYW5hbmRjaG93ZGhhcnkiLCJhIjoiY2w5MWpxbXZ2MDdpMzN2bW92ZnRzZ2Q4bSJ9.WMWxq61EUjQfWtntvGGNKQ`}
          alt=""
          className={`w-full h-full object-cover ${
            isLarge ? "rounded-lg" : "rounded-full"
          } dark:brightness-40 absolute inset-0 mix-blend-overlay`}
        />
      )}
      <img
        src={`https://raw.githubusercontent.com/AnandChowdhary/blog-images/refs/heads/main/384x256/${Math.floor(
          new Rand(item.slug).next() * 100 + 1
        )}.png`}
        alt=""
        className={`w-full h-full object-cover -z-10 ${
          isLarge ? "rounded-lg" : "rounded-full"
        } dark:brightness-60`}
      />
    </div>
  );
};

const EventCard = ({ item }: { item: Event }) => (
  <article className="grid grid-cols-3 gap-8 items-center pb-2.5 relative">
    <EventThumbnail item={item} size="large" />
    <div className="col-span-2">
      <Link
        href={`/events/${new Date(
          item.date
        ).getUTCFullYear()}/${item.slug.replace(".md", "")}`}
        className={`${focusStyles} full-link flex hover:text-neutral-500`}
      >
        <div
          className="w-full"
          style={{
            maskImage: "linear-gradient(to right, black 70%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, black 70%, transparent 100%)",
          }}
        >
          <h3
            className="truncate text-lg font-medium"
            dangerouslySetInnerHTML={{
              __html: marked.parseInline(item.title),
            }}
          />
        </div>
      </Link>
      <EventMetadata item={item} />
    </div>
  </article>
);

export default async function EventsContent({
  eventsDataFiltered,
  year,
}: {
  eventsDataFiltered: Event[];
  year?: string;
}) {
  const eventsDataByYear = eventsDataFiltered.reduce((acc, item) => {
    const year = new Date(item.date).getUTCFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(item);
    return acc;
  }, {} as Record<string, Event[]>);

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 space-y-32">
      <Header pathname={year ? `/events/${year}` : "/events"}>
        From time to time, I speak at startup events and technical conferences
        about engineering, design, and entrepreneurship.
      </Header>
      <main className="max-w-2xl mx-auto space-y-4">
        {year ? (
          // Year-specific view: show events grouped by year
          <div className="space-y-8">
            {Object.entries(eventsDataByYear)
              .sort((a, b) => b[0].localeCompare(a[0]))
              .map(([year, events]) => (
                <div key={year} className="space-y-4">
                  <h2 className="text-lg font-medium text-neutral-500">
                    <Link
                      href={`/events/${year}`}
                      className={`${focusStyles} flex`}
                    >
                      {year}
                    </Link>
                  </h2>
                  {events.map((item) => (
                    <EventCard key={`${item.date}-${item.slug}`} item={item} />
                  ))}
                </div>
              ))}
          </div>
        ) : (
          // Main events page: show latest and more sections
          <>
            {eventsDataFiltered.length > 3 && (
              <h2 className="text-lg font-medium text-neutral-500">Latest</h2>
            )}
            {eventsDataFiltered.slice(0, 3).map((item) => (
              <EventCard key={`${item.date}-${item.slug}`} item={item} />
            ))}
            {eventsDataFiltered.length > 3 && (
              <div className="space-y-6 pt-8">
                <h2 className="text-lg font-medium text-neutral-500">More</h2>
                {eventsDataFiltered.slice(3).map((item) => (
                  <article
                    key={`${item.date}-${item.slug}`}
                    className="flex gap-5 relative"
                  >
                    <EventThumbnail item={item} size="small" />
                    <div className="grow flex items-center justify-between gap-8">
                      <Link
                        href={`/events/${new Date(
                          item.date
                        ).getUTCFullYear()}/${item.slug.replace(".md", "")}`}
                        className={`${focusStyles} full-link flex grow truncate hover:text-neutral-500`}
                      >
                        <div
                          className="w-full"
                          style={{
                            maskImage:
                              "linear-gradient(to right, black 70%, transparent 100%)",
                            WebkitMaskImage:
                              "linear-gradient(to right, black 70%, transparent 100%)",
                          }}
                        >
                          <h3
                            className="truncate"
                            dangerouslySetInnerHTML={{
                              __html: marked.parseInline(item.title),
                            }}
                          />
                        </div>
                      </Link>
                      <p className="text-sm text-neutral-500 shrink-0">
                        {new Date(item.date).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
