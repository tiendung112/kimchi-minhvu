import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SectionTitle } from "./SectionTitle";
import { weddingConfig, type ResponsiveImage } from "@/lib/wedding-config";

const PER_PAGE = 6;
const SWIPE_THRESHOLD = 60;
const SIZES = "(min-width: 640px) 33vw, 50vw";

const GalleryTile = ({
  image,
  globalIndex,
  eager,
  onOpen,
}: {
  image: ResponsiveImage;
  globalIndex: number;
  eager: boolean;
  onOpen: () => void;
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative block w-full overflow-hidden rounded-sm border border-accent/30 bg-background shadow-[var(--shadow-card)]"
      aria-label={`Xem ảnh ${globalIndex + 1}`}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-secondary">
        {image.placeholder && (
          <img
            src={image.placeholder}
            aria-hidden="true"
            className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl"
          />
        )}
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes={SIZES}
          alt={`Ảnh cưới ${globalIndex + 1}`}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          // @ts-expect-error fetchpriority valid HTML
          fetchpriority={eager && globalIndex < 2 ? "high" : "auto"}
          draggable={false}
          onLoad={() => setLoaded(true)}
          className={`relative h-full w-full object-cover transition-[opacity,transform] duration-500 group-hover:scale-105 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/25">
        <span className="scale-90 rounded-full bg-white/90 px-4 py-1.5 text-xs font-medium text-primary opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
          Xem ảnh
        </span>
      </div>
    </button>
  );
};

export const Gallery = () => {
  const { gallery } = weddingConfig;
  const totalPages = Math.ceil(gallery.length / PER_PAGE);
  const [page, setPage] = useState(0);
  const [openImg, setOpenImg] = useState<ResponsiveImage | null>(null);
  const prefersReduced = useReducedMotion();

  const pages = Array.from({ length: totalPages }, (_, p) =>
    gallery.slice(p * PER_PAGE, p * PER_PAGE + PER_PAGE)
  );

  const go = (next: number) => {
    setPage((next + totalPages) % totalPages);
  };

  return (
    <section id="gallery" className="bg-secondary/40 px-5 py-20 sm:py-28">
      <div className="container mx-auto max-w-5xl">
        <SectionTitle
          eyebrow="Những chiếc ảnh cưới"
          title="Album ảnh"
          subtitle="Những khoảnh khắc đẹp nhất trong ngày trọng đại."
        />

        {/* Slider track — all pages live in DOM, only translateX moves */}
        <div className="relative mt-14 overflow-hidden">
          <motion.div
            className="flex"
            style={{ width: `${totalPages * 100}%` }}
            animate={{ x: `${(-page * 100) / totalPages}%` }}
            transition={
              prefersReduced
                ? { duration: 0 }
                : { type: "spring", stiffness: 300, damping: 34, mass: 0.7 }
            }
            drag={totalPages > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.x < -SWIPE_THRESHOLD) go(page + 1);
              else if (info.offset.x > SWIPE_THRESHOLD) go(page - 1);
            }}
          >
            {pages.map((pageImages, p) => (
              <div
                key={p}
                className="grid shrink-0 cursor-grab grid-cols-2 gap-3 px-px active:cursor-grabbing sm:grid-cols-3 sm:gap-5"
                style={{ width: `${100 / totalPages}%` }}
                aria-hidden={p !== page}
              >
                {pageImages.map((img, i) => {
                  const globalIndex = p * PER_PAGE + i;
                  return (
                    <GalleryTile
                      key={img.src}
                      image={img}
                      globalIndex={globalIndex}
                      eager={p === 0}
                      onOpen={() => setOpenImg(img)}
                    />
                  );
                })}
              </div>
            ))}
          </motion.div>

          {totalPages > 1 && (
            <>
              <button
                onClick={() => go(page - 1)}
                className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/90 p-2 shadow-md transition hover:bg-background sm:-left-6"
                aria-label="Trang trước"
              >
                <ChevronLeft className="h-5 w-5 text-primary" />
              </button>
              <button
                onClick={() => go(page + 1)}
                className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/90 p-2 shadow-md transition hover:bg-background sm:-right-6"
                aria-label="Trang sau"
              >
                <ChevronRight className="h-5 w-5 text-primary" />
              </button>
            </>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex flex-col items-center gap-2">
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`Trang ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === page ? "w-6 bg-accent" : "w-2 bg-accent/30"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs tracking-widest text-foreground/50">
              Trang {page + 1} / {totalPages}
            </span>
          </div>
        )}
      </div>

      <Dialog open={!!openImg} onOpenChange={(o) => !o && setOpenImg(null)}>
        <DialogContent className="max-w-3xl border-accent/40 bg-background p-2 sm:p-3">
          {openImg && (
            <img
              src={openImg.src}
              srcSet={openImg.srcSet}
              sizes="(min-width: 768px) 768px, 100vw"
              alt="Ảnh phóng to"
              className="h-auto max-h-[85vh] w-full object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
