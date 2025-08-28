import { focusStyles } from "@/app/components/external-link";
import { NavigationLinks } from "@/app/components/navigation-links";
import AnimatedSignature from "@/app/components/signature";
import { marked } from "marked";
import { markedSmartypants } from "marked-smartypants";
import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";

marked.use(markedSmartypants());

export function Header({
  pathname,
  description,
  source,
  api,
  readme,
}: {
  pathname: string;
  description?: string;
  source?: string;
  api?: string;
  readme?: string;
}) {
  const items = pathname.split("/").filter(Boolean);

  return (
    <div>
      <div className="flex items-center justify-center mx-auto space-x-4">
        <div className="w-48">
          <ViewTransition name="signature">
            <Link href="/" className={`${focusStyles} flex`}>
              <AnimatedSignature className="w-full" />
            </Link>
          </ViewTransition>
          <span className="sr-only">Anand Chowdhary</span>
        </div>
        {items.length > 0 && (
          <div className="flex items-center">
            {items.slice(0, 2).map((item, index) => (
              <Link
                key={item}
                href={`/${items.slice(0, index + 1).join("/")}`}
                className={`${focusStyles} uppercase text-lg font-medium font-mono tracking-wider text-neutral-500 hover:text-neutral-600`}
              >
                <span className="mx-2 text-neutral-300 dark:text-neutral-800">
                  /
                </span>
                {item}
              </Link>
            ))}
          </div>
        )}
      </div>
      {description && (
        <div
          className="text-sm text-neutral-500 max-w-md mx-auto mt-8 text-center space-y-2 prose dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: marked.parse(description) }}
        />
      )}
      <NavigationLinks source={source} api={api} readme={readme} />
    </div>
  );
}
