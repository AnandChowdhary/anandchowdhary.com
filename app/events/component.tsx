import { Event } from "@/app/api";
import { focusStyles } from "@/app/components/external-link";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import {
  IconBuilding,
  IconCalendarEvent,
  IconMapPin,
  IconSpeakerphone,
  IconTicket,
} from "@tabler/icons-react";
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
                    {item.attributes.coordinates ? (
                      <img
                        src={`https://api.mapbox.com/styles/v1/anandchowdhary/cl91jzd61002q14pm7vtwfa2l/static/${item.attributes.coordinates[1]},${item.attributes.coordinates[0]},14/576x288?access_token=pk.eyJ1IjoiYW5hbmRjaG93ZGhhcnkiLCJhIjoiY2w5MWpxbXZ2MDdpMzN2bW92ZnRzZ2Q4bSJ9.WMWxq61EUjQfWtntvGGNKQ`}
                        alt=""
                        className="w-full h-full object-cover rounded-lg dark:brightness-60"
                      />
                    ) : (
                      <img
                        src={`https://raw.githubusercontent.com/AnandChowdhary/blog-images/refs/heads/main/384x256/${Math.floor(
                          new Rand(item.slug).next() * 100 + 1
                        )}.png`}
                        alt=""
                        className="w-full h-full object-cover rounded-lg dark:brightness-60"
                      />
                    )}
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
                    <div className="grid grid-cols-2 gap-1.5 pt-2">
                      <div className="text-sm text-neutral-500 flex items-center gap-1.5">
                        <IconCalendarEvent
                          className="shrink-0"
                          size={16}
                          strokeWidth={1.5}
                        />
                        <div className="grow truncate">
                          {new Date(item.date).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                      {item.attributes.event && (
                        <div className="text-sm text-neutral-500 flex items-center gap-1.5">
                          <IconTicket
                            className="shrink-0"
                            size={16}
                            strokeWidth={1.5}
                          />
                          <div className="grow truncate">
                            {item.attributes.event}
                          </div>
                        </div>
                      )}
                      {item.attributes.venue && (
                        <div className="text-sm text-neutral-500 flex items-center gap-1.5">
                          <IconBuilding
                            className="shrink-0"
                            size={16}
                            strokeWidth={1.5}
                          />
                          <div className="grow truncate">
                            {item.attributes.venue}
                          </div>
                        </div>
                      )}
                      {item.attributes.city && (
                        <div className="text-sm text-neutral-500 flex items-center gap-1.5">
                          <IconMapPin
                            className="shrink-0"
                            size={16}
                            strokeWidth={1.5}
                          />
                          <div className="grow truncate">
                            {item.attributes.city}
                            {item.attributes.country &&
                              `, ${item.attributes.country}`}
                          </div>
                        </div>
                      )}
                      {item.attributes.talk && (
                        <div className="text-sm text-neutral-500 flex items-center gap-1.5">
                          <IconSpeakerphone
                            className="shrink-0"
                            size={16}
                            strokeWidth={1.5}
                          />
                          <div className="grow truncate">
                            {item.attributes.talk}
                          </div>
                        </div>
                      )}
                    </div>
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
