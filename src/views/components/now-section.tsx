import { ExternalLink, focusStyles } from "@/views/components/external-link";

export function NowSection() {
  return (
    <section className="space-y-4 max-w-lg mx-auto">
      <h2 className="text-xs uppercase font-medium font-mono tracking-wider text-neutral-500">
        <a href="/now" className={`${focusStyles}`}>
          /now
        </a>
      </h2>
      <ul className="list-disc marker:text-neutral-400 space-y-4">
        <li>
          Building{" "}
          <ExternalLink href="https://sycamore.so" underline={false}>
            <img
              alt="Sycamore logo"
              src="/images/home/sycamore.webp"
              width={18}
              height={18}
              className="w-4.5 h-4.5 rounded inline-block ml-0.5 mr-1 align-center -translate-y-px"
            />
            <span>Sycamore</span>
          </ExternalLink>
          , the enterprise OS for autonomous AI agents, as Head of Product
          and founding team member.
        </li>
        <li>
          Previously, founded and sold{" "}
          <a
            href="/projects/tags/firstquadrant"
            className={`hover:text-neutral-400 ${focusStyles} font-semibold`}
          >
            <img
              alt="FirstQuadrant logo"
              src="/images/home/firstquadrant.webp"
              width={18}
              height={18}
              className="w-4.5 h-4.5 rounded inline-block ml-0.5 mr-1 align-center -translate-y-px"
            />
            <span>FirstQuadrant</span>
          </a>
          , an AI sales platform for founders and revenue teams, funded by{" "}
          <ExternalLink
            href="https://www.ycombinator.com/companies/firstquadrant"
            underline={false}
          >
            <img
              alt="Y Combinator logo"
              src="/images/home/y-combinator.webp"
              width={18}
              height={18}
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
              src="/images/home/github.webp"
              width={18}
              height={18}
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
