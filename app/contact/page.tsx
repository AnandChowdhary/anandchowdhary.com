import { ExternalLink } from "@/app/components/external-link";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";

export default async function Contact() {
  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 space-y-32">
      <Header pathname="/contact" />
      <div className="max-w-xl mx-auto">
        <section className="space-y-4">
          <div className="space-y-5">
            <p className="text-xl font-medium">
              Thank you for your interest in getting in touch with me.
            </p>
            <p>
              Please write me an email at mail (at) this domain with what I can
              help with. I am currently not looking for new opportunities.
            </p>
            <p>You can also find me on the following platforms:</p>
            <ul className="list-disc marker:text-neutral-400 space-y-2">
              <li>
                <ExternalLink
                  href="https://github.com/AnandChowdhary"
                  underline={false}
                >
                  <IconBrandGithub
                    className="inline-block mr-1 w-4 h-4 align-middle -mt-1"
                    strokeWidth={1.5}
                  />
                  <span>@AnandChowdhary on GitHub</span>
                </ExternalLink>
              </li>
              <li>
                <ExternalLink
                  href="https://x.com/AnandChowdhary"
                  underline={false}
                >
                  <IconBrandX
                    className="inline-block mr-1 w-4 h-4 align-middle -mt-1"
                    strokeWidth={1.5}
                  />
                  <span>@AnandChowdhary on X (formally Twitter)</span>
                </ExternalLink>
              </li>
              <li>
                <ExternalLink
                  href="https://www.linkedin.com/in/AnandChowdhary"
                  underline={false}
                >
                  <IconBrandLinkedin
                    className="inline-block mr-1 w-4 h-4 align-middle -mt-1"
                    strokeWidth={1.5}
                  />
                  <span>/in/AnandChowdhary on LinkedIn</span>
                </ExternalLink>
              </li>
              <li>
                <ExternalLink
                  href="https://www.instagram.com/anandchowdhary/"
                  underline={false}
                >
                  <IconBrandInstagram
                    className="inline-block mr-1 w-4 h-4 align-middle -mt-1"
                    strokeWidth={1.5}
                  />
                  <span>@anandchowdhary on Instagram</span>
                </ExternalLink>
              </li>
            </ul>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
