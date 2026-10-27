import { getAllBooks } from "@/views/api";
import { buildScreenshotOpenGraphImageUrl } from "@/views/lib/opengraph";
import BooksContent from "@/views/books/component";
import type { Metadata } from "@/lib/metadata";
import { notFound, redirect } from "@/lib/navigation";

type Props = {
  params: Promise<{ year: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const year = (await params).year;
  return {
    title: `${year} / Books / Anand Chowdhary`,
    description: `Books read by Anand Chowdhary in ${year}.`,
    openGraph: {
      images: [
        {
          url: buildScreenshotOpenGraphImageUrl(`/books/${year}`),
        },
      ],
    },
  };
}


export default async function BooksYear({ params }: Props) {
  const { year } = await params;
  const allBooks = await getAllBooks();
  const foundBook = allBooks.find(
    (book) => book.slug.replace(".md", "") === year
  );
  if (foundBook)
    redirect(
      `/books/${new Date(
        foundBook.date
      ).getUTCFullYear()}/${foundBook.slug.replace(".md", "")}`
    );

  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);
  const yearBooksData = allBooks.filter(
    (book) => new Date(book.date).getUTCFullYear() === yearNumber,
  );

  // Get all years that have books
  const availableYears = Array.from(
    new Set(allBooks.map((book) => new Date(book.date).getUTCFullYear())),
  ).sort((a, b) => a - b);

  // Find previous and next years
  const currentYearIndex = availableYears.indexOf(yearNumber);
  const previousYear =
    currentYearIndex > 0 ? availableYears[currentYearIndex - 1] : undefined;
  const nextYear =
    currentYearIndex < availableYears.length - 1
      ? availableYears[currentYearIndex + 1]
      : undefined;

  return (
    <BooksContent
      booksDataFiltered={yearBooksData}
      year={year}
      previousYear={previousYear}
      nextYear={nextYear}
    />
  );
}
