import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-shell flex min-h-[70vh] items-center pt-28">
      <section className="section-shell ink-wash w-full overflow-hidden p-8 md:p-12">
        <div className="relative z-10 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-crimson">404</p>
          <h1 className="mt-3 font-serif text-3xl text-navy md:text-5xl">
            Page not found
          </h1>
          <p className="mt-4 text-sm leading-7 text-navy/72 md:text-base">
            The page may have moved, or the address may be incorrect. Return to
            the homepage or browse the latest announcements.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-full border-2 border-navy bg-navy px-5 py-2.5 text-sm font-medium text-white shadow-[0_8px_24px_rgba(26,26,26,0.22)] transition hover:bg-white hover:text-navy"
            >
              Back home
            </Link>
            <Link
              href="/news/"
              className="rounded-full border border-navy/15 bg-white/70 px-5 py-2.5 text-sm font-medium text-navy transition hover:bg-white"
            >
              Announcements
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
