import { getAllBooks } from "@/app/api";
import BooksContent from "@/app/books/component";

export default async function Books() {
  const booksDataFiltered = await getAllBooks();
  return <BooksContent booksDataFiltered={booksDataFiltered} />;
}
