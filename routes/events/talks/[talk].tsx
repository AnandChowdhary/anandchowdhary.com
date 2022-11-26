import { Handlers, PageProps } from "$fresh/server.ts";

interface TalkData {
  //
}

export const handler: Handlers<TalkData> = {
  async GET(request, context) {
    const props = {};
    return context.render(props);
  },
};

export default function Archive({ data }: PageProps<TalkData>) {
  const {} = data;
  return (
    <div class="max-w-screen-md px-4 mx-auto space-y-12 md:px-0">
      <section className="space-y-4">
        <h1 class="font-semibold text-3xl">Talk</h1>
      </section>
    </div>
  );
}
