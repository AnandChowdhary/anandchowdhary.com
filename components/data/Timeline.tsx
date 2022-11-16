import smartquotes from "https://esm.sh/smartquotes-ts@0.0.2";
import { ComponentChildren, FunctionComponent } from "preact";
import Filters from "../../islands/Filters.tsx";
import { categoryData } from "../../utils/data.tsx";
import { getFlagUrl, imageUrl } from "../../utils/urls.ts";
import { t } from "../../utils/i18n.tsx";
import type { Timeline as ITimeline } from "../../utils/interfaces.ts";
import { render } from "../../utils/markdown.ts";
import { humanizeMmSs } from "../../utils/string.ts";

export const Timeline: FunctionComponent<{
  timeline: ITimeline;
  query: string;
  hideYearHeading?: boolean;
  maxItems?: number;
  selected?: string[];
  hasMoreHref?: string;
  hasMoreLabel?: string;
  hideFilters?: boolean;
}> = ({
  timeline,
  hideYearHeading,
  query,
  selected,
  maxItems,
  hasMoreHref,
  hasMoreLabel,
  hideFilters,
}) => {
  selected ??= Object.keys(categoryData);
  try {
    const parsed = new URLSearchParams(query).get("filters")?.split(",");
    if (parsed && parsed.filter((item) => item !== "").length > 0)
      selected = parsed;
  } catch (error) {
    // Ignore errors
  }

  const items = timeline.filter(({ type }) => selected?.includes(type));
  const visible = maxItems ? items.slice(0, maxItems) : items;

  if (timeline.length === 0)
    return (
      <div className="text-center text-lg text-gray-400 py-8">
        <p>No items found</p>
      </div>
    );

  return (
    <div>
      {!hideFilters && (
        <Filters
          categoryData={categoryData}
          selected={selected}
          options={Object.keys(categoryData).filter((key) =>
            timeline.find(({ type }) => type === key)
          )}
        />
      )}
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
                      className={`relative flex items-center justify-center text-center text-white border-4 rounded-full h-9 w-9 border-orange-50 bg-white`}
                      style={{ backgroundColor: categoryData[item.type].color }}
                    >
                      {categoryData[item.type].icon}
                    </div>
                  </div>
                </div>
                <div className="flex-grow">
                  <div class="grid md:grid-cols-5 gap-8">
                    <div class="col-span-3 space-y-2">
                      <div className="text-gray-500">
                        <span>
                          <span
                            style={{ color: categoryData[item.type].color }}
                          >
                            {categoryData[item.type].prefix}
                          </span>
                          {` on ${new Date(item.date).toLocaleDateString(
                            "en-US",
                            {
                              dateStyle: "long",
                            }
                          )}`}
                        </span>
                      </div>
                      {"url" in item &&
                      item.url &&
                      item.url.startsWith("https://anandchowdhary.com/") &&
                      item.type !== "life-event" ? (
                        <h4 className="text-lg font-medium leading-6">
                          <h4 className="text-lg font-medium leading-6">
                            <a href={new URL(item.url).pathname}>
                              {item.type === "travel"
                                ? smartquotes(item.data?.label ?? item.title)
                                : smartquotes(item.title)}
                            </a>
                          </h4>
                        </h4>
                      ) : (
                        <h4 className="text-lg font-medium leading-6">
                          {smartquotes(item.title)}
                        </h4>
                      )}
                      {item.type === "travel" &&
                        item.data?.country &&
                        typeof item.data.country === "object" && (
                          <div class="flex items-start space-x-2 text-gray-500">
                            <img
                              alt=""
                              src={getFlagUrl(item.data.country.code)}
                              class="rounded-sm mt-1.5"
                            />
                            <p>
                              {item.data.country.name
                                .replace(" of America", "")
                                .replace("Netherlands", "The Netherlands")}
                            </p>
                          </div>
                        )}
                      {item.data?.authors && (
                        <p>
                          {smartquotes(`by ${item.data.authors.join(", ")}`)}
                        </p>
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
                      {item.data?.country &&
                        item.data?.location &&
                        typeof item.data.country === "string" && (
                          <div class="flex items-start space-x-2 text-gray-500">
                            <img
                              alt=""
                              src={getFlagUrl(item.data.country)}
                              class="rounded-sm mt-1.5"
                            />
                            <p>{item.data.location}</p>
                          </div>
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
                              src={imageUrl(
                                `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${encodeURIComponent(
                                  new URL(item.url).hostname
                                )}&size=128`,
                                { w: "48", h: "48", fit: "cover", bg: "white" }
                              )}
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
                                `Watch time: ${humanizeMmSs(
                                  item.data.duration
                                )}`
                              )}
                            </li>
                          )}
                        </ul>
                      )}
                      {"data" in item &&
                        item.data &&
                        "excerpt" in item.data &&
                        item.data.excerpt && (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: render(item.data.excerpt),
                            }}
                          />
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
                    <div class="col-span-2 flex justify-end items-start">
                      {item.type === "okr" ? (
                        <img
                          alt=""
                          src={imageUrl(
                            `https://raw.githubusercontent.com/AnandChowdhary/okrs/main/assets/${item.url
                              .split("/")
                              .reverse()
                              .join("/")
                              .substring(0, 6)
                              .split("/")
                              .reverse()
                              .join("-")}.png`,
                            { w: "512", h: "256", fit: "cover" }
                          )}
                          loading="lazy"
                          width={512}
                          height={256}
                          className="w-full rounded-lg shadow"
                        />
                      ) : item.type === "blog-post" ? (
                        <img
                          alt=""
                          src={imageUrl(
                            `https://anandchowdhary.github.io/blog/assets/${item.url
                              .split("/")
                              .pop()}.png`,
                            { w: "512", h: "256", fit: "cover" }
                          )}
                          loading="lazy"
                          width={512}
                          height={256}
                          className="w-full rounded-lg shadow"
                        />
                      ) : item.type === "book" && item.data?.image ? (
                        <div
                          class="rounded-lg w-full bg-cover bg-center bg-no-repeat flex justify-center"
                          style={{
                            backgroundImage: `url(${imageUrl(
                              item.data.image.split("//")[1],
                              { w: "300", h: "450", fit: "cover", blur: "15" }
                            )})`,
                          }}
                        >
                          <img
                            alt=""
                            src={imageUrl(item.data.image.split("//")[1], {
                              w: "300",
                              h: "450",
                              fit: "cover",
                            })}
                            loading="lazy"
                            width={300}
                            height={450}
                            className="w-24 block"
                          />
                        </div>
                      ) : item.type === "event" && item.data?.coordinates ? (
                        <img
                          alt=""
                          src={`https://api.mapbox.com/styles/v1/anandchowdhary/cl91jzd61002q14pm7vtwfa2l/static/${item.data?.coordinates
                            .reverse()
                            .join()},13/512x256?access_token=pk.eyJ1IjoiYW5hbmRjaG93ZGhhcnkiLCJhIjoiY2w5MWpxbXZ2MDdpMzN2bW92ZnRzZ2Q4bSJ9.WMWxq61EUjQfWtntvGGNKQ`}
                          loading="lazy"
                          width={512}
                          height={256}
                          className="w-full rounded-lg shadow"
                        />
                      ) : item.type === "travel" &&
                        item.data?.approximateCoordinates ? (
                        <img
                          alt=""
                          src={`https://api.mapbox.com/styles/v1/anandchowdhary/cl91jzd61002q14pm7vtwfa2l/static/${item.data?.approximateCoordinates
                            .reverse()
                            .join()},9/512x256?access_token=pk.eyJ1IjoiYW5hbmRjaG93ZGhhcnkiLCJhIjoiY2w5MWpxbXZ2MDdpMzN2bW92ZnRzZ2Q4bSJ9.WMWxq61EUjQfWtntvGGNKQ`}
                          loading="lazy"
                          width={512}
                          height={256}
                          className="w-full rounded-lg shadow"
                        />
                      ) : (
                        item.type === "video" &&
                        item.data?.img && (
                          <div className="relative w-full">
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
                              src={imageUrl(item.data.img.split("//")[1], {
                                w: "512",
                                h: "256",
                                fit: "cover",
                              })}
                              loading="lazy"
                              width={512}
                              height={256}
                              className="w-full rounded-lg"
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        ))}
        {hasMoreHref && (
          <div className="pt-4 flex">
            <a
              href={
                hasMoreHref === "special://last-archive-year"
                  ? `/archive/${new Date(
                      [...visible].pop()?.date ?? 0
                    ).getUTCFullYear()}`
                  : hasMoreHref
              }
              className="bg-white shadow rounded py-2 pr-4 flex relative rounded-full text-sm items-center no-underline opacity-100"
            >
              <span className="w-9 text-center text-lg">↓</span>
              <span>{hasMoreLabel ?? "View older entries"}</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
