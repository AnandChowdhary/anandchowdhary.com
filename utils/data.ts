console.log("Cache enabled", Deno.env.get("CACHE_ENABLED"));

export interface IOkrs {
  updatedAt: string;
  years: {
    name: number;
    progress: number;
    success: number;
    quarters: {
      name: number;
      progress: number;
      success: number;
      objectives: {
        name: string;
        progress: number;
        success: number;
        key_results: {
          name: string;
          target_result: number;
          current_result: number;
          progress: number;
          success: number;
        }[];
      }[];
    }[];
  }[];
}
export const getOkrs = async (): Promise<IOkrs> => {
  if (Deno.env.get("CACHE_ENABLED")) {
    const data = await Deno.readTextFile("./.cache/okrs.json");
    return JSON.parse(data);
  }

  const okrs = (await (
    await fetch("https://anandchowdhary.github.io/okrs/api.json")
  ).json()) as IOkrs;
  return okrs;
};

export interface IEvent {
  slug: string;
  name: string;
  date: string;
  emoji: string;
  venue: string;
  city: string;
}
export const getEvents = async (): Promise<IEvent[]> => {
  if (Deno.env.get("CACHE_ENABLED")) {
    const data = await Deno.readTextFile("./.cache/events.json");
    return JSON.parse(data);
  }

  const events = (await (
    await fetch("https://anandchowdhary.github.io/events/api.json")
  ).json()) as IEvent[];
  return events;
};

interface IProject {
  slug: string;
  title: string;
  date: string;
}
export const getProjects = async (): Promise<IProject[]> => {
  if (Deno.env.get("CACHE_ENABLED")) {
    const data = await Deno.readTextFile("./.cache/projects.json");
    return JSON.parse(data);
  }

  const projects = (await (
    await fetch("https://anandchowdhary.github.io/projects/api.json")
  ).json()) as IProject[];
  return projects;
};

export interface ITravel {
  date: string;
  title: string;
  assets: string[];
}
export const getTravel = async (): Promise<ITravel[]> => {
  if (Deno.env.get("CACHE_ENABLED")) {
    const data = await Deno.readTextFile("./.cache/travel.json");
    return JSON.parse(data);
  }

  const travel = (await (
    await fetch("https://anandchowdhary.github.io/travel/api.json")
  ).json()) as ITravel[];
  return travel;
};

export interface IBlogPost {
  slug: string;
  title: string;
  words: number;
  date: string;
}
export const getBlogPosts = async (): Promise<IBlogPost[]> => {
  if (Deno.env.get("CACHE_ENABLED")) {
    const data = await Deno.readTextFile("./.cache/blog.json");
    return JSON.parse(data);
  }

  const blogPosts = (await (
    await fetch(
      "https://raw.githubusercontent.com/AnandChowdhary/blog/HEAD/api.json"
    )
  ).json()) as IBlogPost[];
  return blogPosts;
};

export interface IBook {
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  image: string;
  issueNumber: number;
  progressPercent: number;
  state: "reading" | "completed";
  startedAt: string;
}
export const getBooks = async (): Promise<IBook[]> => {
  if (Deno.env.get("CACHE_ENABLED")) {
    const data = await Deno.readTextFile("./.cache/books.json");
    return JSON.parse(data);
  }

  const books = (await (
    await fetch(
      "https://raw.githubusercontent.com/AnandChowdhary/books/HEAD/api.json"
    )
  ).json()) as IBook[];
  return books;
};

export interface ILifeEvent {
  date: string;
  title: string;
  description?: string;
}
export const getLifeEvents = async (): Promise<ILifeEvent[]> => {
  const lifeEvents = JSON.parse(
    await Deno.readTextFile("./data/life-events.json")
  ) as ILifeEvent[];
  return lifeEvents;
};

export interface IPress {
  awards: {
    title: string;
    publisher: string;
    date: string;
    href: string;
  }[];
  podcasts: {
    title: string;
    publisher: string;
    date: string;
    href: string;
    embed?: string;
  }[];
  features: {
    title: string;
    publisher: string;
    date: string;
    href: string;
    author?: string;
    description?: string;
  }[];
}
export const getPress = async (): Promise<IPress> => {
  const press = JSON.parse(
    await Deno.readTextFile("./data/press.json")
  ) as IPress;
  return press;
};

export interface IVideo {
  title: string;
  href: string;
  city: string;
  country: string;
  date: string;
  img: string;
  publisher: string;
  duration: string;
  description: string;
}
export const getVideos = async () => {
  const videos = JSON.parse(
    await Deno.readTextFile("./data/videos.json")
  ) as IVideo[];
  return videos;
};

export interface ITheme {
  year: string;
  title: string;
  description: string;
}
export const getThemes = async () => {
  const themes = JSON.parse(
    await Deno.readTextFile("./data/themes.json")
  ) as ITheme[];
  return themes;
};

export interface IRepo {
  html_url: string;
  full_name: string;
  created_at: string;
  description?: string;
  stargazers_count: number;
  open_issues: number;
  forks_count: number;
  watchers_count: number;
  language: string;
  language_color?: string;
}
export const getRepos = async (): Promise<IRepo[]> => {
  if (Deno.env.get("CACHE_ENABLED")) {
    const data = await Deno.readTextFile("./.cache/repos.json");
    return JSON.parse(data);
  }

  const repos = (await (
    await fetch(
      "https://raw.githubusercontent.com/AnandChowdhary/featured/HEAD/repos.json"
    )
  ).json()) as IRepo[];
  return repos;
};
