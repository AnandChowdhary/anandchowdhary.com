import { getAllNotes, getNoteByYearAndSlug, getNoteContent } from "@/app/api";
import { Container } from "@/app/components/container";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { NavigationFooter } from "@/app/components/navigation-footer";
import { NoteMetadata } from "@/app/notes/metadata";
import { proseClassName } from "@/app/styles";
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
  const currentNoteIndex = allNotes.findIndex((n) => n.slug === note.slug);
  const previousNote = allNotes[currentNoteIndex - 1];
  const nextNote = allNotes[currentNoteIndex + 1];

  const noteContentText = await getNoteContent(year, note.slug);
  const noteContentHtml = await Promise.resolve(marked.parse(noteContentText));

  const yearNavigation = { previous: previousNote, next: nextNote };

  return (
    <Container>
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
          className={proseClassName}
          dangerouslySetInnerHTML={{ __html: noteContentHtml }}
        />
        <NavigationFooter
          previous={
            yearNavigation.previous
              ? {
                  href: `/notes/${new Date(
                    yearNavigation.previous.date
                  ).getUTCFullYear()}/${yearNavigation.previous.slug.replace(
                    ".md",
                    ""
                  )}`,
                  label: yearNavigation.previous.title,
                }
              : undefined
          }
          next={
            yearNavigation.next
              ? {
                  href: `/notes/${new Date(
                    yearNavigation.next.date
                  ).getUTCFullYear()}/${yearNavigation.next.slug.replace(
                    ".md",
                    ""
                  )}`,
                  label: yearNavigation.next.title,
                }
              : undefined
          }
        />
      </main>
      <Footer />
    </Container>
  );
}
