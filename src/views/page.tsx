import { ArchiveSection } from "@/views/components/archive-section";
import { BlogSection } from "@/views/components/blog-section";
import { BooksSection } from "@/views/components/books-section";
import { Container } from "@/views/components/container";
import { Events } from "@/views/components/events";
import { Footer } from "@/views/components/footer";
import { Header } from "@/views/components/header";
import { InvestmentsSection } from "@/views/components/investments-section";
import { LifeSection } from "@/views/components/life-section";
import { NotesSection } from "@/views/components/notes-section";
import { NowSection } from "@/views/components/now-section";
import { OpenSourceSection } from "@/views/components/open-source-section";
import { PressSection } from "@/views/components/press-section";
import { ProjectsSection } from "@/views/components/projects-section";
import { TravelSection } from "@/views/components/travel-section";
import { WorkSection } from "@/views/components/work-section";
import { buildScreenshotOpenGraphImageUrl } from "@/views/lib/opengraph";
import type { Metadata } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Anand Chowdhary",
  description:
    "Anand Chowdhary is a technology entrepreneur, engineer, and designer from New Delhi, India, living in Utrecht, the Netherlands. He is Head of Product at Sycamore and previously founded FirstQuadrant, an AI sales platform funded by Y Combinator.",
  openGraph: {
    images: [
      {
        url: buildScreenshotOpenGraphImageUrl("/"),
      },
    ],
  },
};

export default async function Home() {
  return (
    <Container>
      <Header pathname="/" />
      <main className="home-main space-y-32">
      <NowSection />
      <LifeSection />
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-18 max-w-5xl mx-auto">
        <Events />
        <BlogSection />
        <OpenSourceSection />
        <div className="space-y-6">
          <WorkSection />
          <TravelSection />
        </div>
        <ProjectsSection />
        <div className="space-y-6">
          <BooksSection />
          <InvestmentsSection />
        </div>
        <NotesSection />
        <PressSection />
        <ArchiveSection />
      </div>
      </main>
      <Footer />
    </Container>
  );
}
