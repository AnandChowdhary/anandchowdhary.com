import { getAllNotes, getNoteByYearAndSlug, getNoteContent } from "@/app/api";
import { focusStyles } from "@/app/components/external-link";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { NoteMetadata } from "@/app/notes/metadata";
import { proseClassName } from "@/app/styles";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { marked } from "marked";
import { markedSmartypants } from "marked-smartypants";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

marked.use(markedSmartypants());

type Props = {
  params: Promise<{ year: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year, slug } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);

  const note = await getNoteByYearAndSlug(yearNumber, slug);
  if (!note) notFound();
  return {
    title: `${note.title} / ${year} / Notes / Anand Chowdhary`,
    description: note.excerpt || `Note by Anand Chowdhary: ${note.title}`,
  };
}

export const revalidate = 60;
export async function generateStaticParams(): Promise<
  { year: string; slug: string }[]
> {
  const notes = await getAllNotes();
  return notes.map((note) => ({
    year: new Date(note.date).getUTCFullYear().toString(),
    slug: note.slug.replace(".md", ""),
  }));
}

export default async function NoteYearSlug({ params }: Props) {
  const { year, slug } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);

  const note = await getNoteByYearAndSlug(yearNumber, slug);
  if (!note) notFound();

  const allNotes = await getAllNotes();
  const currentNoteIndex = allNotes.findIndex(
    (n) => n.slug === note.slug
  );
  const previousNote = allNotes[currentNoteIndex - 1];
  const nextNote = allNotes[currentNoteIndex + 1];

  const noteContentText = await getNoteContent(year, note.slug);
  const noteContentHtml = await Promise.resolve(marked.parse(noteContentText));

  const yearNavigation = { previous: previousNote, next: nextNote };

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 space-y-32">
      <Header
        pathname={`/notes/${year}`}
        description="Quick notes curated from shower thoughts and articles with the help of AI, also available on X."
        source="https://github.com/AnandChowdhary/notes"
        readme="https://anandchowdhary.github.io/notes/README.md"
        api="https://anandchowdhary.github.io/notes/threads/api.json"
      />
      <main className="max-w-2xl mx-auto space-y-8">
        <header className="space-y-2">
          <h1
            className="text-2xl font-medium"
            dangerouslySetInnerHTML={{
              __html: marked.parseInline(note.title),
            }}
          />
          <NoteMetadata item={note} noteContentText={noteContentText} link />
        </header>
        <div
          className={proseClassName}
          dangerouslySetInnerHTML={{ __html: noteContentHtml }}
        />
        <footer className="flex flex-col md:flex-row items-stretch md:items-center justify-between pt-8 gap-4">
          {yearNavigation.previous ? (
            <Link
              href={`/notes/${new Date(
                yearNavigation.previous.date
              ).getUTCFullYear()}/${yearNavigation.previous.slug.replace(
                ".md",
                ""
              )}`}
              className={`flex items-center gap-1 ${focusStyles} justify-center bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 py-1 pl-2 pr-4 rounded-full`}
            >
              <IconChevronLeft strokeWidth={1.5} className="h-4" />
              {yearNavigation.previous.title}
            </Link>
          ) : (
            <div className="w-4" />
          )}
          {yearNavigation.next ? (
            <Link
              href={`/notes/${new Date(
                yearNavigation.next.date
              ).getUTCFullYear()}/${yearNavigation.next.slug.replace(
                ".md",
                ""
              )}`}
              className={`flex items-center gap-1 ${focusStyles} justify-center bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 py-1 pr-2 pl-4 rounded-full`}
            >
              {yearNavigation.next.title}
              <IconChevronRight strokeWidth={1.5} className="h-4" />
            </Link>
          ) : (
            <div className="w-4" />
          )}
        </footer>
      </main>
      <Footer />
    </div>
  );
}
