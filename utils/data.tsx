import type {
  Timeline,
  TimeLineItem,
  TimelineOkr,
  TimelineTheme,
} from "https://esm.sh/timeline-types@9.0.0/index.d.ts";
import type {
  AllLifeDataSummary,
  LocationApiResult,
  OuraActivity,
  OuraReadiness,
  OuraSleepData,
} from "./interfaces.ts";

const DESTINATION_HEADER_NAME = "x-ah-origin";
const PROJECT_KEY_HEADER_NAME = "x-ah-pk";
const PROTOCOL_HEADER_NAME = "x-ah-proto";
const PAYLOAD_HEADER_NAME = "x-ah-payload";
const PROXY_URL = "https://proxy.apihero.run";
const API_HERO_PROJECT_KEY = Deno.env.get("API_HERO_PROJECT_KEY");

const transformAndFetch = async (url: string) => {
  if (!API_HERO_PROJECT_KEY) {
    const res = await fetch(url);
    if (!res.ok) {
      console.log(url);
      throw new HttpError(res.status, res.statusText);
    }
    return res;
  }
  const originalUrl = new URL(url);
  const newUrl = new URL(originalUrl.pathname + originalUrl.search, PROXY_URL);
  const res = await fetch(newUrl, {
    headers: {
      [DESTINATION_HEADER_NAME]: originalUrl.host,
      [PROTOCOL_HEADER_NAME]: originalUrl.protocol,
      [PROJECT_KEY_HEADER_NAME]: API_HERO_PROJECT_KEY,
      [PAYLOAD_HEADER_NAME]: `{ "env": "production" }`,
    },
  });
  if (!res.ok) throw new HttpError(res.status, res.statusText);
  return res;
};

export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export const fetchJson = async <T = unknown,>(url: string): Promise<T> => {
  const res = await transformAndFetch(url);
  return res.json();
};

export const fetchText = async (url: string): Promise<string> => {
  const res = await transformAndFetch(url);
  const blob = await res.blob();
  return blob.text();
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
    slug: string;
  }
> = {
  theme: {
    color: "#a16207",
    prefix: "New yearly theme",
    title: "Theme",
    slug: "themes",
  },
  okr: {
    color: "#4d7c0f",
    prefix: "New quarterly OKRs",
    title: "OKR",
    slug: "okrs",
  },
  version: {
    color: "#15803d",
    prefix: "Redesigned website",
    title: "Redesign",
    slug: "redesigns",
  },
  "blog-post": {
    color: "#047857",
    prefix: "Wrote a blog post",
    title: "Blog post",
    slug: "blog",
  },
  project: {
    color: "#0f766e",
    prefix: "Published a project",
    title: "Project",
    slug: "projects",
  },
  travel: {
    color: "#0e7490",
    prefix: "Traveled to a new place",
    title: "Travel",
    slug: "travel",
  },
  event: {
    color: "#0369a1",
    prefix: "Spoke at an event",
    title: "Event",
    slug: "events",
  },
  book: {
    color: "#1d4ed8",
    prefix: "Finished a book",
    title: "Book",
    slug: "books",
  },
  "life-event": {
    color: "#4338ca",
    prefix: "Life milestone",
    title: "Life event",
    slug: "life-events",
  },
  video: {
    color: "#6d28d9",
    prefix: "Featured in a video",
    title: "Video",
    slug: "videos",
  },
  award: {
    color: "#7e22ce",
    prefix: "Received an award",
    title: "Award",
    slug: "press",
  },
  "podcast-interview": {
    color: "#a21caf",
    prefix: "Featured in a podcast",
    title: "Podcast",
    slug: "press",
  },
  "press-feature": {
    color: "#be185d",
    prefix: "Featured in the press",
    title: "Press",
    slug: "press",
  },
  "open-source-project": {
    color: "#be123c",
    prefix: "Launched an open source project",
    title: "Open source project",
    slug: "projects",
  },
};
