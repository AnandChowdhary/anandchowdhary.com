import { getAllBooks } from "@/app/api";
import BooksContent from "@/app/books/component";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ year: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const year = (await params).year;
  return {
    title: `${year} / Books / Anand Chowdhary`,
    description: `Books read by Anand Chowdhary in ${year}.`,
  };
}

export const revalidate = 60;
export async function generateStaticParams(): Promise<{ year: string }[]> {
  const books = await getAllBooks();
  const years = Array.from(
    new Set(
      books.map((book) => new Date(book.date).getUTCFullYear().toString()),
    ),
  );
  return years.map((year) => ({ year }));
}

export default async function BooksYear({ params }: Props) {
  const { year } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);
  const allBooks = await getAllBooks();
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
