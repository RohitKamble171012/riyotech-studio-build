import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Navbar } from "../components/riyotech/Navbar";
import { Footer } from "../components/riyotech/Footer";

export const Route = createFileRoute("/careers")({
  component: Careers,
});

function Careers() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen font-display overflow-hidden text-white bg-[var(--ink)]">
      <Navbar />

      {/* HERO */}
      <section className="relative z-10 flex min-h-[70vh] items-end overflow-hidden px-6 pt-32 pb-20 md:px-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 80% 20%, rgba(233,78,52,0.18), transparent 55%), radial-gradient(circle at 15% 85%, rgba(255,255,255,0.06), transparent 45%)",
            opacity: isMounted ? 1 : 0,
            transition: "opacity 1200ms ease-out",
          }}
        />
        <div
          className="relative z-10 w-full max-w-6xl"
          style={{
            opacity: isMounted ? 1 : 0,
            transform: isMounted ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 800ms ease 300ms, transform 900ms cubic-bezier(0.16, 1, 0.3, 1) 300ms",
          }}
        >
          <div className="mb-8 text-[11px] font-semibold uppercase tracking-[0.42em]" style={{ color: "var(--flame)" }}>
            Careers
          </div>
          <h1 className="font-display text-[10vw] md:text-[5.5vw] font-bold leading-[0.98] tracking-[-0.03em]">
            We're just getting<br />started.
          </h1>
          <p className="mt-10 max-w-xl text-lg leading-relaxed text-white/70 md:text-xl">
            We're not hiring just yet, but we're building toward the day we are. Check back soon.
          </p>
        </div>
      </section>

      {/* COMING SOON BLOCK */}
      <section className="relative z-20 bg-white text-[#0d0e12] px-6 py-24 md:px-14 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "var(--flame)" }}>
            Coming Soon
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] mt-6 mb-8">
            No open roles right now — but this page is where they'll land.
          </h2>
          <p className="text-lg text-[#0d0e12]/70 leading-relaxed max-w-2xl mx-auto">
            As Riyotech grows, we'll be looking for designers, developers, and strategists who care about doing the
            work properly. If that sounds like you, feel free to reach out anyway — we'd rather hear from good people
            early than miss them later.
          </p>
          <a
            href="mailto:support@riyotech.in"
            className="group mt-12 inline-flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.32em]"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full border border-[#0d0e12]/20 transition-all group-hover:bg-[var(--flame)] group-hover:border-[var(--flame)] group-hover:text-white">
              <span className="text-lg leading-none">+</span>
            </span>
            <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-100 after:bg-[#0d0e12] after:transition-transform">
              Say hello anyway
            </span>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
