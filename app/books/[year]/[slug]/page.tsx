import { getBookByYearAndSlug } from "@/app/api";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import {
  IconBook,
  IconBuilding,
  IconCalendar,
  IconCategory,
  IconExternalLink,
  IconLanguage,
  IconUser,
} from "@tabler/icons-react";
import { marked } from "marked";
import { markedSmartypants } from "marked-smartypants";
import { notFound } from "next/navigation";

marked.use(markedSmartypants());

export default async function BooksYearSlug({
  params,
}: {
  params: Promise<{ year: string; slug: string }>;
}) {
  const { year, slug } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);

  const book = await getBookByYearAndSlug(yearNumber, slug);
  if (!book) notFound();

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 space-y-32">
      <Header pathname={`/books/${year}`} />
      <main className="max-w-2xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="aspect-[3/4] rounded-lg shadow-lg relative">
              <img
                src={book.image}
                alt={`Cover of ${book.title}`}
                className="w-full h-full object-cover rounded-lg"
              />
              {book.state === "reading" && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  Reading
                </div>
              )}
              {book.state === "completed" && (
                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  ✓ Read
                </div>
              )}
            </div>
          </div>
          <div className="md:col-span-2 space-y-4">
            <header className="space-y-2">
              <h1
                className="text-2xl font-medium"
                dangerouslySetInnerHTML={{
                  __html: marked.parseInline(book.title),
                }}
              />
              <p className="text-lg text-neutral-600">
                by {book.authors.join(", ")}
              </p>
              <p className="text-neutral-500">
                Started{" "}
                {new Date(book.startedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </header>

            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="text-sm text-neutral-500 flex items-center gap-1.5">
                <IconUser className="shrink-0" size={16} strokeWidth={1.5} />
                <div className="grow truncate">{book.authors.join(", ")}</div>
              </div>
              <div className="text-sm text-neutral-500 flex items-center gap-1.5">
                <IconBook className="shrink-0" size={16} strokeWidth={1.5} />
                <div className="grow truncate">{book.pageCount} pages</div>
              </div>
              {book.publisher && (
                <div className="text-sm text-neutral-500 flex items-center gap-1.5">
                  <IconBuilding
                    className="shrink-0"
                    size={16}
                    strokeWidth={1.5}
                  />
                  <div className="grow truncate">{book.publisher}</div>
                </div>
              )}
              <div className="text-sm text-neutral-500 flex items-center gap-1.5">
                <IconLanguage
                  className="shrink-0"
                  size={16}
                  strokeWidth={1.5}
                />
                <div className="grow truncate">{book.language}</div>
              </div>
              {book.publishedDate && (
                <div className="text-sm text-neutral-500 flex items-center gap-1.5">
                  <IconCalendar
                    className="shrink-0"
                    size={16}
                    strokeWidth={1.5}
                  />
                  <div className="grow truncate">
                    Published {new Date(book.publishedDate).getUTCFullYear()}
                  </div>
                </div>
              )}
              {book.categories && book.categories.length > 0 && (
                <div className="text-sm text-neutral-500 flex items-center gap-1.5">
                  <IconCategory
                    className="shrink-0"
                    size={16}
                    strokeWidth={1.5}
                  />
                  <div className="grow truncate">
                    {book.categories.slice(0, 2).join(", ")}
                  </div>
                </div>
              )}
            </div>

            {book.state === "reading" && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-neutral-500">
                  <span>Reading Progress</span>
                  <span>{book.progressPercent}%</span>
                </div>
                <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${book.progressPercent}%` }}
                  ></div>
                </div>
              </div>
            )}

            {book.state === "completed" && book.completedAt && (
              <div className="space-y-2">
                <p className="text-sm text-neutral-500">
                  Completed{" "}
                  {new Date(book.completedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                {book.timeToCompleteFormatted && (
                  <p className="text-sm text-neutral-500">
                    Time to complete: {book.timeToCompleteFormatted}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="prose dark:prose-invert prose-headings:font-medium">
          <p className="text-lg text-neutral-700 dark:text-neutral-300">
            {book.description}
          </p>
        </div>

        <div className="flex gap-4">
          <a
            href={book.googleBooks.info}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
          >
            <IconExternalLink size={16} />
            View on Google Books
          </a>
          {book.googleBooks.preview && (
            <a
              href={book.googleBooks.preview}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            >
              <IconBook size={16} />
              Preview Book
            </a>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
