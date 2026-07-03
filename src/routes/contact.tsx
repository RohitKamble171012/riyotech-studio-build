import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, FormEvent } from "react";
import { Navbar } from "../components/riyotech/Navbar";
import { Footer } from "../components/riyotech/Footer";

export const Route = createFileRoute("/contact")({
  component: Contact,
});

function Contact() {
  const [isMounted, setIsMounted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: wire this up to a real submission endpoint (e.g. an API route,
    // Formspree, or an email service) — this currently only updates local UI state.
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen font-display overflow-hidden text-white bg-[var(--ink)]">
      <Navbar />

      {/* HERO */}
      <section className="relative z-10 flex min-h-[55vh] items-end overflow-hidden px-6 pt-32 pb-16 md:px-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 80% 20%, rgba(233,78,52,0.2), transparent 55%), radial-gradient(circle at 15% 85%, rgba(255,255,255,0.06), transparent 45%)",
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
            Let's Talk
          </div>
          <h1 className="font-display text-[10vw] md:text-[5.5vw] font-bold leading-[0.98] tracking-[-0.03em]">
            Hi. Tell us<br />about your project.
          </h1>
          <p className="mt-10 max-w-xl text-lg leading-relaxed text-white/70 md:text-xl">
            Fill out the form below, or{" "}
            <a href="mailto:support@riyotech.in" className="underline decoration-[#E94E34]/50 hover:decoration-[#E94E34]" style={{ color: "var(--flame)" }}>
              send us an email
            </a>
            .
          </p>
        </div>
      </section>

      {/* FORM + SIGNATURE PANEL */}
      <section className="relative z-20 bg-white text-[#0d0e12] px-6 py-20 md:px-14 md:py-28">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 md:gap-20 items-start">
          {/* Form */}
          <div>
            {submitted ? (
              <div className="border border-[#0d0e12]/10 rounded-sm p-10 md:p-12">
                <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-4">Thanks — got it.</h3>
                <p className="text-[#0d0e12]/70 text-base md:text-lg leading-relaxed">
                  We'll get back to you shortly. In the meantime, feel free to reach us directly at{" "}
                  <a href="mailto:support@riyotech.in" className="underline" style={{ color: "var(--flame)" }}>
                    support@riyotech.in
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div>
                  <label htmlFor="name" className="block text-[11px] font-semibold uppercase tracking-[0.3em] text-[#0d0e12]/50 mb-3">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange("name")}
                    placeholder="Jane Doe"
                    className="w-full border-b border-[#0d0e12]/20 pb-3 text-lg md:text-xl bg-transparent outline-none focus:border-[var(--flame)] transition-colors placeholder:text-[#0d0e12]/30"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[11px] font-semibold uppercase tracking-[0.3em] text-[#0d0e12]/50 mb-3">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange("email")}
                    placeholder="jane@company.com"
                    className="w-full border-b border-[#0d0e12]/20 pb-3 text-lg md:text-xl bg-transparent outline-none focus:border-[var(--flame)] transition-colors placeholder:text-[#0d0e12]/30"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-[11px] font-semibold uppercase tracking-[0.3em] text-[#0d0e12]/50 mb-3">
                    Tell us about your project
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange("message")}
                    placeholder="What are you looking to build?"
                    className="w-full border-b border-[#0d0e12]/20 pb-3 text-lg md:text-xl bg-transparent outline-none focus:border-[var(--flame)] transition-colors resize-none placeholder:text-[#0d0e12]/30"
                  />
                </div>

                <button
                  type="submit"
                  className="group mt-4 inline-flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.32em] w-fit"
                >
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-[var(--flame)] text-white transition-transform group-hover:scale-105">
                    <span className="text-lg leading-none">+</span>
                  </span>
                  <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-100 after:bg-[#0d0e12] after:transition-transform">
                    Submit
                  </span>
                </button>
              </form>
            )}
          </div>

          {/* Signature panel — replaces a stock photo with an on-brand mark */}
          <div
            className="relative overflow-hidden rounded-sm p-10 md:p-14 flex flex-col justify-end min-h-[420px]"
            style={{ background: "linear-gradient(155deg, var(--flame) 0%, #b93a26 100%)" }}
          >
            <span
              aria-hidden
              className="absolute -right-10 -top-10 text-[11rem] font-bold font-display leading-none text-white/10 select-none"
            >
              RT
            </span>
            <p className="relative text-white text-xl md:text-2xl font-medium leading-snug max-w-sm">
              Every great website starts with a short, honest conversation. Let's have it.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="relative z-20 bg-[#F9F9F9] text-[#0d0e12] px-6 py-20 md:px-14 md:py-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="rounded-sm bg-white p-10 md:p-12 border border-[#0d0e12]/10">
            <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-4">Let's Talk</h3>
            <p className="text-[#0d0e12]/70 text-base md:text-lg leading-relaxed mb-6">
              Tell us about your next project.
            </p>
            <a
              href="mailto:support@riyotech.in"
              className="text-lg md:text-xl underline underline-offset-4 decoration-[#E94E34]/40 hover:decoration-[#E94E34] transition-colors"
              style={{ color: "var(--flame)" }}
            >
              support@riyotech.in
            </a>
          </div>

          <div className="rounded-sm bg-white p-10 md:p-12 border border-[#0d0e12]/10">
            <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-4">Say Hello</h3>
            <p className="text-[#0d0e12]/70 text-base md:text-lg leading-relaxed mb-6">
              Drop us a line or give us a call.
            </p>
            <a
              href="mailto:support@riyotech.in"
              className="block text-lg md:text-xl underline underline-offset-4 decoration-[#E94E34]/40 hover:decoration-[#E94E34] transition-colors mb-2 w-fit"
              style={{ color: "var(--flame)" }}
            >
              support@riyotech.in
            </a>
            <a
              href="tel:+918010031808"
              className="block text-lg md:text-xl underline underline-offset-4 decoration-[#E94E34]/40 hover:decoration-[#E94E34] transition-colors w-fit"
              style={{ color: "var(--flame)" }}
            >
              +91 80100 31808
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
