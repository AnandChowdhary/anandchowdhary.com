import { BlogPost, getAllBlogPosts } from "@/app/api";
import { GenericSection } from "@/app/components/generic-section";

export async function BlogSection() {
  const blogDataFiltered = await getAllBlogPosts();

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
