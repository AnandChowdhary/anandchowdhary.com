import { slugify } from "https://deno.land/x/slugify@0.3.0/mod.ts";
import smartQuotes from "https://esm.sh/smartquotes-ts@0.0.2";
import type {
  TimelineAward,
  TimelineBlogPost,
  TimelineBook,
  TimelineEvent,
  TimelineLifeEvent,
  TimelineOkr,
  TimelineOpenSourceProject,
  TimelinePodcastInterview,
  TimelinePressFeature,
  TimelineProject,
  TimelineTheme,
  TimelineTravel,
  TimelineVersion,
  TimelineVideo,
} from "https://esm.sh/timeline-types@3.0.0/index.d.ts";
import type { ComponentChildren, FunctionalComponent } from "preact";
import { Fragment } from "preact";
import { t } from "../../../utils/i18n.tsx";
import { render } from "../../../utils/markdown.ts";
import { countryName, humanizeMmSs } from "../../../utils/string.ts";
import { getFlagUrl } from "../../../utils/urls.ts";
import { OKRCards } from "../OKRs.tsx";

export const TimelineAwardContent: FunctionalComponent<{
  item: TimelineAward;
}> = ({ item }) => (
  <p className="text-gray-500">
    {smartQuotes(`Awarded by ${item.data.publisher}`)}
  </p>
);

export const TimelineBlogPostContent: FunctionalComponent<{
  item: TimelineBlogPost;
}> = ({ item }) => (
  <Fragment>
    <p className="text-gray-500">
      {smartQuotes(
        `Reading time: ${humanizeMmSs(String(item.data.words / 250))}`
      )}
    </p>
    {item.data.excerpt && (
      <div
        dangerouslySetInnerHTML={{
          __html: render(item.data.excerpt),
        }}
      />
    )}
  </Fragment>
);

export const TimelineBookContent: FunctionalComponent<{
  item: TimelineBook;
}> = ({ item }) => (
  <p>
    by{" "}
    <span class="space-x-2">
      {item.data.authors.map((author) => (
        <a
          key={author}
          href={`/books/authors/${slugify(author, { lower: true })}`}
        >
          {author}
        </a>
      ))}
    </span>
  </p>
);

export const TimelineEventContent: FunctionalComponent<{
  item: TimelineEvent;
}> = ({ item }) => (
  <div class="flex items-start space-x-2 text-gray-500">
    <img alt="" src={getFlagUrl(item.data.country)} class="rounded-sm mt-1.5" />
    <p>{item.data.location}</p>
  </div>
);

export const TimelineLifeEventContent: FunctionalComponent<{
  item: TimelineLifeEvent;
}> = ({ item }) =>
  item.data.description ? (
    <p className="text-gray-500">{smartQuotes(item.data.description)}</p>
  ) : null;

export const TimelineOkrContent: FunctionalComponent<{
  item: TimelineOkr;
}> = ({ item }) => (
  <div class="pt-2">
    <OKRCards okr={item} />
  </div>
);

export const TimelineOpenSourceProjectContent: FunctionalComponent<{
  item: TimelineOpenSourceProject;
}> = ({ item }) => (
  <Fragment>
    {item.data.description && (
      <p className="text-gray-500">
        {smartQuotes(item.data.description.replace(/\p{Emoji}+/gu, "").trim())}
      </p>
    )}
    {item.data.topics.length > 0 && (
      <ul class="flex flex-wrap -ml-0.5">
        {item.data.topics.map((topic) => (
          <li key={topic}>
            <a
              href={`/projects/tags/${slugify(topic, { lower: true })}`}
              class="bg-white px-3 py-1 rounded-full border m-0.5 flex text-sm"
            >
              {topic}
            </a>
          </li>
        ))}
      </ul>
    )}
    <ul className="flex flex-wrap space-x-4">
      {item.data.language && item.data.languageColor && (
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
          <a
            href={`/projects/language/${slugify(item.data.language, {
              lower: true,
            })}`}
          >
            {smartQuotes(item.data.language)}
          </a>
        </li>
      )}
      {item.data.stars > 0 && (
        <li className="flex flex-wrap items-center space-x-1">
          <svg aria-hidden="true" width="1em" height="1em">
            <use href="#star"></use>
          </svg>
          <span>
            {t(`<0>${item.data.stars.toLocaleString()}</0> stars`, {}, [
              ({ children }: { children: ComponentChildren }) => (
                <strong className="font-medium" children={children} />
              ),
            ])}
          </span>
        </li>
      )}
      {item.data.watchers > 0 && (
        <li className="flex flex-wrap items-center space-x-1">
          <svg aria-hidden="true" width="1em" height="1em">
            <use href="#watchers"></use>
          </svg>
          <span>
            {t(`<0>${item.data.watchers.toLocaleString()}</0> watchers`, {}, [
              ({ children }: { children: ComponentChildren }) => (
                <strong className="font-medium" children={children} />
              ),
            ])}
          </span>
        </li>
      )}
      {item.data.forks > 0 && (
        <li className="flex flex-wrap items-center space-x-1">
          <svg aria-hidden="true" width="1em" height="1em">
            <use href="#forks"></use>
          </svg>
          <span>
            {t(`<0>${item.data.forks.toLocaleString()}</0> forks`, {}, [
              ({ children }: { children: ComponentChildren }) => (
                <strong className="font-medium" children={children} />
              ),
            ])}
          </span>
        </li>
      )}
    </ul>
  </Fragment>
);

export const TimelinePodcastInterviewContent: FunctionalComponent<{
  item: TimelinePodcastInterview;
}> = ({ item }) => (
  <Fragment>
    <p className="text-gray-500">{smartQuotes(item.data.publisher)}</p>
    {item.data.embed && (
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
  </Fragment>
);

export const TimelinePressFeatureContent: FunctionalComponent<{
  item: TimelinePressFeature;
}> = ({ item }) => (
  <Fragment>
    <p className="flex items-start space-x-2 text-gray-500">
      {item.url && (
        <img
          alt=""
          src={`https://icons.duckduckgo.com/ip3/${
            new URL(item.data.href).hostname
          }.ico`}
          loading="lazy"
          width={24}
          height={24}
          className="w-6 h-6 mt-0.5 rounded-full"
        />
      )}
      {item.data.author ? (
        <span>
          {t(
            `${
              item.data.author ? `by <0>${item.data.author}</0> for ` : ""
            } <1>${item.data.publisher}</1>`.trim(),
            {},
            [
              ({ children }: { children: ComponentChildren }) => (
                <strong key={0} children={children} className="font-medium" />
              ),
              ({ children }: { children: ComponentChildren }) => (
                <a
                  key={1}
                  children={children}
                  className="font-medium"
                  href={`/press/publications/${slugify(String(children), {
                    lower: true,
                  })}`}
                />
              ),
            ]
          )}
        </span>
      ) : (
        <a
          className="font-medium"
          href={`/press/publications/${slugify(String(item.data.publisher), {
            lower: true,
          })}`}
        >
          {item.data.publisher}
        </a>
      )}
    </p>
  </Fragment>
);

export const TimelineProjectContent: FunctionalComponent<{
  item: TimelineProject;
}> = ({ item }) => null;

export const TimelineThemeContent: FunctionalComponent<{
  item: TimelineTheme;
}> = ({ item }) => null;

export const TimelineTravelContent: FunctionalComponent<{
  item: TimelineTravel;
}> = ({ item }) => (
  <div class="flex items-start space-x-2 text-gray-500">
    <img
      alt=""
      src={getFlagUrl(item.data.country.code)}
      class="rounded-sm mt-1.5"
    />
    <p>
      <a
        href={`/travel/countries/${slugify(
          countryName(item.data.country.name),
          { lower: true }
        )}`}
      >
        {countryName(item.data.country.name)}
      </a>
    </p>
  </div>
);

export const TimelineVersionContent: FunctionalComponent<{
  item: TimelineVersion;
}> = ({ item }) => null;

export const TimelineVideoContent: FunctionalComponent<{
  item: TimelineVideo;
}> = ({ item }) => (
  <ul className="text-gray-500">
    {item.data.publisher && item.data.city && (
      <li>{smartQuotes(`${item.data.publisher}, ${item.data.city}`)}</li>
    )}
    {item.data.duration && (
      <li>{smartQuotes(`Watch time: ${humanizeMmSs(item.data.duration)}`)}</li>
    )}
  </ul>
);
