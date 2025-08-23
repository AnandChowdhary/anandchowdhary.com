import { GenericSectionContainer } from "@/app/components/generic-section";

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
            icon: "https://pbs.twimg.com/profile_images/1711185897415180288/lgwajQTW_400x400.jpg",
            label: "Forbes",
          },
          {
            icon: "https://pbs.twimg.com/profile_images/1096066608034918401/m8wnTWsX_400x400.png",
            label: "TechCrunch",
          },
          {
            icon: "https://pbs.twimg.com/profile_images/1920465822650134528/ZAOtUO3g_400x400.jpg",
            label: "HuffPost",
          },
          {
            icon: "https://pbs.twimg.com/profile_images/1618839278561398784/2kXt0tLH_400x400.jpg",
            label: "Hindustan Times",
          },
          {
            icon: "https://pbs.twimg.com/profile_images/1306571874000830464/AZtkNMd-_400x400.png",
            label: "The Next Web",
          },
          {
            icon: "https://pbs.twimg.com/profile_images/1080202898372362240/akqRGyta_400x400.jpg",
            label: "CSS Tricks",
          },
          {
            icon: "https://pbs.twimg.com/profile_images/731046562848071680/1bYZ7dkg_400x400.jpg",
            label: "BusinessWorld",
          },
          {
            icon: "https://pbs.twimg.com/profile_images/1791535094122831872/eLwYJH7r_400x400.jpg",
            label: "Time Out",
          },
        ].map(({ icon, label }) => (
          <div key={label} className="flex items-center gap-2">
            <img
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
