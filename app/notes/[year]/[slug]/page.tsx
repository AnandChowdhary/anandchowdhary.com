import { getNoteByYearAndSlug, getNoteContent } from "@/app/api";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { NoteMetadata } from "@/app/notes/metadata";
import { marked } from "marked";
import { markedSmartypants } from "marked-smartypants";
import { notFound } from "next/navigation";

marked.use(markedSmartypants());

export default async function NoteYearSlug({
  params,
}: {
  params: Promise<{ year: string; slug: string }>;
}) {
  const { year, slug } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);

  const note = await getNoteByYearAndSlug(yearNumber, slug);
  if (!note) notFound();

  const noteContentText = await getNoteContent(note.slug);
  const noteContentHtml = await Promise.resolve(marked.parse(noteContentText));

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 space-y-32">
      <Header pathname={`/notes/${year}`} />
      <main className="max-w-2xl mx-auto space-y-8">
        <header className="space-y-2">
          <h1 className="text-2xl font-medium">
            {new Date(note.date).toLocaleDateString("en-US", {
              dateStyle: "long",
            })}
          </h1>
          <NoteMetadata item={note} noteContentText={noteContentText} />
        </header>
        <div
          className="prose dark:prose-invert prose-headings:font-medium"
          dangerouslySetInnerHTML={{ __html: noteContentHtml }}
        />
      </main>
      <Footer />
    </div>
  );
}
