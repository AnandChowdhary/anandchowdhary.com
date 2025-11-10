import { ArchiveSection } from "@/app/components/archive-section";
import { BlogSection } from "@/app/components/blog-section";
import { BooksSection } from "@/app/components/books-section";
import { Container } from "@/app/components/container";
import { Events } from "@/app/components/events";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { LifeSection } from "@/app/components/life-section";
import { NotesSection } from "@/app/components/notes-section";
import { NowSection } from "@/app/components/now-section";
import { OpenSourceSection } from "@/app/components/open-source-section";
import { PressSection } from "@/app/components/press-section";
import { ProjectsSection } from "@/app/components/projects-section";
import { TravelSection } from "@/app/components/travel-section";
import { WorkSection } from "@/app/components/work-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anand Chowdhary",
  description:
    "Anand Chowdhary is a creative technologist and entrepreneur. He is the co-founder and CEO of FirstQuadrant, a growth marketing agency for developer-first SaaS companies.",
};

export default async function Home() {
  return (
    <Container>
      <Header pathname="/" />
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
        <BooksSection />
        <ProjectsSection />
        <NotesSection />
        <PressSection />
        <ArchiveSection />
      </div>
      <Footer />
    </Container>
  );
}
