import { getAllArchiveItems } from "@/app/api";
import { ArchiveItemComponent } from "@/app/archive/item";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { NowSection } from "@/app/components/now-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Now / Anand Chowdhary",
  description:
    "Anand Chowdhary is a technology entrepreneur, engineer, and designer from New Delhi, India, living in Utrecht, the Netherlands.",
};

export default async function Now() {
  const archiveData = await getAllArchiveItems();
  const recentArchiveItems = archiveData
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-24 sm:p-20 space-y-32">
      <Header pathname="/now" />
      <NowSection />
      <section className="space-y-4 max-w-lg mx-auto text-sm text-neutral-500 -mt-16">
        <h2 className="text-xs uppercase font-medium font-mono tracking-wider text-neutral-500">
          /archive
        </h2>
        <div className="space-y-4 -mx-1">
          {recentArchiveItems.map((item) => (
            <ArchiveItemComponent key={item.url} item={item} />
          ))}
        </div>
        <p className="mt-12">
          This page was last updated on{" "}
          {new Date(recentArchiveItems[0].date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
          .
        </p>
      </section>
      <Footer />
    </div>
  );
}
