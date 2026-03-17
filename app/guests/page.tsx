import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getGuestNames, type Guest } from "@/app/lib/sheets";
import GuestList from "./guest-list";

export const metadata: Metadata = {
  title: "Dream Guests | Archive Media",
  description: "Our dream guest list for the Archive Media podcast",
};

export const revalidate = 3600;

export default async function GuestsPage() {
  let guests: Guest[] = [];
  let error = false;

  try {
    guests = await getGuestNames();
  } catch (e) {
    console.error("Failed to fetch guest list:", e);
    error = true;
  }

  return (
    <main className="min-h-screen bg-black px-6 py-16 md:px-12 lg:px-20">
      <Link href="/" className="mb-6 flex justify-center">
        <Image
          src="/archive-logo.webp"
          alt="Archive Media"
          width={400}
          height={200}
          priority
          className="w-[120px]"
        />
      </Link>
      <p className="mb-12 text-center text-[10px] tracking-[0.15em] uppercase text-white/40">
        <a
          href="mailto:contact@archive.media"
          className="transition-colors hover:text-white/70"
        >
          contact@archive.media
        </a>
      </p>

      {error ? (
        <p className="text-center text-sm text-white/50">
          Unable to load the guest list. Please try again later.
        </p>
      ) : guests.length === 0 ? (
        <p className="text-center text-sm text-white/50">
          No guests to display.
        </p>
      ) : (
        <GuestList guests={guests} />
      )}

      <footer className="mt-20 border-t border-white/10 pt-8 text-center">
        <p className="text-[10px] tracking-[0.15em] uppercase text-white/40">
          <a
            href="mailto:contact@archive.media"
            className="transition-colors hover:text-white/70"
          >
            contact@archive.media
          </a>
        </p>
      </footer>
    </main>
  );
}
