import type { Handlers, PageProps } from "$fresh/server.ts";
import frontMatter from "https://esm.sh/front-matter@4.0.2";
import { render } from "../../../utils/markdown.ts";

interface BlogPostData {
  title: string;
  date: string;
  content: string;
  meta?: Record<string, string>;
  history: GitHubCommit[];
  previous?: { title: string; pathname: string; date: string };
  next?: { title: string; pathname: string; date: string };
}
interface GitHubCommit {
  sha: string;
  html_url: string;
  commit: { message: string; committer: { date: string } };
}

export const handler: Handlers<BlogPostData> = {
  async GET(request, context) {
    const response = await fetch(
      `https://raw.githubusercontent.com/AnandChowdhary/blog/master/blog/${context.params.year}/${context.params.slug}.md`,
      { cache: "force-cache" }
    );
    if (!response.ok) throw new Error("Not found");
    const markdown = await response.text();
    // let history: GitHubCommit[] = [];
    // try {
    //   const historyResponse = await fetch(
    //     `https://api.github.com/repos/izuzak/pmrpc/commits?path=README.markdown`,
    //     { cache: "force-cache" }
    //   );
    //   if (!historyResponse.ok) throw new Error("Error in fetching history");
    //   history = (await historyResponse.json()) as GitHubCommit[];
    // } catch (error) {
    //   console.log(error);
    // }
    const title = markdown
      .split("\n")
      .find((line) => line.startsWith("# "))
      ?.replace("# ", "");
    const { attributes, body } = frontMatter(markdown);
    const content = render(body.replace(`# ${title}`, ""));
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
    const currentIndex = timeline.findIndex(
      ({ type, url }) =>
        type === "blog-post" && url && url.endsWith(context.params.slug)
    );
    const date =
      attributes && typeof attributes === "object" && "date" in attributes
        ? Object(attributes).date
        : timeline[currentIndex].date;
    if (!title) throw new Error("Blog post title not found");
    if (!date) throw new Error("Blog post date not found");

    const previous = timeline
      .slice(currentIndex + 1)
      .find(({ type }) => type === "blog-post");
    const next = timeline
      .slice(0, currentIndex)
      .find(({ type }) => type === "blog-post");
    return context.render({
      meta: attributes ? Object(attributes) : {},
      history: [],
      content,
      date,
      title,
      previous: previous && {
        title: previous.title,
        pathname:
          "url" in previous && previous.url
            ? new URL(previous.url).pathname
            : "",
        date: previous.date,
      },
      next: next && {
        title: next.title,
        pathname: "url" in next && next.url ? new URL(next.url).pathname : "",
        date: next.date,
      },
    });
  },
};

export default function BlogPost({ data, params }: PageProps<BlogPostData>) {
  const { title, content, date, meta, history, previous, next } = data;

  return (
    <div className="max-w-screen-md px-4 mx-auto md:px-0">
      <nav>
        <ol className="flex flex-wrap breadcrumbs">
          <li className="hidden">
            <a href="/">Anand Chowdhary</a>
          </li>
          <li>
            <a href="/blog">Blog</a>
          </li>
          <li>
            <a href={`/blog/${params.year}`}>{params.year}</a>
          </li>
        </ol>
      </nav>
      <header class="post-header">
        <h1>{meta?.title ?? title}</h1>
        <p>
          {new Date(date).toLocaleDateString("en-US", { dateStyle: "long" })}
        </p>
      </header>
      <div className="longform" dangerouslySetInnerHTML={{ __html: content }} />
      <footer className="grid md:grid-cols-2 gap-4 mt-8">
        {previous && (
          <div>
            <div>&larr; Previous post</div>
            <div className="font-medium">
              <a href={previous.pathname}>{previous.title}</a>
            </div>
            <div className="text-gray-500">
              {new Date(previous.date).toLocaleDateString("en-US", {
                dateStyle: "long",
              })}
            </div>
          </div>
        )}
        {next && (
          <div className="text-right">
            <div>Next post &rarr;</div>
            <div className="font-medium">
              <a href={next.pathname}>{next.title}</a>
            </div>
            <div className="text-gray-500">
              {new Date(next.date).toLocaleDateString("en-US", {
                dateStyle: "long",
              })}
            </div>
          </div>
        )}
      </footer>
      {/* <footer className="bg-white mt-12 p-4 rounded border">
        <h2>About this post</h2>
        <h3>Commit history</h3>
        {history.map((commit) => (
          <div key={commit.sha} className="flex">
            <div className="w-24">()</div>
            <div>
              <div>
                <ExternalLink href={commit.html_url}>
                  {new Date(commit.commit.committer.date).toLocaleDateString(
                    "en-US",
                    { dateStyle: "long" }
                  )}
                </ExternalLink>
              </div>
              <p>{commit.commit.message}</p>
            </div>
          </div>
        ))}
      </footer> */}
    </div>
  );
}
