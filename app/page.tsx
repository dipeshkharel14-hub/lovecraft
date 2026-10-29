
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0b090e] text-white">
      <section className="mx-auto flex min-h-[85vh] max-w-6xl flex-col justify-center px-6 py-20">
        <div className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-pink-300/20 bg-pink-300/5 px-4 py-2 text-sm text-pink-200">
          <span>♥</span>
          <span>Make every feeling unforgettable</span>
        </div>

        <h1 className="max-w-4xl font-serif text-5xl font-medium leading-tight tracking-tight sm:text-7xl">
          Some feelings deserve
          <span className="block text-pink-300">
            more than a message.
          </span>
        </h1>

        <p className="mt-7 max-w-2xl text-lg leading-8 text-white/60">
          Create a beautiful digital surprise for someone special.
          Turn your memories, words, photographs, and little moments
          into a page they can keep forever.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/create"
            className="rounded-xl bg-pink-300 px-7 py-4 font-semibold text-black transition hover:bg-pink-200"
          >
            Create a Surprise →
          </Link>

          <Link
            href="/dashboard"
            className="rounded-xl border border-white/15 px-7 py-4 font-medium text-white transition hover:bg-white/5"
          >
            My Dashboard
          </Link>
        </div>

        <div className="mt-20 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="text-2xl">💌</div>
            <h2 className="mt-4 text-lg font-semibold">Your words</h2>
            <p className="mt-2 text-sm leading-6 text-white/55">
              Write letters, confessions, apologies, and heartfelt wishes.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="text-2xl">📸</div>
            <h2 className="mt-4 text-lg font-semibold">Your memories</h2>
            <p className="mt-2 text-sm leading-6 text-white/55">
              Bring special moments together with photos and personal touches.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="text-2xl">🔗</div>
            <h2 className="mt-4 text-lg font-semibold">One special link</h2>
            <p className="mt-2 text-sm leading-6 text-white/55">
              Share your surprise with someone special using its unique link.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-6 text-center text-sm text-white/40">
        LoveCraft · Made for the moments that matter.
      </footer>
    </main>
  );
}
