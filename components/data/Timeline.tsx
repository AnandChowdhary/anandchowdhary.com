import { ComponentChildren, FunctionComponent } from "preact";
import smartquotes from "https://esm.sh/smartquotes-ts@0.0.2";
import Filters from "../../islands/Filters.tsx";
import { categoryData } from "../../utils/data.ts";
import { t } from "../../utils/i18n.tsx";
import type { Timeline as ITimeline } from "../../utils/interfaces.ts";
import { humanizeMmSs } from "../../utils/string.ts";

export const Timeline: FunctionComponent<{
  timeline: ITimeline;
  query: string;
  hideYearHeading?: boolean;
  maxItems?: number;
  selected?: string[];
}> = ({ timeline, hideYearHeading, query, selected, maxItems }) => {
  selected ??= Object.keys(categoryData);
  try {
    const parsed = new URLSearchParams(query).get("filters")?.split(",");
    if (parsed && parsed.filter((item) => item !== "").length > 0)
      selected = parsed;
  } catch (error) {
    // Ignore errors
  }

  const items = timeline.filter(({ type }) => selected?.includes(type));
  const hasMore = maxItems && items.length > maxItems;
  const visible = maxItems ? items.slice(0, maxItems) : items;

  if (timeline.length === 0)
    return (
      <div className="text-center text-lg text-gray-400 py-8">
        <p>No items found</p>
      </div>
    );

  return (
    <div>
      <Filters
        categoryData={categoryData}
        selected={selected}
        options={Object.keys(categoryData).filter((key) =>
          timeline.find(({ type }) => type === key)
        )}
      />
      <div className="relative space-y-8">
        <div className="absolute top-0 w-1 bg-orange-200 bottom-6 left-4" />
        {visible.map((item, index) => (
          <div key={item.title}>
            {(index === 0 ||
              new Date(item.date).getFullYear() !==
                new Date(visible[index - 1].date).getFullYear()) &&
              !hideYearHeading && (
                <div className={`flex flex-grow ${index > 0 && "pt-6"}`}>
                  <div className="shrink-0" style={{ minWidth: "3rem" }}>
                    <div className="relative w-5 h-5 ml-2 bg-orange-600 border-4 rounded-full border-orange-50" />
                  </div>
                  <div>
                    <h3 className="mb-6 text-xl font-semibold">
                      {new Date(item.date).getFullYear()}
                    </h3>
                  </div>
                </div>
              )}
            <article className="sm:flex">
              <div className="flex flex-grow">
                <div className="shrink-0" style={{ minWidth: "3rem" }}>
                  <div>
                    <div
                      className={`relative flex items-center justify-center text-center text-white border-4 rounded-full h-9 w-9 border-orange-50`}
                      style={{
                        backgroundColor: categoryData[item.type].color,
                      }}
                    >
                      <svg aria-hidden="true" width="1em" height="1em">
                        <use href={`#${categoryData[item.type].icon}`}></use>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex-grow space-y-1">
                  <div className="text-gray-500">
                    <span>
                      <span style={{ color: categoryData[item.type].color }}>
                        {categoryData[item.type].prefix}
                      </span>
                      {` on ${new Date(item.date).toLocaleDateString("en-US", {
                        dateStyle: "long",
                      })}`}
                    </span>
                  </div>
                  <h4 className="text-lg font-medium leading-6">
                    {smartquotes(item.title)}
                  </h4>
                  {/* {"href" in item && item.href ? (
              <h4 className="text-lg font-medium leading-6">
                {item.href.startsWith("http") ? (
                  <ExternalLink href={item.href}>
                    {item.title}
                  </ExternalLink>
                ) : (
                  <a href="item.href">{item.title}</a>
                )}
              </h4>
            ) : (
              <h4 className="text-lg font-medium leading-6">
                {item.title}
              </h4>
            )} */}
                  {item.data?.authors && (
                    <p>{smartquotes(`by ${item.data.authors.join(", ")}`)}</p>
                  )}
                  {item.data?.words && (
                    <p className="text-gray-500">
                      {smartquotes(
                        `Reading time: ${humanizeMmSs(
                          String(item.data.words / 250)
                        )}`
                      )}
                    </p>
                  )}
                  {item.data?.emoji && item.data?.location && (
                    <p className="text-gray-500">
                      <span className="mr-1">{item.data.emoji}</span>
                      <span>{smartquotes(` ${item.data.location}`)}</span>
                    </p>
                  )}
                  {item.data?.publisher && (
                    <p className="text-gray-500">
                      {smartquotes(item.data.publisher)}
                    </p>
                  )}
                  {item.type === "press-feature" && (
                    <p className="flex items-center space-x-2 text-gray-500">
                      {item.url && (
                        <img
                          alt=""
                          src={`https://images.weserv.nl/?&maxage=1y&url=${encodeURIComponent(
                            `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${encodeURIComponent(
                              item.url
                            )}&size=128`
                          )}&w=48&h=48&fit=cover&bg=white`}
                          loading="lazy"
                          width={24}
                          height={24}
                          className="w-6 h-6 rounded-full"
                        />
                      )}
                      {item.data?.author && (
                        <span>
                          {t(
                            `${
                              item.data.author
                                ? `by <0>${item.data.author}</0> for `
                                : ""
                            } ${item.data.publisher}`.trim(),
                            {},
                            [
                              ({
                                children,
                              }: {
                                children: ComponentChildren;
                              }) => (
                                <strong
                                  key={0}
                                  children={children}
                                  className="font-medium"
                                />
                              ),
                            ]
                          )}
                        </span>
                      )}
                    </p>
                  )}
                  {item.type === "award" && item.data?.publisher && (
                    <p className="text-gray-500">
                      {smartquotes(`Awarded by ${item.data.publisher}`)}
                    </p>
                  )}
                  {item.type === "video" && (
                    <ul className="text-gray-500">
                      {item.data?.publisher && item.data?.city && (
                        <li>
                          {smartquotes(
                            `${item.data.publisher}, ${item.data.city}`
                          )}
                        </li>
                      )}
                      {item.data?.duration && (
                        <li>
                          {smartquotes(
                            `Watch time: ${humanizeMmSs(item.data.duration)}`
                          )}
                        </li>
                      )}
                    </ul>
                  )}
                  {item.description && (
                    <p className="text-gray-500">
                      {smartquotes(item.description)}
                    </p>
                  )}
                  {item.type === "open-source-project" && (
                    <ul className="flex space-x-4">
                      {item.data?.language && item.data?.languageColor && (
                        <li className="flex flex-wrap items-center space-x-1">
                          <svg
                            aria-hidden="true"
                            width="1em"
                            height="1em"
                            style={{
                              color: item.data.languageColor ?? "#aaa",
                            }}
                          >
                            <use href="#circle"></use>
                          </svg>
                          <span>{smartquotes(item.data.language)}</span>
                        </li>
                      )}
                      {item.data?.stars && (
                        <li className="flex flex-wrap items-center space-x-1">
                          <svg aria-hidden="true" width="1em" height="1em">
                            <use href="#star"></use>
                          </svg>
                          <span>
                            {t(
                              `<0>${item.data.stars.toLocaleString()}</0> stars`,
                              {},
                              [
                                ({
                                  children,
                                }: {
                                  children: ComponentChildren;
                                }) => (
                                  <strong
                                    className="font-medium"
                                    children={children}
                                  />
                                ),
                              ]
                            )}
                          </span>
                        </li>
                      )}
                      {item.data?.watchers && (
                        <li className="flex flex-wrap items-center space-x-1">
                          <svg aria-hidden="true" width="1em" height="1em">
                            <use href="#watchers"></use>
                          </svg>
                          <span>
                            {t(
                              `<0>${item.data.watchers.toLocaleString()}</0> watchers`,
                              {},
                              [
                                ({
                                  children,
                                }: {
                                  children: ComponentChildren;
                                }) => (
                                  <strong
                                    className="font-medium"
                                    children={children}
                                  />
                                ),
                              ]
                            )}
                          </span>
                        </li>
                      )}
                      {item.data?.forks && (
                        <li className="flex flex-wrap items-center space-x-1">
                          <svg aria-hidden="true" width="1em" height="1em">
                            <use href="#forks"></use>
                          </svg>
                          <span>
                            {t(
                              `<0>${item.data.forks.toLocaleString()}</0> forks`,
                              {},
                              [
                                ({
                                  children,
                                }: {
                                  children: ComponentChildren;
                                }) => (
                                  <strong
                                    className="font-medium"
                                    children={children}
                                  />
                                ),
                              ]
                            )}
                          </span>
                        </li>
                      )}
                    </ul>
                  )}
                  {item.type === "podcast-interview" && item.data?.embed && (
                    <div className="pt-2">
                      <iframe
                        src={item.data.embed}
                        loading="lazy"
                        scrolling="no"
                        className="w-full overflow-hidden rounded-lg"
                        style={{ height: "152px" }}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4 ml-12 sm:mt-0 sm:ml-6 shrink-0">
                {item.type === "book" && item.data?.image ? (
                  <img
                    alt=""
                    src={`https://images.weserv.nl/?&maxage=1y&url=${encodeURIComponent(
                      item.data.image.split("//")[1]
                    )}&w=300&h=450&fit=cover`}
                    loading="lazy"
                    width={300}
                    height={450}
                    className="w-24 rounded-lg shadow"
                  />
                ) : (
                  item.type === "video" &&
                  item.data?.img && (
                    <div className="relative">
                      <svg
                        aria-hidden="true"
                        width="2rem"
                        height="2rem"
                        className="absolute text-white -translate-x-1/2 -translate-y-1/2 drop-shadow left-1/2 top-1/2"
                      >
                        <use href="#triangle"></use>
                      </svg>
                      <img
                        alt=""
                        src={`https://images.weserv.nl/?&maxage=1y&url=${encodeURIComponent(
                          item.data.img.split("//")[1]
                        )}&w=700&h=370&fit=cover`}
                        loading="lazy"
                        width={512}
                        height={370}
                        className="w-full rounded-lg sm:w-64"
                      />
                    </div>
                  )
                )}
              </div>
            </article>
          </div>
        ))}
        {hasMore && (
          <div className="pt-4 flex">
            <a
              href={`/archive`}
              className="bg-white shadow rounded py-2 pr-4 flex relative rounded-full text-sm items-center"
            >
              <span className="w-9 text-center text-lg">↓</span>
              <span>View older entries</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
