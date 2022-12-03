import { SectionTitle } from "../components/data/SectionTitle.tsx";

export default function Mentoring() {
  return (
    <div class="max-w-screen-md px-4 mx-auto space-y-8 md:px-0">
      <SectionTitle
        title="Mentoring"
        description="I spend one to two hours every week mentoring early-stage entrepreneurs and helping them build technology-focused startups."
      />
      <div class="longform">
        <p>
          The easiest thing to do is write me an email at
          mentoring@anandchowhdary.com with what I can help with. I try and
          respond to each email.
        </p>
        <h2>Testimonials</h2>
        <p>Here are some of the nice things people have said about me:</p>
        <blockquote>
          <p>
            A renaissance entrepreneur? That is how I would describe Anand. His
            breadth of entrrprenuerial experience is remarkable even for a
            seasoned serial entrepreneur and ranges from social to for-profit.
          </p>
          <cite>Rainer Harms, Associate Professor at University of Twente</cite>
        </blockquote>
        <blockquote>
          <p>
            Anand gave good feedback from a business as well as from a personal
            perspective. I wish I had talked to him a few month if not years
            earlier.
          </p>
          <cite>Hendrik Henze, entrepreneur from Göttingen</cite>
        </blockquote>
        <blockquote>
          <p>
            Anand just immediately gets what I'm trying to do, with minimal
            explanation, and had some really solid advice on future direction.
            Super smart guy.
          </p>
          <cite>Michael Taylor, co-founder and COO of Ladder</cite>
        </blockquote>
      </div>
    </div>
  );
}
