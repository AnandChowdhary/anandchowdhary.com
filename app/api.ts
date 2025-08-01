import { GenericItem } from "@/app/components/generic-section";

export interface BlogPost extends GenericItem {
  attributes: { date: string; draft?: boolean };
}

export interface Note extends GenericItem {}

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

export async function getAllNotes(): Promise<Note[]> {
  const notes = await fetch("https://anandchowdhary.github.io/notes/api.json", {
    next: { revalidate: 36000 },
  });
  const notesData = (await notes.json()) as Note[];
  return notesData.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const blog = await fetch("https://anandchowdhary.github.io/blog/api.json", {
    next: { revalidate: 36000 },
  });
  const blogData = (await blog.json()) as BlogPost[];
  return blogData
    .filter((post) => !post.attributes.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogPostByYearAndSlug(
  year: number,
  slug: string
): Promise<BlogPost | null> {
  const blogData = await getAllBlogPosts();
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

  return postContentText;
}

export async function getAllRepositories(): Promise<Repository[]> {
  const repos = await fetch(
    "https://anandchowdhary.github.io/featured/repos.json",
    { next: { revalidate: 36000 } }
  );
  const reposData = (await repos.json()) as Repository[];

  const formatRepoTitle = (name: string): string => {
    // First replace dashes and underscores with spaces
    let formatted = name.replace(/[-_]/g, " ");

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
      .map((repo) => ({
        ...repo,
        slug: repo.name.toLowerCase().replace(/\s+/g, "-"),
        path: `/open-source/${repo.name.toLowerCase().replace(/\s+/g, "-")}`,
        source: repo.html_url,
        title: formatRepoTitle(repo.name),
        date: repo.updated_at,
        excerpt: repo.description || "No description available",
        emoji: "📦",
      }))
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .map(async (repo) => {
        repo.attributes = repo.attributes ?? {};
        const readMe = await fetch(
          `https://raw.githubusercontent.com/${repo.full_name}/HEAD/README.md`,
          { next: { revalidate: 36000 } }
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
    next: { revalidate: 36000 },
  });
  const booksData = (await books.json()) as Book[];

  const booksDataWithRequiredProps = booksData.map((book) => ({
    ...book,
    slug: book.title.toLowerCase().replace(/\s+/g, "-"),
    path: `/books/${book.title.toLowerCase().replace(/\s+/g, "-")}`,
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
    { next: { revalidate: 36000 } }
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
  const eventContent = await fetch(
    `https://raw.githubusercontent.com/AnandChowdhary/events/refs/heads/main/events/${year}/${slug}`
  );
  if (!eventContent.ok) throw new Error("Event content not found");
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

export async function getAllThemes(): Promise<Theme[]> {
  const themes = await fetch(
    "https://anandchowdhary.github.io/themes/api.json",
    { next: { revalidate: 36000 } }
  );
  const themesData = (await themes.json()) as Theme[];
  return themesData.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getAllCountries(): Promise<Country[]> {
  const countries = await fetch(
    "https://anandchowdhary.github.io/location/history-countries.json",
    { next: { revalidate: 36000 } }
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
    { next: { revalidate: 36000 } }
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
