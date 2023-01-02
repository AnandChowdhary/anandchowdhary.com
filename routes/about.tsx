import { Handlers, PageProps } from "https://deno.land/x/fresh@1.1.1/server.ts";
import IconBrandGithub from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/brand-github.tsx";
import { Breadcrumbs } from "../components/data/Breadcrumbs.tsx";
import { ExternalLink } from "../components/text/ExternalLink.tsx";
import { render } from "../utils/markdown.ts";

interface AboutData {
  readme: string;
}

export const handler: Handlers<AboutData> = {
  async GET(_, context) {
    const readme = await (
      await fetch(
        "https://raw.githubusercontent.com/AnandChowdhary/readme/main/README.md"
      )
    ).text();
    return context.render({ readme });
  },
};

const STARTUPS = [
  {
    icon: (
      <svg viewBox="0 0 900 256">
        <path
          d="M0 11v241h55v-82h45c56 0 81-39 81-79s-25-80-81-80H0zm55 111V59h42c21 0 29 16 29 32 0 15-8 31-29 31H55zm270-14a65 65 0 00-52-23c-46 0-78 34-78 85s32 86 78 86c20 0 40-9 52-25v21h51V89h-51v19zm-40 100c-22 0-38-18-38-38 0-21 16-38 38-38 21 0 38 17 38 38 0 20-17 38-38 38zM522 85c-16 0-38 6-50 22V0h-52v252h52v-18c12 15 34 22 50 22 41 0 80-33 80-86s-39-85-80-85zm-10 123c-20 0-38-17-38-38s18-38 38-38 37 17 37 38-17 38-37 38zM662 64c18 0 32-13 32-30S680 4 662 4c-17 0-32 13-32 30s15 30 32 30zm26 188V89h-52v163h52zm123 4c47 0 89-34 89-86 0-51-42-85-89-85s-89 34-89 85c0 52 42 86 89 86zm0-48c-20 0-36-15-36-38 0-22 16-38 36-38s36 16 36 38c0 23-16 38-36 38z"
          fill="#ff6b6b"
        />
      </svg>
    ),
    name: "Pabio",
    position: "co-founder & CTO",
    href: "https://pabio.com",
    start: "2020",
    end: "present",
    description:
      "Rent-to-own furniture in Europe with personalized interior design",
  },
  {
    icon: (
      <svg viewBox="0 0 116 116">
        <g fill="#007bff" fill-rule="evenodd">
          <path d="M58 116A58 58 0 1 1 58 0a58 58 0 0 1 0 116zm1-11a47 47 0 1 0 0-95 47 47 0 0 0 0 95z" />
          <circle cx="58.5" cy="57.5" r="35.5" />
        </g>
      </svg>
    ),
    name: "Oswald Labs",
    position: "co-founder & CEO",
    href: "https://oswaldlabs.com",
    start: "2016",
    end: "2020",
    description: "Accessibility technology for the next billion Internet users",
  },
  {
    icon: (
      <svg viewBox="0 0 350 350">
        <path
          style="opacity: 0.948"
          fill="#4c9bd8"
          d="M350 76v3l-41 20-102-47-1 1 28 37a16655 16655 0 0 1-28 14l-51-9-1 1-32-5 102 49-1 3-47 24A20730 20730 0 0 1 0 80v-3l59-25c35 6 69 12 104 16a1028 1028 0 0 1-31-47 1468 1468 0 0 0 52-20l166 75Z"
        />
        <path
          style="opacity: 0.983"
          fill="#374a5d"
          d="M0 99c56 27 112 54 168 83l1 168h-4c-55-29-110-56-165-82V99ZM350 99v169c-56 26-111 53-165 82h-4c-1-57 0-113 1-168 55-29 111-56 168-83Z"
        />
      </svg>
    ),
    name: "Melangebox",
    position: "co-founder & CTO",
    href: "https://melangebox.com",
    start: "2017",
    end: "2020",
    description: "Sustainable, high-quality, and affordable fashion for India",
  },
  {
    icon: (
      <svg viewBox="0 0 256 256">
        <path
          style="fill-rule: evenodd"
          fill="#00c3a0"
          d="M87 0h86c-3 8-6 15-11 22l-26 1v66c16-8 33-13 51-15 16-3 32 0 47 8 6 7 11 16 13 26v30l-7 31c-4 8-8 16-13 22-12 7-24 7-36 0v1l27 31 1 33h-4l-67-85c4-7 9-12 15-16l14 8c33 18 46 8 39-29-5-29-22-40-50-35-11 3-21 7-30 12l-1 127c-8 5-14 11-20 18h-3l-1-90c-18 15-37 26-59 34-25 6-39-3-44-27v-42c6-35 26-53 60-54 15 0 29 3 43 9l1-63H75l2-7L87 0ZM70 102c14-1 28 1 42 5l-1 39c-16 13-34 23-53 30-18 5-27-1-27-18 0-14 3-28 10-42 8-9 17-14 29-14Z"
        />
      </svg>
    ),
    name: "Class Rebels",
    position: "co-founder & CEO",
    start: "2014",
    end: "2016",
    description: "Collaborative e-learning platform for CBSE K-12",
  },
  {
    icon: (
      <svg viewBox="0 0 492 202">
        <circle cx="101" cy="101" r="101" fill="#bcd878" />
        <circle cx="246" cy="101" r="101" fill="#e17359" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M174 172a101 101 0 0 0 0-141 101 101 0 0 0 0 141Z"
          fill="#cba567"
        />
        <circle cx="391" cy="101" r="101" fill="#8fcae2" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M319 172a101 101 0 0 0 0-141 101 101 0 0 0 0 141Z"
          fill="#b39d9c"
        />
      </svg>
    ),
    name: "PickQuick",
    position: "co-founder & CTO",
    start: "2012",
    end: "2013",
    description:
      "Buy, sell, or swap university books safely online and on campus",
  },
];

export default function About({ data }: PageProps<AboutData>) {
  return (
    <div class="max-w-screen-md px-4 mx-auto space-y-16 md:px-0">
      <section>
        <figure class="mb-12">
          <img
            alt="Anand standing on a table with his MacBook in his hand at an office"
            src="https://d33wubrfki0l68.cloudfront.net/41df0551175f4c6716aad2988c37ceb83a342b9e/7b5dc/images/photos/anand-chowdhary.jpg"
            width={2450}
            height={1633}
            className="w-full bg-white border rounded-lg shadow-sm"
          />
          <figcaption class="text-center text-gray-500 text-xs mt-2 inline-flex items-center justify-center w-full">
            <span>
              &copy; <a href="https://rikkertharink.nl">Rikkert Harink</a>
            </span>
            <span
              aria-hidden="true"
              title="Anand standing on a table with his MacBook at an office"
              class="bg-gray-200 rounded uppercase px-1 ml-2 font-medium cursor-default"
              style={{ fontSize: "80%" }}
            >
              Alt
            </span>
          </figcaption>
        </figure>
        <header className="mb-5 space-y-5">
          <Breadcrumbs items={[{ href: "/about", title: "About" }]} />
          <h1 className="text-4xl font-semibold font-display">About</h1>
          <p className="text-xl leading-relaxed">
            Anand Chowdhary is a creative technologist and entrepreneur.
          </p>
        </header>
        <div
          className="space-y-5"
          style={{ columnCount: 2, columnGap: "2rem" }}
        >
          <p>
            Anand Chowdhary is an engineer, designer, and entrepreneur from New
            Delhi, India. He lives in Groningen, the Netherlands, with his
            fianceé{" "}
            <ExternalLink href="https://sukritikapoor.com">
              Sukriti Kapoor
            </ExternalLink>
            , and is the co-founder &amp; CTO of{" "}
            <ExternalLink href="https://pabio.com">Pabio</ExternalLink>, an
            interior design and rent-to-own furniture company.
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
            <a href="/press/2021/github-stars">GitHub Star</a> (2021 &amp;
            2022), and was listed in{" "}
            <a href="/press/2018/forbes-30-under-30">Forbes 30 Under 30</a>{" "}
            (Asia 2018) and in Het Financieele Dagblad's list of most-innovative
            entrepreneurs and professionals in the Netherlands.
          </p>
          <p>
            From time to time, he speaks at events and writes articles about
            entrepreneurship and technology. He has been featured in
            publications like{" "}
            <a href="/press/publications/techcrunch">TechCrunch</a>,{" "}
            <a href="/press/publications/forbes-asia">Forbes</a>,{" "}
            <a href="/press/publications/the-next-web">The Next Web</a>
            {", "}
            <a href="/press/publications/hindustan-times">Hindustan Times</a>,
            and{" "}
            <ExternalLink href="https://css-tricks.com/author/anandchowdhary/">
              CSS Tricks
            </ExternalLink>
            .
          </p>
        </div>
      </section>
      <section>
        <h2 className="mt-8 text-2xl font-semibold font-display">Startups</h2>
        <ul className="mt-6">
          {STARTUPS.map(
            ({ name, position, description, start, end, icon, href }) => (
              <li key={name} className="flex mt-6">
                <div
                  className="flex items-center justify-center w-12 h-12 p-2 mr-5 bg-white rounded shadow"
                  role="presentation"
                >
                  {icon}
                </div>

                <div>
                  <h3>
                    <strong className="font-medium">
                      {href ? (
                        <ExternalLink href={href}>{name}</ExternalLink>
                      ) : (
                        name
                      )}
                    </strong>
                    <span className="text-gray-500">{`, ${position}`}</span>
                    <span className="text-gray-500">{`, ${start}–${end}`}</span>
                  </h3>
                  <p className="text-gray-500">{description}</p>
                </div>
              </li>
            )
          )}
        </ul>
      </section>
      <details>
        <summary class="bg-gray-100 border-b border-gray-100 px-6 py-3 shadow-sm rounded-t mt-5">
          <div class="flex items-center justify-between">
            <div class="font-semibold font-mono">README.md</div>
            <div class="flex items-center justify-between space-x-2">
              <IconBrandGithub class="w-4 h-4" />
              <ExternalLink href="https://github.com/AnandChowdhary/readme">
                AnandChowdhary/readme on GitHub
              </ExternalLink>
            </div>
          </div>
        </summary>
        <div
          class="bg-white shadow-sm rounded-b p-6 longform"
          dangerouslySetInnerHTML={{
            __html: render(
              data.readme
                .split("\n")
                .filter(
                  (line) =>
                    !line.startsWith("# ") && !line.startsWith("> **Note**")
                )
                .join("\n")
            ),
          }}
        />
      </details>
    </div>
  );
}
