import { Event } from "@/app/api";
import { underlinedLink } from "@/app/components/external-link";
import {
  IconBuilding,
  IconCalendarEvent,
  IconMapPin,
  IconTicket,
} from "@tabler/icons-react";
import Link from "next/link";

export function EventMetadata({
  item,
  className,
  children,
}: {
  item: Event;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`grid grid-cols-2 gap-2.5 pt-2.5 ${className}`}>
      <div className="text-sm text-neutral-500 flex items-center gap-1.5">
        <IconCalendarEvent className="shrink-0" size={16} strokeWidth={1.5} />
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
      </div>
      {item.attributes.event && (
        <div className="text-sm text-neutral-500 flex items-center gap-1.5">
          <IconTicket className="shrink-0" size={16} strokeWidth={1.5} />
          <div className="grow truncate">{item.attributes.event}</div>
        </div>
      )}
      {item.attributes.venue && (
        <div className="text-sm text-neutral-500 flex items-center gap-1.5">
          <IconBuilding className="shrink-0" size={16} strokeWidth={1.5} />
          <div className="grow truncate">{item.attributes.venue}</div>
        </div>
      )}
      {item.attributes.city && (
        <div className="text-sm text-neutral-500 flex items-center gap-1.5">
          <IconMapPin className="shrink-0" size={16} strokeWidth={1.5} />
          <div className="grow truncate">
            {item.attributes.city}
            {item.attributes.country && `, ${item.attributes.country}`}
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
