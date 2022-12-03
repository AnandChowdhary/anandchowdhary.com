import { Handlers, PageProps } from "$fresh/server.ts";
import { slugify } from "https://deno.land/x/slugify@0.3.0/mod.ts";
import { SectionTitle } from "../../components/data/SectionTitle.tsx";
import { ExternalLink } from "../../components/text/ExternalLink.tsx";
import { fetchJson } from "../../utils/data.tsx";
import { imageUrl } from "../../utils/urls.ts";

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
}

export const handler: Handlers<ArchiveData> = {
  async GET(request, context) {
    const books = await fetchJson<ArchiveData["books"]>(
      "https://anandchowdhary.github.io/books/api.json"
    );
    const props = {
      books,
      query: new URL(request.url).search,
    };
    return context.render(props);
  },
};

export function BookCover({ book }: { book: ArchiveData["books"][0] }) {
  return (
    <img
      alt={`${book.title} by ${book.authors.join(", ")}`}
      src={imageUrl(book.image, {
        w: "300",
        h: "450",
        fit: "cover",
      })}
      loading="lazy"
      width={300}
      height={450}
      className="w-full rounded-lg shadow"
    />
  );
}
export function Book({ book }: { book: ArchiveData["books"][0] }) {
  return (
    <a
      href={`/books/${new Date(book.startedAt).getFullYear()}/${slugify(
        book.title,
        { lower: true }
      )}`}
    >
      <BookCover book={book} />
    </a>
  );
}

export default function Archive({ data }: PageProps<ArchiveData>) {
  const { books } = data;
  return (
    <div class="max-w-screen-md px-4 mx-auto space-y-8 md:px-0">
      <SectionTitle
        emoji="📕"
        title="Books"
        description="This is my bookshelf, where you'll find all the books I've recently read and want to read in the near future."
      >
        <p>
          My bookshelf, like all sections of this site, is open source and
          available on{" "}
          <ExternalLink href="https://github.com/AnandChowdhary/books">
            GitHub
          </ExternalLink>
          . In fact, I track my reading progress on GitHub Issues using a GitHub
          Actions workflow I made,{" "}
          <a href="/projects/2021/bookshelf-action">Bookshelf Action</a>.
        </p>
      </SectionTitle>
      {books.filter(({ state }) => state === "reading").length > 0 && (
        <section class="space-y-4">
          <h2 class="text-2xl font-semibold font-display">Currently reading</h2>
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
          <h2 class="text-2xl font-semibold font-display">Finished reading</h2>
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
  );
}
