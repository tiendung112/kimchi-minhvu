import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { id: "hero", label: "Trang chủ" },
  { id: "couple", label: "Cô dâu & Chú rể" },
  { id: "events", label: "Sự kiện" },
  { id: "gallery", label: "Thư viện ảnh" },
  { id: "rsvp", label: "Xác nhận tham dự" },
];

export const SectionNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("hero");

  // Đổi nền nav khi cuộn xuống
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight section đang xem
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(id);
          });
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Khoá scroll body khi mở overlay
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleClick = () => setOpen(false);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled || open
            ? "border-b border-accent/20 bg-background/85 backdrop-blur-md shadow-[0_4px_20px_-15px_hsl(130_25%_14%/0.3)]"
            : "bg-transparent",
        )}
      >
        <nav
          aria-label="Điều hướng chính"
          className="container mx-auto flex h-16 items-center justify-between px-4 sm:h-20 sm:px-6"
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={handleClick}
            className={cn(
              "font-serif text-xl tracking-[0.18em] transition-colors sm:text-2xl",
              scrolled || open ? "text-accent" : "text-background drop-shadow-[0_1px_4px_hsl(130_25%_10%/0.6)]",
            )}
            aria-label="Về đầu trang"
          >
            MV <span className="italic opacity-70">&amp;</span> KC
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-7 lg:flex">
            {LINKS.map(({ id, label }) => {
              const isActive = active === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative text-[11px] uppercase tracking-[0.24em] transition-colors duration-300",
                      "after:absolute after:-bottom-1.5 after:left-1/2 after:h-px after:w-0 after:-translate-x-1/2 after:bg-accent after:transition-all after:duration-300",
                      "hover:after:w-full",
                      scrolled
                        ? isActive
                          ? "text-accent after:w-full"
                          : "text-foreground/80 hover:text-accent"
                        : isActive
                          ? "text-accent after:w-full drop-shadow-[0_1px_4px_hsl(130_25%_10%/0.6)]"
                          : "text-background/90 hover:text-accent drop-shadow-[0_1px_4px_hsl(130_25%_10%/0.6)]",
                    )}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Hamburger (mobile + tablet) */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Đóng menu" : "Mở menu"}
            aria-expanded={open}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden",
              scrolled || open
                ? "text-foreground hover:bg-muted"
                : "text-background hover:bg-background/15",
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden",
          "transition-all duration-500",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
      >
        <div
          className="absolute inset-0 bg-background/95 backdrop-blur-xl"
          onClick={handleClick}
        />
        <nav
          aria-label="Menu di động"
          className="relative flex h-full flex-col items-center justify-center gap-2 px-6"
        >
          <ul className="flex w-full max-w-sm flex-col items-center gap-1">
            {LINKS.map(({ id, label }, i) => (
              <li
                key={id}
                className={cn(
                  "w-full text-center transition-all duration-500",
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                )}
                style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
              >
                <a
                  href={`#${id}`}
                  onClick={handleClick}
                  className={cn(
                    "block py-4 font-serif text-lg uppercase tracking-[0.28em] transition-colors",
                    active === id
                      ? "text-accent"
                      : "text-foreground/85 hover:text-accent",
                  )}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            ❦ &nbsp; Wedding &nbsp; ❦
          </div>
        </nav>
      </div>
    </>
  );
};
