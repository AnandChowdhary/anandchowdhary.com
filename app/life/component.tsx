import {
  getAllCodingTime,
  getAllLocations,
  getAllSleepTime,
  getAllThemes,
  getAllTopArtists,
  getAllWalkingSteps,
  getHackerNewsItems,
  LifeEvent,
} from "@/app/api";
import { Container } from "@/app/components/container";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { NavigationFooter } from "@/app/components/navigation-footer";
import { CodingTimeSection } from "./components/coding-time-section";
import { GitHubSection } from "./components/github-section";
import { HackerNewsSection } from "./components/hacker-news-section";
import { LifeEventsSection } from "./components/life-events-section";
import { LocationSection } from "./components/location-section";
import { MusicSection } from "./components/music-section";
import { SleepSection } from "./components/sleep-section";
import { StepsSection } from "./components/steps-section";
import { ThemesSection } from "./components/themes-section";

export default async function LifeContent({
  lifeEventsData,
  year,
  previousYear,
  nextYear,
}: {
  lifeEventsData: LifeEvent[];
  year?: string;
  previousYear?: number;
  nextYear?: number;
}) {
  const topArtists = await getAllTopArtists();
  const codingTime = await getAllCodingTime();
  const sleepTime = await getAllSleepTime();
  const walkingSteps = await getAllWalkingSteps();
  const countriesDataFiltered = await getAllLocations();
  const themes = await getAllThemes();
  const hackerNewsItems = await getHackerNewsItems();

  return (
    <Container>
      <Header
        pathname={year ? `/life/${year}` : "/life"}
        description="I track all my life data on GitHub; here's a summary of my location, music, work, health, and milestones."
      />
      <main className="max-w-2xl mx-auto space-y-12 br">
        <GitHubSection />
        <LocationSection countriesDataFiltered={countriesDataFiltered} />
        <div className="grid md:grid-cols-2 gap-12">
          <ThemesSection themes={themes} />
          <HackerNewsSection hackerNewsItems={hackerNewsItems} />
          <CodingTimeSection codingTime={codingTime} />
          <MusicSection topArtists={topArtists} />
          <SleepSection sleepTime={sleepTime} />
          <StepsSection walkingSteps={walkingSteps} />
        </div>
        <LifeEventsSection lifeEventsData={lifeEventsData} />
        {year && (previousYear || nextYear) && (
          <NavigationFooter
            previous={
              previousYear
                ? {
                    href: `/life/${previousYear}`,
                    label: previousYear.toString(),
                  }
                : undefined
            }
            next={
              nextYear
                ? {
                    href: `/life/${nextYear}`,
                    label: nextYear.toString(),
                  }
                : undefined
            }
          />
        )}
      </main>
      <Footer />
    </Container>
  );
}
