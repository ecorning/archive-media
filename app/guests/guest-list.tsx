"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Guest } from "@/app/lib/sheets";

export default function GuestList({ guests }: { guests: Guest[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [light, setLight] = useState(false);

  const categories = [...new Set(guests.map((g) => g.category).filter(Boolean))].sort() as string[];

  const filtered = active
    ? guests.filter((g) => g.category === active)
    : guests;

  return (
    <div className={`relative min-h-screen px-6 py-16 transition-colors duration-300 md:px-12 lg:px-20 ${light ? "bg-white" : "bg-black"}`}>
      <button
        onClick={() => setLight(!light)}
        className={`absolute right-6 top-6 text-[10px] uppercase tracking-[0.15em] transition-colors ${light ? "text-black/40 hover:text-black/70" : "text-white/40 hover:text-white/70"}`}
      >
        {light ? "Dark Mode" : "Print Mode"}
      </button>
      <Link href="/" className="mb-6 flex justify-center">
        <Image
          src="/archive-logo.webp"
          alt="Archive Media"
          width={400}
          height={200}
          priority
          className={`w-[120px] transition-all duration-300 ${light ? "invert" : ""}`}
        />
      </Link>
      <p className={`mb-12 text-center text-[10px] uppercase tracking-[0.15em] transition-colors ${light ? "text-black/40" : "text-white/40"}`}>
        <a
          href="mailto:contact@archive.media"
          className={`transition-colors ${light ? "hover:text-black/70" : "hover:text-white/70"}`}
        >
          contact@archive.media
        </a>
      </p>

      <div className="mx-auto mb-10 flex max-w-5xl flex-wrap justify-center gap-x-4 gap-y-2">
        <button
          onClick={() => setActive(null)}
          className={`text-[10px] uppercase tracking-[0.15em] transition-colors ${
            active === null
              ? (light ? "text-black/70" : "text-white/70")
              : (light ? "text-black/40 hover:text-black/70" : "text-white/40 hover:text-white/70")
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(active === cat ? null : cat)}
            className={`text-[10px] uppercase tracking-[0.15em] transition-colors ${
              active === cat
                ? (light ? "text-black/70" : "text-white/70")
                : (light ? "text-black/40 hover:text-black/70" : "text-white/40 hover:text-white/70")
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mx-auto max-w-7xl columns-1 gap-x-12 sm:columns-2 md:columns-3 lg:columns-4">
        {filtered.map((guest) => (
          <p
            key={guest.name}
            className={`mb-2 text-sm leading-relaxed tracking-wide transition-colors duration-300 ${light ? "text-black/80" : "text-white/80"}`}
          >
            {guest.name}
            {guest.profession && (
              <span className={`text-xs transition-colors duration-300 ${light ? "text-black/40" : "text-white/40"}`}> ({guest.profession})</span>
            )}
          </p>
        ))}
      </div>

      <footer className={`mt-20 border-t pt-8 text-center transition-colors duration-300 ${light ? "border-black/10" : "border-white/10"}`}>
        <p className={`text-[10px] uppercase tracking-[0.15em] ${light ? "text-black/40" : "text-white/40"}`}>
          <a
            href="mailto:contact@archive.media"
            className={`transition-colors ${light ? "hover:text-black/70" : "hover:text-white/70"}`}
          >
            contact@archive.media
          </a>
        </p>
      </footer>
    </div>
  );
}
