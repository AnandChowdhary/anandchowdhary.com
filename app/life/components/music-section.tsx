import { NavigationLinks } from "@/app/components/navigation-links";

interface ArtistData {
  name: string;
  img: string;
}

export function MusicSection({ topArtists }: { topArtists: ArtistData[] }) {
  return (
    <div>
      <h2 className="font-medium text-xl">Music</h2>
      <NavigationLinks
        source="https://github.com/AnandChowdhary/top-artists"
        api="https://raw.githubusercontent.com/AnandChowdhary/top-artists/refs/heads/main/api.json"
        readme="https://github.com/AnandChowdhary/top-artists/blob/refs/heads/main/README.md"
        className="mb-6 justify-start mx-0"
      />
      <div className="space-y-3">
        {topArtists.map((artist) => (
          <div key={artist.name} className="flex items-center gap-3">
            <div className="shrink-0">
              <img
                alt=""
                src={artist.img}
                className="w-8 h-8 rounded-full shadow-xs"
              />
            </div>
            <div className="truncate">{artist.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
