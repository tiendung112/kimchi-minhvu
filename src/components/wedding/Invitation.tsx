import { Reveal } from "./Reveal";
import { weddingConfig } from "@/lib/wedding-config";

export const Invitation = () => {
  const { groom, bride, hero } = weddingConfig;

  return (
    <section id="invitation" className="relative overflow-hidden bg-secondary/40 px-4 py-16 sm:px-5 sm:py-28">
      {/* Decorative blurred orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl animate-float-y" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-primary/10 blur-3xl animate-float-y [animation-delay:1.5s]" />

      <div className="relative container mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.32em] text-accent">
            Save the Date
          </p>
          <h2 className="mt-4 font-serif text-3xl italic sm:text-4xl text-gold-shimmer">
            Trân trọng kính mời
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="gold-divider my-8">
            <span className="inline-block text-base animate-float-y">❦</span>
          </div>

          <p className="mx-auto max-w-xl text-sm leading-loose text-muted-foreground sm:text-base">
            Với niềm hân hoan vô hạn, hai gia đình chúng tôi trân trọng kính mời quý vị
            đến dự bữa tiệc thành hôn của hai con
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-8">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                Chú rể
              </p>
              <p className="mt-2 font-serif text-2xl text-primary sm:text-3xl">
                {groom.fullName}
              </p>
              <p className="mt-2 text-xs italic text-muted-foreground sm:text-sm">
                {groom.bio}
              </p>
            </div>

            <div className="font-serif text-3xl italic text-accent sm:text-4xl inline-block animate-heartbeat">&amp;</div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                Cô dâu
              </p>
              <p className="mt-2 font-serif text-2xl text-primary sm:text-3xl">
                {bride.fullName}
              </p>
              <p className="mt-2 text-xs italic text-muted-foreground sm:text-sm">
                {bride.bio}
              </p>
            </div>
          </div>

          <div className="mt-12 inline-block max-w-full border-y border-accent/40 px-4 py-4 transition-all duration-500 hover:border-accent hover:scale-[1.02] sm:px-6">
            <p className="font-serif text-base italic text-primary sm:text-xl">
              {hero.dateText}
            </p>
            <p className="mt-1 text-xs italic text-muted-foreground sm:text-sm">
              {hero.lunarText}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
