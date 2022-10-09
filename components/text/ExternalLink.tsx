import { FunctionComponent } from "preact";

export const ExternalLink: FunctionComponent<{
  href: string;
  class?: string;
}> = ({ href, class: className, children }) => {
  const url = new URL(href);
  url.searchParams.append("utm_source", "anandchowdhary.com");

  return (
    <a
      href={url.toString()}
      target="_blank"
      rel="noopener noreferrer"
      class={`${className} ${`space-x-1`}`}
    >
      <span>{children}</span>
      <svg
        class="inline opacity-50"
        stroke="currentColor"
        fill="none"
        stroke-width="0"
        viewBox="0 0 24 24"
        height="0.75em"
        width="0.75em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>(external link)</title>
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </a>
  );
};
