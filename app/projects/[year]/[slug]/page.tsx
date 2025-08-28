import {
  getAllProjects,
  getProjectByYearAndSlug,
  getProjectContent,
} from "@/app/api";
import { focusStyles } from "@/app/components/external-link";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { ProjectMetadata } from "@/app/projects/metadata";
import { proseClassName } from "@/app/styles";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { marked } from "marked";
import { markedSmartypants } from "marked-smartypants";
import { Metadata } from "next";
import Link from "next/link";
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

  const allProjects = await getAllProjects();
  const currentProjectIndex = allProjects.findIndex(
    (p) => p.slug === project.slug
  );
  const previousProject = allProjects[currentProjectIndex - 1];
  const nextProject = allProjects[currentProjectIndex + 1];

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

  const yearNavigation = { previous: previousProject, next: nextProject };

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
          className={proseClassName}
          dangerouslySetInnerHTML={{ __html: projectContentHtml }}
        />
        <footer className="flex flex-col md:flex-row items-stretch md:items-center justify-between pt-8 gap-4">
          {yearNavigation.previous ? (
            <Link
              href={`/projects/${new Date(
                yearNavigation.previous.date
              ).getUTCFullYear()}/${yearNavigation.previous.slug.replace(
                ".md",
                " "
              )}`}
              className={`flex items-center gap-1 ${focusStyles} justify-center bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 py-1 pl-2 pr-4 rounded-full`}
            >
              <IconChevronLeft strokeWidth={1.5} className="h-4" />
              {yearNavigation.previous.title}
            </Link>
          ) : (
            <div className="w-4" />
          )}
          {yearNavigation.next ? (
            <Link
              href={`/projects/${new Date(
                yearNavigation.next.date
              ).getUTCFullYear()}/${yearNavigation.next.slug.replace(
                ".md",
                " "
              )}`}
              className={`flex items-center gap-1 ${focusStyles} justify-center bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 py-1 pr-2 pl-4 rounded-full`}
            >
              {yearNavigation.next.title}
              <IconChevronRight strokeWidth={1.5} className="h-4" />
            </Link>
          ) : (
            <div className="w-4" />
          )}
        </footer>
      </main>
      <Footer />
    </div>
  );
}
