import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(_, context) {
    return new Response("", {
      status: 301,
      headers: { Location: `/versions/${context.params.version}` },
    });
  },
};
