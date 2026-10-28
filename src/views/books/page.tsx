import { getAllBooks } from "@/views/api";
import { buildScreenshotOpenGraphImageUrl } from "@/views/lib/opengraph";
import BooksContent from "@/views/books/component";
import type { Metadata } from "@/lib/metadata";

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
