import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Navbar } from "../components/riyotech/Navbar";
import { Footer } from "../components/riyotech/Footer";
import { useChatWidget } from "../components/riyotech/ChatWidgetContext";

export const Route = createFileRoute("/services")({
  component: Services,
});

// --- DATA ---
// Ordered to read row-major across the two-column grid, e.g.
// "Website Design" pairs with "Responsive Web Design" on row one.
const services = [
  {
    title: "Website Design",
    blurb: "Visual identity and layout systems that make a brand feel considered before a single line of copy is read.",
  },
  {
    title: "Responsive Web Design",
    blurb: "Interfaces built to hold up across phones, tablets, and desktops without losing their shape or intent.",
  },
  {
    title: "UI/UX Design",
    blurb: "Interaction design grounded in how people actually move through a product, not how we wish they would.",
  },
  {
    title: "Content Management",
    blurb: "Editable, structured back-ends so your team can update copy, pages, and media without waiting on a developer.",
  },
  {
    title: "Website Development",
    blurb: "Fast, maintainable front-ends and back-ends built with a stack chosen for the problem, not for trend.",
  },
  {
    title: "Corporate Identity",
    blurb: "Logo, type, color, and voice tied together into a system your team can actually apply consistently.",
  },
  {
    title: "Insights & Analytics",
    blurb: "Instrumentation and dashboards that turn traffic into decisions instead of just numbers on a screen.",
  },
  {
    title: "Motion Graphics",
    blurb: "Purposeful animation, on-page and in video, that explains a product faster than paragraphs can.",
  },
  {
    title: "Research & Discovery",
    blurb: "Structured discovery work that surfaces what your users and market actually need before we design anything.",
  },
  {
    title: "Content Strategy",
    blurb: "A voice and content plan mapped to how people actually search, read, and decide.",
  },
  {
    title: "Marketing Materials",
    blurb: "One-pagers, decks, and campaign assets that stay on-brand without starting from a blank file each time.",
  },
  {
    title: "Presentations",
    blurb: "Pitch and investor decks structured to make the case first, and look sharp doing it.",
  },
  {
    title: "Competitive Analysis",
    blurb: "A clear-eyed look at where you stand against the field, and where the real openings are.",
  },
  {
    title: "SEO Services",
    blurb: "Technical and content foundations that help the right people find you without gaming the algorithm.",
  },
];

const process = [
  {
    num: "01",
    title: "Discover",
    text: "We start by understanding your business, your audience, and the environment you're operating in — before we design a single screen.",
  },
  {
    num: "02",
    title: "Strategize",
    text: "Research becomes a clear plan. We turn findings into a blueprint built to drive traffic and convert visitors into leads.",
  },
  {
    num: "03",
    title: "Execute",
    text: "Our team designs and builds with the full picture in mind — visually sharp, and grounded in real user experience.",
  },
  {
    num: "04",
    title: "Launch",
    text: "We take the work live, coordinating design, development, and everything else it takes to ship a complete program.",
  },
  {
    num: "05",
    title: "Evolve",
    text: "Once live, we track what's working with real metrics and keep refining — nothing ships and gets forgotten.",
  },
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

// --- HERO: STAGGERED WORD REVEAL ---
function AnimatedHeadline({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-top mr-[0.28em]">
          <span
            className="inline-block"
            style={{
              transform: "translateY(0)",
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

// --- SERVICE ROW (LIGHT, TWO-COLUMN) ---
function ServiceRow({ service, idx }: { service: (typeof services)[number]; idx: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.15);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group border-b border-[#0d0e12]/10 py-6 md:py-7 cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 650ms ease-out ${(idx % 7) * 60}ms, transform 750ms cubic-bezier(0.16, 1, 0.3, 1) ${(idx % 7) * 60}ms`,
      }}
    >
      <div className="flex items-center justify-between gap-6">
        <h3 className="font-display text-xl md:text-2xl font-semibold tracking-tight text-[#0d0e12] transition-colors duration-300 group-hover:text-[var(--flame)]">
          {service.title}
        </h3>
        <span
          aria-hidden
          className="flex-shrink-0 grid place-items-center h-7 w-7 text-lg font-light transition-transform duration-300 ease-out"
          style={{
            color: "var(--flame)",
            transform: hovered ? "rotate(135deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </div>
      <div
        className="grid transition-all duration-400 ease-in-out"
        style={{ gridTemplateRows: hovered ? "1fr" : "0fr", opacity: hovered ? 1 : 0 }}
      >
        <div className="overflow-hidden">
          <p className="max-w-md pt-3 text-[#0d0e12]/60 text-sm md:text-base leading-relaxed">
            {service.blurb}
          </p>
        </div>
      </div>
    </div>
  );
}

// --- ANIMATED PROCESS STEP ---
function ProcessStep({ step, idx }: { step: (typeof process)[number]; idx: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.25);

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 py-10 border-b border-[#0d0e12]/10 last:border-0"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-36px)",
        transition: `opacity 700ms ease-out ${idx * 90}ms, transform 800ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 90}ms`,
      }}
    >
      <div className="md:col-span-2 text-sm font-semibold tracking-widest" style={{ color: "var(--flame)" }}>
        {step.num}
      </div>
      <h4 className="md:col-span-3 font-display text-2xl md:text-3xl font-bold tracking-tight text-[#0d0e12]">
        {step.title}
      </h4>
      <p className="md:col-span-7 text-[#0d0e12]/70 text-base md:text-lg leading-relaxed max-w-2xl">{step.text}</p>
    </div>
  );
}

// --- MAIN PAGE ---
function Services() {
  const [isMounted, setIsMounted] = useState(false);
  const partner = useReveal<HTMLDivElement>(0.2);
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
        @keyframes riyo-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      <Navbar />

      {/* HERO */}
      <section className="relative z-10 flex min-h-[85vh] items-end overflow-hidden px-6 pt-32 pb-20 md:px-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 80% 20%, rgba(233,78,52,0.20), transparent 55%), radial-gradient(circle at 15% 85%, rgba(255,255,255,0.06), transparent 45%)",
            opacity: isMounted ? 1 : 0,
            transition: "opacity 1200ms ease-out",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 md:h-96 md:w-96 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(233,78,52,0.35), transparent 70%)",
            opacity: isMounted ? 1 : 0,
            transform: isMounted ? "scale(1)" : "scale(0.6)",
            transition: "opacity 1400ms ease-out 200ms, transform 1600ms cubic-bezier(0.16, 1, 0.3, 1) 200ms",
          }}
        />

        <div className="relative z-10 w-full max-w-6xl">
          <div
            className="mb-8 text-[11px] font-semibold uppercase tracking-[0.42em]"
            style={{
              color: "var(--flame)",
              opacity: isMounted ? 1 : 0,
              transform: isMounted ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 700ms ease-out 100ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) 100ms",
            }}
          >
            What We Do
          </div>

          <h1 className="font-display text-[11vw] md:text-[6vw] font-bold leading-[0.98] tracking-[-0.03em]">
            {isMounted && (
              <>
                <div className="overflow-hidden">
                  <AnimatedHeadline text="Driving brands" delay={200} />
                </div>
                <div className="overflow-hidden">
                  <AnimatedHeadline text="forward online." delay={200} />
                </div>
              </>
            )}
          </h1>

          <p
            className="mt-10 max-w-xl text-lg leading-relaxed text-white/70 md:text-xl"
            style={{
              opacity: isMounted ? 1 : 0,
              transform: isMounted ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 800ms ease-out 900ms, transform 900ms cubic-bezier(0.16, 1, 0.3, 1) 900ms",
            }}
          >
            A digital-first approach to strategy and creative, built around what your brand actually needs.
          </p>
        </div>
      </section>

      {/* SERVICES LIST — light, two-column */}
      <section className="relative z-20 bg-white text-[#0d0e12] px-6 py-24 md:px-14 md:py-32">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight max-w-2xl mb-16 md:mb-20">
            Elevating your brand at every touchpoint.
          </h2>
          <div className="grid md:grid-cols-2 gap-x-16 border-t border-[#0d0e12]/10">
            {services.map((service, idx) => (
              <ServiceRow key={service.title} service={service} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="relative z-20 bg-[#F9F9F9] text-[#0d0e12] px-6 py-24 md:px-14 md:py-32">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.42em] mb-8" style={{ color: "var(--flame)" }}>
            How We Work
          </h2>
          <h3 className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] max-w-3xl mb-16">
            A process built for clarity, start to finish.
          </h3>
          <div>
            {process.map((step, idx) => (
              <ProcessStep key={step.title} step={step} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER SECTION */}
      <section ref={partner.ref} className="relative z-20 px-6 py-24 md:px-14 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div
            className="mb-16 md:mb-20"
            style={{
              opacity: partner.visible ? 1 : 0,
              transform: partner.visible ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 800ms ease-out, transform 900ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.42em] mb-8" style={{ color: "var(--flame)" }}>
              Design-Driven. Strategy-Led.
            </h2>
            <h3 className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] max-w-3xl">
              Here's how we can partner together.
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Signature panel — replaces a stock photo with an on-brand mark */}
            <div
              className="relative overflow-hidden rounded-sm p-10 md:p-12 flex flex-col justify-end min-h-[280px]"
              style={{
                background: "linear-gradient(155deg, var(--flame) 0%, #b93a26 100%)",
                opacity: partner.visible ? 1 : 0,
                transform: partner.visible ? "translateY(0)" : "translateY(50px)",
                transition: "opacity 800ms ease-out 100ms, transform 900ms cubic-bezier(0.16, 1, 0.3, 1) 100ms",
              }}
            >
              <span
                aria-hidden
                className="absolute -right-8 -top-8 text-[9rem] font-bold font-display leading-none text-white/10 select-none"
              >
                RT
              </span>
              <p className="relative text-white text-lg md:text-xl font-medium leading-snug">
                Every engagement starts the same way — with a clear brief and a team that ships.
              </p>
            </div>

            <div
              className="rounded-sm border border-white/10 p-10 md:p-12"
              style={{
                opacity: partner.visible ? 1 : 0,
                transform: partner.visible ? "translateX(0)" : "translateX(-50px)",
                transition: "opacity 800ms ease-out 200ms, transform 900ms cubic-bezier(0.16, 1, 0.3, 1) 200ms",
              }}
            >
              <span className="text-sm font-semibold tracking-widest" style={{ color: "var(--flame)" }}>
                01
              </span>
              <h4 className="font-display text-2xl md:text-3xl font-bold tracking-tight mt-4 mb-5">Project-Based</h4>
              <p className="text-white/60 text-base md:text-lg leading-relaxed">
                For one-time needs that call for a focused, agile approach — we work with your team against a clearly
                defined brief, budget, and timeline, from kickoff to launch.
              </p>
            </div>

            <div
              className="rounded-sm border border-white/10 p-10 md:p-12"
              style={{
                opacity: partner.visible ? 1 : 0,
                transform: partner.visible ? "translateX(0)" : "translateX(50px)",
                transition: "opacity 800ms ease-out 300ms, transform 900ms cubic-bezier(0.16, 1, 0.3, 1) 300ms",
              }}
            >
              <span className="text-sm font-semibold tracking-widest" style={{ color: "var(--flame)" }}>
                02
              </span>
              <h4 className="font-display text-2xl md:text-3xl font-bold tracking-tight mt-4 mb-5">Agency of Record</h4>
              <p className="text-white/60 text-base md:text-lg leading-relaxed">
                Built for teams with ongoing design and development needs — we embed with you long-term to keep building
                out the work that drives your goals forward.
              </p>
            </div>
          </div>
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
