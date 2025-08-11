import { Book } from "@/app/api";
import { focusStyles } from "@/app/components/external-link";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { marked } from "marked";
import { markedSmartypants } from "marked-smartypants";
import Link from "next/link";

marked.use(markedSmartypants());

function BookItem({ book }: { book: Book }) {
  return (
    <article key={`${book.date}-${book.slug}`} className="relative">
      <Link
        href={`/books/${new Date(book.date).getUTCFullYear()}/${book.slug}`}
        className={`${focusStyles} full-link flex`}
      >
        <img
          src={book.image}
          alt={`Cover of ${book.title}`}
          className="w-full h-full object-cover rounded-lg aspect-[3/4] shadow-sm"
        />
      </Link>
    </article>
  );
}

export default async function BooksContent({
  booksDataFiltered,
  year,
}: {
  booksDataFiltered: Book[];
  year?: string;
}) {
  const currentlyReading = booksDataFiltered.filter(
    (book) => book.state === "reading"
  );
  const completed = booksDataFiltered.filter(
    (book) => book.state === "completed"
  );

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 space-y-32">
      <Header pathname={year ? `/books/${year}` : "/books"}>
        I love reading books and expanding my knowledge. Here are the books I've
        read and am currently reading.
      </Header>
      <main className="max-w-2xl mx-auto space-y-16">
        {currentlyReading.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
              Currently reading
            </h2>
            <div className="grid grid-cols-5 gap-4">
              {currentlyReading
                .sort(
                  (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                )
                .map((book) => (
                  <BookItem key={`${book.date}-${book.slug}`} book={book} />
                ))}
            </div>
          </section>
        )}

        {/* Completed Section */}
        {completed.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
              Completed
            </h2>
            <div className="grid grid-cols-5 gap-4">
              {completed
                .sort(
                  (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                )
                .map((book) => (
                  <BookItem key={`${book.date}-${book.slug}`} book={book} />
                ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
