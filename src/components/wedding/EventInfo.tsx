import { MapPin, Clock } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import { weddingConfig } from "@/lib/wedding-config";

interface EventCardProps {
  title: string;
  time: string;
  address: string;
  delay: number;
}

const EventCard = ({ title, time, address, delay }: EventCardProps) => (
  <Reveal delay={delay}>
    <article className="lift-card relative flex h-full flex-col overflow-hidden rounded-sm border border-accent/40 bg-background p-6 shadow-[var(--shadow-card)] sm:p-10">
      <div className="pointer-events-none absolute -left-8 -top-8 h-24 w-24 rounded-full bg-accent/10 blur-2xl animate-float-y" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-10 -bottom-10 h-28 w-28 rounded-full bg-primary/10 blur-2xl animate-float-y [animation-delay:1s]" aria-hidden="true" />

      <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Trân trọng kính mời</p>
      <h3 className="mt-3 min-h-[4rem] font-serif text-2xl italic text-primary sm:min-h-[6.5rem] sm:text-4xl">{title}</h3>

      <div className="gold-divider my-6 justify-start [&::after]:hidden">
        <span className="inline-block text-sm animate-float-y">❦</span>
      </div>

      <ul className="space-y-4 text-sm sm:text-base">
        <li className="flex items-start gap-3 text-foreground">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <span>{time}</span>
        </li>
        <li className="flex items-start gap-3 text-foreground">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <span className="leading-relaxed">{address}</span>
        </li>
      </ul>
    </article>
  </Reveal>
);

export const EventInfo = () => {
  const { ceremony, reception } = weddingConfig;

  return (
    <section id="events" className="px-5 py-20 sm:py-28">
      <div className="container mx-auto max-w-5xl">
        <SectionTitle
          eyebrow="Thông tin buổi lễ"
          title="Thời gian & Địa điểm"
          subtitle="Hai gia đình mong được đón tiếp quý khách trong ngày trọng đại."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <EventCard
            title={ceremony.title}
            time={ceremony.time}
            address={ceremony.address}
            delay={0}
          />
          <EventCard
            title={reception.title}
            time={reception.time}
            address={reception.address}
            delay={0.15}
          />
        </div>
      </div>
    </section>
  );
};
