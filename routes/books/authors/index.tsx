import { Handlers, PageProps } from "$fresh/server.ts";
import { slugify } from "https://deno.land/x/slugify@0.3.0/mod.ts";
import { Breadcrumbs } from "../../../components/data/Breadcrumbs.tsx";
import { SectionTitle } from "../../../components/data/SectionTitle.tsx";
import { fetchJson } from "../../../utils/data.tsx";

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
      books: books,
      query: new URL(request.url).search,
    };
    return context.render(props);
  },
};

export default function Archive({ data }: PageProps<ArchiveData>) {
  const { books } = data;

  return (
    <div class="max-w-screen-md px-4 mx-auto space-y-4 md:px-0">
      <Breadcrumbs
        items={[
          { href: "/books", title: "Books" },
          { href: "/books/authors", title: "Authors" },
        ]}
      />
      <SectionTitle title="Authors" />
      <div class="space-y-8">
        <ul class="grid grid-cols-4">
          {Array.from(new Set(books.map((book) => book.authors).flat())).map(
            (author) => (
              <li>
                <a href={`/books/authors/${slugify(author, { lower: true })}`}>
                  {author}
                </a>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}
