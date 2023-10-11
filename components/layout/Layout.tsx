import IconInfoCircle from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/info-circle.tsx";
import Emissions from "../../islands/Emissions.tsx";
import { Socials } from "../text/Socials.tsx";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Archive", href: "/archive/2023" },
  { label: "About", href: "/about" },
  { label: "Life", href: "/life" },
  { label: "Blog", href: "/blog" },
  { label: "Events", href: "/events" },
  { label: "Projects", href: "/projects" },
  { label: "Mentoring", href: "/mentoring" },
  { label: "Press", href: "/press" },
  { label: "Videos", href: "/videos" },
  { label: "Versions", href: "/versions" },
  { label: "Contact", href: "/contact" },
];
const VISIBLE = 4;

export function Navbar() {
  return (
    <nav className="relative flex space-x-8">
      {NAV.slice(0, VISIBLE).map(({ label, href }, index) => (
        <a
          href={href}
          className={`hidden text-gray-500 font-normal transition no-underline hover:text-gray-700 md:block ${
            index < 3 && "sm:block"
          }`}
          aria-current="false"
        >
          {label}
        </a>
      ))}
      {/* <Search /> */}
      <details className="w-6 appearance-none">
        <summary className="relative text-gray-500 list-none transition hover:text-gray-700">
          <svg
            className="transition hide-on-open"
            viewBox="0 0 118 118"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>More</title>
            <circle cx="14" cy="59" r="10" fill="currentColor" />
            <circle cx="59" cy="59" r="10" fill="currentColor" />
            <circle cx="104" cy="59" r="10" fill="currentColor" />
          </svg>
          <span
            className="absolute top-0 -right-1 text-2xl transition -translate-x-1/2 -translate-y-1.5 cursor-default show-on-open"
            aria-hidden="true"
          >
            &times;
          </span>
        </summary>
        <div className="absolute right-0 z-50 flex flex-col w-32 p-1 mt-2 text-sm text-gray-600 bg-white rounded shadow top-full backdrop-blur">
          {NAV.map(({ label, href }, index) => (
            <a
              key={label}
              href={href}
              className={`px-3 py-2 font-normal transition no-underline rounded hover:bg-gray-100 font-normal hover:text-gray-800 ${
                index < VISIBLE - 1
                  ? "sm:hidden md:hidden"
                  : index < VISIBLE && "md:hidden"
              }`}
              aria-current="false"
            >
              {label}
            </a>
          ))}
        </div>
      </details>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="text-gray-400 pt-8">
      <div className="max-w-screen-md px-6 pt-16 pb-8 mx-auto leading-none md:px-0">
        <div className="flex items-center justify-between mb-2 text-sm">
          <p className="flex items-center space-x-1">
            <span>
              <Emissions />{" "}
              <abbr title="Carbon dioxide equivalent">
                CO<sub>2</sub>
              </abbr>{" "}
              emitted
            </span>
            <a
              href="/versions/2022/alameda/#emissions"
              className="flex items-center opacity-100"
              aria-label="Carbon emission details"
              title="Carbon emission details"
            >
              <IconInfoCircle class="w-4 h-4" />
            </a>
          </p>
          <p>Made with ♥️ in 🇮🇳🇳🇱🇺🇸 by Anand Chowdhary</p>
          <div className="flex items-center space-x-4">
            <div className="relative flex items-center space-x-1">
              <Socials />
              <details className="appearance-none">
                <summary className="p-1 list-none transition rounded-lg cursor-default hover:bg-gray-100 hover:text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    className="w-5 h-5"
                  >
                    <title>Settings</title>
                    <path
                      d="M5.2 2.3 5.7 1a1 1 0 0 1 .9-.6h.8a1 1 0 0 1 1 .6l.4 1.2 1.4.8 1.2-.2a1 1 0 0 1 1 .5l.4.7a1 1 0 0 1 0 1.1l-.8 1v1.6l.8 1a1 1 0 0 1 0 1.1l-.4.7a1 1 0 0 1-1 .5l-1.2-.2-1.4.8-.4 1.2a1 1 0 0 1-1 .6h-.8a1 1 0 0 1-1-.6l-.4-1.2-1.4-.8-1.2.2a1 1 0 0 1-1-.5l-.4-.7a1 1 0 0 1 0-1.1l.8-1V6.2l-.8-1a1 1 0 0 1 0-1.1l.4-.7a1 1 0 0 1 1-.5l1.1.2ZM5 7a2 2 0 1 0 2-2 2 2 0 0 0-2 2Z"
                      style="
                    fill: none;
                    stroke: currentColor;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                  "
                      transform="scale(3.42857)"
                    ></path>
                  </svg>
                </summary>
                <div className="absolute right-0 z-40 flex flex-col w-48 p-1 text-sm text-gray-600 bg-white rounded shadow backdrop-blur bottom-10">
                  <a
                    className="px-3 py-2 transition no-underline rounded hover:bg-gray-100 font-normal hover:text-gray-800"
                    href="/colophon"
                  >
                    Colophon
                  </a>
                  <a
                    className="px-3 py-2 transition no-underline rounded hover:bg-gray-100 font-normal hover:text-gray-800"
                    href="/sitemap"
                  >
                    Sitemap
                  </a>
                  <a
                    className="px-3 py-2 transition no-underline rounded hover:bg-gray-100 font-normal hover:text-gray-800"
                    href="https://github.com/AnandChowdhary/anandchowdhary.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                  {/* <a
                    className="px-3 py-2 transition no-underline rounded hover:bg-gray-100 font-normal hover:text-gray-800"
                    href="#"
                  >
                    View page history
                  </a> */}
                  {/* <a
                    className="px-3 py-2 transition no-underline rounded hover:bg-gray-100 font-normal hover:text-gray-800"
                    href="#"
                  >
                    Edit on GitHub
                  </a> */}
                </div>
              </details>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t-2 border-gray-100"></div>
        <div>
          <nav className="sm:flex flex-wrap justify-between mb-2 space-x-3 overflow-auto">
            {Array.from(
              { length: new Date().getUTCFullYear() - 2009 + 1 },
              (_, index) => index + 2009
            ).map((year) => (
              <a key={year} href={`/archive/${year}`} className="text-gray-400">
                {year}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
