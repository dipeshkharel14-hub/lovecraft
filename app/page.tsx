
import Link from "next/link";

const supportLinks = [
  {
    name: "HSEPID.np",
    description: "Primary support and assistance",
    url: "https://hsepidnp.vercel.app/",
    primary: true,
  },
  {
    name: "Dipesh Kharel",
    description: "Developer's official portfolio",
    url: "https://www.dipeshkharel14.com.np/",
    primary: false,
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#10141b] text-[#f3f2ed]">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-48 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#5f7f9f]/10 blur-[130px]" />
        <div className="absolute right-0 top-[45%] h-80 w-80 rounded-full bg-blue-500/[0.06] blur-[110px]" />
      </div>

      {/* Navigation */}
      <header className="relative z-10 border-b border-white/[0.08] bg-[#10141b]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/../LoveCraft Heartfelt Digital Logo.png"
              alt="LoveCraft logo"
              className="h-11 w-11 rounded-xl object-contain"
            />
            <div>
              <span className="block text-lg font-bold tracking-tight">
                LoveCraft
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                Heartfelt digital experiences
              </span>
            </div>
          </Link>

          <Link
            href="/login"
            className="rounded-lg border border-white/15 px-5 py-2.5 text-sm font-medium transition hover:border-[#7e9bb8] hover:bg-white/5"
          >
            Sign in →
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto flex min-h-[75vh] max-w-7xl flex-col justify-center px-6 py-24">
        <div className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-[#7e9bb8]/25 bg-[#7e9bb8]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#a9c0d8]">
          <span className="text-base">♥</span>
          Made for the moments that matter
        </div>

        <h1 className="max-w-5xl font-serif text-5xl font-medium leading-[1.08] tracking-tight sm:text-7xl lg:text-8xl">
          Some feelings deserve
          <span className="mt-2 block text-[#91abc7]">
            more than a message.
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
          Create a personal digital surprise for someone special. Bring your
          memories, photographs, music, and heartfelt words together in an
          experience they can revisit and remember.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/create"
            className="rounded-xl bg-[#91abc7] px-7 py-4 font-semibold text-[#10141b] shadow-lg shadow-blue-950/20 transition hover:-translate-y-1 hover:bg-[#b0c4d9]"
          >
            Create a Surprise →
          </Link>

          <Link
            href="/dashboard"
            className="rounded-xl border border-white/15 px-7 py-4 font-medium transition hover:border-white/30 hover:bg-white/5"
          >
            My Dashboard
          </Link>
        </div>

        <div className="mt-20 grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: "✉",
              title: "Your words",
              description:
                "Create heartfelt letters, birthday wishes, apologies, and personal messages.",
            },
            {
              icon: "▧",
              title: "Your memories",
              description:
                "Bring photographs, videos, music, and special moments together.",
            },
            {
              icon: "↗",
              title: "Your own link",
              description:
                "Share your personalized surprise through a unique private link and QR code.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/[0.09] bg-white/[0.025] p-7 transition hover:border-[#7e9bb8]/40"
            >
              <div className="text-2xl text-[#91abc7]">{item.icon}</div>
              <h2 className="mt-5 text-lg font-semibold">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-white/45">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Account assistance */}
      <section className="relative z-10 border-y border-white/[0.08] bg-[#191f28]/70">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#91abc7]">
              Account assistance
            </div>

            <h2 className="mt-5 max-w-xl font-serif text-3xl leading-tight sm:text-5xl">
              Having trouble creating your account?
            </h2>

            <p className="mt-6 max-w-xl leading-8 text-white/55">
              We understand that account registration and email verification
              may occasionally cause difficulties. Don't worry — you can still
              access LoveCraft using the alternative sign-in method below.
            </p>

            <div className="mt-9 rounded-2xl border border-[#7e9bb8]/25 bg-[#7e9bb8]/[0.07] p-6">
              <div className="flex items-center gap-3">
                <span className="text-xl text-[#91abc7]">✦</span>
                <h3 className="font-semibold text-[#d4e1ed]">
                  Recommended: Continue with Google
                </h3>
              </div>

              <p className="mt-3 text-sm leading-7 text-white/55">
                If creating an account with email is not working, choose
                Continue with Google on the sign-in or registration screen.
                You can use your Google account to create an account or sign in
                to an existing Google-linked account.
              </p>

              <Link
                href="/login"
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#91abc7] px-6 py-3 font-semibold text-[#10141b] transition hover:bg-[#b0c4d9]"
              >
                Continue to sign in →
              </Link>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                  01
                </span>
                <h3 className="font-semibold">Already registered?</h3>
              </div>
              <p className="mt-4 text-sm leading-7 text-white/50">
                If you already have an account, sign in using the same
                registered email address and password. You don't need to
                create another account.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                  02
                </span>
                <h3 className="font-semibold">Still experiencing problems?</h3>
              </div>
              <p className="mt-4 text-sm leading-7 text-white/50">
                If registration, verification, Google sign-in, or account
                access is not working, contact our developer for assistance.
                Please never share your password or verification code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-3xl border border-[#7e9bb8]/20 bg-gradient-to-br from-[#202c39] to-[#151b23] p-8 sm:p-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#91abc7]/20 bg-[#91abc7]/10 text-2xl text-[#b0c4d9]">
              ◈
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#91abc7]">
                Your privacy matters
              </div>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
                Your memories deserve care.
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-white/55">
                Your personal information and creations matter to us. We take
                your privacy seriously and work to handle your data with care.
                You can feel comfortable creating meaningful experiences on
                LoveCraft. For your protection, keep your password private and
                share your surprise links only with people you trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HSEPID Support */}
      <section className="relative z-10 border-t border-white/[0.08] bg-[#191f28]/60">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#91abc7]">
              Supported by HSEPID
            </div>

            <h2 className="mt-5 font-serif text-4xl sm:text-5xl">
              We're here to help.
            </h2>

            <p className="mt-5 leading-8 text-white/50">
              LoveCraft is developed by Dipesh Kharel. For technical support,
              account assistance, or questions about the platform, reach out
              through our official support and developer websites.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {supportLinks.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group rounded-2xl border p-7 transition hover:-translate-y-1 ${
                  item.primary
                    ? "border-[#91abc7]/40 bg-[#91abc7]/[0.08]"
                    : "border-white/10 bg-white/[0.025] hover:border-white/25"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold">{item.name}</span>
                  <span className="text-xl text-[#91abc7] transition group-hover:translate-x-1">
                    ↗
                  </span>
                </div>
                <p className="mt-3 text-sm text-white/45">
                  {item.description}
                </p>
                {item.primary && (
                  <span className="mt-5 inline-block rounded-full border border-[#91abc7]/30 px-3 py-1 text-xs text-[#b0c4d9]">
                    Primary support
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <footer className="relative z-10 border-t border-white/[0.08] px-6 py-12 text-center">
        <img
          src="/../LoveCraft Heartfelt Digital Logo.png"
          alt="LoveCraft"
          className="mx-auto mb-5 h-16 w-16 object-contain"
        />

        <h2 className="font-serif text-2xl">Thank you for choosing LoveCraft.</h2>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-white/40">
          Every message has a meaning. Every memory has a story.
          Thank you for letting us be part of yours.
        </p>

        <div className="mt-8 text-xs text-white/30">
          © {new Date().getFullYear()} LoveCraft · Developed by Dipesh Kharel
        </div>

        <a
          href="https://hsepidnp.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-xs font-semibold tracking-wider text-[#91abc7] hover:text-white"
        >
          AN HSEPID PROJECT ↗
        </a>
      </footer>
    </main>
  );
}
