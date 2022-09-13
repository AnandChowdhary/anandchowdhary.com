import type { FunctionComponent } from "preact";
import { ExternalLink } from "../text/ExternalLink.tsx";
import TimeAgo from "../../islands/TimeAgo.tsx";

export const DataFooterLinks: FunctionComponent<{
  updatedAt?: string;
  apiUrl: string;
  githubUrl: string;
  links?: { label: string; href: string }[];
}> = ({ links, updatedAt, apiUrl, githubUrl }) => {
  return (
    <footer className="flex space-x-4 text-sm">
      {links?.map(({ label, href }) => (
        <div key={href}>
          <a href={href} className="underline">
            {label}
          </a>
        </div>
      ))}
      <div>
        <ExternalLink href={apiUrl} className="underline">
          API
        </ExternalLink>
      </div>
      <div>
        <ExternalLink href={githubUrl} className="underline">
          GitHub
        </ExternalLink>
      </div>
      {updatedAt && (
        <div className="flex space-x-1">
          <p className="text-gray-500">{"Last updated "}</p>
          <TimeAgo date={updatedAt} />
        </div>
      )}
    </footer>
  );
};
