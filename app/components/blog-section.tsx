import { GenericItem, GenericSection } from "@/app/components/generic-section";

interface BlogPost extends GenericItem {
  attributes: { date: string; draft?: boolean };
}

export async function BlogSection() {
  const blog = await fetch("https://anandchowdhary.github.io/blog/api.json", {
    next: { revalidate: 36000 },
  });
  const blogData = (await blog.json()) as BlogPost[];
  const blogDataFiltered = blogData
    .filter((post) => !post.attributes.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getBlogTitle = (post: BlogPost) => post.title;

  const getBlogSubtitle = (post: BlogPost) =>
    new Date(post.date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <GenericSection
      title="blog"
      subtitle="/blog"
      items={blogDataFiltered}
      description="I write about technology, startups, and life lessons learned along the way."
      linkText="Go to blog"
      getItemTitle={getBlogTitle}
      getItemSubtitle={getBlogSubtitle}
    />
  );
}
