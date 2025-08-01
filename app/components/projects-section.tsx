import { GenericSectionContainer } from "@/app/components/generic-section";

export async function ProjectsSection() {
  return (
    <GenericSectionContainer
      title="projects"
      subtitle="/projects"
      description="I build software products and tools that help people be more productive and creative."
      linkText="Go to projects"
    >
      <ul className="grid grid-cols-2 gap-4">
        {[
          "https://wsrv.nl/?url=https://raw.githubusercontent.com/AnandChowdhary/projects/main/assets/pabio-lounge/cover.jpg?maxage%3D1y&w=576&cacheBuster=1697116221667",
          "https://wsrv.nl/?url=https://raw.githubusercontent.com/AnandChowdhary/projects/main/assets/crink-jewel/crink-jewel_2x.png?maxage%3D1y&w=576&cacheBuster=1697116221667",
          "https://wsrv.nl/?url=https://repository-images.githubusercontent.com/286080143/14b2b180-19f1-11eb-991c-ced0b1719fe9?maxage%3D1y&w=576&h=288&fit=cover&cacheBuster=1697116221667",
          "https://wsrv.nl/?url=https://raw.githubusercontent.com/AnandChowdhary/projects/main/assets/wendy/wendy_2x.png?maxage%3D1y&w=576&cacheBuster=1697116221667",
        ].map((src) => (
          <li
            key={src}
            className="aspect-[16/11] rounded-lg shadow-sm"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
      </ul>
    </GenericSectionContainer>
  );
}
