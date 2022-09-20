import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(request, context) {
    const response = await context.render();
    return response;
  },
};
