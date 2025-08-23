import { Note, getAllNotes } from "@/app/api";
import { GenericSection } from "@/app/components/generic-section";

export async function NotesSection() {
  const notesDataFiltered = await getAllNotes();

  const getNoteTitle = (note: Note) =>
    new Date(note.date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const getNoteSubtitle = (note: Note) => note.excerpt;

  return (
    <GenericSection
      title="notes"
      subtitle="/notes"
      items={notesDataFiltered}
      description="Quick thoughts and insights captured from X, preserved for future reference."
      linkText="Go to /notes"
      getItemTitle={getNoteTitle}
      getItemSubtitle={getNoteSubtitle}
    />
  );
}
