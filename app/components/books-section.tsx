import { getAllBooks } from "@/app/api";
import { GenericSectionContainer } from "@/app/components/generic-section";

export async function BooksSection() {
  const booksDataSorted = await getAllBooks();

  return (
    <GenericSectionContainer
      title="books"
      subtitle="/books"
      description="I read books about technology, philosophy, and personal development."
      linkText="Go to /books"
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
