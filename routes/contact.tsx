import { render } from "../utils/markdown.ts";
import { ExternalLink } from "../components/text/ExternalLink.tsx";
import { GitHub, Instagram, LinkedIn, Twitter } from "../components/Icons.tsx";

export default function Contact() {
  return (
    <div class="max-w-screen-md px-4 mx-auto space-y-8 md:px-0">
      <header class="mb-5 space-y-5">
        <h1 class="text-4xl font-semibold font-display dark:text-gray-200">
          Contact
        </h1>
        <p class="text-xl leading-relaxed">
          You can get in touch with me by filling the form below.
        </p>
      </header>
      <section class="grid gap-12 md:grid-cols-2">
        <form
          class="space-y-4"
          method="POST"
          action="https://formspree.io/mail@anandchowdhary.com"
        >
          <label class="block space-y-2">
            <span class="block">Name</span>
            <input
              name="name"
              type="text"
              class="w-full px-4 py-2 text-xl rounded shadow-sm"
              required
            />
          </label>
          <label class="block space-y-2">
            <span class="block">Email</span>
            <input
              name="email"
              type="email"
              class="w-full px-4 py-2 text-xl rounded shadow-sm"
              required
            />
          </label>
          <label class="block space-y-2">
            <span class="block">Message</span>
            <textarea
              name="message"
              class="w-full px-4 py-2 text-xl rounded shadow-sm"
              rows={4}
              required
            />
          </label>
          <button
            type="submit"
            class="px-6 py-2 bg-orange-200 rounded shadow-sm"
          >
            Send message
          </button>
        </form>
        <div class="space-y-4">
          <h2 class="text-xl font-medium">Elsewhere</h2>
          <ul class="overflow-hidden bg-white rounded-lg shadow-sm">
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
            ].map(({ label, name, href }, index, array) => (
              <li
                key={label}
                class={`px-4 py-2 flex items-center justify-between relative border-gray-100 ${
                  array.length - 1 !== index && "border-b"
                }`}
              >
                <span class="flex items-center space-x-2">
                  {label === "GitHub" && <GitHub class="w-4 h-4" />}
                  {label === "LinkedIn" && <LinkedIn class="w-4 h-4" />}
                  {label === "Twitter" && <Twitter class="w-4 h-4" />}
                  {label === "Instagram" && <Instagram class="w-4 h-4" />}
                  <ExternalLink href={href} class="inset-link">
                    {label}
                  </ExternalLink>
                </span>
                <span class="text-gray-500">{name}</span>
              </li>
            ))}
          </ul>
          <h2 class="text-xl font-medium">PGP</h2>
          <p
            dangerouslySetInnerHTML={{
              __html: render(
                `If you want to send an encrypted email, you can [download my PGP public key](/files/public-key.asc) and drop me a line at [anandchowdhary@pm.me](mailto:anandchowdhary@pm.me). Note that I don't check my Proton Mail email as frequently as the contact form above, so time-to-reply may be longer.`
              ),
            }}
          />
        </div>
      </section>
    </div>
  );
}
