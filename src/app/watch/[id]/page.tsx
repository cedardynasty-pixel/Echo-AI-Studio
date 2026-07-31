import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

function formatViews(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M views`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K views`;
  return `${n} view${n === 1 ? "" : "s"}`;
}

export default async function WatchPage({ params }: { params: { id: string } }) {
  const video = await prisma.video.update({
    where: { id: params.id },
    data: { views: { increment: 1 } },
    include: { author: { select: { name: true, email: true } } }
  }).catch(() => null);

  if (!video) return notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="overflow-hidden rounded-xl bg-black ring-1 ring-line">
        <video src={video.videoUrl} controls autoPlay className="aspect-video w-full" />
      </div>
      <h1 className="mt-4 font-display text-xl font-semibold text-ink">{video.title}</h1>
      <div className="mt-1 flex items-center gap-3 text-sm text-mute">
        <span>{video.author.name ?? video.author.email}</span>
        <span>·</span>
        <span>{formatViews(video.views)}</span>
      </div>
      {video.description && (
        <p className="mt-4 whitespace-pre-wrap rounded-lg bg-panel p-4 text-sm text-ink/90 ring-1 ring-line">
          {video.description}
        </p>
      )}
    </div>
  );
}
