import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Navbar } from "../components/riyotech/Navbar";
import { Footer } from "../components/riyotech/Footer";
import { useChatWidget } from "../components/riyotech/ChatWidgetContext";

export const Route = createFileRoute("/about")({
  component: About,
});

// --- DATA ---
// "Well-Deserved Benefits" (medical/dental/office-perks card) intentionally
// removed — not relevant for a small remote team.
const values = [
  {
    title: "Forward-Thinking",
    text: "We stay close to what's actually changing in the stack — not to chase trends, but to build things that hold up two years from now.",
  },
  {
    title: "Always Learning",
    text: "Every project is a chance to get sharper. We'd rather ship something we learned from than repeat what already worked once.",
  },
  {
    title: "Detail-Oriented",
    text: "The parts nobody mentions in the brief — spacing, load time, an honest error state — are usually the parts that matter most.",
  },
  {
    title: "Great Character",
    text: "Skill gets you in the room. How you treat a client's problem, deadline, and budget is what keeps you in it.",
  },
  {
    title: "Self-Starting",
    text: "Nobody on this team waits to be told what's next. Ownership from first call to final deploy is the baseline, not a bonus.",
  },
  {
    title: "Stay Humble",
    text: "We'll push back when it serves the work, but the goal is always the client's outcome — not being right.",
  },
  {
    title: "Work Hard, Ship Hard",
    text: "Late nights happen. What matters is that they end with something live, not just something planned.",
  },
];

const stack = [
  "React", "TypeScript", "Node.js", "TanStack Router", "Tailwind CSS",
  "Framer Motion", "LangChain", "RAG Pipelines", "Vercel",
];

// Placeholder client feedback — swap in real quotes once you have
// written permission from each client to publish them.
const testimonials = [
  {
    quote:
      "They came in with a full audit before we'd even signed anything — that told us everything about how they work.",
    role: "Founder, Food & Beverage Consulting Client",
  },
  {
    quote:
      "Fast turnaround, clean handoff, and they actually explained the DNS and email setup instead of just doing it silently.",
    role: "Founder, Music Academy Client",
  },
  {
    quote:
      "Our product catalog finally looks like the parts we're proud of making, not a spreadsheet with photos.",
    role: "Ops Lead, Manufacturing Client",
  },
];

// Recent builds — real projects, used in place of Baunfire's office
// photo gallery since there isn't a studio to photograph yet.
const builds = [
  { name: "Evaresst Agro", tag: "F&B Consulting", note: "Landing page, brand audit, Zoho Mail DNS setup" },
  { name: "Varjay Music Academy", tag: "Hindustani Classical Music", note: "Full site, courses, faculty pricing system" },
  { name: "Sharp Engineering", tag: "Precision Manufacturing", note: "Product catalog, 22 SKUs, lightbox gallery" },
  { name: "Trikriti Studio", tag: "3D-Printed Home Decor", note: "Hero slider, responsive product layout" },
];

// --- SCROLL REVEAL HOOK ---
function useReveal<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function AnimatedHeadline({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-top mr-[0.28em]">
          <span
            className="inline-block"
            style={{
              animation: `riyo-word-up 900ms cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * 70}ms both`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </>
  );
}

// --- VALUE CARD ---
function ValueCard({ value, idx }: { value: (typeof values)[number]; idx: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.15);
  return (
    <div
      ref={ref}
      className="border-t border-[#0d0e12]/10 py-8 pr-6"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(26px)",
        transition: `opacity 650ms ease-out ${(idx % 4) * 70}ms, transform 750ms cubic-bezier(0.16, 1, 0.3, 1) ${(idx % 4) * 70}ms`,
      }}
    >
      <h4 className="font-display text-xl md:text-2xl font-bold tracking-tight text-[#0d0e12] mb-3">
        {value.title}
      </h4>
      <p className="text-[#0d0e12]/60 text-sm md:text-base leading-relaxed max-w-xs">{value.text}</p>
    </div>
  );
}

// --- TESTIMONIAL CARD ---
function TestimonialCard({ item, idx }: { item: (typeof testimonials)[number]; idx: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.2);
  return (
    <div
      ref={ref}
      className="rounded-sm border border-white/10 p-8 md:p-10 flex flex-col justify-between min-h-[260px]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 700ms ease-out ${idx * 120}ms, transform 850ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 120}ms`,
      }}
    >
      <p className="text-white/80 text-lg leading-relaxed">"{item.quote}"</p>
      <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: "var(--flame)" }}>
        {item.role}
      </p>
    </div>
  );
}

// --- BUILD TILE ---
function BuildTile({ build, idx }: { build: (typeof builds)[number]; idx: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.2);
  const [hovered, setHovered] = useState(false);
  const gradients = [
    "linear-gradient(155deg, #1c3a2e 0%, #0d0e12 100%)",
    "linear-gradient(155deg, var(--flame) 0%, #7a2416 100%)",
    "linear-gradient(155deg, #2b2f3a 0%, #0d0e12 100%)",
    "linear-gradient(155deg, #3a2418 0%, #0d0e12 100%)",
  ];
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden rounded-sm min-h-[320px] flex flex-col justify-end p-8 cursor-pointer flex-shrink-0 w-[280px] md:w-[340px]"
      style={{
        background: gradients[idx % gradients.length],
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 700ms ease-out ${idx * 100}ms, transform 850ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 100}ms`,
      }}
    >
      <span className="absolute top-6 right-6 text-[11px] font-semibold tracking-widest text-white/40">
        0{idx + 1}
      </span>
      <span
        className="text-[11px] font-semibold uppercase tracking-[0.24em] mb-3 transition-opacity duration-300"
        style={{ color: "var(--flame)", opacity: hovered ? 1 : 0.8 }}
      >
        {build.tag}
      </span>
      <h4 className="font-display text-2xl font-bold tracking-tight text-white mb-2">{build.name}</h4>
      <p
        className="text-white/60 text-sm leading-relaxed overflow-hidden transition-all duration-300"
        style={{ maxHeight: hovered ? "60px" : "0px", opacity: hovered ? 1 : 0 }}
      >
        {build.note}
      </p>
    </div>
  );
}

// --- MAIN PAGE ---
function About() {
  const [isMounted, setIsMounted] = useState(false);
  const marquee = useReveal<HTMLDivElement>(0.2);
  const testimonialSection = useReveal<HTMLDivElement>(0.1);
  const tagline = useReveal<HTMLDivElement>(0.3);
  const { open: openChat } = useChatWidget();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen font-display overflow-hidden text-white bg-[var(--ink)]">
      <style>{`
        @keyframes riyo-word-up {
          from { opacity: 0; transform: translateY(115%) rotate(2deg); }
          to { opacity: 1; transform: translateY(0) rotate(0deg); }
        }
      `}</style>

      <Navbar />

      {/* HERO */}
      <section className="relative z-10 px-6 pt-32 pb-16 md:px-14">
        <div className="max-w-6xl mx-auto">
          <div
            className="mb-8 text-[11px] font-semibold uppercase tracking-[0.42em]"
            style={{
              color: "var(--flame)",
              opacity: isMounted ? 1 : 0,
              transform: isMounted ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 700ms ease-out 100ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) 100ms",
            }}
          >
            Who We Are
          </div>

          <h1 className="font-display text-[9.5vw] md:text-[5vw] font-bold leading-[1.02] tracking-[-0.03em] max-w-4xl">
            {isMounted && (
              <>
                <div className="overflow-hidden">
                  <AnimatedHeadline text="A small team," delay={200} />
                </div>
                <div className="overflow-hidden">
                  <AnimatedHeadline text="obsessed with digital." delay={200} />
                </div>
              </>
            )}
          </h1>

          <p
            className="mt-8 max-w-lg text-lg leading-relaxed text-white/70 md:text-xl"
            style={{
              opacity: isMounted ? 1 : 0,
              transform: isMounted ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 800ms ease-out 800ms, transform 900ms cubic-bezier(0.16, 1, 0.3, 1) 800ms",
            }}
          >
            Building considered, fast, and maintainable web experiences — one client at a time.
          </p>
        </div>

        {/* Hero visual — gradient signature panel in place of a stock office photo */}
        <div
          className="max-w-6xl mx-auto mt-16 relative rounded-sm overflow-hidden h-[45vh] md:h-[55vh]"
          style={{
            background:
              "radial-gradient(circle at 25% 20%, rgba(233,78,52,0.35), transparent 55%), linear-gradient(155deg, #1a1b20 0%, #0d0e12 100%)",
            opacity: isMounted ? 1 : 0,
            transform: isMounted ? "scale(1)" : "scale(0.97)",
            transition: "opacity 1000ms ease-out 500ms, transform 1100ms cubic-bezier(0.16, 1, 0.3, 1) 500ms",
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <span className="absolute bottom-8 left-8 font-display text-6xl md:text-8xl font-bold tracking-tight text-white/10 select-none">
            RIYOTECH
          </span>
        </div>
      </section>

      {/* MARQUEE STATEMENT */}
      <section ref={marquee.ref} className="relative z-20 px-6 py-20 md:px-14 md:py-28 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div>
            <div
              className="mb-6 text-[11px] font-semibold uppercase tracking-[0.42em]"
              style={{ color: "var(--flame)" }}
            >
              A Digital Studio
            </div>
            <h2
              className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] max-w-3xl"
              style={{
                opacity: marquee.visible ? 1 : 0,
                transform: marquee.visible ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 800ms ease-out, transform 900ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              Building considered websites for brands that actually ship.
            </h2>
          </div>
          <a
            href="/work"
            className="group inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] flex-shrink-0"
            style={{
              opacity: marquee.visible ? 1 : 0,
              transition: "opacity 800ms ease-out 200ms",
            }}
          >
            Our Work
            <span className="grid h-10 w-10 place-items-center rounded-full border border-white/40 transition-all group-hover:bg-white group-hover:text-[var(--ink)]">
              <span className="text-base leading-none">+</span>
            </span>
          </a>
        </div>
      </section>

      {/* VALUES GRID */}
      <section className="relative z-20 bg-white text-[#0d0e12] px-6 py-24 md:px-14 md:py-32">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight max-w-2xl mb-16 md:mb-20">
            Our culture, values, and beliefs.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8">
            {values.map((value, idx) => (
              <ValueCard key={value.title} value={value} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK STRIP — stands in for an awards row */}
      <section className="relative z-20 bg-[#F9F9F9] text-[#0d0e12] px-6 py-16 md:px-14 md:py-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-[11px] font-semibold uppercase tracking-[0.42em] mb-10" style={{ color: "var(--flame)" }}>
            Built With Tools We Trust
          </p>
          <div className="flex flex-wrap gap-x-10 gap-y-5">
            {stack.map((item) => (
              <span key={item} className="font-display text-xl md:text-2xl font-semibold tracking-tight text-[#0d0e12]/70">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section ref={testimonialSection.ref} className="relative z-20 px-6 py-24 md:px-14 md:py-32">
        <div className="max-w-6xl mx-auto">
          <h2
            className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] max-w-3xl mb-16"
            style={{
              opacity: testimonialSection.visible ? 1 : 0,
              transform: testimonialSection.visible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 800ms ease-out, transform 900ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            Making each client happy, one project at a time.
          </h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((item, idx) => (
              <TestimonialCard key={item.role} item={item} idx={idx} />
            ))}
          </div>
          <p className="mt-8 text-white/30 text-xs max-w-xl">
            Placeholder quotes — swap in real client testimonials once you have permission to publish them.
          </p>
        </div>
      </section>

      {/* REPEAT TAGLINE */}
      <section ref={tagline.ref} className="relative z-20 bg-[#F9F9F9] text-[#0d0e12] px-6 py-20 md:px-14 md:py-28">
        <div
          className="max-w-6xl mx-auto"
          style={{
            opacity: tagline.visible ? 1 : 0,
            transform: tagline.visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 800ms ease-out, transform 900ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.42em] mb-6" style={{ color: "var(--flame)" }}>
            A Digital Studio
          </p>
          <h3 className="font-display text-3xl md:text-5xl font-bold tracking-tight max-w-3xl">
            Making great things, one client at a time.
          </h3>
        </div>
      </section>
    
        {/* CTA */}
      <section className="relative z-20 bg-[#E94E34] text-white px-6 py-24 md:px-14 md:py-32 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-16 -bottom-16 h-64 w-64 rounded-full border border-white/15"
        />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-10 relative">
          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.42em] mb-8 opacity-80">Work With Us</h2>
            <h3 className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] max-w-2xl">
              Let's work together to build something great.
            </h3>
          </div>
          <button
            onClick={openChat}
            className="group inline-flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.32em] flex-shrink-0"
          >
            <span className="grid h-14 w-14 place-items-center rounded-full border border-white/40 transition-all group-hover:bg-white group-hover:text-[#E94E34]">
              <span className="text-lg leading-none">+</span>
            </span>
            <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-100 after:bg-white after:transition-transform">
              Say Hello
            </span>
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
