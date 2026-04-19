import { useEffect, useRef, useState } from "react";
import { Music2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import musicSrc from "@/assets/mot-doi.mp3";

/**
 * Nút bật/tắt nhạc nền — đặt cố định ở góc dưới phải.
 * Nhạc: "Một Đời" — Casper, Bon Nghiêm feat. buitruonglinh.
 * Tự động bắt đầu phát từ đoạn điệp khúc (1:17 = 77s).
 */
const START_AT_SECONDS = 77;

export const MusicToggle = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(musicSrc);
    audio.loop = true;
    audio.volume = 0.45;
    audio.preload = "auto";

    const seekToChorus = () => {
      try {
        audio.currentTime = START_AT_SECONDS;
      } catch {
        /* noop */
      }
    };
    audio.addEventListener("loadedmetadata", seekToChorus, { once: true });

    const onSeeked = () => {
      if (audio.currentTime < START_AT_SECONDS - 1) {
        audio.currentTime = START_AT_SECONDS;
      }
    };
    audio.addEventListener("seeked", onSeeked);

    audioRef.current = audio;

    // Auto-play sau lần tương tác đầu tiên (chính sách autoplay của trình duyệt)
    const tryAutoPlay = async () => {
      if (!audioRef.current) return;
      try {
        if (audioRef.current.currentTime < START_AT_SECONDS - 1) {
          audioRef.current.currentTime = START_AT_SECONDS;
        }
        await audioRef.current.play();
        setPlaying(true);
      } catch {
        /* user chưa cho phép */
      }
    };
    const events: (keyof DocumentEventMap)[] = [
      "pointerdown",
      "touchstart",
      "click",
      "keydown",
      "scroll",
    ];
    const onFirstInteraction = () => {
      events.forEach((e) =>
        document.removeEventListener(e, onFirstInteraction),
      );
      tryAutoPlay();
    };
    events.forEach((e) =>
      document.addEventListener(e, onFirstInteraction, { once: true, passive: true }),
    );

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", seekToChorus);
      audio.removeEventListener("seeked", onSeeked);
      events.forEach((e) =>
        document.removeEventListener(e, onFirstInteraction),
      );
      audioRef.current = null;
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        if (audio.currentTime < START_AT_SECONDS - 1) {
          audio.currentTime = START_AT_SECONDS;
        }
        await audio.play();
        setPlaying(true);
      } catch {
        /* autoplay/permission bị chặn — bỏ qua */
      }
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Tắt nhạc nền" : "Bật nhạc nền"}
      aria-pressed={playing}
      className={cn(
        "fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-background/85 text-primary shadow-[var(--shadow-card)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-accent hover:shadow-lg active:scale-95 sm:bottom-6 sm:right-6",
        "animate-fade-in-up [animation-delay:1s] [animation-fill-mode:both]",
        playing && "ring-2 ring-accent/50",
      )}
    >
      {/* Idle invitation pulse — only when not playing */}
      {!playing && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full border border-accent/30 animate-ring-pulse"
        />
      )}
      {playing && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full border border-accent/40 animate-ping"
        />
      )}
      <span
        key={playing ? "on" : "off"}
        className="inline-flex animate-fade-in-up [animation-duration:300ms]"
      >
        {playing ? (
          <Music2 className="h-5 w-5 animate-pulse" />
        ) : (
          <VolumeX className="h-5 w-5" />
        )}
      </span>
    </button>
  );
};
