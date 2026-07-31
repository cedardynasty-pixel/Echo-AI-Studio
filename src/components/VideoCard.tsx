import Link from "next/link";
import type { VideoItem } from "@/types";

function formatViews(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M views`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K views`;
  return `${n} view${n === 1 ? "" : "s"}`;
}

export default function VideoCard({ video }: { video: VideoItem }) {
  return (
    <Link href={`/watch/${video.id}`} className="group block">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-panel ring-1 ring-line">
        {video.thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <video src={video.videoUrl} className="h-full w-full object-cover" muted preload="metadata" />
        )}
      </div>
      <div className="mt-2 flex gap-3">
        <div>
          <h3 className="line-clamp-2 font-medium text-ink group-hover:text-accent">{video.title}</h3>
          <p className="mt-0.5 text-sm text-mute">{video.author?.name ?? video.author?.email}</p>
          <p className="text-sm text-mute">{formatViews(video.views)}</p>
        </div>
      </div>
    </Link>
  );
}
