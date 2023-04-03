import { asset, Head } from "$fresh/runtime.ts";
import { AppProps } from "$fresh/src/server/types.ts";
import { Footer, Navbar } from "../components/layout/Layout.tsx";
import { render } from "../utils/markdown.ts";

export default function App({ Component }: AppProps) {
  return (
    <html class="py-2" style={{ backgroundColor: "#ef8286" }}>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ef8286" />
        <meta name="msapplication-TileColor" content="#ef8286" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="stylesheet" href={`/${asset("global.css")}`} />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-EJW713RCKV"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || []; function gtag() { dataLayer.push(arguments); } gtag("js", new Date()); gtag("config", "G-EJW713RCKV")`,
          }}
        />
      </Head>
      <body
        class="min-h-screen text-gray-700"
        style={{ backgroundColor: "#fbf1f2" }}
      >
        <div>
          <header class="pt-6 pb-8">
            <div class="flex justify-between max-w-screen-md px-6 mx-auto md:px-0">
              <a
                href="/"
                class="flex items-center space-x-2 font-medium whitespace-nowrap"
              >
                <svg
                  viewBox="0 0 700 700"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 text-teal-500"
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
            <div class="max-w-screen-md px-6 mx-auto md:px-0 mt-4">
              <div class="border-2 border-dashed px-4 py-3 rounded-lg bg-gray-100 space-y-1 text-sm">
                <p class="uppercase text-xs">
                  <a href="/versions/2022/alameda/">
                    <strong>Public redesign</strong>
                  </a>
                </p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: render(
                      `I'm currently and very publicly redesigning my personal website, so some things might be a little janky!`
                    ),
                  }}
                />
              </div>
            </div>
          </header>
          <main>
            <Component />
          </main>
          <Footer />
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          if(window.navigator && navigator.serviceWorker) {
            navigator.serviceWorker.getRegistrations()
            .then(function(registrations) {
              for(let registration of registrations) {
                registration.unregister();
              }
            });
          }
          if ('caches' in window) {
            caches.keys()
              .then(function(keyList) {
                  return Promise.all(keyList.map(function(key) {
                      return caches.delete(key);
                  }));
              })
        }
`,
          }}
        />
      </body>
    </html>
  );
}
