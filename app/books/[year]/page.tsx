import { getAllBooks } from "@/app/api";
import BooksContent from "@/app/books/component";
import { notFound } from "next/navigation";

export default async function BooksYear({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);
  const booksDataFiltered = await getAllBooks();
  const yearBooksData = booksDataFiltered.filter(
    (book) => new Date(book.date).getUTCFullYear() === yearNumber
  );
  return <BooksContent booksDataFiltered={yearBooksData} year={year} />;
}
