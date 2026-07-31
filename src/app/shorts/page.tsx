import { prisma } from "@/lib/prisma";
import ShortsPlayer from "@/components/ShortsPlayer";
import type { VideoItem } from "@/types";

export const dynamic = "force-dynamic";

export default async function ShortsPage() {
  const shorts = await prisma.video.findMany({
    where: { type: "short" },
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true, email: true } } }
  });

  return <ShortsPlayer shorts={JSON.parse(JSON.stringify(shorts)) as VideoItem[]} />;
}
