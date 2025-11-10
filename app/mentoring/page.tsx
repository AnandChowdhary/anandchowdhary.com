import { Container } from "@/app/components/container";
import { ExternalLink } from "@/app/components/external-link";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentoring / Anand Chowdhary",
  description:
    "Anand Chowdhary offers weekly mentoring sessions for early-stage entrepreneurs building technology-focused startups.",
};

export default async function Mentoring() {
  return (
    <Container>
      <Header pathname="/mentoring" />
      <div className="max-w-xl mx-auto">
        <section className="space-y-4">
          <div className="space-y-5">
            <p className="text-xl font-medium">
              I spend one hour every week mentoring early-stage entrepreneurs
              and helping them build technology startups.
            </p>
            <p>
              If you are interested in having a conversation, please email me at
              mentoring (at) this domain with what I can help with. I try and
              respond to each email.
            </p>
            <h2 className="text-lg font-medium mt-8">Testimonials</h2>
            <p>
              Here are some of the nice things people have said about me (take
              them with a grain of salt):
            </p>
            <article className="pl-4 border-l-3 border-neutral-200 dark:border-neutral-800 space-y-1">
              <blockquote>
                A renaissance entrepreneur. That is how I would describe Anand.
                His breadth of entrepreneurial experience is remarkable even for
                a seasoned serial entrepreneur and ranges from social to
                for-profit.
              </blockquote>
              <cite className="text-sm text-neutral-500 not-italic">
                Rainer Harms, Associate Professor at University of Twente
              </cite>
            </article>
            <article className="pl-4 border-l-3 border-neutral-200 dark:border-neutral-800 space-y-1">
              <blockquote>
                Anand gave good feedback from a business as well as from a
                personal perspective. I wish I had talked to him a few month if
                not years earlier.
              </blockquote>
              <cite className="text-sm text-neutral-500 not-italic">
                Hendrik Henze, entrepreneur from Göttingen
              </cite>
            </article>
            <article className="pl-4 border-l-3 border-neutral-200 dark:border-neutral-800 space-y-1">
              <blockquote>
                Anand just immediately gets what I&rsquo;m trying to do, with
                minimal explanation, and had some really solid advice on future
                direction. Super smart guy.
              </blockquote>
              <cite className="text-sm text-neutral-500 not-italic">
                Michael Taylor, co-founder and COO of Ladder
              </cite>
            </article>
            <h2 className="text-lg font-medium mt-8">Angel investing</h2>
            <p>
              I sometimes invest in early-stage startups. Please visit my
              personal holding company to learn more at{" "}
              <ExternalLink href="https://chowdhary.co">
                Chowdhary.co
              </ExternalLink>
              .
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </Container>
  );
}
