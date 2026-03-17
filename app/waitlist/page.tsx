"use client";

import { useState } from "react";
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
    <main className="flex min-h-screen flex-col items-center justify-center bg-black px-6">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-12 block text-sm tracking-wide text-white/60 hover:text-white"
        >
          &larr; back
        </Link>

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
              we&apos;ll be in touch soon.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
