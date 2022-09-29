import { ExternalLink } from "../components/text/ExternalLink.tsx";

export default function Contact() {
  return (
    <div class="max-w-screen-md px-4 mx-auto space-y-8 md:px-0">
      <header className="mb-5 space-y-5">
        <h1 className="text-4xl font-semibold font-display dark:text-gray-200">
          Contact
        </h1>
        <p className="text-xl leading-relaxed">
          You can get in touch with me by filling the form below.
        </p>
      </header>
      <section className="grid md:grid-cols-2 gap-12">
        <form className="space-y-4">
          <label className="block space-y-2">
            <span className="block">Name</span>
            <input
              type="text"
              className="shadow-sm rounded w-full py-2 px-4 text-xl"
              required
            />
          </label>
          <label className="block space-y-2">
            <span className="block">Email</span>
            <input
              type="email"
              className="shadow-sm rounded w-full py-2 px-4 text-xl"
              required
            />
          </label>
          <label className="block space-y-2">
            <span className="block">Message</span>
            <textarea
              className="shadow-sm rounded w-full py-2 px-4 text-xl"
              rows={4}
              required
            />
          </label>
          <button
            type="submit"
            className="shadow-sm rounded py-2 px-6 bg-orange-200"
          >
            Send message
          </button>
        </form>
        <div className="space-y-4">
          <h2 className="font-medium text-xl">Elsewhere</h2>
          <ul className="rounded-lg overflow-hidden bg-white shadow-sm">
            {[
              {
                label: "GitHub",
                name: "AnandChowdhary",
                href: "https://github.com/AnandChowdhary",
              },
              {
                label: "LinkedIn",
                name: "/in/AnandChowdhary",
                href: "https://www.linkedin.com/in/anandchowdhary",
              },
              {
                label: "Twitter",
                name: "@AnandChowdhary",
                href: "https://twitter.com/AnandChowdhary",
              },
              {
                label: "Instagram",
                name: "anandchowdhary",
                href: "https://www.instagram.com/anandchowdhary",
              },
              {
                label: "Wikipedia",
                name: "User:AnandChowdhary",
                href: "https://en.wikipedia.org/wiki/User:AnandChowdhary",
              },
            ].map(({ label, name, href }, index, array) => (
              <li
                key={label}
                className={`px-4 py-2 flex items-center justify-between relative border-gray-100 ${
                  array.length - 1 !== index && "border-b"
                }`}
              >
                <ExternalLink href={href} className="inset-link">
                  {label}
                </ExternalLink>
                <span className="text-gray-500">{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
