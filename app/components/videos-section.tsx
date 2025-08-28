import { getVideos } from "@/app/api";
import { GenericSectionContainer } from "@/app/components/generic-section";

export async function VideosSection() {
  const videos = await getVideos();
  const recentVideos = videos
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  return (
    <GenericSectionContainer
      title="videos"
      subtitle="/videos"
      description="Talks, interviews, and appearances discussing technology and entrepreneurship."
      linkText="Go to /videos"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {recentVideos.map((video) => (
          <div key={video.slug} className="relative aspect-video group">
            {video.img ? (
              <img
                src={video.img}
                alt={video.title}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-full bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-neutral-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
            {video.duration && (
              <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 py-0.5 rounded">
                {video.duration}
              </div>
            )}
          </div>
        ))}
      </div>
    </GenericSectionContainer>
  );
}