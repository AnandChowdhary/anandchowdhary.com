import { getAllRepositories, Repository } from "@/app/api";
import { GenericSection } from "@/app/components/generic-section";

const getRepoTitle = (repo: Repository) => (
  <>
    {repo.title}
    <span className="text-neutral-500">
      {` · ${repo.stargazers_count.toLocaleString("en-US")} ${
        repo.stargazers_count === 1 ? "star" : "stars"
      }`}
    </span>
  </>
);

const getRepoSubtitle = (repo: Repository) => repo.attributes?.subtitle;

export async function OpenSourceSection() {
  const reposDataWithRequiredProps = await getAllRepositories();
  const topRepos = reposDataWithRequiredProps.slice(0, 3);

  return (
    <GenericSection
      title="open-source"
      subtitle="/open-source"
      items={topRepos}
      description="I build and maintain open source projects to scratch my own itch as a GitHub Star."
      linkText="Go to /open-source"
      getItemTitle={getRepoTitle}
      getItemSubtitle={getRepoSubtitle}
    />
  );
}
