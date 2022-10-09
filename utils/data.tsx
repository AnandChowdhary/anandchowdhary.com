import type { HomeData } from "./interfaces.ts";

export const fetchJson = async <T = unknown,>(url: string): Promise<T> => {
  const data = await fetch(url);
  return data.json();
};

export const categoryData: Record<
  HomeData["timeline"][0]["type"],
  { color: string; icon: any; prefix: string; title: string }
> = {
  okr: {
    color: "#ff5252",
    icon: "🎯",
    prefix: "New quarterly OKRs",
    title: "OKR",
  },
  version: {
    color: "#ff793f",
    icon: "🎨",
    prefix: "Redesigned website",
    title: "Redesign",
  },
  "blog-post": {
    color: "#ffb142",
    icon: "📝",
    prefix: "Wrote a blog post",
    title: "Blog post",
  },
  project: {
    color: "#33d9b2",
    icon: "🚀",
    prefix: "Published a project",
    title: "Project",
  },
  travel: {
    color: "#706fd3",
    icon: "✈️",
    prefix: "Traveled to a new place",
    title: "Travel",
  },
  event: {
    color: "#34ace0",
    icon: "🗓",
    prefix: "Spoke at an event",
    title: "Event",
  },
  book: {
    color: "#4b7bec",
    icon: "📚",
    prefix: "Finished a book",
    title: "Book",
  },
  "life-event": {
    color: "#a55eea",
    icon: "⭐️",
    prefix: "Life milestone",
    title: "Life event",
  },
  video: {
    color: "#eb3b5a",
    icon: "🎥",
    prefix: "Featured in a video",
    title: "Video",
  },
  award: {
    color: "#f7b731",
    icon: "🏆",
    prefix: "Received an award",
    title: "Award",
  },
  "podcast-interview": {
    color: "#0fb9b1",
    icon: "🎙",
    prefix: "Featured in a podcast",
    title: "Podcast",
  },
  "press-feature": {
    color: "#2bcbba",
    icon: "📰",
    prefix: "Featured in the press",
    title: "Press",
  },
  "open-source-project": {
    color: "#26de81",
    icon: "👨‍💻",
    prefix: "Launched an open source project",
    title: "Open source",
  },
};
