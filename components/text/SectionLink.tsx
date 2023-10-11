import IconChevronRight from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/chevron-right.tsx";
import { FunctionComponent } from "preact";

export const SectionLink: FunctionComponent<{
  label: string;
  href: string;
}> = ({ label, href }) => {
  return (
    <a
      href={href}
      className="inline-flex items-center space-x-1 font-medium text-gray-800 transition hover:text-gray-900 group"
    >
      <span>{label}</span>
      <IconChevronRight class="w-4 h-4" />
    </a>
  );
};
