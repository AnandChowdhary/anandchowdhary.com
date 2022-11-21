import type {
  TimelineAward,
  TimelineBlogPost,
  TimelineBook,
  TimelineEvent,
  TimelineLifeEvent,
  TimelineOkr,
  TimelineOpenSourceProject,
  TimelinePodcastInterview,
  TimelinePressFeature,
  TimelineProject,
  TimelineTheme,
  TimelineTravel,
  TimelineVersion,
  TimelineVideo,
} from "https://esm.sh/timeline-types@3.0.0/index.d.ts";
import { FunctionalComponent } from "preact";
import { imageUrl } from "../../../utils/urls.ts";

export const TimelineOkrVisual: FunctionalComponent<{ item: TimelineOkr }> = ({
  item,
}) => (
  <img
    alt=""
    src={imageUrl(
      `https://raw.githubusercontent.com/AnandChowdhary/okrs/main/assets/${item.url
        .split("/")
        .reverse()
        .join("/")
        .substring(0, 6)
        .split("/")
        .reverse()
        .join("-")}.png`,
      { w: "512", h: "256", fit: "cover" }
    )}
    loading="lazy"
    width={512}
    height={256}
    className="w-full rounded-lg shadow"
  />
);

export const TimelineEventVisual: FunctionalComponent<{
  item: TimelineEvent;
}> = ({ item }) =>
  item.data.coordinates ? (
    <img
      alt=""
      src={`https://api.mapbox.com/styles/v1/anandchowdhary/cl91jzd61002q14pm7vtwfa2l/static/${item.data.coordinates
        .reverse()
        .join()},13/512x256?access_token=pk.eyJ1IjoiYW5hbmRjaG93ZGhhcnkiLCJhIjoiY2w5MWpxbXZ2MDdpMzN2bW92ZnRzZ2Q4bSJ9.WMWxq61EUjQfWtntvGGNKQ`}
      loading="lazy"
      width={512}
      height={256}
      className="w-full rounded-lg shadow"
    />
  ) : null;

export const TimelineProjectVisual: FunctionalComponent<{
  item: TimelineProject;
}> = ({ item }) => null;

export const TimelineVersionVisual: FunctionalComponent<{
  item: TimelineVersion;
}> = ({ item }) => null;

export const TimelineBlogPostVisual: FunctionalComponent<{
  item: TimelineBlogPost;
}> = ({ item }) => (
  <img
    alt=""
    src={imageUrl(
      `https://anandchowdhary.github.io/blog/assets/${item.url
        .split("/")
        .pop()}.png`,
      { w: "512", h: "256", fit: "cover" }
    )}
    loading="lazy"
    width={512}
    height={256}
    className="w-full rounded-lg shadow"
  />
);

export const TimelineThemeVisual: FunctionalComponent<{
  item: TimelineTheme;
}> = ({ item }) => null;

export const TimelineBookVisual: FunctionalComponent<{
  item: TimelineBook;
}> = ({ item }) => (
  <div
    class="rounded-lg w-full bg-cover bg-center bg-no-repeat flex justify-center"
    style={{
      backgroundImage: `url(${imageUrl(item.data.image.split("//")[1], {
        w: "300",
        h: "450",
        fit: "cover",
        blur: "15",
      })})`,
    }}
  >
    <img
      alt=""
      src={imageUrl(item.data.image.split("//")[1], {
        w: "300",
        h: "450",
        fit: "cover",
      })}
      loading="lazy"
      width={300}
      height={450}
      className="block w-24"
    />
  </div>
);

export const TimelineTravelVisual: FunctionalComponent<{
  item: TimelineTravel;
}> = ({ item }) => (
  <img
    alt=""
    src={`https://api.mapbox.com/styles/v1/anandchowdhary/cl91jzd61002q14pm7vtwfa2l/static/${item.data?.approximateCoordinates
      .reverse()
      .join()},9/512x256?access_token=pk.eyJ1IjoiYW5hbmRjaG93ZGhhcnkiLCJhIjoiY2w5MWpxbXZ2MDdpMzN2bW92ZnRzZ2Q4bSJ9.WMWxq61EUjQfWtntvGGNKQ`}
    loading="lazy"
    width={512}
    height={256}
    className="w-full rounded-lg shadow"
  />
);

export const TimelineLifeEventVisual: FunctionalComponent<{
  item: TimelineLifeEvent;
}> = ({ item }) => null;

export const TimelineVideoVisual: FunctionalComponent<{
  item: TimelineVideo;
}> = ({ item }) => (
  <div className="relative w-full">
    <svg
      aria-hidden="true"
      width="2rem"
      height="2rem"
      className="absolute text-white -translate-x-1/2 -translate-y-1/2 drop-shadow left-1/2 top-1/2"
    >
      <use href="#triangle"></use>
    </svg>
    <img
      alt=""
      src={imageUrl(item.data.img.split("//")[1], {
        w: "512",
        h: "256",
        fit: "cover",
      })}
      loading="lazy"
      width={512}
      height={256}
      className="w-full rounded-lg"
    />
  </div>
);

export const TimelineAwardVisual: FunctionalComponent<{
  item: TimelineAward;
}> = ({ item }) => null;

export const TimelinePodcastInterviewVisual: FunctionalComponent<{
  item: TimelinePodcastInterview;
}> = ({ item }) => null;

export const TimelinePressFeatureVisual: FunctionalComponent<{
  item: TimelinePressFeature;
}> = ({ item }) => null;

export const TimelineOpenSourceProjectVisual: FunctionalComponent<{
  item: TimelineOpenSourceProject;
}> = ({ item }) => (
  <div
    class="bg-white w-full rounded-lg shadow flex items-center justify-center py-4 text-6xl leading-none"
    style={{ aspectRatio: "2/1" }}
  >
    <div>
      {item.data.description?.match(/\p{Emoji}+/gu)?.[0] ?? item.title[0]}
    </div>
  </div>
);
