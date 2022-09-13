export default function Filters({
  categoryData,
}: {
  categoryData: Record<
    string,
    { color: string; icon: string; prefix: string; title: string }
  >;
}) {
  const updateChangelog = (event: Event) => {
    event.preventDefault();
    const filters = document.querySelectorAll<HTMLInputElement>(
      "#changelog-filters input[type='checkbox']"
    );
    const checked: string[] = [];
    filters.forEach((filter) => {
      if (filter.checked) checked.push(filter.getAttribute("name") ?? "");
    });
    const params = new URLSearchParams();
    params.set("filters", checked.join(","));
    window.location.href = `/?${params.toString()}#changelog`;
  };

  return (
    <form
      id="changelog-filters"
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
            onClick={(event) => updateChangelog(event)}
          />
          <span className="ml-2">{title}</span>
        </label>
      ))}
    </form>
  );
}
