import { focusStyles } from "@/app/components/external-link";
import AnimatedSignature from "@/app/components/signature";
import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";

export function Header({ pathname }: { pathname: string }) {
  const items = pathname.split("/").filter(Boolean);

  return (
    <div className="flex items-center justify-center mx-auto space-x-8">
      <div className="w-48">
        <ViewTransition name="signature">
          <Link href="/" className={`${focusStyles} flex`}>
            <AnimatedSignature className="w-full" />
          </Link>
        </ViewTransition>
      </div>
      {items.length > 0 && (
        <div className="flex items-center">
          {items.slice(0, 2).map((item, index) => (
            <Link
              key={item}
              href={`/${items.slice(0, index + 1).join("/")}`}
              className={`${focusStyles} uppercase text-lg font-medium font-mono tracking-wider text-neutral-500`}
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
  );
}
