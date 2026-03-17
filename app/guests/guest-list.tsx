"use client";

import { useState } from "react";
import type { Guest } from "@/app/lib/sheets";

export default function GuestList({ guests }: { guests: Guest[] }) {
  const [active, setActive] = useState<string | null>(null);

  const categories = [...new Set(guests.map((g) => g.profession).filter(Boolean))].sort() as string[];

  const filtered = active
    ? guests.filter((g) => g.profession === active)
    : guests;

  return (
    <>
      <div className="mx-auto mb-10 flex max-w-5xl flex-wrap justify-center gap-x-4 gap-y-2">
        <button
          onClick={() => setActive(null)}
          className={`text-[10px] uppercase tracking-[0.15em] transition-colors ${
            active === null ? "text-white/70" : "text-white/40 hover:text-white/70"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(active === cat ? null : cat)}
            className={`text-[10px] uppercase tracking-[0.15em] transition-colors ${
              active === cat ? "text-white/70" : "text-white/40 hover:text-white/70"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mx-auto max-w-5xl columns-1 gap-x-12 sm:columns-2 lg:columns-3">
        {filtered.map((guest) => (
          <p
            key={guest.name}
            className="mb-2 text-sm leading-relaxed tracking-wide text-white/80"
          >
            {guest.name}
            {guest.profession && (
              <span className="text-xs text-white/40"> ({guest.profession})</span>
            )}
          </p>
        ))}
      </div>
    </>
  );
}
