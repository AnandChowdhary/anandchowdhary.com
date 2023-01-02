import { Handlers } from "https://deno.land/x/fresh@1.1.1/server.ts";
import { Timeline } from "https://esm.sh/timeline-types@9.0.0/index.d.ts";
import { fetchJson } from "../../utils/data.tsx";

export const handler: Handlers = {
  async GET(_, context) {
    const timeline = await fetchJson<Timeline>(
      "https://anandchowdhary.github.io/everything/api.json"
    );
    const found = timeline.find((item) =>
      item.url.endsWith(context.params.path)
    );
    return Response.redirect(found?.url ?? "/");
  },
};
