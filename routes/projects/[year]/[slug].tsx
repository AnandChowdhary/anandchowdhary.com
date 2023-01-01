import type { Handlers, PageProps } from "$fresh/server.ts";
import { slugify } from "https://deno.land/x/slugify@0.3.0/mod.ts";
import IconBrandGithub from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/brand-github.tsx";
import IconCalendarEvent from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/calendar-event.tsx";
import IconEye from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/eye.tsx";
import IconGitFork from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/git-fork.tsx";
import IconStar from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/star.tsx";
import frontMatter from "https://esm.sh/front-matter@4.0.2";
import smartQuotes from "https://esm.sh/smartquotes-ts@0.0.2";
import type {
  Timeline,
  TimelineOpenSourceProject,
  TimelineProject,
} from "https://esm.sh/timeline-types@9.0.0/index.d.ts";
import { Fragment, type ComponentChildren } from "preact";
import { Breadcrumbs } from "../../../components/data/Breadcrumbs.tsx";
import { PreviousNext } from "../../../components/data/PreviousNext.tsx";
import { ExternalLink } from "../../../components/text/ExternalLink.tsx";
import { fetchJson, fetchText } from "../../../utils/data.tsx";
import { SingleItemHandlerProps } from "../../../utils/handlers.ts";
import { t } from "../../../utils/i18n.tsx";
import { render } from "../../../utils/markdown.ts";
import { imageUrl } from "../../../utils/urls.ts";

type TimelineProjectItem = TimelineOpenSourceProject | TimelineProject;

export const handler: Handlers = {
  async GET(_, context) {
    const timeline = await fetchJson<Timeline>(
      "https://anandchowdhary.github.io/everything/api.json"
    );
    const currentIndex = timeline.findIndex(
      ({ type, url }) =>
        (type === "project" || type === "open-source-project") &&
        url &&
        url.endsWith(context.params.slug)
    );
    const item = timeline[currentIndex] as TimelineProjectItem;
    console.log(item);

    let readme: string | undefined = undefined;
    if (item.type === "open-source-project") {
      readme = await fetchText(
        `https://raw.githubusercontent.com/${
          new URL(item.source).pathname
        }/HEAD/README.md`
      );

      // Remove title from README
      readme = readme.replace(/^# .+$/m, "");
      const images = [
        // Markdown images
        ...(readme.match(/!\[([^\]]+)\]\(([^)]+)\)/g) ?? []),
        // HTML images
        ...(readme.match(/<img[^>]+>/g) ?? []),
      ];
      const firstImage = images[0];
      if (
        firstImage &&
        item.data.openGraphImageUrl &&
        new URL(item.data.openGraphImageUrl).hostname !==
          "opengraph.githubassets.com"
      ) {
        // Remove first image
        readme = readme.replace(firstImage, "");
      }
    } else {
      readme = await fetchText(
        `https://raw.githubusercontent.com/AnandChowdhary/projects/main/projects/${context.params.year}/${context.params.slug}.md`
      );
      const title = timeline[currentIndex].title;
      const { body } = frontMatter(readme);
      readme = body.replace(`# ${title}`, "");
    }

    const previous = timeline
      .slice(currentIndex + 1)
      .find(
        ({ type }) => type === "project" || type === "open-source-project"
      ) as TimelineProjectItem;
    const next = timeline
      .slice(0, currentIndex)
      .find(
        ({ type }) => type === "project" || type === "open-source-project"
      ) as TimelineProjectItem;
    const data = { item, previous, next, readme };
    return context.render(data);
  },
};

export default function Event({
  data,
}: PageProps<
  SingleItemHandlerProps<TimelineProjectItem> & { readme?: string }
>) {
  const { timeline, item, content, previous, next, readme } = data;

  return (
    <div className="max-w-screen-md px-4 mx-auto md:px-0">
      {"openGraphImageUrl" in item.data && item.data.openGraphImageUrl ? (
        <img
          alt=""
          src={imageUrl(item.data.openGraphImageUrl, {
            w: "1024",
            h: "512",
            fit: "cover",
          })}
          width={1024}
          height={512}
          className="w-full rounded-lg shadow mb-4"
        />
      ) : "image" in item.data && item.data.image ? (
        <div
          class="bg-white w-full rounded-lg shadow flex items-center justify-center mb-4"
          style={{
            aspectRatio: "2/1",
            padding: item.data.image.attachment === "padded" ? "0.5rem" : 0,
            backgroundColor: item.data.image.color,
          }}
        >
          {item.data.image.attachment === "padded" ? (
            <img
              alt=""
              src={imageUrl(item.data.image.url, { w: "1024" })}
              loading="lazy"
              class="max-w-full max-h-96"
            />
          ) : (
            <img
              alt=""
              src={imageUrl(item.data.image.url, { w: "1024" })}
              loading="lazy"
              class="bg-red-100 w-full rounded-lg"
            />
          )}
        </div>
      ) : null}
      <Breadcrumbs
        items={[
          { title: "Projects", href: "/projects" },
          {
            title: new Date(item.date).getFullYear().toString(),
            href: `/projects/${new Date(item.date).getFullYear()}`,
          },
        ]}
      />
      <header class="post-header">
        <h1>{item.title}</h1>
        {(("topics" in item.data && item.data.topics.length > 0) ||
          ("tags" in item.data && item.data.tags.length > 0)) && (
          <ul class="flex flex-wrap -ml-0.5 mb-4">
            {("topics" in item.data ? item.data.topics : item.data.tags).map(
              (topic) => (
                <li key={topic}>
                  <a
                    href={`/projects/tags/${slugify(topic, { lower: true })}`}
                    class="bg-white px-3 py-1 rounded-full border m-0.5 flex text-sm"
                  >
                    {slugify(topic, { lower: true })}
                  </a>
                </li>
              )
            )}
          </ul>
        )}
        <ul class="text-gray-500 grid grid-cols-2">
          <li class="flex items-center space-x-2">
            <IconCalendarEvent class="h-4 w-4" />
            <span>
              {new Date(item.date).toLocaleDateString("en-US", {
                dateStyle: "long",
              })}
            </span>
          </li>
          <li class="flex items-center space-x-2">
            <IconBrandGithub class="h-4 w-4" />
            <span class="space-x-2">
              <ExternalLink
                href={
                  item.type === "open-source-project"
                    ? item.source
                    : `${item.source.replace(
                        "anandchowdhary.github.io/projects",
                        "github.com/AnandChowdhary/projects/blob/main"
                      )}.md`
                }
              >
                View on GitHub
              </ExternalLink>
            </span>
          </li>
          {item.type === "open-source-project" && (
            <Fragment>
              {item.data.language && item.data.languageColor && (
                <li class="flex items-center space-x-2">
                  <span
                    class="w-4 h-4 rounded-full"
                    style={{
                      backgroundColor: item.data.languageColor ?? "#aaa",
                    }}
                  ></span>
                  <a
                    href={`/projects/tags/${slugify(item.data.language, {
                      lower: true,
                    })}`}
                  >
                    {smartQuotes(item.data.language)}
                  </a>
                </li>
              )}
              {item.data.stars > 0 && (
                <li class="flex items-center space-x-2">
                  <IconStar class="w-4 h-4" />
                  <span>
                    {t(`<0>${item.data.stars.toLocaleString()}</0> stars`, {}, [
                      ({ children }: { children: ComponentChildren }) => (
                        <strong className="font-medium" children={children} />
                      ),
                    ])}
                  </span>
                </li>
              )}
              {item.data.watchers > 0 && (
                <li class="flex items-center space-x-2">
                  <IconGitFork class="w-4 h-4" />
                  <span>
                    {t(
                      `<0>${item.data.watchers.toLocaleString()}</0> watchers`,
                      {},
                      [
                        ({ children }: { children: ComponentChildren }) => (
                          <strong className="font-medium" children={children} />
                        ),
                      ]
                    )}
                  </span>
                </li>
              )}
              {item.data.forks > 0 && (
                <li class="flex items-center space-x-2">
                  <IconEye class="w-4 h-4" />
                  <span>
                    {t(`<0>${item.data.forks.toLocaleString()}</0> forks`, {}, [
                      ({ children }: { children: ComponentChildren }) => (
                        <strong className="font-medium" children={children} />
                      ),
                    ])}
                  </span>
                </li>
              )}
            </Fragment>
          )}
        </ul>
      </header>
      <div
        className="longform"
        dangerouslySetInnerHTML={{
          __html: readme
            ? render(readme, {
                repository: new URL(item.source).pathname.replace("/", ""),
              })
            : content,
        }}
      />
      <PreviousNext typeLabel="project" previous={previous} next={next} />
    </div>
  );
}
