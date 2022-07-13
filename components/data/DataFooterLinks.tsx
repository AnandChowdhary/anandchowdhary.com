/** @jsx h */
import { h } from "preact";
import type { FunctionComponent } from "preact";
import { tw } from "@twind";
import { ExternalLink } from "../text/ExternalLink.tsx";
import TimeAgo from "../../islands/TimeAgo.tsx";

export const DataFooterLinks: FunctionComponent<{
  updatedAt?: string;
  apiUrl: string;
  githubUrl: string;
  links?: { label: string; href: string }[];
}> = ({ links, updatedAt, apiUrl, githubUrl }) => {
  return (
    <footer className={tw`flex space-x-4 text-sm`}>
      {links?.map(({ label, href }) => (
        <div key={href}>
          <a href={href} className={tw`underline`}>
            {label}
          </a>
        </div>
      ))}
      <div>
        <ExternalLink href={apiUrl} className={tw`underline`}>
          API
        </ExternalLink>
      </div>
      <div>
        <ExternalLink href={githubUrl} className={tw`underline`}>
          GitHub
        </ExternalLink>
      </div>
      {updatedAt && (
        <div className={tw`flex space-x-1`}>
          <p className={tw`text-gray-500`}>{"Last updated "}</p>
          <TimeAgo date={updatedAt} />
        </div>
      )}
    </footer>
  );
};
