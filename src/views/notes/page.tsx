import { getAllNotes } from "@/views/api";
import { buildScreenshotOpenGraphImageUrl } from "@/views/lib/opengraph";
import NotesContent from "@/views/notes/component";
import type { Metadata } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Notes / Anand Chowdhary",
  description:
    "Personal notes, thoughts, and insights from Anand Chowdhary on various topics.",
  openGraph: {
    images: [
      {
        url: buildScreenshotOpenGraphImageUrl("/notes"),
      },
    ],
  },
};

export default async function Notes() {
  const notesDataFiltered = await getAllNotes();
  return <NotesContent notesDataFiltered={notesDataFiltered} />;
}
