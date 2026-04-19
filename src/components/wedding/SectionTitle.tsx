import { Reveal } from "./Reveal";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export const SectionTitle = ({ eyebrow, title, subtitle }: SectionTitleProps) => {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <p className="mb-3 text-xs uppercase tracking-[0.32em] text-accent">{eyebrow}</p>
      )}
      <h2 className="font-serif text-3xl italic text-primary sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <div className="gold-divider mt-5">
        <span className="inline-block text-base animate-float-y">❦</span>
      </div>
      {subtitle && (
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
};
