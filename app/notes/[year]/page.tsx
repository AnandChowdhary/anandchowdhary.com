import { getAllNotes } from "@/app/api";
import { buildScreenshotOpenGraphImageUrl } from "@/app/lib/opengraph";
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
    openGraph: {
      images: [
        {
          url: buildScreenshotOpenGraphImageUrl(`/notes/${year}`),
        },
      ],
    },
  };
}

export const revalidate = 60;
export async function generateStaticParams(): Promise<{ year: string }[]> {
  const notes = await getAllNotes();
  const years = Array.from(
    new Set(
      notes.map((note) => new Date(note.date).getUTCFullYear().toString()),
    ),
  );
  return years.map((year) => ({ year }));
}

export default async function NotesYear({ params }: Props) {
  const { year } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);

  const allNotes = await getAllNotes();
  const notesDataFiltered = allNotes.filter(
    (note) => new Date(note.date).getUTCFullYear() === yearNumber,
  );

  if (notesDataFiltered.length === 0) notFound();

  // Get all years that have notes
  const availableYears = Array.from(
    new Set(allNotes.map((note) => new Date(note.date).getUTCFullYear())),
  ).sort((a, b) => a - b);

  // Find previous and next years
  const currentYearIndex = availableYears.indexOf(yearNumber);
  const previousYear =
    currentYearIndex > 0 ? availableYears[currentYearIndex - 1] : undefined;
  const nextYear =
    currentYearIndex < availableYears.length - 1
      ? availableYears[currentYearIndex + 1]
      : undefined;

  return (
    <NotesContent
      notesDataFiltered={notesDataFiltered}
      year={year}
      previousYear={previousYear}
      nextYear={nextYear}
    />
  );
}
