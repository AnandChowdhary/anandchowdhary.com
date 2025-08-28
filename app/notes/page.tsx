import { getAllNotes } from "@/app/api";
import NotesContent from "@/app/notes/component";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notes / Anand Chowdhary",
  description:
    "Personal notes, thoughts, and insights from Anand Chowdhary on various topics.",
};

export default async function Notes() {
  const notesDataFiltered = await getAllNotes();
  return <NotesContent notesDataFiltered={notesDataFiltered} />;
}
