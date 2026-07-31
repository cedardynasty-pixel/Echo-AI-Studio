export type VideoType = "video" | "short";

export interface VideoItem {
  id: string;
  title: string;
  description: string | null;
  type: VideoType;
  videoUrl: string;
  thumbnailUrl: string | null;
  publicId: string;
  duration: number | null;
  views: number;
  createdAt: string;
  author: { name: string | null; email: string };
}
