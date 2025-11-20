import { GenericItem } from "@/app/components/generic-section";
import slugify from "@sindresorhus/slugify";
import { marked } from "marked";
import { markedSmartypants } from "marked-smartypants";

marked.use(markedSmartypants());

export interface BlogPost extends GenericItem {
  attributes: { date: string; draft?: boolean };
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Note extends GenericItem {}

export interface Version extends GenericItem {
  attributes: {
    date: string;
    draft?: boolean;
    generator?: string;
    archive?: string;
    type?: string[];
    stack?: string[];
    domain?: string;
  };
}

export interface Project extends GenericItem {
  type?: string;
  url?: string;
  attributes: {
    date?: string;
    draft?: boolean;
    tags?: string;
    intro?: string;
    work?: string[];
    bg?: string;
    style?: string;
    img_src?: string;
    img_type?: string;
    stack?: string[];
    tools?: string[];
    collaborators?: string[];
    award?: string;
    award_position?: number;
    client?: string;
    client_link?: string;
    timeline?: string;
    places?: string;
    venue?: string;
    icon?: string;
    icon_bg?: boolean;
    subcategory?: string;
  };
}

export interface Repository {
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  created_at: string;
  homepage?: string;
  topics?: string[];
  slug: string;
  path: string;
  source: string;
  title: string;
  date: string;
  excerpt: string;
  emoji: string;
  attributes: { subtitle: string };
}

export interface Book extends GenericItem {
  title: string;
  authors: string[];
  publisher?: string;
  publishedDate: string;
  description: string;
  image: string;
  language: string;
  categories: string[];
  pageCount: number;
  isbn10?: string;
  isbn13?: string;
  googleBooks: { id: string; preview: string; info: string; canonical: string };
  issueNumber: number;
  progressPercent: number;
  state: "completed" | "reading";
  startedAt: string;
  completedAt?: string;
  timeToComplete?: number;
  timeToCompleteFormatted?: string;
  attributes: { date: string };
}

export interface Event extends GenericItem {
  attributes: {
    date: string;
    remote?: boolean;
    video?: string;
    talk?: string;
    event?: string;
    venue?: string;
    coordinates?: [number, number];
    city?: string;
    country?: string;
  };
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Theme extends GenericItem {}

export interface Country extends GenericItem {
  label: string;
  coordinates: [number, number];
  date: string;
  hash: string;
  country_code: string;
  full_label?: string;
  timezone: {
    name: string;
    countries: string[];
    utcOffset: number;
    utcOffsetStr: string;
    dstOffset: number;
    dstOffsetStr: string;
    aliasOf: string | null;
  };
  country_emoji?: string;
}

export interface Work extends GenericItem {
  label: string;
  icon: string;
  url: string;
}

interface GitHubContributionsResponse {
  totalContributions?: number;
}

export async function getGitHubContributionCount(): Promise<number | null> {
  const response = await fetch(
    "https://github-contributions-api.deno.dev/AnandChowdhary.json",
    { next: { revalidate: 3600 } }
  );
  if (!response.ok) return null;
  const data = (await response.json()) as
    | GitHubContributionsResponse
    | undefined;
  if (typeof data?.totalContributions !== "number") return null;
  return data.totalContributions;
}

export interface ArchiveItem {
  date: string;
  type: string;
  url: string;
  source?: string;
  title: string;
  data?: unknown;
}

export interface PressItem {
  date: string;
  title: string;
  publisher: string;
  href?: string;
  author?: string;
  description?: string;
  embed?: string;
  slug?: string;
  category?: "award" | "podcast" | "feature";
}

export interface Press {
  awards: PressItem[];
  podcasts: PressItem[];
  features: PressItem[];
}

export function generateSlug(title: string | undefined | null): string {
  if (!title) return "";
  return slugify(title.toLowerCase(), { lowercase: true, separator: "-" });
}

export async function getAllArchiveItems(): Promise<ArchiveItem[]> {
  const response = await fetch(
    "https://anandchowdhary.github.io/everything/api.json",
    { next: { revalidate: 3600 } }
  );
  const archiveData = (await response.json()) as ArchiveItem[];
  return archiveData
    .filter((item) => item.type !== "okr")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getArchiveItemsByYear(
  year: number
): Promise<ArchiveItem[]> {
  const allItems = await getAllArchiveItems();
  return allItems.filter((item) => new Date(item.date).getFullYear() === year);
}

export async function getPress(): Promise<Press> {
  const press = await fetch(
    "https://anandchowdhary.github.io/everything/data/press.json",
    { next: { revalidate: 3600 } }
  );
  const pressData = (await press.json()) as Press;

  // Add slugs and categories to each item
  pressData.awards = pressData.awards.map((item) => ({
    ...item,
    slug: generateSlug(item.publisher),
    category: "award" as const,
  }));

  pressData.podcasts = pressData.podcasts.map((item) => ({
    ...item,
    slug: generateSlug(item.publisher),
    category: "podcast" as const,
  }));

  pressData.features = pressData.features.map((item) => ({
    ...item,
    slug: generateSlug(item.publisher),
    category: "feature" as const,
  }));

  return pressData;
}

export async function getAllPressItems(): Promise<PressItem[]> {
  const pressData = await getPress();
  return [...pressData.awards, ...pressData.podcasts, ...pressData.features];
}

export async function getPressItemByYearAndSlug(
  year: number,
  slug: string
): Promise<PressItem | null> {
  const allItems = await getAllPressItems();
  return (
    allItems.find(
      (item) => new Date(item.date).getFullYear() === year && item.slug === slug
    ) || null
  );
}

export interface LifeEvent {
  date: string;
  title: string;
  description?: string;
  slug?: string;
}

export interface Video {
  title: string;
  date: string;
  city?: string;
  country?: string;
  href?: string;
  img?: string;
  publisher?: string;
  duration?: string;
  description?: string;
  slug?: string;
}

export async function getLifeEvents(): Promise<LifeEvent[]> {
  const lifeEvents = await fetch(
    "https://anandchowdhary.github.io/everything/data/life-events.json",
    {
      next: { revalidate: 3600 },
    }
  );
  const lifeEventsData = (await lifeEvents.json()) as LifeEvent[];

  // Add slugs to each item
  return lifeEventsData.map((item) => ({
    ...item,
    slug: generateSlug(item.title),
  }));
}

export async function getLifeEventByYearAndSlug(
  year: number,
  slug: string
): Promise<LifeEvent | null> {
  const allEvents = await getLifeEvents();
  return (
    allEvents.find(
      (event) =>
        new Date(event.date).getFullYear() === year && event.slug === slug
    ) || null
  );
}

export async function getVideos(): Promise<Video[]> {
  const videos = await fetch(
    "https://anandchowdhary.github.io/everything/data/videos.json",
    {
      next: { revalidate: 3600 },
    }
  );
  const videosData = (await videos.json()) as Video[];

  // Add slugs to each item
  return videosData.map((item) => ({
    ...item,
    slug: generateSlug(item.title),
  }));
}

export async function getVideoByYearAndSlug(
  year: number,
  slug: string
): Promise<Video | null> {
  const allVideos = await getVideos();
  return (
    allVideos.find(
      (video) =>
        new Date(video.date).getFullYear() === year && video.slug === slug
    ) || null
  );
}

export async function getAllNotes(): Promise<Note[]> {
  const notes = await fetch(
    "https://anandchowdhary.github.io/notes/threads/api.json",
    { next: { revalidate: 3600 } }
  );
  const notesData = (await notes.json()) as Note[];
  return notesData
    .filter((note) => !note.attributes.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getNoteByYearAndSlug(
  year: number,
  slug: string
): Promise<Note | null> {
  const notesData = await getAllNotes();
  return (
    notesData
      .filter((note) => new Date(note.date).getUTCFullYear() === year)
      .find((note) => note.slug.replace(".md", "") === slug) || null
  );
}

export async function getNoteContent(
  year: string,
  slug: string
): Promise<string> {
  const noteContent = await fetch(
    `https://raw.githubusercontent.com/AnandChowdhary/notes/refs/heads/main/threads/${year}/${slug}.md`,
    { next: { revalidate: 3600 } }
  );
  if (!noteContent.ok) throw new Error("Note content not found");
  let noteContentText = await noteContent.text();

  // Remove front-matter if there is any
  if (noteContentText.startsWith("---")) {
    const frontMatterEnd = noteContentText.indexOf("\n---");
    noteContentText = noteContentText.slice(frontMatterEnd + 4).trim();
  }

  // Remove heading
  if (noteContentText.startsWith("# ")) {
    const lines = noteContentText.split("\n");
    noteContentText = lines.slice(1).join("\n").trim();
  }

  return noteContentText;
}

export async function getAllBlogPosts(
  includeDrafts?: boolean
): Promise<BlogPost[]> {
  const blog = await fetch("https://anandchowdhary.github.io/blog/api.json", {
    next: { revalidate: 3600 },
  });
  const blogData = (await blog.json()) as BlogPost[];
  return blogData
    .filter((post) => (includeDrafts ? true : !post.attributes.draft))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogPostByYearAndSlug(
  year: number,
  slug: string,
  includeDrafts?: boolean
): Promise<BlogPost | null> {
  const blogData = await getAllBlogPosts(includeDrafts);
  return (
    blogData
      .filter((post) => new Date(post.date).getUTCFullYear() === year)
      .find((post) => post.slug.replace(".md", "") === slug) || null
  );
}

export async function getBlogPostContent(
  year: string,
  slug: string
): Promise<string> {
  const postContent = await fetch(
    `https://raw.githubusercontent.com/AnandChowdhary/blog/refs/heads/main/blog/${year}/${slug}`
  );
  if (!postContent.ok) throw new Error("Post content not found");
  let postContentText = await postContent.text();

  // Remove front-matter if there is any
  if (postContentText.startsWith("---")) {
    const frontMatterEnd = postContentText.indexOf("\n---");
    postContentText = postContentText.slice(frontMatterEnd + 4).trim();
  }

  // Remove heading
  if (postContentText.startsWith("# ")) {
    const lines = postContentText.split("\n");
    postContentText = lines.slice(1).join("\n");
  }

  // Convert relative asset paths to raw GitHub URLs
  postContentText = postContentText.replace(
    /!\[([^\]]*)\]\((\/assets\/[^)]+)\)/g,
    (_match, alt, path) =>
      `![${alt}](https://raw.githubusercontent.com/AnandChowdhary/blog/refs/heads/main${path})`
  );

  return postContentText;
}

export async function getRepositoryReadMe(name: string): Promise<string> {
  const readMe = await fetch(
    `https://raw.githubusercontent.com/${name}/HEAD/README.md`,
    { next: { revalidate: 3600 } }
  );
  const readMeText = await readMe.text();
  return readMeText;
}

export async function getRepositoryDetails(
  name: string
): Promise<string | null> {
  const readMeText = await getRepositoryReadMe(name);
  if (readMeText.includes(`data-embed="anandchowdhary.com"`)) {
    return (
      readMeText.split("</summary>")[1]?.split("</details>")[0]?.trim() ?? null
    );
  }
  return null;
}

export async function getAllRepositories(): Promise<Repository[]> {
  const repos = await fetch(
    "https://anandchowdhary.github.io/featured/repos.json",
    { next: { revalidate: 3600 } }
  );
  const reposData = (await repos.json()) as Repository[];

  const formatRepoTitle = (name: string): string => {
    // First replace dashes and underscores with spaces
    const formatted = name.replace(/[-_]/g, " ");

    // Split by dots to handle file extensions
    const parts = formatted.split(".");

    if (parts.length > 1) {
      // If there's a file extension, capitalize only the main part
      const mainPart = parts[0].replace(/\b\w/g, (char) => char.toUpperCase());
      const extension = parts.slice(1).join(".").toLowerCase();
      return `${mainPart}.${extension}`;
    } else {
      // No file extension, capitalize all word boundaries
      return formatted.replace(/\b\w/g, (char) => char.toUpperCase());
    }
  };

  const cleanSubtitle = (text: string, projectName: string): string => {
    if (!text) return text;
    let cleanedText = text.trim();
    const words = cleanedText.split(" ");
    if (
      words.length > 0 &&
      words[0].toLowerCase() === projectName.toLowerCase()
    ) {
      words.shift();

      while (
        words.length > 0 &&
        ["is", "a", "the"].includes(words[0].toLowerCase())
      )
        words.shift();

      if (words.length > 0)
        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
      cleanedText = words.join(" ");
    }
    return cleanedText;
  };

  const reposDataWithRequiredProps = await Promise.all(
    reposData
      .filter((repo) => repo.name) // Filter out repos without names
      .map((repo) => ({
        ...repo,
        slug: generateSlug(repo.name),
        path: `/open-source/${generateSlug(repo.name)}`,
        source: repo.html_url,
        title: formatRepoTitle(repo.name),
        date: repo.created_at,
        excerpt: repo.description || "No description available",
        emoji: "📦",
      }))
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .map(async (repo) => {
        repo.attributes = repo.attributes ?? {};
        const readMe = await fetch(
          `https://raw.githubusercontent.com/${repo.full_name}/HEAD/README.md`,
          { next: { revalidate: 3600 } }
        );
        const readMeText = await readMe.text();

        // Some README files have a specific section for what I want to embed here
        /**
         * <details data-embed="anandchowdhary.com" data-summary="Uptime monitor and status page powered by GitHub Actions">
            <summary>Upptime is used by <strong>3,000+</strong> people and teams to ensure they know when their endpoints go down.</summary>
            I built Uppt...
          </details>
        */
        const detailsRegex =
          /<details data-embed="anandchowdhary.com"(?:\s+(?:data-summary="([^"]+)"|data-title="([^"]+)"))*\s*>(?:<summary>[^<]*<\/summary>)?\s*([^]*?)<\/details>/;
        const detailsMatch = readMeText.match(detailsRegex);

        let dataSummary = null;
        let dataTitle = null;
        if (detailsMatch) {
          const attributeRegex =
            /(?:data-summary="([^"]+)"|data-title="([^"]+)")/g;
          let attrMatch;
          while ((attrMatch = attributeRegex.exec(detailsMatch[0])) !== null) {
            if (attrMatch[1]) dataSummary = attrMatch[1];
            if (attrMatch[2]) dataTitle = attrMatch[2];
          }
        }
        const lines = readMeText.split("\n");
        const firstLineOfText =
          lines.find((line) => {
            const trimmedLine = line.trim();
            return trimmedLine.length > 0 && /^[a-zA-Z]/.test(trimmedLine);
          }) ?? lines[0];
        if (detailsMatch) {
          if (dataTitle) repo.title = dataTitle;
          repo.attributes.subtitle = dataSummary ?? detailsMatch[3];
        } else
          repo.attributes.subtitle = cleanSubtitle(firstLineOfText, repo.name);
        return repo;
      })
  );

  return reposDataWithRequiredProps;
}

export async function getAllBooks(): Promise<Book[]> {
  const books = await fetch("https://anandchowdhary.github.io/books/api.json", {
    next: { revalidate: 3600 },
  });
  const booksData = (await books.json()) as Book[];

  const booksDataWithRequiredProps = booksData.map((book) => ({
    ...book,
    slug: generateSlug(book.title),
    path: `/books/${generateSlug(book.title)}`,
    source: "",
    date: book.startedAt,
    excerpt: book.description,
  }));

  return booksDataWithRequiredProps.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getAllEvents(): Promise<Event[]> {
  const events = await fetch(
    "https://anandchowdhary.github.io/events/api.json",
    { next: { revalidate: 3600 } }
  );
  const eventsData = (await events.json()) as Event[];
  return eventsData.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getEventByYearAndSlug(
  year: number,
  slug: string
): Promise<Event | null> {
  const eventsData = await getAllEvents();
  return (
    eventsData
      .filter((event) => new Date(event.date).getUTCFullYear() === year)
      .find((event) => event.slug.replace(".md", "") === slug) || null
  );
}

export async function getEventContent(
  year: string,
  slug: string
): Promise<string> {
  const url = `https://raw.githubusercontent.com/AnandChowdhary/events/refs/heads/main/events/${year}/${slug}`;
  const eventContent = await fetch(url);
  if (!eventContent.ok) {
    return `An error occurred while fetching the event content from ${url}.`;
  }
  let eventContentText = await eventContent.text();

  // Remove front-matter if there is any
  if (eventContentText.startsWith("---")) {
    const frontMatterEnd = eventContentText.indexOf("\n---");
    eventContentText = eventContentText.slice(frontMatterEnd + 4).trim();
  }

  // Remove heading
  if (eventContentText.startsWith("# ")) {
    const lines = eventContentText.split("\n");
    eventContentText = lines.slice(1).join("\n");
  }

  return eventContentText;
}

export async function getTalk(
  title: string
): Promise<{ content: string; slides?: string; embed?: string } | null> {
  const eventContent = await fetch(
    `https://raw.githubusercontent.com/AnandChowdhary/events/refs/heads/main/talks/${generateSlug(
      title
    )}.md`
  );
  if (!eventContent.ok) return null;
  let eventContentText = await eventContent.text();
  let slides: string | undefined;
  let embed: string | undefined;

  // Remove front-matter if there is any
  if (eventContentText.startsWith("---")) {
    const frontMatterEnd = eventContentText.indexOf("\n---");
    const frontMatter = eventContentText.slice(0, frontMatterEnd + 4).trim();
    const frontMatterLines = frontMatter.split("\n");
    frontMatterLines.forEach((line) => {
      if (line.startsWith("slides:")) slides = line.slice(8).trim();
      if (line.startsWith("embed:")) embed = line.slice(7).trim();
    });
    eventContentText = eventContentText.slice(frontMatterEnd + 4).trim();
  }

  // Remove heading
  if (eventContentText.startsWith("# ")) {
    const lines = eventContentText.split("\n");
    eventContentText = lines.slice(1).join("\n");
  }

  return {
    content: await marked.parse(eventContentText),
    slides,
    embed,
  };
}

export async function getAllThemes(): Promise<Theme[]> {
  const themes = await fetch(
    "https://anandchowdhary.github.io/themes/api.json",
    { next: { revalidate: 3600 } }
  );
  const themesData = (await themes.json()) as Theme[];
  return themesData.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getThemeByYearAndSlug(
  year: number,
  slug: string
): Promise<Theme | null> {
  const themeData = await getAllThemes();
  return (
    themeData
      .filter((theme) => new Date(theme.date).getUTCFullYear() === year)
      .find((theme) => theme.slug.replace(".md", "") === slug) || null
  );
}

export async function getThemeContent(
  year: string,
  slug: string
): Promise<string> {
  const themeContent = await fetch(
    `https://raw.githubusercontent.com/AnandChowdhary/themes/refs/heads/main/themes/${year}/${slug}`
  );
  if (!themeContent.ok) throw new Error("Theme content not found");
  let themeContentText = await themeContent.text();

  // Remove front-matter if there is any
  if (themeContentText.startsWith("---")) {
    const frontMatterEnd = themeContentText.indexOf("\n---");
    themeContentText = themeContentText.slice(frontMatterEnd + 4).trim();
  }

  // Remove heading
  if (themeContentText.startsWith("# ")) {
    const lines = themeContentText.split("\n");
    themeContentText = lines.slice(1).join("\n");
  }

  return themeContentText;
}

export async function getAllCountries(): Promise<Country[]> {
  const countries = await fetch(
    "https://anandchowdhary.github.io/location/history-countries.json",
    { next: { revalidate: 3600 } }
  );
  const countriesData = (await countries.json()) as Country[];

  const countriesDataWithRequiredProps = countriesData.map((country) => ({
    ...country,
    slug: country.country_code,
    path: `/travel/${country.country_code}`,
    source: "",
    date: country.date,
    excerpt: `Visited ${country.label} on ${new Date(
      country.date
    ).toLocaleDateString()}`,
  }));

  return countriesDataWithRequiredProps.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}

export async function getAllLocations(): Promise<Country[]> {
  const countries = await fetch(
    "https://anandchowdhary.github.io/location/history.json",
    { next: { revalidate: 3600 } }
  );
  const countriesData = (await countries.json()) as Country[];

  const countriesDataWithRequiredProps = countriesData.map((country) => ({
    ...country,
    slug: country.country_code,
    path: `/travel/${country.country_code}`,
    source: "",
    date: country.date,
    excerpt: `Visited ${country.label} on ${new Date(
      country.date
    ).toLocaleDateString()}`,
  }));

  return countriesDataWithRequiredProps.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}

export async function getLocation(): Promise<Country> {
  const countries = await fetch(
    "https://anandchowdhary.github.io/location/api.json",
    { next: { revalidate: 3600 } }
  );
  const locationData = (await countries.json()) as Country;
  return locationData;
}

export async function getAllOpenSource(): Promise<Repository[]> {
  const repos = await getAllRepositories();
  return repos.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getOpenSourceByYearAndSlug(
  year: number,
  slug: string
): Promise<Repository | null> {
  const reposData = await getAllOpenSource();
  return (
    reposData
      .filter((repo) => new Date(repo.date).getUTCFullYear() === year)
      .find((repo) => repo.slug === slug) || null
  );
}

export async function getLocationByYearAndSlug(
  year: number,
  slug: string
): Promise<Country | null> {
  const countriesData = await getAllCountries();
  return (
    countriesData
      .filter((country) => new Date(country.date).getUTCFullYear() === year)
      .find((country) => country.slug === slug) || null
  );
}

export async function getBookByYearAndSlug(
  year: number,
  slug: string
): Promise<Book | null> {
  const booksData = await getAllBooks();
  return (
    booksData
      .filter((book) => new Date(book.date).getUTCFullYear() === year)
      .find((book) => book.slug === slug) || null
  );
}

export async function getAllCodingTime(): Promise<Record<string, number>> {
  const codingTime = await fetch(
    "https://anandchowdhary.github.io/life/data/wakatime-time-tracking/summary/days.json",
    { next: { revalidate: 3600 } }
  );
  const codingTimeData = (await codingTime.json()) as Record<string, number>;
  return codingTimeData ?? {};
}

export async function getAllWalkingSteps(): Promise<Record<string, number>> {
  const walkingSteps = await fetch(
    "https://raw.githubusercontent.com/AnandChowdhary/life/refs/heads/master/data/google-fit-walking/summary/days.json",
    { next: { revalidate: 3600 } }
  );
  const walkingStepsData = (await walkingSteps.json()) as Record<
    string,
    number
  >;
  return walkingStepsData ?? {};
}

export const getAverageWalkingSteps = async () => {
  const walkingSteps = await getAllWalkingSteps();
  const sortedDates = Object.keys(walkingSteps).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );
  const last30NonZero = sortedDates
    .filter((date) => walkingSteps[date] > 0)
    .slice(0, 30)
    .map((date) => walkingSteps[date]);
  if (last30NonZero.length === 0) return 0;
  const sum = last30NonZero.reduce((acc, val) => acc + val, 0);
  return Math.round(sum / last30NonZero.length);
};

export const getTotalWalkingSteps = async () => {
  const walkingSteps = await getAllWalkingSteps();
  const sortedDates = Object.keys(walkingSteps)
    .filter((date) => walkingSteps[date] > 0)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  const last30NonZero = sortedDates.slice(0, 30);
  const sum = last30NonZero.reduce((acc, date) => acc + walkingSteps[date], 0);
  return sum;
};

export const getAverageSleepTime = async () => {
  const sleepTime = await getAllSleepTime();
  const sortedDates = Object.keys(sleepTime).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );
  const last30NonZero = sortedDates
    .filter((date) => sleepTime[date] > 0)
    .slice(0, 30)
    .map((date) => sleepTime[date]);
  if (last30NonZero.length === 0) return 0;
  const sum = last30NonZero.reduce((acc, val) => acc + val, 0);
  return Math.round(sum / last30NonZero.length);
};

export async function getAllSleepTime(): Promise<Record<string, number>> {
  const sleepTime = await fetch(
    "https://raw.githubusercontent.com/AnandChowdhary/life/refs/heads/master/data/google-fit-sleep/summary/days.json",
    { next: { revalidate: 3600 } }
  );
  const sleepTimeData = (await sleepTime.json()) as Record<string, number>;
  return sleepTimeData ?? {};
}

export async function getLastDayCodingTime(): Promise<Record<
  string,
  number
> | null> {
  const codingTime = await getAllCodingTime();
  const sortedDates = Object.keys(codingTime).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );
  for (const date of sortedDates)
    if (codingTime[date] > 0) return { [date]: codingTime[date] };
  return null;
}

export async function getTotalLastMonthCodingTime(): Promise<number> {
  const codingTime = await getAllCodingTime();
  const sortedDates = Object.keys(codingTime).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );
  const lastMonthCodingTime = sortedDates
    .slice(0, 30)
    .reduce((acc, date) => acc + codingTime[date], 0);
  return lastMonthCodingTime;
}

export async function getAllVersions(): Promise<Version[]> {
  const versions = await fetch(
    "https://anandchowdhary.github.io/versions/api.json",
    { next: { revalidate: 3600 } }
  );
  const versionsData = (await versions.json()) as Version[];
  return versionsData
    .filter((version) => !version.attributes.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getVersionByYearAndSlug(
  year: number,
  slug: string
): Promise<Version | null> {
  const versionsData = await getAllVersions();
  return (
    versionsData
      .filter((version) => new Date(version.date).getUTCFullYear() === year)
      .find((version) => version.slug.replace(".md", "") === slug) || null
  );
}

export async function getVersionContent(
  year: string,
  slug: string
): Promise<string> {
  const versionContent = await fetch(
    `https://raw.githubusercontent.com/AnandChowdhary/versions/refs/heads/main/versions/${year}/${slug}`
  );
  if (!versionContent.ok) throw new Error("Version content not found");
  let versionContentText = await versionContent.text();
  // Remove front-matter if there is any
  if (versionContentText.startsWith("---")) {
    const frontMatterEnd = versionContentText.indexOf("\n---");
    versionContentText = versionContentText.slice(frontMatterEnd + 4).trim();
  }
  // Remove heading
  if (versionContentText.startsWith("# ")) {
    const lines = versionContentText.split("\n");
    versionContentText = lines.slice(1).join("\n").trim();
  }
  return versionContentText;
}

export async function getAllProjects(): Promise<Project[]> {
  const projects = await fetch(
    "https://anandchowdhary.github.io/projects/api.json",
    { next: { revalidate: 3600 } }
  );
  const projectsData = (await projects.json()) as Project[];
  return projectsData
    .filter((project) => !project.attributes?.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export const getProjectTags = (item: Project) => {
  const tags: string[] = [];
  if (Array.isArray(item.attributes.work)) tags.push(...item.attributes.work);
  if (item.attributes.collaborators)
    tags.push(...item.attributes.collaborators);
  if (Array.isArray(item.attributes.tags)) tags.push(...item.attributes.tags);
  if (Array.isArray(item.attributes.stack)) tags.push(...item.attributes.stack);
  if (Array.isArray(item.attributes.tools)) tags.push(...item.attributes.tools);
  return tags;
};

export async function getProjectByYearAndSlug(
  year: number,
  slug: string
): Promise<Project | null> {
  const projectsData = await getAllProjects();
  return (
    projectsData
      .filter((project) => new Date(project.date).getUTCFullYear() === year)
      .find((project) => project.slug.replace(".md", "") === slug) || null
  );
}

export async function getProjectContent(
  year: string,
  slug: string
): Promise<string> {
  const projectContent = await fetch(
    `https://raw.githubusercontent.com/AnandChowdhary/projects/refs/heads/main/projects/${year}/${slug}`
  );
  if (!projectContent.ok) throw new Error("Project content not found");
  let projectContentText = await projectContent.text();
  // Remove front-matter if there is any
  if (projectContentText.startsWith("---")) {
    const frontMatterEnd = projectContentText.indexOf("\n---");
    projectContentText = projectContentText.slice(frontMatterEnd + 4).trim();
  }
  // Remove heading
  if (projectContentText.startsWith("# ")) {
    const lines = projectContentText.split("\n");
    projectContentText = lines.slice(1).join("\n").trim();
  }
  return projectContentText;
}

export interface TopArtist {
  name: string;
  href: string;
  img: string;
  rank: number;
}

export async function getAllTopArtists(): Promise<TopArtist[]> {
  const topArtists = await fetch(
    "https://raw.githubusercontent.com/AnandChowdhary/top-artists/refs/heads/main/api.json",
    { next: { revalidate: 3600 } }
  );
  const topArtistsData = (await topArtists.json()) as TopArtist[];
  return topArtistsData;
}
