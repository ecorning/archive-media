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
      await fetch("/api/waitlist", {
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
            <p className="mt-4 flex items-center gap-2 text-sm text-white/60">
              More from Archive at{" "}
              <a
                href="https://www.instagram.com/archive.media/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex text-white/60 transition-colors hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
