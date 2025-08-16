import { getAllNotes } from "@/app/api";
import NotesContent from "@/app/notes/component";

export default async function Notes() {
  const notesDataFiltered = await getAllNotes();
  return <NotesContent notesDataFiltered={notesDataFiltered} />;
}
