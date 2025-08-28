import {
  ExternalLink,
  focusStyles,
  hoverLink,
} from "@/app/components/external-link";
import AnimatedSignature from "@/app/components/signature";
import { IconBrandX, IconHeart } from "@tabler/icons-react";
import Link from "next/link";

const linkStyles = `${focusStyles} ${hoverLink}`;

export function Footer() {
  return (
    <footer className="text-center space-y-8">
      <div className="mx-auto w-px bg-neutral-700 h-16" />
      <div className="w-24 mx-auto">
        <span className="sr-only">Anand Chowdhary</span>
        <Link href="/" className={`${linkStyles} flex`}>
          <AnimatedSignature className="w-full" />
        </Link>
      </div>
      <p className="text-xs uppercase font-medium font-mono tracking-wider text-neutral-500">
        <ExternalLink href="https://madewithloveinindia.org" underline={false}>
          Made with{" "}
          <IconHeart
            className="inline-block w-4 h-4 align-middle -mt-1"
            aria-label="Love"
          />{" "}
          by Anand Chowdhary
        </ExternalLink>
      </p>
      <p className="text-sm text-neutral-500 max-w-sm mx-auto">
        Anand Chowdhary is a technology entrepreneur, engineer, and designer
        from New Delhi, India, based in Utrecht, the Netherlands and San
        Francisco, California.
      </p>
      <div className="flex flex-wrap gap-x-2.5 gap-y-2 lg:gap-x-4 justify-center text-sm max-w-xl mx-auto">
        <Link className={linkStyles} href="/">
          Home
        </Link>
        <Link className={linkStyles} href="/about">
          About
        </Link>
        <Link className={linkStyles} href="/archive">
          Archive
        </Link>
        <Link className={linkStyles} href="/life">
          Life
        </Link>
        <Link className={linkStyles} href="/blog">
          Blog
        </Link>
        <Link className={linkStyles} href="/notes">
          Notes
        </Link>
        <Link className={linkStyles} href="/events">
          Events
        </Link>
        <Link className={linkStyles} href="/open-source">
          Open source
        </Link>
        <Link className={linkStyles} href="/projects">
          Projects
        </Link>
        <Link className={linkStyles} href="/mentoring">
          Mentoring
        </Link>
        <Link className={linkStyles} href="/press">
          Press
        </Link>
        <Link className={linkStyles} href="/videos">
          Videos
        </Link>
        <Link className={linkStyles} href="/themes">
          Themes
        </Link>
        <Link className={linkStyles} href="/versions">
          Versions
        </Link>
        <Link className={linkStyles} href="/contact">
          Contact
        </Link>
        <ExternalLink href="https://x.com/AnandChowdhary" underline={false}>
          <IconBrandX
            className="inline-block w-4 h-4 align-middle -mt-1"
            strokeWidth={1.5}
          />
          <span className="sr-only">X (formally Twitter)</span>
        </ExternalLink>
      </div>
      <div className="flex flex-wrap gap-x-2.5 gap-y-2 lg:gap-x-4 justify-center text-sm">
        {Array.from({ length: 2025 - 2009 + 1 }, (_, i) => {
          const year = 2009 + i;
          return (
            <Link className={linkStyles} href={`/archive/${year}`} key={year}>
              {year}
            </Link>
          );
        })}
      </div>
    </footer>
  );
}
