/** @jsx h */
import { h, FunctionComponent } from "preact";
import { tw } from "@twind";
import { Icons } from "../Icons.tsx";

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

function Navbar() {
  return (
    <nav className={tw`relative flex space-x-6`}>
      {NAV.slice(0, 5).map(({ label, href }, index) => (
        <a
          href={href}
          className={tw`hidden text-gray-500 transition hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-300 md:block ${
            index < 3 && "sm:block"
          }`}
          aria-current="false"
        >
          {label}
        </a>
      ))}
      <details className={tw`w-6 appearance-none`}>
        <summary
          className={tw`relative text-gray-500 list-none transition hover:text-gray-700 dark:hover:text-slate-300`}
        >
          <svg
            className={tw`transition hide-on-open`}
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
            className={tw`absolute top-0 -right-1 text-2xl transition -translate-x-1/2 -translate-y-1.5 cursor-default show-on-open`}
            aria-hidden="true"
          >
            &times;
          </span>
        </summary>
        <div
          className={tw`absolute right-0 z-50 flex flex-col w-32 p-1 mt-2 text-sm text-gray-600 bg-white rounded shadow top-full backdrop-blur dark:bg-slate-800 dark:text-slate-400`}
        >
          {NAV.map(({ label, href }, index) => (
            <a
              key={label}
              href={href}
              className={tw`px-3 py-2 transition rounded hover:bg-orange-50 hover:text-orange-800 dark:hover:bg-slate-800 dark:hover:text-slate-300 ${
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

function Footer() {
  return (
    <footer className={tw`text-slate-500`}>
      <div
        className={tw`max-w-screen-md px-6 pt-16 pb-8 mx-auto leading-none md:px-0`}
      >
        <div
          className={tw`pt-4 border-t-2 border-orange-100 dark:border-slate-800`}
        ></div>
        <div className={tw`flex items-center justify-between`}>
          <p>© 2008–2022 Anand Chowdhary</p>
          <div className={tw`flex items-center space-x-4`}>
            <div className={tw`relative flex items-center`}>
              <a
                className={tw`p-1 transition rounded-lg hover:bg-orange-100 hover:text-orange-700 dark:hover:bg-slate-800 dark:hover:text-slate-300`}
              >
                <span className={tw`sr-only`}>GitHub</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className={tw`w-5 h-5`}
                >
                  <path
                    d="M4 9a7 7 0 0 1-2 2 1 1 0 0 0 0 1c7 2 11-2 10-7l1-2h-1c-2-2-6-2-5 2 0 0-2 1-5-2a1 1 0 0 0-1 0 6 6 0 0 0 3 6Z"
                    style="
                  fill: none;
                  stroke: currentColor;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
                    transform="scale(3.42857)"
                  ></path>
                </svg>
              </a>
              <a
                className={tw`p-1 transition rounded-lg hover:bg-orange-100 hover:text-orange-700 dark:hover:bg-slate-800 dark:hover:text-slate-300`}
              >
                <span className={tw`sr-only`}>LinkedIn</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className={tw`w-5 h-5`}
                >
                  <path
                    d="M3.5 1.7a1.3 1.3 0 0 1-1.3 1.4A1.4 1.4 0 0 1 1 1.6 1.3 1.3 0 0 1 2.2.4a1.3 1.3 0 0 1 1.3 1.3ZM1.1 5.4c0-.7.5-.6 1.1-.6s1.2-.1 1.2.6V13c0 .8-.5.6-1.2.6s-1.1.2-1.1-.6ZM5.4 5.4c0-.4.2-.6.4-.6h1.4c.3 0 .5.5.5.9a2.5 2.5 0 0 1 2.2-1 3 3 0 0 1 3.2 3V13c0 .8-.5.6-1.2.6s-1.2.2-1.2-.6v-4a1.4 1.4 0 0 0-1.5-1.6A1.4 1.4 0 0 0 7.8 9v4c0 .8-.5.6-1.2.6s-1.2.2-1.2-.6Z"
                    style="
                  fill: none;
                  stroke: currentColor;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
                    transform="scale(3.42857)"
                  ></path>
                </svg>
              </a>
              <details className={tw`appearance-none`}>
                <summary
                  className={tw`p-1 list-none transition rounded-lg cursor-default hover:bg-orange-100 hover:text-orange-700 dark:hover:bg-slate-800 dark:hover:text-slate-300`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    className={tw`w-5 h-5`}
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
                <div
                  className={tw`absolute right-0 z-40 flex flex-col w-48 p-1 text-sm text-gray-600 bg-white rounded shadow backdrop-blur dark:bg-slate-800 bottom-10 dark:text-slate-400`}
                >
                  <form
                    className={tw`p-3 mb-1 border-b border-gray-100 dark:border-slate-800`}
                  >
                    <fieldset className={tw`flex flex-col space-y-1`}>
                      <legend className={tw`mb-1 font-medium`}>Theme</legend>
                      <label className={tw`flex items-center space-x-2`}>
                        <input
                          type="radio"
                          name="theme"
                          className={tw`w-3 h-3 transition bg-white border-4 border-gray-300 rounded-full appearance-none dark:border-slate-700 dark:bg-slate-500 dark:checked:bg-slate-300 checked:border-orange-600`}
                        />
                        <span>Light</span>
                      </label>
                      <label className={tw`flex items-center space-x-2`}>
                        <input
                          type="radio"
                          name="theme"
                          className={tw`w-3 h-3 transition bg-white border-4 border-gray-300 rounded-full appearance-none dark:border-slate-700 dark:bg-slate-500 dark:checked:bg-slate-300 checked:border-orange-600`}
                        />
                        <span>Dark</span>
                      </label>
                      <label className={tw`flex items-center space-x-2`}>
                        <input
                          type="radio"
                          name="theme"
                          className={tw`w-3 h-3 transition bg-white border-4 border-gray-300 rounded-full appearance-none dark:border-slate-700 dark:bg-slate-500 dark:checked:bg-slate-300 checked:border-orange-600`}
                          checked
                        />
                        <span>System</span>
                      </label>
                    </fieldset>
                  </form>
                  <a
                    className={tw`px-3 py-2 transition rounded hover:bg-orange-50 hover:text-orange-800 dark:hover:bg-slate-800 dark:hover:text-slate-300`}
                    href="#"
                  >
                    Colophon
                  </a>
                  <a
                    className={tw`px-3 py-2 transition rounded hover:bg-orange-50 hover:text-orange-800 dark:hover:bg-slate-800 dark:hover:text-slate-300`}
                    href="#"
                  >
                    View page history
                  </a>
                  <a
                    className={tw`px-3 py-2 transition rounded hover:bg-orange-50 hover:text-orange-800 dark:hover:bg-slate-800 dark:hover:text-slate-300`}
                    href="#"
                  >
                    Edit on GitHub
                  </a>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export const Layout: FunctionComponent = ({ children }) => {
  return (
    <div
      className={tw`min-h-screen text-gray-700 dark:text-slate-400 bg-orange-50 dark:bg-slate-900 selection:bg-orange-100 dark:selection:bg-slate-800`}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
html {
font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
sans-serif;
font-variant-ligatures: historical-ligatures;
line-height: 1.7;
}

.font-display {
font-family: "InterDisplay", "Inter", -apple-system, BlinkMacSystemFont,
"Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
"Helvetica Neue", sans-serif;
}

.full-link::after {
content: "";
position: absolute;
left: 0;
top: 0;
width: 100%;
height: 100%;
}

.copy a {
font-weight: 500;
text-decoration: underline;
transition: 0.3s;
opacity: 0.75;
}

.copy a:hover {
opacity: 1;
}

.copy p {
-moz-column-break-inside: avoid;
 break-inside: avoid-column;
}

.hide-on-open {
opacity: 1;
}

details[open] .hide-on-open {
opacity: 0;
}

.show-on-open {
opacity: 0;
}

details[open] .show-on-open {
opacity: 1;
}

.rotate-on-open {
transition: transform 0.3s;
}

details[open] .rotate-on-open {
transform: rotate(180deg);
}

.wave {
animation-name: wave-animation;
animation-duration: 5s;
animation-iteration-count: infinite;
transform-origin: 70% 70%;
display: inline-block;
}

@media (prefers-reduced-motion: reduce) {
.wave { animation: none; }
}

@keyframes wave-animation {
0% { transform: rotate(0.0deg) }
7% { transform: rotate(14.0deg) }
14% { transform: rotate(-8.0deg) }
21% { transform: rotate(14.0deg) }
28% { transform: rotate(-4.0deg) }
35% { transform: rotate(10.0deg) }
42% { transform: rotate(0.0deg) }
100% { transform: rotate(0.0deg) }
}
        `,
        }}
      />
      <header className={tw`pt-8 pb-16`}>
        <div
          className={tw`flex justify-between max-w-screen-md px-6 mx-auto md:px-0`}
        >
          <a
            href="/"
            className={tw`flex items-center space-x-2 font-medium dark:text-slate-300 whitespace-nowrap`}
          >
            <svg
              viewBox="0 0 700 700"
              xmlns="http://www.w3.org/2000/svg"
              className={tw`w-5 h-5 text-teal-500`}
              role="presentation"
            >
              <path
                d="M176 30c-36 3-61 12-85 27-17 13-30 26-43 47a132 132 0 00-12 25c-9 18-22 67-19 69h87l6-1 2-9a104 104 0 013-11l10-23c8-15 19-25 33-32 12-6 22-7 42-7 29-1 51 8 69 26l10 10a96 96 0 0116 38 221 221 0 01-1 36l-8 24c-7 14-22 28-35 34-8 3-24 6-37 8l-11 1h-13c-10 0-11 0-11 2a2069 2069 0 001 78l15 1a222 222 0 0122 2c14 2 30 7 41 13 30 16 46 47 46 90 0 31-11 59-31 79a97 97 0 01-49 27 168 168 0 01-56-1l-15-5-7-3c-7-3-18-11-25-18-13-14-24-34-28-55l-2-7-46-2H0v3l1 8 4 26a177 177 0 0064 104c30 21 63 33 103 37 17 1 46 0 60-2 17-2 23-3 38-9a181 181 0 00123-135l1-7c2-11 2-18 2-37a178 178 0 00-30-107l55-1h54l1 149v149l6 1h74a50208 50208 0 001-564h31l31 1v300l1 262 40 1h40V28H405v40l1 40h35l34 1v91l-1 92H362l2-4c4-6 11-23 15-32 3-9 5-20 7-32v-50a178 178 0 00-8-34A173 173 0 00239 31c-17-3-46-3-63-1z"
                fill="currentColor"
              ></path>
            </svg>
            <span>Anand Chowdhary</span>
          </a>
          <Navbar />
        </div>
      </header>
      <main>{children}</main>
      <Footer />
      <Icons />
    </div>
  );
};