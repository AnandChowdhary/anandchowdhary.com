import {
  getAllProjects,
  getProjectByYearAndSlug,
  getProjectContent,
} from "@/app/api";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { ProjectMetadata } from "@/app/projects/metadata";
import { marked } from "marked";
import { markedSmartypants } from "marked-smartypants";
import { Metadata } from "next";
import { notFound } from "next/navigation";

marked.use(markedSmartypants());

type Props = {
  params: Promise<{ year: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year, slug } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);

  const project = await getProjectByYearAndSlug(yearNumber, slug);
  if (!project) notFound();
  return {
    title: `${project.title} / ${year} / Projects / Anand Chowdhary`,
    description: project.excerpt,
  };
}

export const revalidate = 60;
export async function generateStaticParams(): Promise<
  { year: string; slug: string }[]
> {
  const projects = await getAllProjects();
  return projects.map((project) => ({
    year: new Date(project.date).getUTCFullYear().toString(),
    slug: project.slug.replace(".md", ""),
  }));
}

export default async function ProjectYearSlug({ params }: Props) {
  const { year, slug } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);

  const project = await getProjectByYearAndSlug(yearNumber, slug);
  if (!project) notFound();

  // Convert relative paths to GitHub raw URLs
  const getImageUrl = (src: string | undefined, type: string | undefined) => {
    if (!src) return "";
    if (src.startsWith("/assets")) {
      // Add file extension from img_type if not already present
      let fullPath = src;
      if (!src.match(/\.(jpg|jpeg|png|gif|svg)$/i) && type) {
        fullPath = `${src}.${type}`;
      }
      return `https://raw.githubusercontent.com/AnandChowdhary/projects/main${fullPath}`;
    }
    return src;
  };

  const projectContentText = await getProjectContent(year, project.slug);

  // Replace relative image paths with GitHub raw URLs
  let processedContent = projectContentText.replace(
    /!\[([^\]]*)\]\((\/assets\/[^)]+)\)/g,
    (match, alt, path) => {
      return `![${alt}](https://github.com/AnandChowdhary/projects/blob/main${path}?raw=true)`;
    }
  );

  // Also replace HTML img tags with relative src
  processedContent = processedContent.replace(
    /<img([^>]*)\ssrc="(\/assets\/[^"]+)"([^>]*)>/g,
    (match, before, path, after) => {
      return `<img${before} src="https://raw.githubusercontent.com/AnandChowdhary/projects/main${path}"${after}>`;
    }
  );

  const projectContentHtml = await Promise.resolve(
    marked.parse(processedContent)
  );

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 space-y-32">
      <Header
        pathname={`/projects/${year}`}
        source="https://github.com/AnandChowdhary/projects"
        readme="https://anandchowdhary.github.io/projects/README.md"
        api="https://anandchowdhary.github.io/projects/api.json"
        description="Projects I've built over the years, from small experiments to full-scale products."
      />
      <main className="max-w-2xl mx-auto space-y-8">
        {project.attributes?.img_src && (
          <div
            className="bg-white dark:bg-neutral-900 w-full rounded-2xl shadow-lg flex items-center justify-center border border-neutral-200 dark:border-neutral-800"
            style={{
              aspectRatio: "2/1",
              padding: project.attributes.style === "padded" ? "1rem" : 0,
              backgroundColor: project.attributes.bg || undefined,
            }}
          >
            {project.attributes.style === "padded" ? (
              <img
                alt=""
                src={getImageUrl(
                  project.attributes.img_src,
                  project.attributes.img_type
                )}
                className="max-w-full max-h-full object-contain"
              />
            ) : project.attributes.style === "cover" ? (
              <img
                alt=""
                src={getImageUrl(
                  project.attributes.img_src,
                  project.attributes.img_type
                )}
                className="w-full h-full rounded-2xl object-cover"
              />
            ) : (
              <img
                alt=""
                src={getImageUrl(
                  project.attributes.img_src,
                  project.attributes.img_type
                )}
                className="w-full h-full rounded-2xl object-cover"
              />
            )}
          </div>
        )}
        <header className="space-y-2">
          <h1
            className="text-2xl font-medium"
            dangerouslySetInnerHTML={{
              __html: marked.parseInline(project.title),
            }}
          />
          <ProjectMetadata item={project} />
        </header>
        <div
          className="prose dark:prose-invert prose-headings:font-medium prose-p:first-of-type:text-lg prose-img:mx-auto prose-img:rounded-lg prose-img:shadow-lg prose-img:border prose-img:border-neutral-200 dark:prose-img:border-neutral-800 [&_p:has(img)]:lg:grid [&_p:has(img)]:lg:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] [&_p:has(img)]:lg:gap-6 [&_p:has(img)]:lg:-mx-32 [&_p:has(img)]:lg:my-12 [&_p:has(img)_img]:lg:m-0 [&_p:has(img)_img]:lg:w-full"
          dangerouslySetInnerHTML={{ __html: projectContentHtml }}
        />
      </main>
      <Footer />
    </div>
  );
}
