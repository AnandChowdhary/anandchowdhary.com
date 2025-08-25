import { getAllNotes } from "@/app/api";
import NotesContent from "@/app/notes/component";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ year: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const year = (await params).year;
  return {
    title: `${year} / Notes / Anand Chowdhary`,
    description: `Personal notes and thoughts from ${year} by Anand Chowdhary.`,
  };
}

export default async function NotesYear({ params }: Props) {
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
