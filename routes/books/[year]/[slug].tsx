import { Handlers, PageProps } from "$fresh/server.ts";
import { slugify } from "https://deno.land/x/slugify@0.3.0/mod.ts";
import IconBooks from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/books.tsx";
import IconCalendarEvent from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/calendar-event.tsx";
import IconUser from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/user.tsx";
import { Fragment } from "preact";
import { Breadcrumbs } from "../../../components/data/Breadcrumbs.tsx";
import { SectionTitle } from "../../../components/data/SectionTitle.tsx";
import { ExternalLink } from "../../../components/text/ExternalLink.tsx";
import { fetchJson } from "../../../utils/data.tsx";
import { BookCover } from "../index.tsx";

interface ArchiveData {
  books: {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    image: string;
    language: string;
    averageRating: number;
    ratingsCount: number;
    pageCount: number;
    isbn10: string;
    isbn13: string;
    googleBooks?: {
      id: string;
      preview: string;
      info: string;
      canonical: string;
    };
    issueNumber: number;
    progressPercent: number;
    state: "want-to-read" | "reading" | "completed";
    startedAt: string;
  }[];
  query: string;
  slug: string;
  year: number;
}

export const handler: Handlers<ArchiveData> = {
  async GET(request, context) {
    const books = await fetchJson<ArchiveData["books"]>(
      "https://anandchowdhary.github.io/books/api.json"
    );
    const year = Number(context.params.year);
    if (isNaN(year)) return context.renderNotFound();
    const slug = context.params.slug;
    const props = {
      year,
      slug,
      books: books.filter(
        (item) => new Date(item.startedAt).getFullYear() === year
      ),
      query: new URL(request.url).search,
    };
    return context.render(props);
  },
};

export default function Archive({ data }: PageProps<ArchiveData>) {
  const { books, year, slug } = data;
  const item = books.find(
    (item) => slugify(item.title, { lower: true }) === slug
  );
  if (!item) throw new Error("Book not found");

  return (
    <div class="max-w-screen-md px-4 mx-auto space-y-4 md:px-0">
      <Breadcrumbs
        items={[
          { href: "/books", title: "Books" },
          { href: `/books/${year}`, title: year.toString() },
          { href: `/books/${year}/${slug}`, title: item.title },
        ]}
      />
      <SectionTitle title={item.title} />
      <ul class="text-gray-500">
        <li class="flex items-center space-x-2">
          <IconCalendarEvent class="h-4 w-4" />
          <time value={new Date(item.startedAt).toISOString().substring(0, 10)}>
            {new Date(item.startedAt).toLocaleDateString("en-US", {
              dateStyle: "long",
            })}
          </time>
        </li>
        <li class="flex items-center space-x-2">
          <IconUser class="h-4 w-4" />
          <span class="space-x-2">
            {item.authors.map((author) => (
              <a
                key={author}
                href={`/books/authors/${slugify(author, { lower: true })}`}
              >
                {author}
              </a>
            ))}
          </span>
        </li>
        {item.publisher && (
          <li class="flex items-center space-x-2">
            <IconBooks class="h-4 w-4" />
            <a
              href={`/books/publishers/${slugify(item.publisher, {
                lower: true,
              })}`}
            >
              {item.publisher}
            </a>
          </li>
        )}
      </ul>
      <div class="grid grid-cols-5 gap-8 pt-4">
        <BookCover book={item} />
        <div class="col-span-4 longform">
          {item.state === "reading" ? (
            <p>I am currently reading {item.title}.</p>
          ) : item.state === "want-to-read" ? (
            <p>I want to read {item.title}, but I haven't read it yet.</p>
          ) : (
            <p>
              I completed {item.title} in{" "}
              {new Date(item.startedAt).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
              .
            </p>
          )}
          {item.googleBooks && (
            <Fragment>
              <p>
                As described by{" "}
                <ExternalLink href={item.googleBooks.canonical}>
                  Google Books
                </ExternalLink>
                :
              </p>
              <blockquote>
                <p>{item.description}</p>
              </blockquote>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
}
