import { prisma } from "@/lib/prisma";
import VideoGrid from "@/components/VideoGrid";
import type { VideoItem } from "@/types";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const videos = await prisma.video.findMany({
    where: { type: "video" },
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true, email: true } } }
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="font-display text-2xl font-semibold text-ink">Latest videos</h1>
      <p className="mt-1 text-sm text-mute">Fresh uploads from the channel.</p>
      <div className="mt-6">
        <VideoGrid videos={JSON.parse(JSON.stringify(videos)) as VideoItem[]} />
      </div>
    </div>
  );
}
