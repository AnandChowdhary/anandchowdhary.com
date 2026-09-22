import { Event, generateSlug, getLocationByYearAndSlug } from "@/app/api";
import { underlinedLink } from "@/app/components/external-link";
import {
  IconBuildings,
  IconCalendarEvent,
  IconDeviceComputerCamera,
  IconMapPin,
  IconTicket,
} from "@tabler/icons-react";
import Link from "next/link";

export async function EventMetadata({
  item,
  link = true,
  className,
  children,
}: {
  item: Event;
  link?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  // An event's city is its own field, so it can name a place that was never
  // logged in the location history — linking to it unconditionally is where
  // several /location 404s came from. Only link once the visit is known.
  const locationSlug = item.attributes.city
    ? `${generateSlug(item.attributes.city)}-${generateSlug(
        item.attributes.country ?? "",
      )}`
    : undefined;
  const locationYear = new Date(item.date).getUTCFullYear();
  const location =
    link && locationSlug
      ? await getLocationByYearAndSlug(locationYear, locationSlug)
      : null;
  const locationHref = location
    ? `/location/${locationYear}/${location.slug}`
    : undefined;

  return (
    <div className={`grid grid-cols-2 gap-2.5 pt-2.5 ${className}`}>
      <div className="text-sm text-neutral-500 flex items-center gap-1.5">
        <IconCalendarEvent className="shrink-0" size={16} strokeWidth={1.5} />
        {link ? (
          <Link
            href={`/events/${new Date(
              item.date,
            ).getUTCFullYear()}/${item.slug.replace(".md", "")}`}
            className={`grow truncate ${underlinedLink}`}
          >
            {new Date(item.date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </Link>
        ) : (
          <div className="grow truncate">
            {new Date(item.date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
        )}
      </div>
      {item.attributes.event && (
        <div className="text-sm text-neutral-500 flex items-center gap-1.5">
          <IconTicket className="shrink-0" size={16} strokeWidth={1.5} />
          <div className="grow truncate">{item.attributes.event}</div>
        </div>
      )}
      {item.attributes.venue && (
        <div className="text-sm text-neutral-500 flex items-center gap-1.5">
          <IconBuildings className="shrink-0" size={16} strokeWidth={1.5} />
          <div className="grow truncate">{item.attributes.venue}</div>
        </div>
      )}
      {item.attributes.city ? (
        <div className="text-sm text-neutral-500 flex items-center gap-1.5">
          <IconMapPin className="shrink-0" size={16} strokeWidth={1.5} />
          {locationHref ? (
            <Link
              href={locationHref}
              className={`grow truncate ${underlinedLink}`}
            >
              {item.attributes.city}
              {item.attributes.country && `, ${item.attributes.country}`}
            </Link>
          ) : (
            <div className="grow truncate">
              {item.attributes.city}
              {item.attributes.country && `, ${item.attributes.country}`}
            </div>
          )}
        </div>
      ) : (
        <div className="text-sm text-neutral-500 flex items-center gap-1.5">
          <IconDeviceComputerCamera
            className="shrink-0"
            size={16}
            strokeWidth={1.5}
          />
          <div className="grow truncate">Online event</div>
        </div>
      )}
      {children}
    </div>
  );
}
