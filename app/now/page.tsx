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
  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-24 sm:p-20 space-y-32">
      <Header pathname="/now" />
      <NowSection />
      <Footer />
    </div>
  );
}
