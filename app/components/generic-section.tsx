import { focusStyles } from "@/app/components/external-link";
import Link from "next/link";

export interface GenericItem {
  slug: string;
  path: string;
  source: string;
  title: string;
  date: string;
  excerpt: string;
  emoji: string;
  attributes: Record<string, unknown>;
}

interface GenericSectionProps<T extends GenericItem> {
  title: string;
  subtitle: string;
  items: T[];
  description: string;
  linkText: string;
  getItemTitle: (item: T) => React.ReactNode;
  getItemSubtitle: (item: T) => React.ReactNode;
}

export function GenericSection<T extends GenericItem>({
  title,
  subtitle,
  items,
  description,
  linkText,
  getItemTitle,
  getItemSubtitle,
}: GenericSectionProps<T>) {
  return (
    <GenericSectionContainer
      title={title}
      subtitle={subtitle}
      description={description}
      linkText={linkText}
    >
      <ul className="list-disc marker:text-neutral-400 space-y-4">
        {items.slice(0, 3).map((item) => (
          <li key={item.slug}>
            <div className="truncate">{getItemTitle(item)}</div>
            <div className="text-sm text-neutral-500 overflow-hidden">
              <div
                className="whitespace-nowrap pointer-events-none"
                style={{
                  maskImage:
                    "linear-gradient(to right, black 70%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to right, black 70%, transparent 100%)",
                }}
              >
                {getItemSubtitle(item)}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </GenericSectionContainer>
  );
}

export function GenericSectionContainer<T extends GenericItem>({
  title,
  subtitle,
  children,
  description,
  linkText,
}: {
  children: React.ReactNode;
} & Pick<
  GenericSectionProps<T>,
  "title" | "subtitle" | "description" | "linkText"
>) {
  return (
    <section className="space-y-4 relative group">
      <div className="absolute -z-10 -top-4 -bottom-8 -right-8 -left-8 bg-neutral-100 dark:bg-neutral-900 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <h2 className="text-xs uppercase font-medium font-mono tracking-wider text-neutral-500">
        <Link
          href={`/${title.toLowerCase()}`}
          className={`${focusStyles} full-link z-10`}
        >
          {subtitle}
        </Link>
      </h2>
      {children}
      <p className="text-xs text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        {description}{" "}
        <strong className="font-medium text-neutral-800 dark:text-neutral-200">
          {linkText} ▸
        </strong>
      </p>
    </section>
  );
}
