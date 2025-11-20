import { Container } from "@/app/components/container";
import {
  ExternalLink,
  focusStyles,
  hoverLink,
  underlinedLink,
} from "@/app/components/external-link";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { buildScreenshotOpenGraphImageUrl } from "@/app/lib/opengraph";
import { marked } from "marked";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About / Anand Chowdhary",
  description:
    "Anand Chowdhary is a technology entrepreneur, engineer, and designer from New Delhi, India, living in Utrecht, the Netherlands.",
  openGraph: {
    images: [{ url: buildScreenshotOpenGraphImageUrl("/about") }],
  },
};

export default async function About() {
  return (
    <Container>
      <Header pathname="/about" />
      <div className="grid md:grid-cols-2 max-w-3xl mx-auto gap-10">
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
              title="Anand smiling with his hands crossed looking to the side"
              className="bg-gray-200 dark:bg-gray-800 rounded uppercase px-1 ml-2 font-medium cursor-default"
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
              <strong className="font-medium">
                He is currently on a short break.
              </strong>{" "}
              Previously, he founded FirstQuadrant, an AI sales platform funded
              by Y Combinator.
            </p>
            <p>
              He is from New Delhi, India, and splits his time living in
              Utrecht, the Netherlands, and San Francisco, California, with his
              wife{" "}
              <ExternalLink href="https://sukritikapoor.com">
                Sukriti Kapoor
              </ExternalLink>
              .
            </p>
            <p>
              As an engineer, he&rsquo;s focused on web standards and the
              JavaScript ecosystem. As a designer, he specializes in user
              interfaces, branding, and design systems. And as a serial
              entrepreneur, he&rsquo;s built, scaled, and advised several
              technology-focused startups around the world.
            </p>
            <p>
              He is also an award-winning open source contributor (
              <Link className={underlinedLink} href="/press/2021/github">
                GitHub Stars
              </Link>
              , 2021–2025), and was listed in{" "}
              <Link className={underlinedLink} href="/press/2018/forbes-asia">
                Forbes 30 Under 30
              </Link>{" "}
              (Asia 2018). He also makes angel investments through{" "}
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
              Times, het Financieele Dagblad, and CSS Tricks.
            </p>
          </div>
        </section>
      </div>
      <div className="max-w-3xl mx-auto space-y-6">
        <h2 className="text-xl font-medium">Startups</h2>
        <ul className="space-y-6">
          {[
            {
              label: "FirstQuadrant",
              years: [2023, 2025],
              color: "#333333",
              icon: (
                <svg viewBox="0 0 144 144">
                  <path fill="currentColor" d="M62 0h20v144H62z" />
                  <path fill="currentColor" d="M144 62v20H0V62z" />
                  <path fill="currentColor" d="m119 11 14 14-51 51-14-14z" />
                </svg>
              ),
              url: "https://firstquadrant.ai",
              description:
                "All-in-one AI sales platform for automating prospecting, qualification, outbound campaigns, nurturing relationships, pipeline management, and more.",
            },
            {
              label: "Pabio",
              years: [2020, 2022],
              color: "#ff6b6b",
              icon: (
                <svg viewBox="0 0 900 256">
                  <path
                    d="M0 11v241h55v-82h45c56 0 81-39 81-79s-25-80-81-80H0zm55 111V59h42c21 0 29 16 29 32 0 15-8 31-29 31H55zm270-14a65 65 0 00-52-23c-46 0-78 34-78 85s32 86 78 86c20 0 40-9 52-25v21h51V89h-51v19zm-40 100c-22 0-38-18-38-38 0-21 16-38 38-38 21 0 38 17 38 38 0 20-17 38-38 38zM522 85c-16 0-38 6-50 22V0h-52v252h52v-18c12 15 34 22 50 22 41 0 80-33 80-86s-39-85-80-85zm-10 123c-20 0-38-17-38-38s18-38 38-38 37 17 37 38-17 38-37 38zM662 64c18 0 32-13 32-30S680 4 662 4c-17 0-32 13-32 30s15 30 32 30zm26 188V89h-52v163h52zm123 4c47 0 89-34 89-86 0-51-42-85-89-85s-89 34-89 85c0 52 42 86 89 86zm0-48c-20 0-36-15-36-38 0-22 16-38 36-38s36 16 36 38c0 23-16 38-36 38z"
                    fill="currentColor"
                  />
                </svg>
              ),
              url: "/projects/tags/pabio",
              description:
                "Personalized interior design with high-quality furniture rental paid monthly in Europe, enabling customers to furnish their homes affordably and flexibly, funded by Y Combinator.",
            },
            {
              label: "Oswald Labs",
              years: [2016, 2019],
              color: "#007bff",
              icon: (
                <svg viewBox="0 0 116 116">
                  <g fill="currentColor" fillRule="evenodd">
                    <path d="M58 116A58 58 0 1 1 58 0a58 58 0 0 1 0 116zm1-11a47 47 0 1 0 0-95 47 47 0 0 0 0 95z" />
                    <circle cx="58.5" cy="57.5" r="35.5" />
                  </g>
                </svg>
              ),
              url: "/projects/tags/oswald-labs",
              description:
                "Award-winning accessibility technology company that builds products and platforms to promote digital inclusion for people with disabilities, like web accessibility tools.",
            },
            {
              label: "Melangebox",
              years: [2018, 2019],
              color: "#4c9bd8",
              icon: (
                <svg viewBox="0 0 350 350">
                  <path
                    fill="currentColor"
                    d="M350 76v3l-41 20-102-47-1 1 28 37a16655 16655 0 0 1-28 14l-51-9-1 1-32-5 102 49-1 3-47 24A20730 20730 0 0 1 0 80v-3l59-25c35 6 69 12 104 16a1028 1028 0 0 1-31-47 1468 1468 0 0 0 52-20l166 75Z"
                  />
                  <path
                    fill="currentColor"
                    d="M0 99c56 27 112 54 168 83l1 168h-4c-55-29-110-56-165-82V99ZM350 99v169c-56 26-111 53-165 82h-4c-1-57 0-113 1-168 55-29 111-56 168-83Z"
                  />
                </svg>
              ),
              url: "/projects/2017/melangebox",
              description:
                "Sustainable fashion brand and ecommerce tech company offering affordable, high-quality apparel and lifestyle products, with a focus on eco-friendly practices and inclusivity.",
            },
            {
              label: "Class Rebels",
              color: "#00c3a0",
              years: [2014, 2016],
              icon: (
                <svg viewBox="0 0 256 256">
                  <path
                    fillRule="evenodd"
                    fill="currentColor"
                    d="M87 0h86c-3 8-6 15-11 22l-26 1v66c16-8 33-13 51-15 16-3 32 0 47 8 6 7 11 16 13 26v30l-7 31c-4 8-8 16-13 22-12 7-24 7-36 0v1l27 31 1 33h-4l-67-85c4-7 9-12 15-16l14 8c33 18 46 8 39-29-5-29-22-40-50-35-11 3-21 7-30 12l-1 127c-8 5-14 11-20 18h-3l-1-90c-18 15-37 26-59 34-25 6-39-3-44-27v-42c6-35 26-53 60-54 15 0 29 3 43 9l1-63H75l2-7L87 0ZM70 102c14-1 28 1 42 5l-1 39c-16 13-34 23-53 30-18 5-27-1-27-18 0-14 3-28 10-42 8-9 17-14 29-14Z"
                  />
                </svg>
              ),
              url: "/projects/2014/classrebels",
              description:
                "Edtech platform that aimed to connect students and teachers online, enabling remote class communication, updates on activities, and access to course and peer performance information.",
            },
          ].map((about) => (
            <li key={about.label} className="flex items-start gap-5 relative">
              <div
                className="shrink-0 rounded-xl shadow-xs p-2 bg-background flex items-center justify-center text-white size-12"
                style={{ backgroundColor: about.color }}
              >
                {about.icon}
              </div>
              {"smallIcon" in about && typeof about.smallIcon === "string" && (
                <div
                  className="shrink-0 rounded shadow-xs bg-background flex items-center justify-center size-6 absolute top-8.5 left-8.5 z-10 border border-gray-200 dark:border-gray-800 overflow-hidden"
                  style={{ backgroundColor: "#fff" }}
                >
                  <img
                    alt=""
                    src={about.smallIcon}
                    className="size-full object-contain"
                  />
                </div>
              )}
              <div className="space-y-1 grow">
                <div className="flex items-center gap-4">
                  {about.url.startsWith("http") ? (
                    <ExternalLink
                      href={about.url}
                      className="font-medium full-link"
                      underline={false}
                    >
                      {about.label}
                    </ExternalLink>
                  ) : (
                    <Link
                      href={about.url}
                      className={`${focusStyles} ${hoverLink} font-medium full-link`}
                    >
                      {about.label}
                    </Link>
                  )}
                  {"tag" in about && typeof about.tag === "string" && (
                    <span className="bg-gray-200 dark:bg-gray-800 text-gray-500 rounded uppercase font-medium text-[70%] px-1 tracking-wider">
                      {about.tag}
                    </span>
                  )}
                  <p className="text-sm text-gray-500">
                    {about.years.length > 1
                      ? about.years.join("–")
                      : `${about.years[0]}–present`}
                  </p>
                </div>
                <p
                  className="line-clamp-2 text-sm text-neutral-500 pointer-events-none"
                  style={{
                    maskImage:
                      "linear-gradient(to bottom, black 0%, black 50%, transparent 50%, transparent 100%), linear-gradient(to right, black 70%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, black 0%, black 50%, transparent 50%, transparent 100%), linear-gradient(to right, black 70%, transparent 100%)",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: marked.parseInline(about.description),
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </Container>
  );
}
