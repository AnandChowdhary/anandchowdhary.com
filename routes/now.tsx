import { Breadcrumbs } from "../components/data/Breadcrumbs.tsx";
import { SectionTitle } from "../components/data/SectionTitle.tsx";
import { ExternalLink } from "../components/text/ExternalLink.tsx";

export default function Now() {
  return (
    <div class="max-w-screen-md px-4 mx-auto space-y-16 md:px-0">
      <section>
        <Breadcrumbs items={[{ href: "/now", title: "Now" }]} />
        <SectionTitle
          title="/now"
          description="I'm building FirstQuadrant, an AI sales platform funded by Y Combinator."
        />
        <div className="space-y-5 mt-6 two-columns">
          <p>
            In 2023, my cofounder Carlo and I shut down our rent-to-own
            furniture company Pabio and started a new startup, FirstQuadrant.
            These days, that is my main focus. On the side, I am also working on
            open source projects and sometimes speak at conferences.
          </p>
          <p>
            I started angel investing in early-stage startups in 2024, and my
            wife Sukriti and I also bought a house, so we&rsquo;re still getting
            settled in. This year, Carlo and I are entirely focused on hitting
            our growth targets for FirstQuadrant and building out the platform,
            so you can also visit our{" "}
            <ExternalLink href="https://firstquadrant.ai/changelog">
              Changelog
            </ExternalLink>{" "}
            to see what I am shipping there. I try and update the changelog
            every Monday.
          </p>
          <p>
            I am a fanatic about tracking my life data, which is open sourced on
            GitHub and available on this website. You can see my most recently
            trips, current location (yes, really!), and health and fitness data
            such as daily calories burned and hours slept, on the{" "}
            <a href="/life">Life</a> page. I also have a yearly theme and
            quarterly OKRs, which are also available in the same place.
          </p>
          <p>
            Similarly, I also track my the books I am currently reading and the
            music I am listening to. For the latest updates about my reading,
            writing, and other projects, you can visit{" "}
            <a href="/archive">Archive</a>.
          </p>
          <p>
            Do you want to tell the world what you are currently up to? Visit{" "}
            <ExternalLink href="https://nownownow.com">
              nownownow.com
            </ExternalLink>{" "}
            to see other sites with a /now page and add yours!
          </p>
        </div>
      </section>
    </div>
  );
}
