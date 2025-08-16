import { getAllNotes } from "@/app/api";
import NotesContent from "@/app/notes/component";
import { notFound } from "next/navigation";

export default async function NotesYear({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);

  const notesData = await getAllNotes();
  const notesDataFiltered = notesData.filter(
    (note) => new Date(note.date).getUTCFullYear() === yearNumber
  );

  if (notesDataFiltered.length === 0) notFound();

  return <NotesContent notesDataFiltered={notesDataFiltered} year={year} />;
}
