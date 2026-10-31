import React from "react";
import { Container } from "@/views/components/container";
import { ExternalLink } from "@/views/components/external-link";
import { Footer } from "@/views/components/footer";
import { Header } from "@/views/components/header";
import { buildScreenshotOpenGraphImageUrl } from "@/views/lib/opengraph";
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";
import type { Metadata } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Contact / Anand Chowdhary",
  description:
    "Get in touch with Anand Chowdhary for speaking engagements, collaborations, or inquiries.",
  openGraph: {
    images: [
      {
        url: buildScreenshotOpenGraphImageUrl("/contact"),
      },
    ],
  },
};

export default async function Contact() {
  return (
    <Container>
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
                  <span>@AnandChowdhary on X (formerly Twitter)</span>
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
    </Container>
  );
}
