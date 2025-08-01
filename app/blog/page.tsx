import BlogContent from "@/app/blog/component";
import { GenericItem } from "@/app/components/generic-section";

interface BlogPost extends GenericItem {
  attributes: { date: string; draft?: boolean };
}

export default async function Blog() {
  const blog = await fetch("https://anandchowdhary.github.io/blog/api.json", {
    next: { revalidate: 36000 },
  });
  const blogData = (await blog.json()) as BlogPost[];
  const blogDataFiltered = blogData
    .filter((post) => !post.attributes.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return <BlogContent blogDataFiltered={blogDataFiltered} />;
}
