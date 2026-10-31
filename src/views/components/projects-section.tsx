import { GenericSectionContainer } from "@/views/components/generic-section";

export async function ProjectsSection() {
  return (
    <GenericSectionContainer
      title="projects"
      subtitle="/projects"
      description="I build software products and tools that help people be more productive and creative."
      linkText="Go to /projects"
    >
      <ul className="grid grid-cols-2 gap-4">
        {[
          "/images/home/pabio-lounge.webp",
          "/images/home/crink-jewel.webp",
          "/images/home/unqueue.webp",
          "/images/home/wendy.webp",
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
