import { Hero } from "@/components/wedding/Hero";
import { Invitation } from "@/components/wedding/Invitation";
import { CoupleIntro } from "@/components/wedding/CoupleIntro";
import { EventInfo } from "@/components/wedding/EventInfo";
import { Gallery } from "@/components/wedding/Gallery";
import { Celebration } from "@/components/wedding/Celebration";
import { Footer } from "@/components/wedding/Footer";
import { MusicToggle } from "@/components/wedding/MusicToggle";
import { SectionNav } from "@/components/wedding/SectionNav";

const Index = () => {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Hero />
      <Invitation />
      <CoupleIntro />
      <EventInfo />
      <Gallery />
      <Celebration />
      <Footer />
      <MusicToggle />
      <SectionNav />
    </main>
  );
};

export default Index;
