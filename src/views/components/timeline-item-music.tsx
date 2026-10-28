import { getAllTopArtists } from "@/views/api";
import { TimelineItem } from "@/views/components/timeline-item";

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
