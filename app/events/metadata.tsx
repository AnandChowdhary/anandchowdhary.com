import { Event, generateSlug } from "@/app/api";
import { underlinedLink } from "@/app/components/external-link";
import {
  IconBuildings,
  IconCalendarEvent,
  IconDeviceComputerCamera,
  IconMapPin,
  IconTicket,
} from "@tabler/icons-react";
import Link from "next/link";

export function EventMetadata({
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
  return (
    <div className={`grid grid-cols-2 gap-2.5 pt-2.5 ${className}`}>
      <div className="text-sm text-neutral-500 flex items-center gap-1.5">
        <IconCalendarEvent className="shrink-0" size={16} strokeWidth={1.5} />
        {link ? (
          <Link
            href={`/events/${new Date(
              item.date
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
          {link ? (
            <Link
              href={`/location/${new Date(
                item.date
              ).getUTCFullYear()}/${generateSlug(
                item.attributes.city
              )}-${generateSlug(item.attributes.country ?? "")}`}
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
          <div className="grow truncate">Remote</div>
        </div>
      )}
      {children}
    </div>
  );
}
