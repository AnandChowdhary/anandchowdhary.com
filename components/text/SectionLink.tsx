/** @jsx h */
import { h, FunctionComponent } from "preact";
import { tw } from "@twind";

export const SectionLink: FunctionComponent<{
  label: string;
  href: string;
}> = ({ label, href }) => {
  return (
    <a
      href={href}
      className={tw`inline-flex items-center space-x-1 font-medium text-gray-800 transition hover:text-gray-500 group`}
    >
      <span>{label}</span>
      <svg
        aria-hidden="true"
        width="1rem"
        height="1rem"
        className={tw`text-gray-600 transition group-hover:ml-2`}
        transform="rotate(-90)"
      >
        <use href="#chevron"></use>
      </svg>
    </a>
  );
};
