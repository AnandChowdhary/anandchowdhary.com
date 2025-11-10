import { getAllBooks } from "@/app/api";
import { buildScreenshotOpenGraphImageUrl } from "@/app/lib/opengraph";
import BooksContent from "@/app/books/component";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Books / Anand Chowdhary",
  description:
    "Explore the reading list and book recommendations from Anand Chowdhary.",
  openGraph: {
    images: [
      {
        url: buildScreenshotOpenGraphImageUrl("/books"),
      },
    ],
  },
};

export default async function Books() {
  const booksDataFiltered = await getAllBooks();
  return <BooksContent booksDataFiltered={booksDataFiltered} />;
}
