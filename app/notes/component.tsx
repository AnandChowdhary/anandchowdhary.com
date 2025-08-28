import { getNoteContent, Note } from "@/app/api";
import { focusStyles } from "@/app/components/external-link";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { NoteMetadata } from "@/app/notes/metadata";
import { proseClassNameWithoutLead } from "@/app/styles";
import { marked } from "marked";
import { markedSmartypants } from "marked-smartypants";
import Link from "next/link";

marked.use(markedSmartypants());

const NoteCard = ({ item }: { item: Note }) => (
  <article className="pb-2.5 relative">
    <Link
      href={`/notes/${new Date(item.date).getUTCFullYear()}/${item.slug.replace(
        ".md",
        ""
      )}`}
      className={`${focusStyles} min-w-0 full-link flex hover:text-neutral-500`}
    >
      {new Date(item.date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}
    </Link>
    <p dangerouslySetInnerHTML={{ __html: marked.parseInline(item.excerpt) }} />
  </article>
);

export default async function NotesContent({
  notesDataFiltered,
  year,
}: {
  notesDataFiltered: Note[];
  year?: string;
}) {
  const slug = notesDataFiltered[0].slug;
  const content = await getNoteContent(
    new Date(notesDataFiltered[0].date).getUTCFullYear().toString(),
    notesDataFiltered[0].slug
  );

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 space-y-32">
      <Header
        pathname={year ? `/notes/${year}` : "/notes"}
        description="Quick notes curated from shower thoughts and articles with the help of AI, also available on X."
        source="https://github.com/AnandChowdhary/notes"
        readme="https://anandchowdhary.github.io/notes/README.md"
        api="https://anandchowdhary.github.io/notes/threads/api.json"
      />
      <main className="max-w-2xl mx-auto">
        <h2 className="text-lg font-medium text-neutral-500 mb-4">Latest</h2>
        <article
          className="border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 shadow-sm relative overflow-hidden max-h-96"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 50%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 50%, transparent 100%)",
          }}
        >
          <Link
            href={`/notes/${new Date(
              notesDataFiltered[0].date
            ).getUTCFullYear()}/${slug.replace(".md", "")}`}
            className={`${focusStyles} flex hover:text-neutral-500 full-link`}
          >
            <h3 className="text-lg font-medium text-neutral-500">
              {notesDataFiltered[0].title}
            </h3>
          </Link>
          <NoteMetadata
            item={notesDataFiltered[0]}
            noteContentText={content}
            link={false}
          />
          <div
            className={`${proseClassNameWithoutLead} mt-4 text-sm`}
            dangerouslySetInnerHTML={{
              __html: await Promise.resolve(marked.parse(content)),
            }}
          />
        </article>
        {notesDataFiltered.length > 1 && (
          <div className="space-y-6 pt-8">
            <h2 className="text-lg font-medium text-neutral-500">More</h2>
            {notesDataFiltered.slice(1).map((item) => (
              <article key={item.slug} className="flex gap-5 relative">
                <div className="grow flex items-center justify-between gap-8 min-w-0">
                  <Link
                    href={`/notes/${new Date(
                      item.date
                    ).getUTCFullYear()}/${item.slug.replace(".md", "")}`}
                    className={`${focusStyles} min-w-0 full-link flex-1 truncate hover:text-neutral-500 overflow-hidden`}
                    style={{
                      maskImage:
                        "linear-gradient(to right, black 70%, transparent 100%)",
                      WebkitMaskImage:
                        "linear-gradient(to right, black 70%, transparent 100%)",
                    }}
                  >
                    <h3
                      className="block truncate overflow-hidden"
                      dangerouslySetInnerHTML={{
                        __html: marked.parseInline(item.title),
                      }}
                    />
                  </Link>
                  <p className="text-sm text-neutral-500 shrink-0">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
