/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import type { Handlers, PageProps } from "$fresh/server.ts";
import { marked } from "https://esm.sh/marked@4.0.18";
import frontMatter from "https://esm.sh/front-matter@4.0.2";
import { ExternalLink } from "../../../components/text/ExternalLink.tsx";

interface BlogPostData {
  title: string;
  content: string;
  date: string;
  meta?: Record<string, string>;
  history: GitHubCommit[];
}
interface GitHubCommit {
  sha: string;
  html_url: string;
  commit: { message: string; committer: { date: string } };
}

export const handler: Handlers<BlogPostData> = {
  async GET(request, context) {
    const markdown = await (
      await fetch(
        `https://raw.githubusercontent.com/AnandChowdhary/blog/master/blog/2021/${context.params.slug}.md`,
        { cache: "force-cache" }
      )
    ).text();
    const history = (await (
      await fetch(
        `https://api.github.com/repos/izuzak/pmrpc/commits?path=README.markdown`,
        { cache: "force-cache" }
      )
    ).json()) as GitHubCommit[];
    const title = markdown
      .split("\n")
      .find((line) => line.startsWith("# "))
      ?.replace("# ", "");
    const { attributes, body } = frontMatter(markdown);
    const content = marked.parse(body.replace(`# ${title}`, ""));
    const date =
      attributes && typeof attributes === "object" && "date" in attributes
        ? Object(attributes).date
        : history[0].commit.committer.date;
    if (!title) throw new Error("Blog post title not found");
    if (!date) throw new Error("Blog post date not found");
    return context.render({
      meta: attributes ? Object(attributes) : {},
      history,
      content,
      date,
      title,
    });
  },
};

export default function BlogPost({ data, params }: PageProps<BlogPostData>) {
  const { title, content, date, meta, history } = data;

  return (
    <div className={tw`max-w-screen-md px-4 mx-auto md:px-0`}>
      <nav>
        <style
          dangerouslySetInnerHTML={{
            __html: `.breadcrumbs li + li:not(:first-child)::after {
          content: "›";
          padding: 0 0.5rem;
        }`,
          }}
        ></style>
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
      <header>
        <h1 className="text-xl font-bold mx-4">{meta?.title ?? title}</h1>
        <p>
          Posted on{" "}
          {new Date(date).toLocaleDateString("en-US", { dateStyle: "long" })}
        </p>
      </header>
      <div className="longform" dangerouslySetInnerHTML={{ __html: content }} />
      <footer className="bg-white mt-12 p-4 rounded border  ">
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
      </footer>
    </div>
  );
}
