import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import { weddingConfig } from "@/lib/wedding-config";

export const CoupleIntro = () => {
  const { groom, bride } = weddingConfig;

  const Person = ({
    label,
    name,
    bio,
    delay,
  }: {
    label: string;
    name: string;
    bio: string;
    delay: number;
  }) => (
    <Reveal delay={delay} className="flex flex-col items-center text-center">
      <p className="text-[11px] uppercase tracking-[0.32em] text-accent">{label}</p>
      <div className="gold-divider mt-4">
        <span className="inline-block text-base text-accent">❦</span>
      </div>
      <h3 className="mt-4 font-serif text-3xl italic text-primary sm:text-5xl">{name}</h3>
      <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">{bio}</p>
    </Reveal>
  );

  return (
    <section id="couple" className="px-5 py-20 sm:py-28">
      <div className="container mx-auto">
        <SectionTitle eyebrow="Cô dâu & Chú rể" title="Hai chúng tôi" />

        <div className="mt-14 grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-10">
          <Person label="Chú rể" name={groom.fullName} bio={groom.bio} delay={0} />
          <Person label="Cô dâu" name={bride.fullName} bio={bride.bio} delay={0.15} />
        </div>
      </div>
    </section>
  );
};
