import { getAllTopArtists } from "@/app/api";
import { TimelineItem } from "@/app/components/timeline-item";

export async function TimelineItemMusic() {
  const topArtists = await getAllTopArtists();
  const topArtist = topArtists[0];
  if (!topArtist) return null;
  return (
    <TimelineItem
      icon="🎧"
      title={`Listening to ${topArtist.name}`}
      subtitle="Top artist this month"
    />
  );
}
