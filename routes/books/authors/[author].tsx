import { Handlers, PageProps } from "$fresh/server.ts";
import { slugify } from "https://deno.land/x/slugify@0.3.0/mod.ts";
import { Breadcrumbs } from "../../../components/data/Breadcrumbs.tsx";
import { SectionTitle } from "../../../components/data/SectionTitle.tsx";
import { fetchJson } from "../../../utils/data.tsx";
import { Book } from "../index.tsx";

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
  author: string;
}

export const handler: Handlers<ArchiveData> = {
  async GET(request, context) {
    const books = await fetchJson<ArchiveData["books"]>(
      "https://anandchowdhary.github.io/books/api.json"
    );
    const props = {
      books: books.filter((book) =>
        book.authors.find(
          (author) => slugify(author, { lower: true }) === context.params.author
        )
      ),
      author: context.params.author,
      query: new URL(request.url).search,
    };
    return context.render(props);
  },
};

export default function Archive({ data }: PageProps<ArchiveData>) {
  const { books, author } = data;
  const title =
    books[0]?.authors?.find(
      (name) => slugify(name, { lower: true }) === author
    ) ?? author;

  return (
    <div class="max-w-screen-md px-4 mx-auto space-y-4 md:px-0">
      <Breadcrumbs
        items={[
          { href: "/books", title: "Books" },
          { href: "/books/authors", title: "Authors" },
          {
            href: `/books/authors/${author}`,
            title,
          },
        ]}
      />
      <SectionTitle title={title} />
      <div class="space-y-8">
        {books.filter(({ state }) => state === "reading").length > 0 && (
          <section class="space-y-4">
            <h2 class="text-2xl font-semibold font-display">
              Currently reading
            </h2>
            <div class="grid grid-cols-5 gap-6">
              {books
                .filter(({ state }) => state === "reading")
                .map((book) => (
                  <div key={book.issueNumber}>
                    <Book book={book} />
                  </div>
                ))}
            </div>
          </section>
        )}
        {books.filter(({ state }) => state === "completed").length > 0 && (
          <section class="space-y-4">
            <h2 class="text-2xl font-semibold font-display">
              Finished reading
            </h2>
            <div class="grid grid-cols-5 gap-6">
              {books
                .filter(({ state }) => state === "completed")
                .map((book) => (
                  <div key={book.issueNumber}>
                    <Book book={book} />
                  </div>
                ))}
            </div>
          </section>
        )}
        {books.filter(({ state }) => state === "want-to-read").length > 0 && (
          <section class="space-y-4">
            <h2 class="text-2xl font-semibold font-display">Want to read</h2>
            <div class="grid grid-cols-5 gap-6">
              {books
                .filter(({ state }) => state === "want-to-read")
                .map((book) => (
                  <div key={book.issueNumber}>
                    <Book book={book} />
                  </div>
                ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
