import IconBrandGithub from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/brand-github.tsx";
import IconBrandInstagram from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/brand-instagram.tsx";
import IconBrandLinkedin from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/brand-linkedin.tsx";
import IconBrandTwitter from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/brand-twitter.tsx";
import { Breadcrumbs } from "../components/data/Breadcrumbs.tsx";
import { SectionTitle } from "../components/data/SectionTitle.tsx";
import { ExternalLink } from "../components/text/ExternalLink.tsx";
import { render } from "../utils/markdown.ts";

export default function Contact() {
  return (
    <div class="max-w-screen-md px-4 mx-auto space-y-8 md:px-0">
      <Breadcrumbs items={[{ href: "/contact", title: "Contact" }]} />
      <SectionTitle
        title="Contact"
        description="You can get in touch with me by filling the form below."
      />
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
          <button type="submit" class="px-6 py-2 bg-rose-200 rounded shadow-sm">
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
                  {label === "GitHub" && <IconBrandGithub class="w-4 h-4" />}
                  {label === "LinkedIn" && (
                    <IconBrandLinkedin class="w-4 h-4" />
                  )}
                  {label === "Twitter" && <IconBrandTwitter class="w-4 h-4" />}
                  {label === "Instagram" && (
                    <IconBrandInstagram class="w-4 h-4" />
                  )}
                  <ExternalLink href={href} class="inset-link">
                    {label}
                  </ExternalLink>
                </span>
                <span class="text-gray-500">{name}</span>
              </li>
            ))}
          </ul>
          <h2 class="text-xl font-medium pt-2">PGP</h2>
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
