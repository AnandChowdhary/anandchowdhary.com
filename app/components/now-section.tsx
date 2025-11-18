import { ExternalLink, focusStyles } from "@/app/components/external-link";
import Link from "next/link";

export function NowSection() {
  return (
    <section className="space-y-4 max-w-lg mx-auto">
      <h2 className="text-xs uppercase font-medium font-mono tracking-wider text-neutral-500">
        <Link href="/now" className={`${focusStyles}`}>
          /now
        </Link>
      </h2>
      <ul className="list-disc marker:text-neutral-400 space-y-4">
        <li className="font-medium">Working on something new.</li>
        <li>
          Most recently, founded{" "}
          <ExternalLink href="https://firstquadrant.ai" underline={false}>
            <img
              alt="FirstQuadrant logo"
              src="https://avatars.githubusercontent.com/u/122780401?s=48&v=4"
              className="w-4.5 h-4.5 rounded inline-block ml-0.5 mr-1 align-center -translate-y-px"
            />
            <span>FirstQuadrant</span>
          </ExternalLink>
          , an AI sales platform for founders and revenue teams, funded by{" "}
          <ExternalLink
            href="https://www.ycombinator.com/companies/firstquadrant"
            underline={false}
          >
            <img
              alt="Y Combinator logo"
              src="https://pbs.twimg.com/profile_images/1623777064821358592/9CApQWXe_400x400.png"
              className="w-4.5 h-4.5 rounded inline-block ml-0.5 mr-1 align-center -translate-y-px"
            />
            <span>Y Combinator</span>
          </ExternalLink>
          .
        </li>
        <li>
          Contributing to open source during nights and weekends as an
          award-winning{" "}
          <ExternalLink
            href="https://github.com/AnandChowdhary"
            underline={false}
          >
            <img
              alt="GitHub logo"
              src="https://avatars.githubusercontent.com/u/9919?s=200&v=4"
              className="w-4.5 h-4.5 rounded inline-block ml-0.5 mr-1 align-center -translate-y-px"
            />
            <span>GitHub Star</span>
          </ExternalLink>
          .
        </li>
        <li>
          Advising startups, angel investing and doing nonprofit work on the
          side through Chowdhary{" "}
          <ExternalLink href="https://chowdhary.co">.co</ExternalLink> and{" "}
          <ExternalLink href="https://chowdhary.org">.org</ExternalLink>.
        </li>
      </ul>
    </section>
  );
}
