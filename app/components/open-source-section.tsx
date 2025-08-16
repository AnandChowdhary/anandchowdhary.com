import { getAllRepositories, Repository } from "@/app/api";
import { GenericSection } from "@/app/components/generic-section";

export async function OpenSourceSection() {
  const reposDataWithRequiredProps = await getAllRepositories();
  const topRepos = reposDataWithRequiredProps.slice(0, 3);

  const getRepoTitle = (repo: Repository) => (
    <>
      {repo.title}
      <span className="text-neutral-500">
        {` · ${repo.stargazers_count.toLocaleString("en-US")} stars`}
      </span>
    </>
  );

  const getRepoSubtitle = (repo: Repository) => repo.attributes?.subtitle;

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
