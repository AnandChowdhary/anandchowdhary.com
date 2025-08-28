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

export default async function BooksYear({ params }: Props) {
  const { year } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);
  const booksDataFiltered = await getAllBooks();
  const yearBooksData = booksDataFiltered.filter(
    (book) => new Date(book.date).getUTCFullYear() === yearNumber
  );
  return <BooksContent booksDataFiltered={yearBooksData} year={year} />;
}
