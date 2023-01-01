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
  async GET(_, context) {
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
        <h1 class="text-4xl font-semibold font-display">Sitemap</h1>
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
          <h2 class="text-2xl font-semibold font-display mb-2">Pages</h2>
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
            <h2 class="text-2xl font-semibold font-display mb-2">
              {Object(categoryData)[type].title}
            </h2>
            <h3 class="text-xl font-semibold font-display mb-2">Years</h3>
            <ul class="space-y-4">
              {Array.from(
                { length: new Date().getUTCFullYear() - 2009 + 1 },
                (_, index) => index + 2009
              ).map((year) => (
                <li key={year}>
                  <a href={`/${Object(categoryData)[type].slug}/${year}`}>
                    {year}
                  </a>
                </li>
              ))}
            </ul>
            <h3 class="text-xl font-semibold font-display mt-4 mb-2">Items</h3>
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
