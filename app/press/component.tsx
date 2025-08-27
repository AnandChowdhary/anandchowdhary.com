import { Press, PressItem } from "@/app/api";
import { focusStyles } from "@/app/components/external-link";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import Link from "next/link";

const PressItemCard = ({
  item,
  award,
}: {
  item: PressItem;
  award?: boolean;
}) => {
  const year = new Date(item.date).getFullYear();
  const permalink = `/press/${year}/${item.slug}`;

  return (
    <article className="pb-4 relative">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1 space-y-1">
          <div className="font-medium mt-1 flex items-center gap-1">
            <img
              alt=""
              src={
                item.href
                  ? `https://manifest.im/icon/${new URL(
                      item.href
                    ).hostname.replace("www.", "")}`
                  : `https://tse2.mm.bing.net/th?q=${encodeURIComponent(
                      item.publisher
                    )}+icon&w=70&h=70&c=7&rs=1&p=0&dpr=3&pid=1.7&mkt=en-IN&adlt=moderate`
              }
              className="w-4 h-4 rounded-md mr-0.5 shrink-0"
            />
            <Link
              href={permalink}
              className={`${focusStyles} grow full-link hover:text-neutral-500 truncate`}
            >
              {award ? item.title : item.publisher}
            </Link>
          </div>
          <div
            className="truncate text-sm text-neutral-500"
            style={{
              maskImage:
                "linear-gradient(to right, black 70%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, black 70%, transparent 100%)",
            }}
          >
            <span>
              {new Date(item.date).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <span>{" · "}</span>
            <span>{award ? item.publisher : item.title}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default async function PressContent({
  pressData,
}: {
  pressData: Press;
}) {
  const sortedAwards = [...pressData.awards].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const sortedPodcasts = [...pressData.podcasts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const sortedFeatures = [...pressData.features].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 space-y-32">
      <Header pathname="/press">
        I&rsquo;ve been very fortunate to have been featured in several
        publications and media outlets for my work. For press enquiries, please
        reach out to press (at) this domain.
      </Header>
      <main className="max-w-2xl mx-auto space-y-12">
        {sortedAwards.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg font-medium text-neutral-500">Awards</h2>
            <div className="grid grid-cols-1 gap-y-4 gap-x-8 md:grid-cols-2">
              {sortedAwards.map((item, index) => (
                <PressItemCard key={`award-${index}`} item={item} award />
              ))}
            </div>
          </section>
        )}
        {sortedFeatures.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg font-medium text-neutral-500">Features</h2>
            <div className="grid grid-cols-1 gap-y-4 gap-x-8 md:grid-cols-2">
              {sortedFeatures.map((item, index) => (
                <PressItemCard key={`feature-${index}`} item={item} />
              ))}
            </div>
          </section>
        )}
        {sortedPodcasts.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg font-medium text-neutral-500">Podcasts</h2>
            <div className="grid grid-cols-1 gap-y-4 gap-x-8 md:grid-cols-2">
              {sortedPodcasts.map((item, index) => (
                <PressItemCard key={`podcast-${index}`} item={item} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
