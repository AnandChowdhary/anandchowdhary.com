import { BlogSection } from "@/app/components/blog-section";
import { BooksSection } from "@/app/components/books-section";
import { Events } from "@/app/components/events";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { LifeEventsSection } from "@/app/components/life-events-section";
import { LifeSection } from "@/app/components/life-section";
import { NotesSection } from "@/app/components/notes-section";
import { NowSection } from "@/app/components/now-section";
import { OpenSourceSection } from "@/app/components/open-source-section";
import { PressSection } from "@/app/components/press-section";
import { ProjectsSection } from "@/app/components/projects-section";
import { TravelSection } from "@/app/components/travel-section";
import { WorkSection } from "@/app/components/work-section";

export default async function Home() {
  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 space-y-32">
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
        <LifeEventsSection />
      </div>
      <Footer />
    </div>
  );
}
