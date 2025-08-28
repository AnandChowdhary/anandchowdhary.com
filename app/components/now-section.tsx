import { ExternalLink } from "@/app/components/external-link";

export function NowSection() {
  return (
    <section className="space-y-4 max-w-lg mx-auto">
      <h2 className="text-xs uppercase font-medium font-mono tracking-wider text-neutral-500">
        /now
      </h2>
      <ul className="list-disc marker:text-neutral-400 space-y-4">
        <li>
          Building{" "}
          <ExternalLink href="https://firstquadrant.ai" underline={false}>
            <img
              alt="FirstQuadrant logo"
              src="https://avatars.githubusercontent.com/u/122780401?s=48&v=4"
              className="w-4.5 h-4.5 rounded inline-block mr-1 align-center -translate-y-px"
            />
            <span>FirstQuadrant</span>
          </ExternalLink>
          , an AI sales platform for founders and revenue teams, funded by Y
          Combinator.
        </li>
        <li>
          Contributing to open source during nights and weekends as an
          award-winning GitHub Star.
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
