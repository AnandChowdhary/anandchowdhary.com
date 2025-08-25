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
        <a className={linkStyles} href="/">
          Home
        </a>
        <a className={linkStyles} href="/about">
          About
        </a>
        <a className={linkStyles} href="/archive">
          Archive
        </a>
        <a className={linkStyles} href="/life">
          Life
        </a>
        <a className={linkStyles} href="/blog">
          Blog
        </a>
        <a className={linkStyles} href="/notes">
          Notes
        </a>
        <a className={linkStyles} href="/events">
          Events
        </a>
        <a className={linkStyles} href="/open-source">
          Open source
        </a>
        <a className={linkStyles} href="/projects">
          Projects
        </a>
        <a className={linkStyles} href="/mentoring">
          Mentoring
        </a>
        <a className={linkStyles} href="/press">
          Press
        </a>
        <a className={linkStyles} href="/videos">
          Videos
        </a>
        <a className={linkStyles} href="/versions">
          Versions
        </a>
        <a className={linkStyles} href="/contact">
          Contact
        </a>
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
            <a className={linkStyles} href={`/archive/${year}`} key={year}>
              {year}
            </a>
          );
        })}
      </div>
    </footer>
  );
}
