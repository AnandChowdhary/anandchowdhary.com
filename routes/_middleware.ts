import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { Timeline } from "https://esm.sh/timeline-types@9.0.0/index.d.ts";
import { fetchJson } from "../utils/data.tsx";

interface State {}

export async function handler(
  request: Request,
  context: MiddlewareHandlerContext<State>
) {
  const resp = await context.next();
  if (resp.status === 404) {
    console.log("got here");
    const url = new URL(request.url);
    console.log(url.pathname);
    const timeline = await fetchJson<Timeline>(
      "https://anandchowdhary.github.io/everything/api.json"
    );
    const foundExact = timeline.find(
      (item) => new URL(item.url).pathname === url.pathname
    );
    if (foundExact) return Response.redirect(foundExact.url, 301);
    const foundFuzzy = timeline.find((item) =>
      item.url.endsWith(url.pathname.split("/").pop())
    );
    if (foundFuzzy) return Response.redirect(foundFuzzy.url, 301);
    return context.renderNotFound();
  }
  return resp;
}
