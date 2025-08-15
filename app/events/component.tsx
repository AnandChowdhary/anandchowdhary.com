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

export default async function EventsContent({
  eventsDataFiltered,
  year,
}: {
  eventsDataFiltered: Event[];
  year?: string;
}) {
  const eventsDataByYear = eventsDataFiltered.reduce((acc, item) => {
    const year = new Date(item.date).getFullYear();
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
      <main className="max-w-2xl mx-auto space-y-8">
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
                <article
                  key={`${item.date}-${item.slug}`}
                  className="grid grid-cols-3 gap-8 items-center pb-2.5 relative"
                >
                  <div className="aspect-video rounded-lg shadow-sm relative">
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none text-2xl tracking-widest">
                      {item.emoji}
                    </div>
                    {item.attributes.coordinates && (
                      <img
                        src={`https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/${item.attributes.coordinates[1]},${item.attributes.coordinates[0]},14/576x288?access_token=pk.eyJ1IjoiYW5hbmRjaG93ZGhhcnkiLCJhIjoiY2w5MWpxbXZ2MDdpMzN2bW92ZnRzZ2Q4bSJ9.WMWxq61EUjQfWtntvGGNKQ`}
                        alt=""
                        className="w-full h-full object-cover rounded-lg dark:brightness-40 absolute inset-0 z-10 mix-blend-overlay"
                      />
                    )}
                    <img
                      src={`https://raw.githubusercontent.com/AnandChowdhary/blog-images/refs/heads/main/384x256/${Math.floor(
                        new Rand(item.slug).next() * 100 + 1
                      )}.png`}
                      alt=""
                      className="w-full h-full object-cover rounded-lg dark:brightness-60"
                    />
                  </div>
                  <div className="col-span-2">
                    <Link
                      href={`/events/${new Date(
                        item.date
                      ).getUTCFullYear()}/${item.slug.replace(".md", "")}`}
                      className={`${focusStyles} full-link flex`}
                    >
                      <h3
                        className="truncate text-lg font-medium"
                        dangerouslySetInnerHTML={{
                          __html: marked.parseInline(item.title),
                        }}
                      />
                    </Link>
                    <EventMetadata item={item} />
                  </div>
                </article>
              ))}
            </div>
          ))}
      </main>
      <Footer />
    </div>
  );
}
