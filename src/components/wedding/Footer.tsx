import { weddingConfig } from "@/lib/wedding-config";
import { Reveal } from "./Reveal";

export const Footer = () => {
  const { groom, bride, hero } = weddingConfig;

  return (
    <footer className="relative overflow-hidden bg-primary px-5 py-16 text-primary-foreground sm:py-20">
      {/* Soft glowing orbs */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-accent/15 blur-3xl animate-float-y"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-accent/10 blur-3xl animate-float-y [animation-delay:1.2s]"
      />

      <div className="container relative mx-auto max-w-2xl text-center">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.32em] text-accent">
            Cảm ơn vì đã đồng hành
          </p>
          <h2 className="mt-4 font-serif text-3xl italic sm:text-4xl">
            <span className="inline-block transition-transform duration-500 hover:scale-105 hover:text-accent">
              {groom.name}
            </span>{" "}
            <span className="inline-block text-accent animate-heartbeat">
              &amp;
            </span>{" "}
            <span className="inline-block transition-transform duration-500 hover:scale-105 hover:text-accent">
              {bride.name}
            </span>
          </h2>
          <div className="gold-divider my-6">
            <span className="inline-block text-base animate-float-y">❦</span>
          </div>
          <p className="text-sm leading-relaxed text-primary-foreground/80 sm:text-base">
            Sự có mặt của quý khách là niềm vinh hạnh lớn lao của hai gia đình chúng tôi
            trong ngày trọng đại này.
          </p>
          <p className="mt-6 text-xs italic text-primary-foreground/60">
            {hero.dateText}
          </p>
        </Reveal>
      </div>
    </footer>
  );
};
