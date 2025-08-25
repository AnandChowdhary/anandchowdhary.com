import { Video } from "@/app/api";
import { ExternalLink } from "@/app/components/external-link";
import {
  IconBuilding,
  IconCalendarEvent,
  IconClock,
  IconMapPin,
  IconPlayerPlay,
} from "@tabler/icons-react";

export function VideoMetadata({
  item,
  className,
  children,
  compact = false,
}: {
  item: Video;
  className?: string;
  children?: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-3 gap-1.5 md:gap-2.5 pt-2.5 ${className}`}
    >
      <div className="text-sm text-neutral-500 flex items-center gap-1.5">
        <IconCalendarEvent className="shrink-0" size={16} strokeWidth={1.5} />
        <div className="grow truncate">
          {new Date(item.date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
      </div>
      {!compact && item.duration && (
        <div className="text-sm text-neutral-500 flex items-center gap-1.5">
          <IconClock className="shrink-0" size={16} strokeWidth={1.5} />
          <div className="grow truncate">{item.duration}</div>
        </div>
      )}
      {item.publisher && (
        <div className="text-sm text-neutral-500 flex items-center gap-1.5">
          <IconBuilding className="shrink-0" size={16} strokeWidth={1.5} />
          <div className="grow truncate">{item.publisher}</div>
        </div>
      )}
      {!compact && item.city && item.country && (
        <div className="text-sm text-neutral-500 flex items-center gap-1.5">
          <IconMapPin className="shrink-0" size={16} strokeWidth={1.5} />
          <div className="grow truncate">
            {item.city}, {item.country}
          </div>
        </div>
      )}
      {!compact && item.href && (
        <div className="text-sm text-neutral-500 flex items-center gap-1.5">
          <IconPlayerPlay className="shrink-0" size={16} strokeWidth={1.5} />
          <ExternalLink href={item.href} className="grow truncate">
            Watch video
          </ExternalLink>
        </div>
      )}
      {children}
    </div>
  );
}
