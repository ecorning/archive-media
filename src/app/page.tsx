import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black px-6">
      {/* Main row: tagline | logo | contact */}
      <div className="flex w-full max-w-6xl flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
        <p className="order-2 text-sm tracking-wide text-white/90 lg:order-1 lg:flex-1">
          building an archive of stories
        </p>

        <Image
          src="/archive-logo.webp"
          alt="Archive Media"
          width={400}
          height={200}
          priority
          className="order-1 w-[280px] md:w-[360px] lg:order-2 lg:w-[440px]"
        />

        <a
          href="mailto:contact@archive.media"
          className="order-3 text-sm tracking-wide text-white/90 underline underline-offset-4 hover:text-white lg:flex-1 lg:text-right"
        >
          contact
        </a>
      </div>

      {/* Coming soon */}
      <p className="mt-16 text-sm tracking-wide text-white/90">coming soon</p>
    </main>
  );
}
