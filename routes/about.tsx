/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { ExternalLink } from "../components/text/ExternalLink.tsx";

const STARTUPS = [
  {
    icon: "pabio",
    name: "Pabio",
    href: "https://pabio.com",
    start: "2020",
    end: "present",
    description:
      "Rent-to-own furniture in Europe with personalized interior design",
  },
  {
    icon: "oswald-labs",
    name: "Oswald Labs",
    href: "https://oswaldlabs.com",
    start: "2016",
    end: "2020",
    description: "Accessibility technology for the next billion Internet users",
  },
  {
    icon: "melangebox",
    name: "Melangebox",
    href: "https://melangebox.com",
    start: "2017",
    end: "2020",
    description: "Sustainable, high-quality, and affordable fashion for India",
  },
  {
    icon: "class-rebels",
    name: "Class Rebels",
    start: "2014",
    end: "2016",
    description: "Collaborative e-learning platform for CBSE K-12",
  },
  {
    icon: "pickquick",
    name: "PickQuick",
    start: "2012",
    end: "2013",
    description:
      "Buy, sell, or swap university books safely online and on campus",
  },
];

export default function About() {
  return (
    <div class={tw`max-w-screen-md px-4 mx-auto space-y-16 md:px-0`}>
      <section>
        <figure class={tw`mb-12`}>
          <img
            alt="Anand standing on a table with his MacBook in his hand"
            src="https://d33wubrfki0l68.cloudfront.net/41df0551175f4c6716aad2988c37ceb83a342b9e/7b5dc/images/photos/anand-chowdhary.jpg"
            width={2450}
            height={1633}
            className={tw`rounded-lg w-full bg-white border shadow-sm`}
          />
          <figcaption
            class={tw`text-center text-gray-500 text-xs mt-2 inline-flex items-center justify-center w-full`}
          >
            <span>&copy; Name of photographer</span>
            <span
              aria-hidden="true"
              title="Anand standing on a table with his MacBook in his hand"
              class={tw`bg-gray-200 rounded uppercase px-1 ml-2 font-medium cursor-default`}
              style={{ fontSize: "80%" }}
            >
              Alt
            </span>
          </figcaption>
        </figure>
        <header className={tw`mb-5 space-y-5`}>
          <h1
            className={tw`text-4xl font-semibold font-display dark:text-gray-200`}
          >
            About
          </h1>
          <p className={tw`text-xl leading-relaxed`}>
            Anand Chowdhary is a creative technologist and entrepreneur.
          </p>
        </header>
        <div
          className={tw`space-y-5 md:columns-2 copy`}
          style={{ columnCount: 2, columnGap: "2rem" }}
        >
          <p>
            Anand Chowdhary is an engineer, designer, and entrepreneur from New
            Delhi, India, working remotely from Groningen, the Netherlands, as
            the co-founder &amp; CTO of <a href="https://pabio.com">Pabio</a>,
            an interior design rent-to-own furniture company.
          </p>
          <p>
            As an engineer, he's focused on web standards and the JavaScript
            ecosystem. As a designer, he specializes in user interfaces,
            branding, and design systems. And as a serial entrepreneur, he's
            built, scaled, and advised several technology-focused startups
            around the world.
          </p>
          <p>
            He is also an open source contributor, awarded by GitHub as a GitHub
            Star (2021 &amp; 2022), and was listed in Forbes 30 Under 30 (2018)
            and in Het Financieele Dagblad's list of most-innovative
            entrepreneurs and professionals in the Netherlands.
          </p>
          <p>
            From time to time, he speaks at events and writes articles about
            entrepreneurship and technology. He has been featured in
            publications like TechCrunch, Forbes, The Next Web, Hindustan Times,
            and CSS Tricks.
          </p>
        </div>
      </section>
      <section>
        <h2
          className={tw`mt-8 text-2xl font-semibold font-display dark:text-gray-200`}
        >
          Startups founded
        </h2>
        <ul className={tw`mt-6`}>
          {STARTUPS.map(({ name, description, start, end, icon, href }) => (
            <li key={name} className={tw`flex mt-6`}>
              <div
                className={tw`flex items-center justify-center w-12 h-12 p-2 mr-5 bg-white rounded shadow dark:bg-gray-80`}
                role="presentation"
              >
                <svg aria-hidden="true">
                  <use href={`#${icon}`}></use>
                </svg>
              </div>

              <div>
                <h3>
                  <strong className={tw`font-medium dark:text-gray-300`}>
                    {href ? (
                      <ExternalLink href={href}>{name}</ExternalLink>
                    ) : (
                      name
                    )}
                  </strong>
                  <span className={tw`text-gray-500`}>
                    {`, ${start}–${end}`}
                  </span>
                </h3>
                <p className={tw`text-gray-500 dark:text-gray-500`}>
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2
          className={tw`mt-8 text-2xl font-semibold font-display dark:text-gray-200 mb-6`}
        >
          Other work
        </h2>
        {[
          {
            name: "Chowdhary.org",
            href: "https://chowdhary.org",
            description:
              "Chowdhary.org is the home for all my nonprofit work, including Karuna 2020 (food for migrant laborers and masks for frontline and healthcare workers during COVID-19), Made with Love in India (platform to celebrate Indian small businesses and startups), and BharatHacks (two-day hackathon to solve India-specific problems).",
          },
          {
            name: "Early stage startup investments",
            description:
              "I work with early-stage startups as an active angel investor. I also scout seed and Series A investments for funds such as Julian Capital and OSS Capital.",
          },
        ].map(({ name, description, href }) => (
          <article key={name} className={tw`mt-6`}>
            <h3>
              <strong className={tw`font-medium dark:text-gray-300`}>
                {href ? <ExternalLink href={href}>{name}</ExternalLink> : name}
              </strong>
            </h3>
            <p>{description}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
