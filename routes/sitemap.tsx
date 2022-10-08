import { Handlers, PageProps } from "https://deno.land/x/fresh@1.1.1/server.ts";
import { categoryData } from "../utils/data.tsx";
import { render } from "../utils/markdown.ts";
import { pages } from "./sitemap.xml.tsx";

interface SitemapData {
  timeline: {
    date: string;
    type: string;
    title: string;
    description?: string;
    data?: unknown;
    url?: string;
  }[];
  types: string[];
}

export const handler: Handlers<SitemapData> = {
  async GET(request, context) {
    const timeline = (await (
      await fetch("https://anandchowdhary.github.io/everything/api.json")
    ).json()) as {
      date: string;
      type: string;
      title: string;
      description?: string;
      data?: unknown;
      url?: string;
    }[];
    const types = Array.from(new Set(timeline.map(({ type }) => type)));
    return context.render({ timeline, types });
  },
};

export default function Sitemap({ data }: PageProps<SitemapData>) {
  const { timeline, types } = data;

  return (
    <div class="max-w-screen-md px-4 mx-auto space-y-8 md:px-0">
      <header class="mb-5 space-y-5">
        <h1 class="text-4xl font-semibold font-display dark:text-gray-200">
          Sitemap
        </h1>
        <div
          class="text-xl leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: render(
              `Hello robot, here's where you should go next... if you're a human, you should probably use the main navigation, it's much more intuitive!`
            ),
          }}
        />
      </header>
      <section class="grid md:grid-cols-2 gap-8">
        <article>
          <h2 class="text-2xl font-semibold font-display dark:text-gray-200 mb-2">
            Pages
          </h2>
          <ul class="space-y-4">
            {Object.entries(pages).map(([url, name]) => (
              <li key={`${url}`} class="flex flex-col">
                <a href={url}>{name}</a>
              </li>
            ))}
          </ul>
        </article>
        {types.sort().map((type) => (
          <article key={type}>
            <h2 class="text-2xl font-semibold font-display dark:text-gray-200 mb-2">
              {categoryData[type].title}
            </h2>
            <ul class="space-y-4">
              {timeline
                .filter(({ type: t }) => t === type)
                .map((item) => (
                  <li key={`${item.date}${item.url}`} class="flex flex-col">
                    <time dateTime={item.date}>
                      {new Date(item.date).toLocaleDateString()}
                    </time>
                    <a
                      href={
                        new URL(item.url ?? "https://anandchowdhary.com")
                          .pathname
                      }
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
            </ul>
          </article>
        ))}
      </section>
    </div>
  );
}
