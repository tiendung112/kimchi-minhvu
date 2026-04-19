import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface CountdownProps {
  targetDate: Date;
}

const calc = (target: Date) => {
  const diff = Math.max(0, target.getTime() - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
};

const pad = (n: number) => n.toString().padStart(2, "0");

export const Countdown = ({ targetDate }: CountdownProps) => {
  const [time, setTime] = useState(() => calc(targetDate));
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => setTime(calc(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const items = [
    { label: "Ngày", value: time.days },
    { label: "Giờ", value: time.hours },
    { label: "Phút", value: time.minutes },
    { label: "Giây", value: time.seconds },
  ];

  return (
    <motion.div
      className="mx-auto grid w-full max-w-md grid-cols-4 gap-1.5 px-1 sm:max-w-lg sm:gap-4 sm:px-0"
      role="timer"
      aria-label="Đếm ngược tới ngày cưới"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
      }}
    >
      {items.map((it) => (
        <motion.div
          key={it.label}
          variants={{
            hidden: { opacity: 0, y: 16, scale: 0.94 },
            show: { opacity: 1, y: 0, scale: 1 },
          }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="group relative flex min-w-0 flex-col items-center justify-center overflow-hidden rounded-sm border border-accent/40 bg-background/15 px-1 py-2.5 backdrop-blur-md transition-all duration-500 hover:border-accent hover:bg-background/25 sm:px-2 sm:py-4"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-accent/25 to-transparent transition-transform duration-1000 group-hover:translate-x-full"
          />
          <div className="relative h-7 w-full overflow-hidden text-center sm:h-12">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={it.value}
                initial={prefersReduced ? { opacity: 0 } : { y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={prefersReduced ? { opacity: 0 } : { y: "-100%", opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 font-serif text-xl tabular-nums text-background sm:text-4xl"
              >
                {pad(it.value)}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="mt-1 text-[9px] uppercase tracking-[0.18em] text-background/85 sm:text-xs sm:tracking-[0.2em]">
            {it.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
};
