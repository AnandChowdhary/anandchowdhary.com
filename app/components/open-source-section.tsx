import { GenericSection } from "@/app/components/generic-section";

interface Repository {
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  created_at: string;
  homepage?: string;
  topics?: string[];
  slug: string;
  path: string;
  source: string;
  title: string;
  date: string;
  excerpt: string;
  attributes: { subtitle: string };
}

export async function OpenSourceSection() {
  const formatRepoTitle = (name: string): string =>
    name.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  const cleanSubtitle = (text: string, projectName: string): string => {
    if (!text) return text;
    let cleanedText = text.trim();
    const words = cleanedText.split(" ");
    if (
      words.length > 0 &&
      words[0].toLowerCase() === projectName.toLowerCase()
    ) {
      words.shift();

      while (
        words.length > 0 &&
        ["is", "a", "the"].includes(words[0].toLowerCase())
      )
        words.shift();

      if (words.length > 0)
        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
      cleanedText = words.join(" ");
    }
    return cleanedText;
  };

  const repos = await fetch(
    "https://anandchowdhary.github.io/featured/repos.json",
    { next: { revalidate: 36000 } }
  );
  const reposData = (await repos.json()) as Repository[];

  const reposDataWithRequiredProps = await Promise.all(
    reposData
      .map((repo) => ({
        ...repo,
        slug: repo.name.toLowerCase().replace(/\s+/g, "-"),
        path: `/open-source/${repo.name.toLowerCase().replace(/\s+/g, "-")}`,
        source: repo.html_url,
        title: formatRepoTitle(repo.name),
        date: repo.updated_at,
        excerpt: repo.description || "No description available",
      }))
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 3)
      .map(async (repo) => {
        repo.attributes = repo.attributes ?? {};
        const readMe = await fetch(
          `https://raw.githubusercontent.com/${repo.full_name}/HEAD/README.md`,
          { next: { revalidate: 36000 } }
        );
        const readMeText = await readMe.text();

        // Some README files have a specific section for what I want to embed here
        /**
         * <details data-embed="anandchowdhary.com" data-summary="Uptime monitor and status page powered by GitHub Actions">
            <summary>Upptime is used by <strong>3,000+</strong> people and teams to ensure they know when their endpoints go down.</summary>
            I built Uppt...
          </details>
        */
        const detailsRegex =
          /<details data-embed="anandchowdhary.com"(?:\s+(?:data-summary="([^"]+)"|data-title="([^"]+)"))*\s*>(?:<summary>[^<]*<\/summary>)?\s*([^]*?)<\/details>/;
        const detailsMatch = readMeText.match(detailsRegex);

        let dataSummary = null;
        let dataTitle = null;
        if (detailsMatch) {
          const attributeRegex =
            /(?:data-summary="([^"]+)"|data-title="([^"]+)")/g;
          let attrMatch;
          while ((attrMatch = attributeRegex.exec(detailsMatch[0])) !== null) {
            if (attrMatch[1]) dataSummary = attrMatch[1];
            if (attrMatch[2]) dataTitle = attrMatch[2];
          }
        }
        const lines = readMeText.split("\n");
        const firstLineOfText =
          lines.find((line) => {
            const trimmedLine = line.trim();
            return trimmedLine.length > 0 && /^[a-zA-Z]/.test(trimmedLine);
          }) ?? lines[0];
        if (detailsMatch) {
          if (dataTitle) repo.title = dataTitle;
          repo.attributes.subtitle = dataSummary ?? detailsMatch[3];
        } else
          repo.attributes.subtitle = cleanSubtitle(firstLineOfText, repo.name);
        return repo;
      })
  );

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
      items={reposDataWithRequiredProps}
      description="Open source projects I've contributed to and maintain."
      linkText="Go to open source"
      getItemTitle={getRepoTitle}
      getItemSubtitle={getRepoSubtitle}
    />
  );
}
