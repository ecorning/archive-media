import type { Metadata } from "next";
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
    <>
      {error ? (
        <main className="min-h-screen bg-black px-6 py-16 flex items-center justify-center">
          <p className="text-center text-sm text-white/50">
            Unable to load the guest list. Please try again later.
          </p>
        </main>
      ) : guests.length === 0 ? (
        <main className="min-h-screen bg-black px-6 py-16 flex items-center justify-center">
          <p className="text-center text-sm text-white/50">
            No guests to display.
          </p>
        </main>
      ) : (
        <GuestList guests={guests} />
      )}
    </>
  );
}
