import { Footer } from "@/app/components/footer";
import { GenericItem } from "@/app/components/generic-section";
import { Header } from "@/app/components/header";
import { marked } from "marked";
import { markedSmartypants } from "marked-smartypants";
import { notFound } from "next/navigation";

marked.use(markedSmartypants());

interface BlogPost extends GenericItem {
  attributes: { date: string; draft?: boolean };
}

export default async function BlogYearSlug({
  params,
}: {
  params: Promise<{ year: string; slug: string }>;
}) {
  const { year, slug } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);

  const blog = await fetch("https://anandchowdhary.github.io/blog/api.json", {
    next: { revalidate: 36000 },
  });
  const blogData = (await blog.json()) as BlogPost[];
  const blogDataFiltered = blogData
    .filter((post) => !post.attributes.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const post = blogDataFiltered
    .filter((post) => new Date(post.date).getUTCFullYear() === yearNumber)
    .find((post) => post.slug.replace(".md", "") === slug);
  if (!post) notFound();

  const postContent = await fetch(
    `https://raw.githubusercontent.com/AnandChowdhary/blog/refs/heads/main/blog/${year}/${post.slug}`
  );
  if (!postContent.ok) notFound();
  let postContentText = await postContent.text();

  // Remove front-matter if there is any
  if (postContentText.startsWith("---")) {
    const frontMatterEnd = postContentText.indexOf("\n---");
    postContentText = postContentText.slice(frontMatterEnd + 4).trim();
  }

  // Remove heading if it's the same as the title
  if (postContentText.startsWith(`# ${post.title}`))
    postContentText = postContentText.slice(post.title.length + 2).trim();

  const postContentHtml = await Promise.resolve(marked.parse(postContentText));
  const index = blogDataFiltered.findIndex(({ slug }) => slug === post.slug);

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 space-y-32">
      <Header pathname={`/blog/${year}`} />
      <main className="max-w-2xl mx-auto space-y-8">
        <div className="relative">
          <img
            src={`https://raw.githubusercontent.com/AnandChowdhary/blog-images/refs/heads/main/384x256/${
              (index + 1) % 100 || 100
            }.png`}
            alt=""
            className="w-full h-full max-h-64 object-cover rounded-2xl dark:brightness-60"
          />
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none text-5xl tracking-widest">
            {post.emoji}
          </div>
        </div>
        <header className="space-y-2">
          <h1
            className="text-2xl font-medium"
            dangerouslySetInnerHTML={{ __html: post.title }}
          />
          <p className="text-neutral-500">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </header>
        <div
          className="prose dark:prose-invert prose-headings:font-medium"
          dangerouslySetInnerHTML={{ __html: postContentHtml }}
        />
      </main>
      <Footer />
    </div>
  );
}
