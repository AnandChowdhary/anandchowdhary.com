import type { HomeData } from "./interfaces.ts";

export const categoryData: Record<
  HomeData["timeline"][0]["type"],
  { color: string; icon: string; prefix: string; title: string; url: string }
> = {
  okr: {
    url: "",
    color: "orange",
    icon: "book-open",
    prefix: "New quarterly OKRs",
    title: "OKR",
  },
  "blog-post": {
    url: "",
    color: "indigo",
    icon: "book-open",
    prefix: "Wrote a blog post",
    title: "Blog post",
  },
  project: {
    url: "",
    color: "lightBlue",
    icon: "newspaper",
    prefix: "Published a project",
    title: "Project",
  },
  travel: {
    url: "",
    color: "green",
    icon: "plane",
    prefix: "Traveled to a new place",
    title: "Travel",
  },
  event: {
    url: "",
    color: "skyblue",
    icon: "podium",
    prefix: "Spoke at an event",
    title: "Event",
  },
  book: {
    url: "",
    color: "purple",
    icon: "book-open",
    prefix: "Finished a book",
    title: "Book",
  },
  "life-event": {
    url: "",
    color: "hotpink",
    icon: "alarm",
    prefix: "Life milestone",
    title: "Life event",
  },
  video: {
    url: "",
    color: "red",
    icon: "video-camera",
    prefix: "Featured in a video",
    title: "Video",
  },
  award: {
    url: "",
    color: "yellow",
    icon: "award",
    prefix: "Received an award",
    title: "Award",
  },
  "podcast-interview": {
    url: "",
    color: "fuchsia",
    icon: "microphone",
    prefix: "Featured in a podcast",
    title: "Podcast",
  },
  "press-feature": {
    url: "",
    color: "teal",
    icon: "newspaper",
    prefix: "Featured in the press",
    title: "Press",
  },
  "open-source-project": {
    url: "",
    color: "green",
    icon: "newspaper",
    prefix: "Launched an open source project",
    title: "Open source",
  },
};
