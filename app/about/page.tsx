import {
  ExternalLink,
  focusStyles,
  underlinedLink,
} from "@/app/components/external-link";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About / Anand Chowdhary",
  description:
    "Anand Chowdhary is a technology entrepreneur, engineer, and designer from New Delhi, India, living in Utrecht, the Netherlands.",
};

export default async function About() {
  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-24 sm:p-20 space-y-32">
      <Header pathname="/about" />
      <div className="grid grid-cols-2 max-w-3xl mx-auto gap-10">
        <figure className="w-full">
          <img
            alt="Anand standing on a table with his MacBook in his hand at an office"
            src="/anand.jpg"
            width={1067}
            height={1317}
            className="w-full bg-white rounded-lg shadow-sm"
          />
          <figcaption className="text-center text-gray-500 text-xs mt-2 inline-flex items-center justify-center w-full">
            <span>
              &copy;{" "}
              <a className={focusStyles} href="https://rikkertharink.nl">
                Rikkert Harink
              </a>
            </span>
            <span
              aria-hidden="true"
              title="Anand standing on a table with his MacBook at an office"
              className="bg-gray-200 rounded uppercase px-1 ml-2 font-medium cursor-default"
              style={{ fontSize: "80%" }}
            >
              Alt
            </span>
          </figcaption>
        </figure>
        <section className="space-y-4">
          <div className="space-y-5">
            <p className="text-xl font-medium">
              Anand Chowdhary is a technology entrepreneur, engineer, and
              designer.
            </p>
            <p>
              He is from New Delhi, India, and lives in Utrecht, the
              Netherlands, with his wife{" "}
              <ExternalLink href="https://sukritikapoor.com">
                Sukriti Kapoor
              </ExternalLink>
              , and works in San Francisco, California. He is the co-founder,
              CTO, and CPO of AI sales platform{" "}
              <ExternalLink href="https://firstquadrant.ai">
                FirstQuadrant
              </ExternalLink>
              .
            </p>
            <p>
              As an engineer, he's focused on web standards and the JavaScript
              ecosystem. As a designer, he specializes in user interfaces,
              branding, and design systems. And as a serial entrepreneur, he's
              built, scaled, and advised several technology-focused startups
              around the world.
            </p>
            <p>
              He is also an open source contributor, awarded by GitHub as a{" "}
              <a className={underlinedLink} href="/press/2021/github">
                GitHub Star
              </a>{" "}
              (2021–2023), and was listed in{" "}
              <a className={underlinedLink} href="/press/2018/forbes-asia">
                Forbes 30 Under 30
              </a>{" "}
              (Asia 2018) and in Het Financieele Dagblad's list of
              most-innovative entrepreneurs and professionals in the
              Netherlands.
            </p>
            <p>
              He also makes angel investments through{" "}
              <ExternalLink href="https://chowdhary.co">
                Chowdhary.co
              </ExternalLink>{" "}
              and does non-profit work through{" "}
              <ExternalLink href="https://chowdhary.org">
                Chowdhary.org
              </ExternalLink>
              .
            </p>
            <p>
              From time to time, he speaks at events and writes articles about
              entrepreneurship and technology. He has been featured in
              publications like TechCrunch, Forbes, The Next Web, Hindustan
              Times, and CSS Tricks.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
