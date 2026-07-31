"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteVideoButton({ id }: { id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this video? This cannot be undone.")) return;
    setBusy(true);
    const res = await fetch(`/api/videos/${id}`, { method: "DELETE" });
    setBusy(false);
    if (res.ok) router.refresh();
    else alert("Could not delete the video.");
  }

  return (
    <button
      onClick={handleDelete}
      disabled={busy}
      className="rounded-lg border border-line px-3 py-1.5 text-sm text-mute hover:border-accent hover:text-accent disabled:opacity-50"
    >
      {busy ? "Deleting…" : "Delete"}
    </button>
  );
}
