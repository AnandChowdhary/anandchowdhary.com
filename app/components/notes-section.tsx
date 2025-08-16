import { Note, getAllNotes } from "@/app/api";
import { GenericSection } from "@/app/components/generic-section";

export async function NotesSection() {
  const noteDataFiltered = await getAllNotes();

  const getNoteTitle = (note: Note) => note.title;

  const getNoteSubtitle = (note: Note) =>
    new Date(note.date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <GenericSection
      title="Notes"
      subtitle="/notes"
      items={noteDataFiltered}
      description="I write about technology, startups, and life lessons learned along the way."
      linkText="Go to /note"
      getItemTitle={getNoteTitle}
      getItemSubtitle={getNoteSubtitle}
    />
  );
}
