"use client";

import { useEffect, useRef } from "react";
import type { VideoItem } from "@/types";

function ShortSlide({ video }: { video: VideoItem }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.7 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="shorts-slide flex h-[calc(100vh-56px)] w-full items-center justify-center bg-black">
      <video
        ref={ref}
        src={video.videoUrl}
        loop
        muted
        playsInline
        controls
        className="h-full max-h-[calc(100vh-56px)] w-auto max-w-full object-contain sm:aspect-[9/16] sm:rounded-xl"
      />
      <div className="pointer-events-none absolute bottom-6 left-1/2 w-full max-w-md -translate-x-1/2 px-6 text-center sm:left-6 sm:translate-x-0 sm:text-left">
        <p className="font-medium text-white drop-shadow">{video.title}</p>
        <p className="text-sm text-white/70 drop-shadow">{video.author?.name ?? video.author?.email}</p>
      </div>
    </div>
  );
}

export default function ShortsPlayer({ shorts }: { shorts: VideoItem[] }) {
  if (shorts.length === 0) {
    return (
      <div className="flex h-[calc(100vh-56px)] flex-col items-center justify-center text-center">
        <p className="font-display text-lg text-ink">No shorts yet</p>
        <p className="mt-1 text-sm text-mute">Check back soon.</p>
      </div>
    );
  }

  return (
    <div className="shorts-scroll relative h-[calc(100vh-56px)] snap-y overflow-y-scroll">
      {shorts.map((short) => (
        <div key={short.id} className="relative">
          <ShortSlide video={short} />
        </div>
      ))}
    </div>
  );
}
