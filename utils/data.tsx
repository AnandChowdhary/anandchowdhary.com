import type {
  Timeline,
  TimeLineItem,
  TimelineOkr,
  TimelineTheme,
} from "https://esm.sh/timeline-types@7.0.0/index.d.ts";
import type {
  AllLifeDataSummary,
  LocationApiResult,
  OuraActivity,
  OuraReadiness,
  OuraSleepData,
} from "./interfaces.ts";

export const fetchJson = async <T = unknown,>(url: string): Promise<T> => {
  const data = await fetch(url);
  return data.json();
};

export const fetchText = async (url: string): Promise<string> => {
  return (await (await fetch(url)).blob()).text();
};

export const fetchLifeData = async (): Promise<AllLifeDataSummary> => {
  let timeline: Timeline | undefined = undefined;
  let sleep: Record<string, OuraSleepData> | undefined = undefined;
  let activity: Record<string, OuraActivity> | undefined = undefined;
  let readiness: Record<string, OuraReadiness> | undefined = undefined;
  let location: LocationApiResult | undefined = undefined;

  try {
    const [timelineData, sleepData, activityData, readinessData, locationData] =
      await Promise.allSettled([
        fetchJson<Timeline>(
          "https://anandchowdhary.github.io/everything/api.json"
        ),
        fetchJson<Record<string, OuraSleepData>>(
          `https://anandchowdhary.github.io/life/data/oura-sleep/summary/days.json`
        ),
        fetchJson<Record<string, OuraActivity>>(
          `https://anandchowdhary.github.io/life/data/oura-activity/summary/days.json`
        ),
        fetchJson<Record<string, OuraReadiness>>(
          `https://anandchowdhary.github.io/life/data/oura-readiness/summary/days.json`
        ),
        fetchJson<LocationApiResult>(
          `https://anandchowdhary.github.io/location/api.json`
        ),
      ]);
    if (timelineData.status === "fulfilled") timeline = timelineData.value;
    if (sleepData.status === "fulfilled") sleep = sleepData.value;
    if (activityData.status === "fulfilled") activity = activityData.value;
    if (readinessData.status === "fulfilled") readiness = readinessData.value;
    if (locationData.status === "fulfilled") location = locationData.value;
  } catch (error) {
    // Ignore errors for now
  }

  if (!timeline) throw new Error("Timeline data not found");

  const okr = timeline.find(({ type }) => type === "okr") as TimelineOkr;
  if (!okr) throw new Error("Timeline OKR not found");

  const theme = timeline.find(({ type }) => type === "theme") as TimelineTheme;
  if (!theme) throw new Error("Timeline theme not found");

  return {
    timeline,
    okr,
    theme,
    sleep,
    activity,
    readiness,
    location,
  };
};

export const categoryData: Record<
  TimeLineItem["type"],
  {
    color: string;
    prefix: string;
    title: string;
  }
> = {
  theme: {
    color: "#1abc9c",
    prefix: "New yearly theme",
    title: "Theme",
  },
  okr: {
    color: "#ff5252",
    prefix: "New quarterly OKRs",
    title: "OKR",
  },
  version: {
    color: "#ff793f",
    prefix: "Redesigned website",
    title: "Redesign",
  },
  "blog-post": {
    color: "#ffb142",
    prefix: "Wrote a blog post",
    title: "Blog post",
  },
  project: {
    color: "#33d9b2",
    prefix: "Published a project",
    title: "Project",
  },
  travel: {
    color: "#706fd3",
    prefix: "Traveled to a new place",
    title: "Travel",
  },
  event: {
    color: "#34ace0",
    prefix: "Spoke at an event",
    title: "Event",
  },
  book: {
    color: "#4b7bec",
    prefix: "Finished a book",
    title: "Book",
  },
  "life-event": {
    color: "#a55eea",
    prefix: "Life milestone",
    title: "Life event",
  },
  video: {
    color: "#eb3b5a",
    prefix: "Featured in a video",
    title: "Video",
  },
  award: {
    color: "#f7b731",
    prefix: "Received an award",
    title: "Award",
  },
  "podcast-interview": {
    color: "#0fb9b1",
    prefix: "Featured in a podcast",
    title: "Podcast",
  },
  "press-feature": {
    color: "#2bcbba",
    prefix: "Featured in the press",
    title: "Press",
  },
  "open-source-project": {
    color: "#26de81",
    prefix: "Launched an open source project",
    title: "Open source",
  },
};
