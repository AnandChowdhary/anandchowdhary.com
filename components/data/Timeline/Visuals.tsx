import IconPlayerPlay from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/player-play.tsx";
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
} from "https://esm.sh/timeline-types@9.0.0/index.d.ts";
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
      { w: "288", h: "144", fit: "cover" }
    )}
    srcSet={`${imageUrl(
      `https://raw.githubusercontent.com/AnandChowdhary/okrs/main/assets/${item.url
        .split("/")
        .reverse()
        .join("/")
        .substring(0, 6)
        .split("/")
        .reverse()
        .join("-")}.png`,
      { w: "288", h: "144", fit: "cover" }
    )} 1x, ${imageUrl(
      `https://raw.githubusercontent.com/AnandChowdhary/okrs/main/assets/${item.url
        .split("/")
        .reverse()
        .join("/")
        .substring(0, 6)
        .split("/")
        .reverse()
        .join("-")}.png`,
      { w: "576", h: "288", fit: "cover" }
    )} 2x`}
    loading="lazy"
    width={288}
    height={144}
    className="w-full rounded-lg shadow"
  />
);

export const TimelineEventVisual: FunctionalComponent<{
  item: TimelineEvent;
}> = ({ item }) =>
  item.data.video &&
  new URL(item.data.video).hostname.endsWith("youtube.com") ? (
    <div class="relative">
      <IconPlayerPlay
        class="w-12 h-12 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
        style={{
          filter: "drop-shadow(0 0 0.5rem rgba(100, 100, 100, 0.5))",
        }}
      />
      <img
        alt=""
        src={imageUrl(
          `https://img.youtube.com/vi/${new URL(
            item.data.video
          ).searchParams.get("v")}/hqdefault.jpg`,
          { w: "288", h: "144", fit: "cover" }
        )}
        srcSet={`${imageUrl(
          `https://img.youtube.com/vi/${new URL(
            item.data.video
          ).searchParams.get("v")}/hqdefault.jpg`,
          { w: "288", h: "144", fit: "cover" }
        )} 1x, ${imageUrl(
          `https://img.youtube.com/vi/${new URL(
            item.data.video
          ).searchParams.get("v")}/hqdefault.jpg`,
          { w: "576", h: "288", fit: "cover" }
        )} 2x`}
        width={288}
        height={144}
        className="w-full rounded-lg shadow"
      />
    </div>
  ) : item.data.coordinates ? (
    <img
      alt=""
      src={`https://api.mapbox.com/styles/v1/anandchowdhary/cl91jzd61002q14pm7vtwfa2l/static/${item.data.coordinates
        .reverse()
        .join()},13/288x144?access_token=pk.eyJ1IjoiYW5hbmRjaG93ZGhhcnkiLCJhIjoiY2w5MWpxbXZ2MDdpMzN2bW92ZnRzZ2Q4bSJ9.WMWxq61EUjQfWtntvGGNKQ`}
      srcSet={`https://api.mapbox.com/styles/v1/anandchowdhary/cl91jzd61002q14pm7vtwfa2l/static/${item.data.coordinates
        .reverse()
        .join()},13/288x144?access_token=pk.eyJ1IjoiYW5hbmRjaG93ZGhhcnkiLCJhIjoiY2w5MWpxbXZ2MDdpMzN2bW92ZnRzZ2Q4bSJ9.WMWxq61EUjQfWtntvGGNKQ 1x, https://api.mapbox.com/styles/v1/anandchowdhary/cl91jzd61002q14pm7vtwfa2l/static/${item.data.coordinates
        .reverse()
        .join()},14/576x288?access_token=pk.eyJ1IjoiYW5hbmRjaG93ZGhhcnkiLCJhIjoiY2w5MWpxbXZ2MDdpMzN2bW92ZnRzZ2Q4bSJ9.WMWxq61EUjQfWtntvGGNKQ 2x`}
      loading="lazy"
      width={288}
      height={144}
      className="w-full rounded-lg shadow"
    />
  ) : null;

export const TimelineProjectVisual: FunctionalComponent<{
  item: TimelineProject;
}> = ({ item }) =>
  item.data.image ? (
    <div
      class="bg-white w-full rounded-lg shadow flex items-center justify-center"
      style={{
        aspectRatio: "2/1",
        padding: item.data.image.attachment === "padded" ? "0.5rem" : 0,
        backgroundColor: item.data.image.color,
      }}
    >
      {item.data.image.attachment === "padded" ? (
        <img
          alt=""
          src={imageUrl(item.data.image.url, { w: "288" })}
          srcSet={`${imageUrl(item.data.image.url, {
            w: "288",
          })} 1x, ${imageUrl(item.data.image.url, { w: "576" })} 2x`}
          loading="lazy"
          class="max-w-full max-h-48"
        />
      ) : (
        <img
          alt=""
          src={imageUrl(item.data.image.url, { w: "288" })}
          srcSet={`${imageUrl(item.data.image.url, {
            w: "288",
          })} 1x, ${imageUrl(item.data.image.url, { w: "576" })} 2x`}
          loading="lazy"
          class="bg-red-100 w-full rounded-lg"
        />
      )}
    </div>
  ) : null;

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
      { w: "288", h: "144", fit: "cover" }
    )}
    srcSet={`${imageUrl(
      `https://anandchowdhary.github.io/blog/assets/${item.url
        .split("/")
        .pop()}.png`,
      { w: "288", h: "144", fit: "cover" }
    )} 1x, ${imageUrl(
      `https://anandchowdhary.github.io/blog/assets/${item.url
        .split("/")
        .pop()}.png`,
      { w: "576", h: "288", fit: "cover" }
    )} 2x`}
    loading="lazy"
    width={288}
    height={144}
    className="w-full rounded-lg shadow"
  />
);

export const TimelineThemeVisual: FunctionalComponent<{
  item: TimelineTheme;
}> = ({ item }) => (
  <img
    alt=""
    src={imageUrl(
      `https://raw.githubusercontent.com/AnandChowdhary/themes/main/assets/${new Date(
        item.date
      ).getFullYear()}.png`,
      { w: "288", h: "144", fit: "cover" }
    )}
    srcSet={`${imageUrl(
      `https://raw.githubusercontent.com/AnandChowdhary/themes/main/assets/${new Date(
        item.date
      ).getFullYear()}.png`,
      { w: "288", h: "144", fit: "cover" }
    )} 1x, ${imageUrl(
      `https://raw.githubusercontent.com/AnandChowdhary/themes/main/assets/${new Date(
        item.date
      ).getFullYear()}.png`,
      { w: "576", h: "288", fit: "cover" }
    )} 2x`}
    loading="lazy"
    width={288}
    height={144}
    className="w-full rounded-lg shadow"
  />
);

export const TimelineBookVisual: FunctionalComponent<{
  item: TimelineBook;
}> = ({ item }) => (
  <div
    class="rounded-lg w-full bg-cover bg-center bg-no-repeat flex justify-center"
    style={{
      backgroundImage: `url(${imageUrl(item.data.image.split("//")[1], {
        w: "96",
        h: "144",
        fit: "cover",
        blur: "15",
      })})`,
    }}
  >
    <img
      alt=""
      src={imageUrl(item.data.image.split("//")[1], {
        w: "96",
        h: "144",
        fit: "cover",
      })}
      srcSet={`${imageUrl(item.data.image.split("//")[1], {
        w: "96",
        h: "144",
        fit: "cover",
      })} 1x, ${imageUrl(item.data.image.split("//")[1], {
        w: "192",
        h: "288",
        fit: "cover",
      })} 2x`}
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
      .join()},9/288x144?access_token=pk.eyJ1IjoiYW5hbmRjaG93ZGhhcnkiLCJhIjoiY2w5MWpxbXZ2MDdpMzN2bW92ZnRzZ2Q4bSJ9.WMWxq61EUjQfWtntvGGNKQ`}
    srcSet={`https://api.mapbox.com/styles/v1/anandchowdhary/cl91jzd61002q14pm7vtwfa2l/static/${item.data?.approximateCoordinates
      .reverse()
      .join()},9/288x144?access_token=pk.eyJ1IjoiYW5hbmRjaG93ZGhhcnkiLCJhIjoiY2w5MWpxbXZ2MDdpMzN2bW92ZnRzZ2Q4bSJ9.WMWxq61EUjQfWtntvGGNKQ 1x, https://api.mapbox.com/styles/v1/anandchowdhary/cl91jzd61002q14pm7vtwfa2l/static/${item.data?.approximateCoordinates
      .reverse()
      .join()},8/576x288?access_token=pk.eyJ1IjoiYW5hbmRjaG93ZGhhcnkiLCJhIjoiY2w5MWpxbXZ2MDdpMzN2bW92ZnRzZ2Q4bSJ9.WMWxq61EUjQfWtntvGGNKQ 2x`}
    loading="lazy"
    width={288}
    height={144}
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
    <IconPlayerPlay
      class="w-12 h-12 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
      style={{
        filter: "drop-shadow(0 0 0.5rem rgba(100, 100, 100, 0.5))",
      }}
    />
    <img
      alt=""
      src={imageUrl(item.data.img.split("//")[1], {
        w: "288",
        h: "144",
        fit: "cover",
      })}
      srcSet={`${imageUrl(item.data.img.split("//")[1], {
        w: "288",
        h: "144",
        fit: "cover",
      })} 1x, ${imageUrl(item.data.img.split("//")[1], {
        w: "576",
        h: "288",
        fit: "cover",
      })} 2x`}
      loading="lazy"
      width={288}
      height={144}
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
}> = ({ item }) =>
  item.data.openGraphImageUrl ? (
    <img
      alt=""
      src={imageUrl(item.data.openGraphImageUrl, {
        w: "288",
        h: "144",
        fit: "cover",
      })}
      srcSet={`${imageUrl(item.data.openGraphImageUrl, {
        w: "288",
        h: "144",
        fit: "cover",
      })} 1x, ${imageUrl(item.data.openGraphImageUrl, {
        w: "576",
        h: "288",
        fit: "cover",
      })} 2x`}
      loading="lazy"
      width={288}
      height={144}
      className="w-full rounded-lg shadow"
    />
  ) : (
    <div
      class="bg-white w-full rounded-lg shadow flex items-center justify-center py-4 text-6xl leading-none"
      style={{ aspectRatio: "2/1" }}
    >
      <div>
        {item.data.description?.match(/\p{Emoji}+/gu)?.[0] ?? item.title[0]}
      </div>
    </div>
  );
