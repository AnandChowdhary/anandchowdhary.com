export const focusStyles =
  "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-300 rounded";

export function ExternalLink({
  className,
  children,
  href,
  underline = true,
}: {
  className?: string;
  children: React.ReactNode;
  href: string;
  underline?: boolean;
}) {
  const url = new URL(href);
  url.searchParams.set("utm_source", "anandchowdhary.com");

  return (
    <a
      href={url.toString()}
      target="_blank"
      rel="noopener noreferrer"
      className={`hover:text-neutral-500 ${focusStyles} ${
        underline
          ? "underline underline-offset-2 decoration-1"
          : "font-semibold"
      } ${className}`}
    >
      {children}
    </a>
  );
}
