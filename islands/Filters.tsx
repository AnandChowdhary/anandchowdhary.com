export default function Filters({
  categoryData,
  selected,
}: {
  selected: string[];
  categoryData: Record<
    string,
    { color: string; icon: string; prefix: string; title: string; url: string }
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
    finalUrl.hash = "filters";
    window.location.href = finalUrl.toString();
  };

  return (
    <form
      id="filters"
      className="flex flex-wrap text-sm"
      onSubmit={(event) => updateChangelog(event)}
    >
      {Object.entries(categoryData).map(([key, { title }]) => (
        <label
          key={key}
          className="shadow-sm px-2 py-1 mr-2 mb-2 bg-white rounded"
        >
          <input
            name={key}
            type="checkbox"
            checked={selected.includes(key)}
            onClick={(event) => updateChangelog(event)}
          />
          <span className="ml-2">{title}</span>
        </label>
      ))}
      <button type="submit" className="sr-only">
        Submit
      </button>
    </form>
  );
}
