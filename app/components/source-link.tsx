import { ExternalLink } from "@/app/components/external-link";
import { IconBrandGithub } from "@tabler/icons-react";

export function SourceLink({ href }: { href: string }) {
  return (
    <ExternalLink
      href={href}
      className="flex items-center gap-1 font-medium"
      underline={false}
    >
      <IconBrandGithub className="shrink-0" size={16} strokeWidth={1.5} />
      Source
    </ExternalLink>
  );
}
