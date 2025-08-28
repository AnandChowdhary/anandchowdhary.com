import { Project } from "@/app/api";
import { focusStyles } from "@/app/components/external-link";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { NavigationFooter } from "@/app/components/navigation-footer";
import { proseClassName } from "@/app/styles";
import slugify from "@sindresorhus/slugify";
import { marked } from "marked";
import { markedSmartypants } from "marked-smartypants";
import Link from "next/link";

marked.use(markedSmartypants());

const ProjectCard = ({ item }: { item: Project }) => {
  const slug = item.slug.replace(".md", "");
  const imageData = item.attributes;

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

  return (
    <article className="relative space-y-4">
      {imageData?.img_src ? (
        <div
          className="bg-white dark:bg-neutral-900 w-full rounded-lg shadow flex items-center justify-center pointer-events-none aspect-5/3"
          style={{
            padding: imageData.style === "padded" ? "0.5rem" : 0,
            backgroundColor: imageData.bg || undefined,
          }}
        >
          {imageData.style === "padded" ? (
            <img
              alt=""
              src={getImageUrl(imageData.img_src, imageData.img_type)}
              loading="lazy"
              className="max-w-full max-h-full object-contain"
            />
          ) : imageData.style === "cover" ? (
            <img
              alt=""
              src={getImageUrl(imageData.img_src, imageData.img_type)}
              loading="lazy"
              className="w-full h-full rounded-lg object-cover"
            />
          ) : (
            <img
              alt=""
              src={getImageUrl(imageData.img_src, imageData.img_type)}
              loading="lazy"
              className="w-full h-full rounded-lg object-cover"
            />
          )}
        </div>
      ) : (
        <div className="aspect-5/3 bg-neutral-100 dark:bg-neutral-900" />
      )}
      <div>
        <Link
          href={`/projects/${new Date(item.date).getUTCFullYear()}/${slug}`}
          className={`${focusStyles} min-w-0 full-link flex hover:text-neutral-500`}
        >
          <div
            className="w-full"
            style={{
              maskImage:
                "linear-gradient(to right, black 70%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, black 70%, transparent 100%)",
            }}
          >
            <h3
              className="truncate text-lg font-medium"
              dangerouslySetInnerHTML={{
                __html: marked.parseInline(item.title),
              }}
            />
          </div>
        </Link>
        <p className="text-sm text-neutral-500 mt-1 mb-1.5">
          {new Date(item.date).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </p>
        <p
          className="line-clamp-2 text-sm text-neutral-500 pointer-events-none"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 0%, black 50%, transparent 50%, transparent 100%), linear-gradient(to right, black 70%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 50%, transparent 50%, transparent 100%), linear-gradient(to right, black 70%, transparent 100%)",
          }}
          dangerouslySetInnerHTML={{
            __html: marked.parseInline(
              item.attributes?.intro || item.excerpt || "",
            ),
          }}
        />
      </div>
    </article>
  );
};

export default async function ProjectContent({
  projectDataFiltered,
  year,
  tag,
  previousYear,
  nextYear,
}: {
  projectDataFiltered: Project[];
  year?: string;
  tag?: string;
  previousYear?: number;
  nextYear?: number;
}) {
  if (tag) {
    let tagContent: string | undefined = undefined;
    try {
      const response = await fetch(
        `https://raw.githubusercontent.com/AnandChowdhary/projects/refs/heads/main/tags/${slugify(
          tag.toLowerCase(),
        )}.md`,
      );
      tagContent = await response.text();
    } catch {
      // Ignore 404s
      tagContent = undefined;
    }

    return (
      <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 space-y-32">
        <Header pathname="/projects" />
        {tagContent ? (
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 space-y-12 md:space-y-0 md:gap-12">
            <div className="aspect-5/3 shadow-sm border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden p-8 md:p-22 w-full">
              <img
                src={`https://raw.githubusercontent.com/AnandChowdhary/projects/refs/heads/main/assets/tags/${slugify(
                  tag.toLowerCase(),
                )}.svg`}
                alt={tag}
                className="w-full h-full object-contain"
              />
            </div>
            <div
              className={`${proseClassName} col-span-2`}
              dangerouslySetInnerHTML={{
                __html: marked.parse(tagContent),
              }}
            />
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-medium text-center">{tag}</h1>
          </div>
        )}
        <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {projectDataFiltered.map((item) => (
            <ProjectCard key={item.slug} item={item} />
          ))}
        </main>
        {year && (previousYear || nextYear) && (
          <NavigationFooter
            previous={
              previousYear
                ? {
                    href: `/projects/${previousYear}`,
                    label: previousYear.toString(),
                  }
                : undefined
            }
            next={
              nextYear
                ? {
                    href: `/projects/${nextYear}`,
                    label: nextYear.toString(),
                  }
                : undefined
            }
          />
        )}
        <Footer />
      </div>
    );
  }

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 space-y-32">
      <Header
        pathname={year ? `/projects/${year}` : "/projects"}
        source="https://github.com/AnandChowdhary/projects"
        readme="https://anandchowdhary.github.io/projects/README.md"
        api="https://anandchowdhary.github.io/projects/api.json"
        description={`Projects I've built over the years, from small experiments to full-scale products.`}
      />
      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {projectDataFiltered.map((item) => (
          <ProjectCard key={item.slug} item={item} />
        ))}
      </main>
      {year && (previousYear || nextYear) && (
        <NavigationFooter
          previous={
            previousYear
              ? {
                  href: `/projects/${previousYear}`,
                  label: previousYear.toString(),
                }
              : undefined
          }
          next={
            nextYear
              ? {
                  href: `/projects/${nextYear}`,
                  label: nextYear.toString(),
                }
              : undefined
          }
        />
      )}
      <Footer />
    </div>
  );
}
