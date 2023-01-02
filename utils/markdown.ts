import rehypeAutolinkHeadings from "https://esm.sh/rehype-autolink-headings@6";
import rehypeExternalLinks from "https://esm.sh/rehype-external-links@1";
import rehypeHighlight from "https://esm.sh/rehype-highlight@5";
import rehypeStringify from "https://esm.sh/rehype-stringify@9";
import remarkGfm from "https://esm.sh/remark-gfm@3";
import remarkParse from "https://esm.sh/remark-parse@10";
import remarkRehype from "https://esm.sh/remark-rehype@10";
import remarkSmartyPants from "https://esm.sh/remark-smartypants@2";
import remarkSqueezeParagraphs from "https://esm.sh/remark-squeeze-paragraphs@5";
import remarkStripBadges from "https://esm.sh/remark-strip-badges@6";
import { unified } from "https://esm.sh/unified@10";

export const render = (markdown: string, data?: { repository?: string }) => {
  if (data?.repository) {
    markdown = markdown
      .replaceAll(
        "](./",
        `](https://raw.githubusercontent.com/${data.repository}/HEAD/`
      )
      .replaceAll(
        "](/",
        `](https://raw.githubusercontent.com/${data.repository}/HEAD/`
      );
  }
  const item = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(remarkSmartyPants)
    .use(remarkStripBadges)
    .use(remarkSqueezeParagraphs)
    .use(rehypeAutolinkHeadings as any)
    .use(rehypeExternalLinks as any);
  return item
    .use(rehypeStringify as any)
    .processSync(markdown)
    .toString();
};
