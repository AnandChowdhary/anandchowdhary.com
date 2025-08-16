import { GenericSectionContainer } from "@/app/components/generic-section";

export async function WorkSection() {
  return (
    <GenericSectionContainer
      title="Work"
      subtitle="/work"
      description="I’m a tech entrepreneur, engineer, and designer."
      linkText="Go to /work"
    >
      <ul className="grid grid-cols-5 gap-3 shadow-xs border border-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 bg-neutral-50 px-4 py-3 rounded-xl">
        {[
          {
            label: "FirstQuadrant",
            color: "#333333",
            icon: (
              <svg viewBox="0 0 144 144">
                <path fill="currentColor" d="M62 0h20v144H62z" />
                <path fill="currentColor" d="M144 62v20H0V62z" />
                <path fill="currentColor" d="m119 11 14 14-51 51-14-14z" />
              </svg>
            ),
            url: "https://firstquadrant.ai",
          },
          {
            label: "Pabio",
            color: "#ff6b6b",
            icon: (
              <svg viewBox="0 0 900 256">
                <path
                  d="M0 11v241h55v-82h45c56 0 81-39 81-79s-25-80-81-80H0zm55 111V59h42c21 0 29 16 29 32 0 15-8 31-29 31H55zm270-14a65 65 0 00-52-23c-46 0-78 34-78 85s32 86 78 86c20 0 40-9 52-25v21h51V89h-51v19zm-40 100c-22 0-38-18-38-38 0-21 16-38 38-38 21 0 38 17 38 38 0 20-17 38-38 38zM522 85c-16 0-38 6-50 22V0h-52v252h52v-18c12 15 34 22 50 22 41 0 80-33 80-86s-39-85-80-85zm-10 123c-20 0-38-17-38-38s18-38 38-38 37 17 37 38-17 38-37 38zM662 64c18 0 32-13 32-30S680 4 662 4c-17 0-32 13-32 30s15 30 32 30zm26 188V89h-52v163h52zm123 4c47 0 89-34 89-86 0-51-42-85-89-85s-89 34-89 85c0 52 42 86 89 86zm0-48c-20 0-36-15-36-38 0-22 16-38 36-38s36 16 36 38c0 23-16 38-36 38z"
                  fill="currentColor"
                />
              </svg>
            ),
            url: "https://pabio.com",
          },
          {
            label: "Chowdhary.org",
            color: "#007bff",
            icon: (
              <svg viewBox="0 0 116 116">
                <g fill="currentColor" fillRule="evenodd">
                  <path d="M58 116A58 58 0 1 1 58 0a58 58 0 0 1 0 116zm1-11a47 47 0 1 0 0-95 47 47 0 0 0 0 95z" />
                  <circle cx="58.5" cy="57.5" r="35.5" />
                </g>
              </svg>
            ),
            url: "https://chowdhary.org",
            container: true,
          },
          {
            label: "Oswald Labs",
            color: "#4c9bd8",
            icon: (
              <svg viewBox="0 0 350 350">
                <path
                  fill="currentColor"
                  d="M350 76v3l-41 20-102-47-1 1 28 37a16655 16655 0 0 1-28 14l-51-9-1 1-32-5 102 49-1 3-47 24A20730 20730 0 0 1 0 80v-3l59-25c35 6 69 12 104 16a1028 1028 0 0 1-31-47 1468 1468 0 0 0 52-20l166 75Z"
                />
                <path
                  fill="currentColor"
                  d="M0 99c56 27 112 54 168 83l1 168h-4c-55-29-110-56-165-82V99ZM350 99v169c-56 26-111 53-165 82h-4c-1-57 0-113 1-168 55-29 111-56 168-83Z"
                />
              </svg>
            ),
            url: "https://oswaldlabs.com",
            container: true,
          },
          {
            label: "Upptime",
            color: "#00c3a0",
            icon: (
              <svg viewBox="0 0 256 256">
                <path
                  fillRule="evenodd"
                  fill="currentColor"
                  d="M87 0h86c-3 8-6 15-11 22l-26 1v66c16-8 33-13 51-15 16-3 32 0 47 8 6 7 11 16 13 26v30l-7 31c-4 8-8 16-13 22-12 7-24 7-36 0v1l27 31 1 33h-4l-67-85c4-7 9-12 15-16l14 8c33 18 46 8 39-29-5-29-22-40-50-35-11 3-21 7-30 12l-1 127c-8 5-14 11-20 18h-3l-1-90c-18 15-37 26-59 34-25 6-39-3-44-27v-42c6-35 26-53 60-54 15 0 29 3 43 9l1-63H75l2-7L87 0ZM70 102c14-1 28 1 42 5l-1 39c-16 13-34 23-53 30-18 5-27-1-27-18 0-14 3-28 10-42 8-9 17-14 29-14Z"
                />
              </svg>
            ),
            url: "https://upptime.js.org",
            container: true,
          },
        ].map((work) => (
          <li
            key={work.label}
            className="rounded-xl shadow-xs p-2 bg-background flex items-center justify-center text-white"
            style={{ backgroundColor: work.color }}
          >
            {work.icon}
          </li>
        ))}
      </ul>
    </GenericSectionContainer>
  );
}
