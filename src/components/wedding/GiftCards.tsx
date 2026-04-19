import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { weddingConfig } from "@/lib/wedding-config";

interface BankInfo {
  name: string;
  account: string;
  holder: string;
  qr: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1 },
};

const BankCard = ({
  bank,
  side,
  index,
}: {
  bank: BankInfo;
  side: "Mừng nhà trai" | "Mừng nhà gái";
  index: number;
}) => {
  const [copied, setCopied] = useState(false);
  const prefersReduced = useReducedMotion();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bank.account.replace(/\s/g, ""));
      setCopied(true);
      toast.success("Đã sao chép số tài khoản!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Không thể sao chép.");
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      transition={{
        duration: 0.55,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={prefersReduced ? undefined : { y: -4, scale: 1.015 }}
      className="group relative flex flex-col items-center overflow-hidden rounded-sm border border-accent/40 bg-background p-5 text-center shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-lg sm:p-6"
    >
      {/* Subtle shine sweep on hover */}
      {!prefersReduced && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-accent/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
      )}

      <motion.span
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          duration: 0.4,
          delay: index * 0.12 + 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="rounded-full border border-accent/50 bg-accent/10 px-4 py-1 font-serif text-xs italic tracking-wider text-primary sm:text-sm"
      >
        {side}
      </motion.span>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          duration: 0.5,
          delay: index * 0.12 + 0.25,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={prefersReduced ? undefined : { scale: 1.04 }}
        className="mt-4 h-40 w-40 shrink-0 rounded-sm border border-accent/30 bg-background p-2 transition-shadow duration-300 group-hover:shadow-md sm:h-44 sm:w-44"
      >
        <img
          src={bank.qr}
          alt={`Mã QR ${bank.holder}`}
          loading="lazy"
          className="h-full w-full object-contain"
          onError={(e) => {
            e.currentTarget.src =
              "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><rect width='200' height='200' fill='%23f5f1e8'/><text x='50%' y='50%' text-anchor='middle' dy='.3em' font-family='sans-serif' font-size='14' fill='%234F6F52'>QR Code</text></svg>";
          }}
        />
      </motion.div>

      <p className="mt-4 font-serif text-lg text-primary">{bank.holder}</p>
      <p className="mt-0.5 text-[11px] uppercase tracking-[0.24em] text-accent">
        {bank.name}
      </p>
      <p className="mt-2 break-all font-mono text-sm tracking-wider text-foreground">
        {bank.account}
      </p>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleCopy}
        className={`mt-4 border-primary/30 text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground ${
          copied ? "border-accent bg-accent/15 text-primary" : ""
        }`}
      >
        <motion.span
          key={copied ? "copied" : "copy"}
          initial={{ opacity: 0, scale: 0.7, rotate: -90 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          {copied ? "Đã sao chép" : "Sao chép STK"}
        </motion.span>
      </Button>
    </motion.div>
  );
};

export const GiftCards = () => {
  const { groom, bride } = weddingConfig;

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: 0.08 }}
      className="rounded-sm border border-accent/40 bg-background/60 p-5 shadow-[var(--shadow-card)] sm:p-8"
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 16 },
          show: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-center"
      >
        <p className="text-[11px] uppercase tracking-[0.32em] text-accent">
          Mừng cưới online
        </p>
        <h3 className="mt-2 font-serif text-2xl italic text-primary sm:text-3xl">
          Hộp mừng cưới
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm italic text-muted-foreground">
          “Sự hiện diện của bạn là món quà quý giá nhất. Nếu ở xa, xin gửi lời chúc qua hộp mừng cưới online.”
        </p>
      </motion.div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        <BankCard bank={groom.bank} side="Mừng nhà trai" index={0} />
        <BankCard bank={bride.bank} side="Mừng nhà gái" index={1} />
      </div>
    </motion.div>
  );
};
