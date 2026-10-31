import { GenericSectionContainer } from "@/views/components/generic-section";

export async function PressSection() {
  return (
    <GenericSectionContainer
      title="press"
      subtitle="/press"
      description="I’ve been very fortunate to have been featured in several publications for my work."
      linkText="Go to /press"
    >
      <div className="flex flex-wrap gap-3 text-xs text-neutral-500">
        {[
          {
            icon: "/images/press/forbes.webp",
            label: "Forbes",
          },
          {
            icon: "/images/press/techcrunch.webp",
            label: "TechCrunch",
          },
          {
            icon: "/images/press/huffpost.webp",
            label: "HuffPost",
          },
          {
            icon: "/images/press/hindustan-times.webp",
            label: "Hindustan Times",
          },
          {
            icon: "/images/press/the-next-web.webp",
            label: "The Next Web",
          },
          {
            icon: "/images/press/css-tricks.webp",
            label: "CSS Tricks",
          },
          {
            icon: "/images/press/businessworld.webp",
            label: "BusinessWorld",
          },
          {
            icon: "/images/press/time-out.webp",
            label: "Time Out",
          },
        ].map(({ icon, label }) => (
          <div key={label} className="flex items-center gap-2">
            <img
              alt=""
              className="aspect-square rounded shadow-sm w-4 h-4 object-contain"
              src={icon}
            />
            <div>{label}</div>
          </div>
        ))}
      </div>
    </GenericSectionContainer>
  );
}
