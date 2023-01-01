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
import rehypeAutolinkHeadings from "https://esm.sh/rehype-autolink-headings@6";

export const render = (markdown: string, data?: { repository?: string }) => {
  let item = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(remarkSmartyPants)
    .use(remarkStripBadges)
    .use(remarkSqueezeParagraphs)
    .use(rehypeAutolinkHeadings)
    .use(rehypeExternalLinks);
  if (data?.repository) {
    markdown = markdown
      .replace("](./", `](https://github.com/${data.repository}/blob/HEAD/`)
      .replace("](/", `](https://github.com/${data.repository}/blob/HEAD/`);
  }
  return item.use(rehypeStringify).processSync(markdown).toString();
};
