import {
  generateSlug,
  getAllBlogPosts,
  getAllBooks,
  getAllEvents,
  getAllNotes,
  getAllOpenSource,
  getAllPressItems,
  getAllProjects,
  getAllVersions,
  getLifeEvents,
  getVideos,
} from "@/app/api";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const videos = await getVideos();
  const version = await getAllVersions();
  const projects = await getAllProjects();
  const press = await getAllPressItems();
  const openSource = await getAllOpenSource();
  const notes = await getAllNotes();
  const life = await getLifeEvents();
  const events = await getAllEvents();
  const books = await getAllBooks();
  const blog = await getAllBlogPosts();

  return [
    { url: "https://anandchowdhary.com" },
    { url: "https://anandchowdhary.com/about" },
    { url: "https://anandchowdhary.com/now" },
    { url: "https://anandchowdhary.com/mentoring" },
    { url: "https://anandchowdhary.com/contact" },
    ...videos.map((video) => ({
      url: `https://anandchowdhary.com/videos/${new Date(
        video.date
      ).getUTCFullYear()}/${generateSlug(video.slug ?? "")?.replace(
        ".md",
        ""
      )}`,
    })),
    ...Array.from(
      new Set(videos.map((item) => new Date(item.date).getUTCFullYear()))
    ).map((year) => ({
      url: `https://anandchowdhary.com/videos/${year}`,
    })),
    ...version.map((version) => ({
      url: `https://anandchowdhary.com/${new Date(
        version.date
      ).getUTCFullYear()}/${version.slug.replace(".md", "")}`,
    })),
    ...Array.from(
      new Set(version.map((item) => new Date(item.date).getUTCFullYear()))
    ).map((year) => ({
      url: `https://anandchowdhary.com/${year}`,
    })),
    ...projects.map((project) => ({
      url: `https://anandchowdhary.com/projects/${new Date(
        project.date
      ).getUTCFullYear()}/${project.slug.replace(".md", "")}`,
    })),
    ...Array.from(
      new Set(projects.map((item) => new Date(item.date).getUTCFullYear()))
    ).map((year) => ({
      url: `https://anandchowdhary.com/projects/${year}`,
    })),
    ...press.map((press) => ({
      url: `https://anandchowdhary.com/press/${new Date(
        press.date
      ).getUTCFullYear()}/${generateSlug(press.publisher)?.replace(".md", "")}`,
    })),
    ...Array.from(
      new Set(press.map((item) => new Date(item.date).getUTCFullYear()))
    ).map((year) => ({
      url: `https://anandchowdhary.com/press/${year}`,
    })),
    ...notes.map((note) => ({
      url: `https://anandchowdhary.com/notes/${new Date(
        note.date
      ).getUTCFullYear()}/${note.slug.replace(".md", "")}`,
    })),
    ...Array.from(
      new Set(notes.map((item) => new Date(item.date).getUTCFullYear()))
    ).map((year) => ({
      url: `https://anandchowdhary.com/notes/${year}`,
    })),
    ...openSource.map((openSource) => ({
      url: `https://anandchowdhary.com/open-source/${new Date(
        openSource.date
      ).getUTCFullYear()}/${openSource.slug.replace(".md", "")}`,
    })),
    ...Array.from(
      new Set(openSource.map((item) => new Date(item.date).getUTCFullYear()))
    ).map((year) => ({
      url: `https://anandchowdhary.com/open-source/${year}`,
    })),
    ...life.map((life) => ({
      url: `https://anandchowdhary.com/life/${new Date(
        life.date
      ).getUTCFullYear()}/${life.slug?.replace(".md", "")}`,
    })),
    ...Array.from(
      new Set(life.map((item) => new Date(item.date).getUTCFullYear()))
    ).map((year) => ({
      url: `https://anandchowdhary.com/life/${year}`,
    })),
    ...events.map((event) => ({
      url: `https://anandchowdhary.com/events/${new Date(
        event.date
      ).getUTCFullYear()}/${(event.slug ?? "")?.replace(".md", "")}`,
    })),
    ...Array.from(
      new Set(events.map((item) => new Date(item.date).getUTCFullYear()))
    ).map((year) => ({
      url: `https://anandchowdhary.com/events/${year}`,
    })),
    ...books.map((book) => ({
      url: `https://anandchowdhary.com/books/${new Date(
        book.date
      ).getUTCFullYear()}/${book.slug.replace(".md", "")}`,
    })),
    ...Array.from(
      new Set(books.map((item) => new Date(item.date).getUTCFullYear()))
    ).map((year) => ({
      url: `https://anandchowdhary.com/books/${year}`,
    })),
    ...blog.map((blog) => ({
      url: `https://anandchowdhary.com/blog/${new Date(
        blog.date
      ).getUTCFullYear()}/${blog.slug.replace(".md", "")}`,
    })),
    ...Array.from(
      new Set(blog.map((item) => new Date(item.date).getUTCFullYear()))
    ).map((year) => ({
      url: `https://anandchowdhary.com/blog/${year}`,
    })),
    ...Array.from(
      { length: new Date().getUTCFullYear() - 2009 + 1 },
      (_, i) => ({
        url: `https://anandchowdhary.com/archive/${
          new Date().getUTCFullYear() - i
        }`,
      })
    ),
  ].map((item) => ({ ...item, lastModified: new Date() }));
}
