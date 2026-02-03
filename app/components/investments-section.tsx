import { GenericSectionContainer } from "@/app/components/generic-section";

interface Company {
  slug: string;
  title: string;
  label: "Active" | "Stealth" | "Inactive" | "Exited";
  href?: string;
  logo?: string;
  summary: string;
  tags?: string[];
  stealth?: boolean;
}

async function getCompanies(): Promise<Company[]> {
  const response = await fetch(
    "https://raw.githubusercontent.com/chowdhary-org/website/refs/heads/main/src/app/holdings/data/companies.json",
    { next: { revalidate: 3600 } }
  );
  return response.json();
}

export async function InvestmentsSection() {
  const companies = await getCompanies();
  const visibleCompanies = companies.filter((c) => !c.stealth && c.logo);

  return (
    <GenericSectionContainer
      title="investments"
      subtitle="Chowdhary.co"
      href="https://chowdhary.co"
      description="Angel investments in early-stage startups building the future."
      linkText="Go to Chowdhary.co"
    >
      <div className="flex flex-wrap gap-3 text-xs text-neutral-500">
        {visibleCompanies.map((company) => (
          <div key={company.slug} className="flex items-center gap-2">
            {company.logo && (
              <img
                alt=""
                className="aspect-square rounded shadow-sm w-4 h-4 object-contain"
                src={`https://chowdhary.co${company.logo}`}
              />
            )}
            <div>{company.title}</div>
          </div>
        ))}
      </div>
    </GenericSectionContainer>
  );
}
