import { useState } from "preact/hooks";
import { LoadError } from "../components/text/LoadError.tsx";
import IconSearch from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/search.tsx";

export default function Search() {
  const [results, setResults] = useState<{
    items: {
      git_url: string;
      html_url: string;
      name: string;
      path: string;
      repository: { full_name: string };
    }[];
  }>({ items: [] });
  const [hasError, setHasError] = useState<boolean>(false);
  const [controller, setController] = useState<AbortController>(
    new AbortController()
  );

  return (
    <div class="flex">
      <button class="text-gray-500">
        <IconSearch class="h-5 w-5" />
        <span class="sr-only">Search</span>
      </button>
      <div class="shadow-lg rounded-lg overflow-hidden absolute right-10 -top-2">
        <input
          type="search"
          placeholder="Search for anything..."
          class="bg-white py-2 px-4 w-96"
          defaultValue={"Hello"}
          onInput={(e) => {
            if (controller) controller.abort();
            const newController = new AbortController();
            setController(newController);
            fetch(
              `https://api.github.com/search/code?q=${encodeURIComponent(
                `user:AnandChowdhary language:markdown ${
                  Object(e.target).value
                }`
              )}`,
              { signal: newController.signal }
            )
              .then((response) => {
                setHasError(false);
                if (!response.ok) throw new Error("Not OK");
                return response;
              })
              .then((response) => response.json())
              .then((json) => setResults(json))
              .catch((error) => {
                console.log(error);
                setHasError(true);
              });
          }}
        />
        {hasError ? (
          <div class="bg-white text-center py-5">
            <LoadError items="search results" />
          </div>
        ) : (
          <ul class="bg-white max-h-64 overflow-auto">
            {results.items
              .filter((result) =>
                [
                  "AnandChowdhary/blog",
                  "AnandChowdhary/events",
                  "AnandChowdhary/projects",
                ].includes(result.repository.full_name)
              )
              .map((result) => (
                <li
                  key={result.html_url}
                  class="block px-3 py-2 border-t hover:bg-gray-100 relative"
                >
                  <div class="text-sm text-gray-500">{`${result.repository.full_name
                    .split("/")
                    .pop()} ›`}</div>
                  <a
                    href={`/${result.repository.full_name
                      .split("/")
                      .pop()}/${result.path
                      .split("/")
                      .slice(1)
                      .join("/")
                      .replace(".md", "")}`}
                  >
                    {result.name}
                  </a>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
