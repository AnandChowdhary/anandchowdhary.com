import IconSquare from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/square.tsx";
import IconSquareCheck from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/square-check.tsx";

export default function Filters({
  categoryData,
  selected,
  options,
}: {
  selected: string[];
  options: string[];
  categoryData: Record<
    string,
    { color: string; prefix: string; title: string }
  >;
}) {
  const updateChangelog = (event: Event) => {
    event.preventDefault();
    const filters = document.querySelectorAll<HTMLInputElement>(
      "#filters input[type='checkbox']"
    );
    const checked: string[] = [];
    filters.forEach((filter) => {
      if (filter.checked) checked.push(filter.getAttribute("name") ?? "");
    });
    const finalUrl = new URL(window.location.href);
    finalUrl.searchParams.set("filters", checked.join(","));
    if (checked.length === 0) finalUrl.searchParams.delete("filters");
    // finalUrl.hash = "filters";
    window.location.href = finalUrl.toString();
  };

  return (
    <form
      id="filters"
      class="flex flex-wrap text-sm"
      onSubmit={(event) => updateChangelog(event)}
    >
      {Object.entries(categoryData)
        .filter(([key]) => options.includes(key))
        .map(([key, { title }]) => {
          const checked = selected.includes(key);

          return (
            <label
              key={key}
              class="shadow-sm px-2 py-1 mr-2 mb-2 bg-white rounded flex items-center"
            >
              <span class="w-5 h-5 relative" aria-hidden="true">
                <IconSquare
                  class="w-5 h-5 absolute left-0 top-0 transition text-gray-500"
                  style={{ opacity: checked ? 0 : 1 }}
                />
                <IconSquareCheck
                  class="w-5 h-5 absolute left-0 top-0 transition text-gray-500"
                  style={{ opacity: checked ? 1 : 0 }}
                />
              </span>
              <input
                name={key}
                type="checkbox"
                checked={checked}
                onClick={(event) => updateChangelog(event)}
                class="sr-only"
              />
              <span class="ml-1">{title}</span>
            </label>
          );
        })}
      <button type="submit" class="sr-only">
        Submit
      </button>
    </form>
  );
}
