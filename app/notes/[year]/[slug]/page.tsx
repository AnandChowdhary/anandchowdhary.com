import {
  getAllNotes,
  getNoteByYearAndSlug,
  getNoteContent,
} from "@/app/api";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { NoteMetadata } from "@/app/notes/metadata";
import { marked } from "marked";
import { markedSmartypants } from "marked-smartypants";
import { Metadata } from "next";
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
export async function generateStaticParams(): Promise<{ year: string; slug: string }[]> {
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

  const noteContentText = await getNoteContent(year, note.slug);
  const noteContentHtml = await Promise.resolve(marked.parse(noteContentText));

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 space-y-32">
      <Header pathname={`/notes/${year}`} />
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
          className="prose dark:prose-invert prose-headings:font-medium prose-p:first-of-type:text-lg"
          dangerouslySetInnerHTML={{ __html: noteContentHtml }}
        />
      </main>
      <Footer />
    </div>
  );
}
