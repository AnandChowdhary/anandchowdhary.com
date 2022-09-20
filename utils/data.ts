import type { HomeData } from "./interfaces.ts";

export const categoryData: Record<
  HomeData["timeline"][0]["type"],
  { color: string; icon: string; prefix: string; title: string }
> = {
  okr: {
    color: "orange",
    icon: "book-open",
    prefix: "New quarterly OKRs",
    title: "OKR",
  },
  "blog-post": {
    color: "indigo",
    icon: "book-open",
    prefix: "Wrote a blog post",
    title: "Blog post",
  },
  project: {
    color: "lightBlue",
    icon: "newspaper",
    prefix: "Published a project",
    title: "Project",
  },
  travel: {
    color: "green",
    icon: "plane",
    prefix: "Traveled to a new place",
    title: "Travel",
  },
  event: {
    color: "cyan",
    icon: "podium",
    prefix: "Spoke at an event",
    title: "Event",
  },
  book: {
    color: "purple",
    icon: "book-open",
    prefix: "Finished a book",
    title: "Book",
  },
  "life-event": {
    color: "rose",
    icon: "alarm",
    prefix: "Life milestone",
    title: "Life event",
  },
  video: {
    color: "red",
    icon: "video-camera",
    prefix: "Featured in a video",
    title: "Video",
  },
  award: {
    color: "yellow",
    icon: "award",
    prefix: "Received an award",
    title: "Award",
  },
  "podcast-interview": {
    color: "fuchsia",
    icon: "microphone",
    prefix: "Featured in a podcast",
    title: "Podcast",
  },
  "press-feature": {
    color: "teal",
    icon: "newspaper",
    prefix: "Featured in the press",
    title: "Press",
  },
  "open-source-project": {
    color: "green",
    icon: "newspaper",
    prefix: "Launched an open source project",
    title: "Open source",
  },
};
