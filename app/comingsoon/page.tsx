"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Waitlist() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    try {
      await fetch("/api/comingsoon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.get("firstName"),
          lastName: form.get("lastName"),
          email: form.get("email"),
        }),
      });
    } catch {
      // still show thank you even if save fails
    }
    setSubmitted(true);
    setSubmitting(false);
  }

  return (
    <main className="flex min-h-screen flex-col bg-black px-6">
      <div className="py-8 text-center">
        <Link href="/">
          <Image
            src="/archive-logo.webp"
            alt="Archive Media"
            width={400}
            height={200}
            className="inline-block w-[120px]"
          />
        </Link>
      </div>

      <div className="mx-auto w-full max-w-md flex-1 flex flex-col justify-center">

        {!submitted ? (
          <>
            <h1 className="mb-2 text-lg tracking-wide text-white">
              join the waitlist
            </h1>
            <p className="mb-10 text-sm text-white/60">
              be the first to know when we launch
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              <input
                type="text"
                name="firstName"
                placeholder="first name"
                required
                className="border-b border-white/20 bg-transparent px-0 py-3 text-sm tracking-wide text-white placeholder-white/40 outline-none transition focus:border-white/60"
              />
              <input
                type="text"
                name="lastName"
                placeholder="last name"
                required
                className="border-b border-white/20 bg-transparent px-0 py-3 text-sm tracking-wide text-white placeholder-white/40 outline-none transition focus:border-white/60"
              />
              <input
                type="email"
                name="email"
                placeholder="email"
                required
                className="border-b border-white/20 bg-transparent px-0 py-3 text-sm tracking-wide text-white placeholder-white/40 outline-none transition focus:border-white/60"
              />

              <button
                type="submit"
                disabled={submitting}
                className="mt-4 border border-white/20 bg-transparent px-6 py-3 text-sm tracking-wide text-white transition hover:bg-white hover:text-black disabled:opacity-50"
              >
                {submitting ? "submitting..." : "submit"}
              </button>
            </form>
          </>
        ) : (
          <div>
            <h1 className="mb-2 text-lg tracking-wide text-white">
              thank you
            </h1>
            <p className="text-sm text-white/60">
              we&apos;ll be in touch soon
            </p>
          </div>
        )}
      </div>

      {/* Social icons */}
      <div className="py-8 flex items-center justify-center gap-2">
        <a href="https://www.instagram.com/archive.media/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="17.5" cy="6.5" r="1.5" fill="#444" stroke="none" />
          </svg>
        </a>
        <a href="https://www.tiktok.com/@archive.media.pod" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#444">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.84 2.84 0 0 1 .84.13v-3.5a6.37 6.37 0 0 0-.84-.05A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 10.86 4.43V13.1a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.81.07 4.84 4.84 0 0 1-.38-.02V6.69h2z" />
          </svg>
        </a>
        <a href="https://archive.media/comingsoon" aria-label="Spotify">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#444">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381C8.64 5.801 15.6 6.06 20.04 8.7c.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.379.42z" />
          </svg>
        </a>
        <a href="https://archive.media/comingsoon" aria-label="YouTube">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#444">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </a>
      </div>
    </main>
  );
}
