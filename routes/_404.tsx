import { UnknownPageProps } from "$fresh/server.ts";

export default function NotFoundPage({ url }: UnknownPageProps) {
  return <p class="text-center">404 Not Found: {url.pathname}</p>;
}
