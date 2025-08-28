import { NavigationLink } from "@/app/components/navigation-link";

interface NavigationItem {
  href: string;
  label: string;
}

interface NavigationFooterProps {
  previous?: NavigationItem;
  next?: NavigationItem;
}

export function NavigationFooter({ previous, next }: NavigationFooterProps) {
  return (
    <footer className="pt-8 grid md:grid-cols-2 gap-4">
      {previous ? (
        <div className="flex justify-start">
          <NavigationLink
            href={previous.href}
            label={previous.label}
            direction="previous"
          />
        </div>
      ) : (
        <div className="w-4" />
      )}
      {next ? (
        <div className="flex justify-end">
          <NavigationLink
            href={next.href}
            label={next.label}
            direction="next"
          />
        </div>
      ) : (
        <div className="w-4" />
      )}
    </footer>
  );
}