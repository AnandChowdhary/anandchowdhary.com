import { Socials } from "../text/Socials.tsx";

const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Life", href: "/life" },
  { label: "Blog", href: "/blog" },
  { label: "Events", href: "/events" },
  { label: "Projects", href: "/projects" },
  { label: "Mentoring", href: "/mentoring" },
  { label: "Press", href: "/press" },
  { label: "Videos", href: "/videos" },
  { label: "Travel", href: "/travel" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  return (
    <nav className="relative flex space-x-6">
      {NAV.slice(0, 5).map(({ label, href }, index) => (
        <a
          href={href}
          className={`hidden text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 md:block ${
            index < 3 && "sm:block"
          }`}
          aria-current="false"
        >
          {label}
        </a>
      ))}
      <details className="w-6 appearance-none">
        <summary className="relative text-gray-500 list-none transition hover:text-gray-700 dark:hover:text-gray-300">
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
        <div className="absolute right-0 z-50 flex flex-col w-32 p-1 mt-2 text-sm text-gray-600 bg-white rounded shadow top-full backdrop-blur dark:bg-gray-800 dark:text-gray-400">
          {NAV.map(({ label, href }, index) => (
            <a
              key={label}
              href={href}
              className={`px-3 py-2 transition rounded hover:bg-orange-50 hover:text-orange-800 dark:hover:bg-gray-800 dark:hover:text-gray-300 ${
                index < 3 ? "sm:hidden md:hidden" : index < 5 && "md:hidden"
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

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ion-icon": any;
    }
  }
}

export function Footer() {
  return (
    <footer className="text-gray-400">
      <div className="max-w-screen-md px-6 pt-16 pb-8 mx-auto leading-none md:px-0">
        <div className="flex items-center justify-between text-sm mb-2">
          <p className="flex items-center space-x-1">
            <span>
              0.06g of{" "}
              <abbr title="Carbon dioxide equivalent">
                CO<sub>2</sub>
              </abbr>{" "}
              emitted
            </span>
            <a
              href="#"
              className="flex items-center"
              aria-label="Carbon emission details"
            >
              <ion-icon name="information-circle-outline"></ion-icon>
            </a>
          </p>
          <p>Made with 🧡 in 🇮🇳🇳🇱🇺🇸 by Anand Chowdhary</p>
          <div className="flex items-center space-x-4">
            <div className="relative flex items-center space-x-1">
              <Socials />
              <details className="appearance-none">
                <summary className="p-1 list-none transition rounded-lg cursor-default hover:bg-orange-100 hover:text-orange-700 dark:hover:bg-gray-800 dark:hover:text-gray-300">
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
                <div className="absolute right-0 z-40 flex flex-col w-48 p-1 text-sm text-gray-600 bg-white rounded shadow backdrop-blur dark:bg-gray-800 bottom-10 dark:text-gray-400">
                  <form className="p-3 mb-1 border-b border-gray-100 dark:border-gray-800">
                    <fieldset className="flex flex-col space-y-1">
                      <legend className="mb-1 font-medium">Theme</legend>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="theme"
                          className="w-3 h-3 transition bg-white border-4 border-gray-300 rounded-full appearance-none dark:border-gray-700 dark:bg-gray-500 dark:checked:bg-gray-300 checked:border-orange-600"
                        />
                        <span>Light</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="theme"
                          className="w-3 h-3 transition bg-white border-4 border-gray-300 rounded-full appearance-none dark:border-gray-700 dark:bg-gray-500 dark:checked:bg-gray-300 checked:border-orange-600"
                        />
                        <span>Dark</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="theme"
                          className="w-3 h-3 transition bg-white border-4 border-gray-300 rounded-full appearance-none dark:border-gray-700 dark:bg-gray-500 dark:checked:bg-gray-300 checked:border-orange-600"
                          checked
                        />
                        <span>System</span>
                      </label>
                    </fieldset>
                  </form>
                  <a
                    className="px-3 py-2 transition rounded hover:bg-orange-50 hover:text-orange-800 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                    href="#"
                  >
                    Colophon
                  </a>
                  <a
                    className="px-3 py-2 transition rounded hover:bg-orange-50 hover:text-orange-800 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                    href="#"
                  >
                    View page history
                  </a>
                  <a
                    className="px-3 py-2 transition rounded hover:bg-orange-50 hover:text-orange-800 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                    href="#"
                  >
                    Edit on GitHub
                  </a>
                </div>
              </details>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t-2 border-orange-100 dark:border-gray-800"></div>
        <div>
          <nav className="flex flex-wrap justify-between mb-2 space-x-3">
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
