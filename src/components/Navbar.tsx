"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const navLink = (active: boolean) =>
  `px-3 py-1.5 rounded-full text-sm transition-colors ${
    active ? "bg-accent text-white" : "text-mute hover:text-ink hover:bg-panel"
  }`;

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-base/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-display text-xl font-bold tracking-tight text-ink">
          Echo AI <span className="text-accent">Studio</span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link href="/" className={navLink(pathname === "/")}>Home</Link>
          <Link href="/shorts" className={navLink(pathname?.startsWith("/shorts") ?? false)}>Shorts</Link>
          {session ? (
            <>
              <Link href="/admin" className={navLink(pathname?.startsWith("/admin") ?? false)}>Admin</Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="ml-1 px-3 py-1.5 rounded-full text-sm text-mute hover:text-ink hover:bg-panel"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link href="/login" className={navLink(pathname === "/login")}>Admin login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
