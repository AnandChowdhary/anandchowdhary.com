import { focusStyles } from "@/app/components/external-link";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";

interface NavigationLinkProps {
  href: string;
  label: string;
  direction: "previous" | "next";
}

export function NavigationLink({
  href,
  label,
  direction,
}: NavigationLinkProps) {
  const isPrevious = direction === "previous";

  return (
    <Link
      href={href}
      className={`flex items-center gap-1 ${focusStyles} justify-center bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 py-1 ${isPrevious ? "pl-2 pr-4" : "pr-2 pl-4"} rounded-full min-w-0 w-auto`}
    >
      {isPrevious && (
        <IconChevronLeft strokeWidth={1.5} className="h-4 shrink-0" />
      )}
      <div
        className="grow truncate"
        style={{
          maskImage: "linear-gradient(to right, black 70%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, black 70%, transparent 100%)",
        }}
      >
        {label}
      </div>
      {!isPrevious && (
        <IconChevronRight strokeWidth={1.5} className="h-4 shrink-0" />
      )}
    </Link>
  );
}
