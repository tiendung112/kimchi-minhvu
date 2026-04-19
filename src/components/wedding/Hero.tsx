import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { weddingConfig, heroSlides } from "@/lib/wedding-config";
import { Countdown } from "./Countdown";
import { FloatingPetals } from "./FloatingPetals";

const mobileSlides = heroSlides;
const desktopImages = heroSlides;
const HERO_SIZES_MOBILE = "100vw";
const HERO_SIZES_DESKTOP = "25vw";

export const Hero = () => {
  const { hero, groom, bride, weddingDate } = weddingConfig;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % mobileSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative flex min-h-[100svh] w-full flex-col overflow-hidden">
      {/* Mobile: Auto-sliding carousel — CSS translate strip (no jank) */}
      <div className="absolute inset-0 overflow-hidden md:hidden">
        <div
          className="flex h-full will-change-transform"
          style={{
            width: `${mobileSlides.length * 100}%`,
            transform: `translateX(-${(current / mobileSlides.length) * 100}%)`,
            transition: "transform 0.75s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          {mobileSlides.map((img, i) => (
            <div key={i} className="h-full flex-shrink-0" style={{ width: `${100 / mobileSlides.length}%` }}>
              <img
                src={img.src}
                srcSet={img.srcSet}
                sizes={HERO_SIZES_MOBILE}
                alt={`${groom.name} và ${bride.name}`}
                loading={i === 0 ? "eager" : "lazy"}
                // @ts-expect-error fetchpriority valid HTML
                fetchpriority={i === 0 ? "high" : "auto"}
                decoding="async"
                className="h-full w-full object-cover object-top"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: 4 photos side by side */}
      <div className="absolute inset-0 hidden md:flex">
        {desktopImages.map((img, i) => (
          <div key={i} className="relative flex-1 overflow-hidden">
            <img
              src={img.src}
              srcSet={img.srcSet}
              sizes={HERO_SIZES_DESKTOP}
              alt={`${groom.name} và ${bride.name} ${i + 1}`}
              loading="eager"
              // @ts-expect-error fetchpriority valid HTML
              fetchpriority={i === 0 ? "high" : "auto"}
              decoding="async"
              className="h-full w-full object-cover object-top"
            />
            {/* Thin separator between photos */}
            {i < desktopImages.length - 1 && (
              <div className="absolute right-0 top-0 h-full w-px bg-white/20" />
            )}
          </div>
        ))}
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-overlay)" }}
        aria-hidden="true"
      />

      {/* Floating petals */}
      <FloatingPetals count={16} variant="petal" />

      {/* Sparkles */}
      <span className="pointer-events-none absolute left-[12%] top-[18%] text-2xl text-accent animate-sparkle" aria-hidden="true">✦</span>
      <span className="pointer-events-none absolute right-[14%] top-[24%] text-xl text-accent animate-sparkle [animation-delay:1s]" aria-hidden="true">✦</span>
      <span className="pointer-events-none absolute left-[18%] bottom-[28%] text-lg text-accent animate-sparkle [animation-delay:1.6s]" aria-hidden="true">✦</span>

      {/* Content */}
      <div className="relative z-10 flex min-h-[100svh] w-full flex-col items-center justify-between gap-6 px-4 py-8 text-background sm:px-5 sm:py-16">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-[11px] uppercase tracking-[0.4em] text-background/90 sm:text-xs"
        >
          Trân trọng kính mời
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          <p className="mb-4 font-serif text-base italic text-background/85 sm:text-lg">
            Lễ Thành Hôn của
          </p>
          <h1 className="font-serif text-[2.75rem] leading-[1.05] sm:text-7xl md:text-8xl">
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              {groom.name}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="my-2 block text-3xl italic text-accent sm:my-3 sm:text-4xl"
            >
              &amp;
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              {bride.name}
            </motion.span>
          </h1>

          <div className="gold-divider mt-6 sm:mt-8">
            <span className="inline-block text-base animate-float-y">❦</span>
          </div>

          <p className="mt-6 text-sm tracking-wider text-background/95 sm:text-base">
            {hero.dateText}
          </p>
          <p className="mt-1 text-xs italic text-background/75 sm:text-sm">
            {hero.lunarText}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="flex w-full flex-col items-center gap-4 sm:gap-6"
        >
          <Countdown targetDate={weddingDate} />
          <a
            href="#invitation"
            className="group flex flex-col items-center gap-1 text-background/80 transition-colors hover:text-background"
            aria-label="Cuộn xuống"
          >
            <span className="text-[10px] uppercase tracking-[0.3em]">Cuộn xuống</span>
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </a>
        </motion.div>
      </div>

      {/* Mobile: Carousel indicator dots */}
      <div className="absolute bottom-[4.5rem] left-0 right-0 z-20 flex justify-center gap-2 md:hidden">
        {mobileSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-5 bg-white" : "w-1.5 bg-white/40"
            }`}
            aria-label={`Ảnh ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
