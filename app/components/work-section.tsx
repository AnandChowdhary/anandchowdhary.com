import { GenericSectionContainer } from "@/app/components/generic-section";

export async function WorkSection() {
  return (
    <GenericSectionContainer
      title="About"
      subtitle="/about"
      description="I’m a tech entrepreneur, engineer, and designer, who builds and advises startups."
      linkText="Go to /about"
    >
      <ul className="grid grid-cols-6 gap-3 shadow-xs border border-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 bg-neutral-50 px-4 py-3 rounded-xl">
        {[
          {
            label: "Sycamore",
            years: [2026],
            color: "#262626",
            icon: (
              <svg viewBox="0 0 85 85">
                <path fill="currentColor" d="M41.125 53.0905C41.4288 53.0906 41.6751 53.3407 41.6751 53.6493V64.9946C41.6751 65.0927 41.6495 65.1891 41.6012 65.274L30.551 84.7206C30.3391 85.0934 29.8095 85.0931 29.5981 84.72L24.2075 75.2074C24.1093 75.034 23.9272 74.9272 23.7303 74.9274L12.9269 74.9405C12.5032 74.9411 12.2381 74.4751 12.4499 74.1023L24.2309 53.3699C24.3292 53.197 24.5106 53.0905 24.7071 53.0905H41.125Z" />
                <path fill="currentColor" d="M60.2929 53.0905C60.4894 53.0905 60.6709 53.197 60.7691 53.3699L72.5501 74.1023C72.7619 74.4751 72.4968 74.9411 72.0731 74.9405L61.2697 74.9274C61.0728 74.9272 60.8907 75.034 60.7925 75.2074L55.4019 84.72C55.1905 85.0931 54.6608 85.0934 54.449 84.7206L43.3988 65.274C43.3505 65.1891 43.3249 65.0927 43.3249 64.9946V53.6493C43.3249 53.3407 43.5712 53.0906 43.875 53.0905H60.2929Z" />
                <path fill="currentColor" d="M24.0905 31.8539C24.2869 31.8539 24.4684 31.9604 24.5666 32.1333L30.2738 42.1764C30.3721 42.3493 30.3721 42.5626 30.2738 42.7355L24.5484 52.8111C24.4501 52.9839 24.2686 53.0904 24.0722 53.0905H0.551C0.127326 53.0905-0.137369 52.6242 0.0748176 52.2517L5.48766 42.7521C5.58635 42.5789 5.58634 42.3654 5.48766 42.1922L0.0748176 32.6927C-0.137474 32.3201 0.127288 31.8539 0.551 31.8539H24.0905Z" />
                <path fill="currentColor" d="M84.449 31.8539C84.8727 31.8539 85.1375 32.3201 84.9252 32.6927L79.5123 42.1922C79.4137 42.3654 79.4137 42.5789 79.5123 42.7521L84.9252 52.2517C85.1374 52.6242 84.8727 53.0905 84.449 53.0905H60.9278C60.7314 53.0904 60.5499 52.9839 60.4516 52.8111L54.7262 42.7355C54.6279 42.5626 54.6279 42.3493 54.7262 42.1764L60.4334 32.1333C60.5316 31.9604 60.7131 31.8539 60.9096 31.8539H84.449Z" />
                <path fill="currentColor" d="M29.6481 0.279987C29.8595-0.0930903 30.3894-0.0933854 30.6012 0.279441L42.3411 20.94C42.4394 21.1129 42.4394 21.326 42.3411 21.4989L36.6159 31.5744C36.5177 31.7473 36.336 31.8539 36.1395 31.8539H24.7254C24.5289 31.8538 24.3474 31.7473 24.2492 31.5744L12.4999 10.8978C12.288 10.5249 12.5532 10.059 12.9769 10.0595L23.7802 10.0726C23.9772 10.0728 24.1592 9.96601 24.2575 9.79259L29.6481 0.279987Z" />
                <path fill="currentColor" d="M54.3988 0.279441C54.6106-0.0933854 55.1405-0.0930903 55.3519 0.279987L60.7425 9.79259C60.8408 9.96601 61.0228 10.0728 61.2198 10.0726L72.0231 10.0595C72.4468 10.059 72.712 10.5249 72.5001 10.8978L60.7508 31.5744C60.6526 31.7473 60.4711 31.8538 60.2746 31.8539H48.8605C48.664 31.8539 48.4823 31.7473 48.3841 31.5744L42.6589 21.4989C42.5606 21.326 42.5606 21.1129 42.6589 20.94L54.3988 0.279441Z" />
              </svg>
            ),
            url: "https://sycamore.so",
            description:
              "Enterprise operating system for deploying, governing, and scaling autonomous AI agents with enterprise-grade security and human oversight, backed by a $65 million seed round.",
          },
          {
            label: "FirstQuadrant",
            years: [2023],
            color: "#333333",
            icon: (
              <svg viewBox="0 0 144 144">
                <path fill="currentColor" d="M62 0h20v144H62z" />
                <path fill="currentColor" d="M144 62v20H0V62z" />
                <path fill="currentColor" d="m119 11 14 14-51 51-14-14z" />
              </svg>
            ),
            url: "https://firstquadrant.ai",
            description:
              "AI sales platform that helps founders and revenue teams move faster, stay organized, and close more deals by streamlining behind-the-scenes sales work.",
          },
          {
            label: "Pabio",
            years: [2020, 2022],
            color: "#ff6b6b",
            icon: (
              <svg viewBox="0 0 900 256">
                <path
                  d="M0 11v241h55v-82h45c56 0 81-39 81-79s-25-80-81-80H0zm55 111V59h42c21 0 29 16 29 32 0 15-8 31-29 31H55zm270-14a65 65 0 00-52-23c-46 0-78 34-78 85s32 86 78 86c20 0 40-9 52-25v21h51V89h-51v19zm-40 100c-22 0-38-18-38-38 0-21 16-38 38-38 21 0 38 17 38 38 0 20-17 38-38 38zM522 85c-16 0-38 6-50 22V0h-52v252h52v-18c12 15 34 22 50 22 41 0 80-33 80-86s-39-85-80-85zm-10 123c-20 0-38-17-38-38s18-38 38-38 37 17 37 38-17 38-37 38zM662 64c18 0 32-13 32-30S680 4 662 4c-17 0-32 13-32 30s15 30 32 30zm26 188V89h-52v163h52zm123 4c47 0 89-34 89-86 0-51-42-85-89-85s-89 34-89 85c0 52 42 86 89 86zm0-48c-20 0-36-15-36-38 0-22 16-38 36-38s36 16 36 38c0 23-16 38-36 38z"
                  fill="currentColor"
                />
              </svg>
            ),
            url: "/projects/tags/pabio",
            description:
              "Personalized interior design and high-quality furniture rental on a monthly subscription basis in Europe, enabling customers to furnish their homes affordably and flexibly.",
          },
          {
            label: "Oswald Labs",
            years: [2016, 2019],
            color: "#007bff",
            icon: (
              <svg viewBox="0 0 116 116">
                <g fill="currentColor" fillRule="evenodd">
                  <path d="M58 116A58 58 0 1 1 58 0a58 58 0 0 1 0 116zm1-11a47 47 0 1 0 0-95 47 47 0 0 0 0 95z" />
                  <circle cx="58.5" cy="57.5" r="35.5" />
                </g>
              </svg>
            ),
            url: "/projects/tags/oswald-labs",
            description:
              "Award-winning accessibility technology company that builds products and platforms to promote digital inclusion for people with disabilities, like web accessibility tools.",
          },
          {
            label: "Melangebox",
            years: [2018, 2019],
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
            url: "/projects/2017/melangebox",
            description:
              "Sustainable fashion brand and ecommerce tech company offering affordable, high-quality apparel and lifestyle products, with a focus on eco-friendly practices and inclusivity.",
          },
          {
            label: "Class Rebels",
            color: "#00c3a0",
            years: [2014, 2016],
            icon: (
              <svg viewBox="0 0 256 256">
                <path
                  fillRule="evenodd"
                  fill="currentColor"
                  d="M87 0h86c-3 8-6 15-11 22l-26 1v66c16-8 33-13 51-15 16-3 32 0 47 8 6 7 11 16 13 26v30l-7 31c-4 8-8 16-13 22-12 7-24 7-36 0v1l27 31 1 33h-4l-67-85c4-7 9-12 15-16l14 8c33 18 46 8 39-29-5-29-22-40-50-35-11 3-21 7-30 12l-1 127c-8 5-14 11-20 18h-3l-1-90c-18 15-37 26-59 34-25 6-39-3-44-27v-42c6-35 26-53 60-54 15 0 29 3 43 9l1-63H75l2-7L87 0ZM70 102c14-1 28 1 42 5l-1 39c-16 13-34 23-53 30-18 5-27-1-27-18 0-14 3-28 10-42 8-9 17-14 29-14Z"
                />
              </svg>
            ),
            url: "/projects/2014/classrebels",
            description:
              "Edtech platform that aimed to connect students and teachers online, enabling remote class communication, updates on activities, and access to course and peer performance information.",
          },
        ].map((about) => (
          <li
            key={about.label}
            className="rounded-xl shadow-xs p-2 bg-background flex items-center justify-center text-white"
            style={{ backgroundColor: about.color }}
          >
            {about.icon}
          </li>
        ))}
      </ul>
    </GenericSectionContainer>
  );
}
