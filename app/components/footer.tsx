import { focusStyles } from "@/app/components/external-link";

export function Footer() {
  return (
    <footer className="text-center space-y-8">
      <p className="text-xs uppercase font-medium font-mono tracking-wider text-neutral-500">
        &copy; {new Date().getUTCFullYear()} Anand Chowdhary
      </p>
      <p className="text-sm text-neutral-500 max-w-sm mx-auto">
        Anand Chowdhary is a technology entrepreneur, engineer, and designer
        from New Delhi, India, based in Utrecht, the Netherlands and San
        Francisco, California.
      </p>
      <div className="flex flex-wrap gap-x-2.5 gap-y-2 lg:gap-x-4 justify-center text-sm max-w-xl mx-auto">
        <a className={focusStyles} href="/">
          Home
        </a>
        <a className={focusStyles} href="/about">
          About
        </a>
        <a className={focusStyles} href="/archive">
          Archive
        </a>
        <a className={focusStyles} href="/life">
          Life
        </a>
        <a className={focusStyles} href="/blog">
          Blog
        </a>
        <a className={focusStyles} href="/notes">
          Notes
        </a>
        <a className={focusStyles} href="/events">
          Events
        </a>
        <a className={focusStyles} href="/open-source">
          Open source
        </a>
        <a className={focusStyles} href="/projects">
          Projects
        </a>
        <a className={focusStyles} href="/mentoring">
          Mentoring
        </a>
        <a className={focusStyles} href="/press">
          Press
        </a>
        <a className={focusStyles} href="/videos">
          Videos
        </a>
        <a className={focusStyles} href="/versions">
          Versions
        </a>
        <a className={focusStyles} href="/contact">
          Contact
        </a>
      </div>
      <div className="flex flex-wrap gap-x-2.5 gap-y-2 lg:gap-x-4 justify-center text-sm">
        {Array.from({ length: 2025 - 2009 + 1 }, (_, i) => {
          const year = 2009 + i;
          return (
            <a className={focusStyles} href={`/archive/${year}`} key={year}>
              {year}
            </a>
          );
        })}
      </div>
    </footer>
  );
}
