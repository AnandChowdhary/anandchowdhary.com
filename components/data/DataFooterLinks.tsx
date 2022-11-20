import type { FunctionComponent } from "preact";
import { ExternalLink } from "../text/ExternalLink.tsx";
import TimeAgo from "../../islands/TimeAgo.tsx";

export const DataFooterLinks: FunctionComponent<{
  updatedAt?: string;
  apiUrl: string;
  githubUrl: string;
}> = ({ updatedAt, apiUrl, githubUrl }) => {
  return (
    <footer class="flex space-x-4 text-sm">
      <div>
        <ExternalLink href={apiUrl} class="underline">
          API
        </ExternalLink>
      </div>
      <div>
        <ExternalLink href={githubUrl} class="underline">
          GitHub
        </ExternalLink>
      </div>
      {updatedAt && (
        <div class="flex space-x-1">
          <p class="text-gray-500">{"Last updated "}</p>
          <TimeAgo date={updatedAt} />
        </div>
      )}
    </footer>
  );
};
