import {
  GenericItem,
  GenericSectionContainer,
} from "@/app/components/generic-section";

interface Book extends GenericItem {
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
  slug: string;
  path: string;
  source: string;
  date: string;
  excerpt: string;
  attributes: { date: string };
}

export async function BooksSection() {
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
  const booksDataSorted = booksDataWithRequiredProps.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <GenericSectionContainer
      title="books"
      subtitle="/books"
      description="I read books about technology, philosophy, and personal development."
      linkText="Go to books"
    >
      <ul className="grid grid-cols-4 gap-4">
        {booksDataSorted.slice(0, 8).map((book) => (
          <li key={book.slug}>
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-full object-cover rounded shadow-sm"
            />
          </li>
        ))}
      </ul>
    </GenericSectionContainer>
  );
}
