import { Note, getAllNotes } from "@/app/api";
import { underlinedLink } from "@/app/components/external-link";
import { GenericSectionContainer } from "@/app/components/generic-section";

export async function NotesSection() {
  const notesDataFiltered = await getAllNotes();
  const getNoteTitle = (note: Note) => note.title;

  return (
    <GenericSectionContainer
      title="notes"
      subtitle="/notes"
      description="Quick thoughts and insights captured from X, preserved for future reference."
      linkText="Go to /notes"
    >
      <div className="text-sm leading-6 line-clamp-3 text-neutral-500 dark:text-neutral-400">
        {notesDataFiltered.slice(0, 5).map((note) => (
          <span key={note.slug} className={`mr-2 ${underlinedLink}`}>
            {getNoteTitle(note)}
          </span>
        ))}
      </div>
    </GenericSectionContainer>
  );
}
