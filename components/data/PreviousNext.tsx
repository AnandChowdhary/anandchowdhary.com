import type { TimeLineItem } from "https://esm.sh/timeline-types@7.0.0/index.d.ts";

export function PreviousNext({
  type,
  previous,
  next,
}: {
  type: string;
  previous?: TimeLineItem;
  next?: TimeLineItem;
}) {
  return (
    <footer className="grid gap-4 mt-8 md:grid-cols-2">
      {previous && (
        <div>
          <div>&larr; Previous {type}</div>
          <div className="font-medium">
            <a href={new URL(previous.url).pathname}>{previous.title}</a>
          </div>
          <div className="text-gray-500">
            {new Date(previous.date).toLocaleDateString("en-US", {
              dateStyle: "long",
            })}
          </div>
        </div>
      )}
      {next && (
        <div className="text-right">
          <div>Next {type} &rarr;</div>
          <div className="font-medium">
            <a href={new URL(next.url).pathname}>{next.title}</a>
          </div>
          <div className="text-gray-500">
            {new Date(next.date).toLocaleDateString("en-US", {
              dateStyle: "long",
            })}
          </div>
        </div>
      )}
    </footer>
  );
}
