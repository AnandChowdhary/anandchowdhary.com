import { ExternalLink } from "@/app/components/external-link";
import { IconApi, IconBook2 } from "@tabler/icons-react";
import { SourceLink } from "./source-link";

interface NavigationLinksProps {
  source?: string;
  api?: string;
  readme?: string;
  className?: string;
}

export function NavigationLinks({
  source,
  api,
  readme,
  className,
}: NavigationLinksProps) {
  if (!source && !api && !readme) return null;

  return (
    <nav
      className={`text-xs text-neutral-500 max-w-md mx-auto mt-4 text-center flex items-center justify-center gap-4 ${className}`}
    >
      {source && <SourceLink href={source} />}
      {api && (
        <ExternalLink
          href={api}
          className="flex items-center gap-1 font-medium"
          underline={false}
        >
          <IconApi size={16} strokeWidth={1.5} />
          API
        </ExternalLink>
      )}
      {readme && (
        <ExternalLink
          href={readme}
          className="flex items-center gap-1 font-medium"
          underline={false}
        >
          <IconBook2 size={16} strokeWidth={1.5} />
          LLMs
        </ExternalLink>
      )}
    </nav>
  );
}
