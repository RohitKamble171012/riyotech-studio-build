// src/routes/work.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Navbar } from "../components/riyotech/Navbar";
import { Footer } from "../components/riyotech/Footer";
import { useChatWidget } from "../components/riyotech/ChatWidgetContext";

export const Route = createFileRoute("/work")({
  component: Work,
});

// --- DATA ---
const projects = [
  {
    id: "varjaymusic",
    title: "Varjay Music",
    category: "Music Academy",
    note: "Per-course SEO landing pages, faculty cards, and a pricing system.",
    url: "https://www.varjaymusic.com/",
    image: "/varjaymusic.png",
    color: "#FBBF24",
  },
  {
    id: "trikritistudio",
    title: "Trikriti Studio",
    category: "E-Commerce",
    note: "Product grid storefront with order tracking and custom-piece flows.",
    url: "https://www.trikritistudio.in/",
    image: "/trikritistudio.png",
    color: "#F87171",
  },
  {
    id: "sharpengineering",
    title: "Sharp Engineering",
    category: "Company Page",
    note: "22-SKU product catalog with lightbox gallery and a working contact form.",
    url: "https://www.sharpengineering.online/",
    image: "/sharpengineering.png",
    color: "#60A5FA",
  },
];

const capabilities = [
  {
    title: "Web Development",
    text: "Marketing sites, e-commerce storefronts, and web apps — designed, built, and shipped end to end.",
    icon: (
      <path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h15A1.5 1.5 0 0 1 21 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5v-13Z M3 8.5h18 M6.25 6.5h.01 M8.75 6.5h.01" />
    ),
  },
  {
    title: "Software Development",
    text: "Custom internal tools and platforms, taken from a first spec through to production.",
    icon: <path d="M8 9l-4 3 4 3 M16 9l4 3-4 3 M13.5 6.5l-3 11" />,
  },
  {
    title: "AI Integration",
    text: "Wiring AI into products you already have — automation, agents, and smarter features.",
    icon: <path d="M12 3v3 M12 18v3 M3 12h3 M18 12h3 M5.6 5.6l2.1 2.1 M16.3 16.3l2.1 2.1 M5.6 18.4l2.1-2.1 M16.3 7.7l2.1-2.1 M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />,
  },
  {
    title: "AI Chatbots",
    text: "Conversational assistants for support, sales, and lead capture — like the one on this site.",
    icon: <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H9l-4 3.5V16H5.5A1.5 1.5 0 0 1 4 14.5v-9Z" />,
  },
  {
    title: "Data Analysis",
    text: "Turning raw data into dashboards and reporting your team can actually act on.",
    icon: <path d="M4 20V10 M10 20V4 M16 20v-7 M4 20h16" />,
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
      { threshold, rootMargin: "0px 0px -60px 0px" },
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
            style={{ animation: `riyo-word-up 900ms cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * 70}ms both` }}
          >
            {word}
          </span>
        </span>
      ))}
    </>
  );
}

// --- CAPABILITY CARD ---
function CapabilityCard({ item, idx }: { item: (typeof capabilities)[number]; idx: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.2);
  return (
    <div
      ref={ref}
      className="border-t border-[#0d0e12]/10 py-8 pr-6"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(26px)",
        transition: `opacity 650ms ease-out ${(idx % 5) * 70}ms, transform 750ms cubic-bezier(0.16, 1, 0.3, 1) ${(idx % 5) * 70}ms`,
      }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--flame)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="mb-5">
        {item.icon}
      </svg>
      <h4 className="font-display text-xl font-bold tracking-tight text-[#0d0e12] mb-2 md:text-2xl">{item.title}</h4>
      <p className="max-w-xs text-sm leading-relaxed text-[#0d0e12]/60 md:text-base">{item.text}</p>
    </div>
  );
}

// --- PROJECT ROW ---
function ProjectRow({ project, idx }: { project: (typeof projects)[number]; idx: number }) {
  const { ref, visible } = useReveal<HTMLAnchorElement>(0.15);
  const [hovered, setHovered] = useState(false);

  return (
    <a
      ref={ref}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group grid grid-cols-1 gap-8 border-t border-white/10 py-10 md:grid-cols-12 md:gap-10 md:py-14"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 700ms ease-out ${idx * 120}ms, transform 850ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 120}ms`,
      }}
    >
      <div className="md:col-span-1">
        <span className="text-[11px] font-semibold tracking-widest text-white/30">0{idx + 1}</span>
      </div>

      <div className="md:col-span-5">
        <span
          className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.24em] transition-colors duration-300"
          style={{ color: project.color }}
        >
          {project.category}
        </span>
        <h3
          className="font-display text-3xl font-bold tracking-tight transition-colors duration-300 md:text-5xl"
          style={{ color: hovered ? project.color : "#fff" }}
        >
          {project.title}
        </h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60 md:text-base">{project.note}</p>
      </div>

      <div className="md:col-span-6">
        <div
          className="relative h-56 overflow-hidden rounded-sm md:h-64"
          style={{ backgroundColor: project.color, transform: hovered ? "scale(1.02)" : "scale(1)", transition: "transform 500ms ease" }}
        >
          <img
            src={project.image}
            alt={`${project.title} website screenshot`}
            className="h-full w-full object-cover object-top"
            loading="lazy"
          />
          <div
            aria-hidden
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              background: "linear-gradient(to top, rgba(13,14,18,0.75) 0%, rgba(13,14,18,0) 45%)",
              opacity: hovered ? 1 : 0.5,
            }}
          />
          <span
            className="absolute bottom-4 right-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white transition-opacity duration-300"
            style={{ opacity: hovered ? 1 : 0.7 }}
          >
            Visit live site
            <span className="transition-transform duration-300" style={{ transform: hovered ? "translate(2px,-2px)" : "none" }}>
              ↗
            </span>
          </span>
        </div>
      </div>
    </a>
  );
}

// --- MAIN PAGE ---
function Work() {
  const [isMounted, setIsMounted] = useState(false);
  const { open: openChat } = useChatWidget();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--ink)] font-display text-white">
      <style>{`
        @keyframes riyo-word-up {
          from { opacity: 0; transform: translateY(115%) rotate(2deg); }
          to { opacity: 1; transform: translateY(0) rotate(0deg); }
        }
      `}</style>

      <Navbar />

      {/* HERO */}
      <section className="relative z-10 px-6 pb-10 pt-32 md:px-14 md:pb-16">
        <div className="mx-auto max-w-6xl">
          <div
            className="mb-8 text-[11px] font-semibold uppercase tracking-[0.42em]"
            style={{
              color: "var(--flame)",
              opacity: isMounted ? 1 : 0,
              transform: isMounted ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 700ms ease-out 100ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) 100ms",
            }}
          >
            Selected Work
          </div>

          <h1 className="font-display text-[10vw] font-bold leading-[1.02] tracking-[-0.03em] md:text-[5vw]">
            {isMounted && (
              <>
                <div className="overflow-hidden">
                  <AnimatedHeadline text="Work worth" delay={200} />
                </div>
                <div className="overflow-hidden">
                  <AnimatedHeadline text="linking to." delay={200} />
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
            Websites, software, and AI-driven tools. Every site below is live — click through and look around.
          </p>
        </div>
      </section>

      {/* WHAT WE DO — light section */}
      <section className="relative z-20 bg-[#F9F9F9] px-6 py-20 text-[#0d0e12] md:px-14 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="mb-12 text-[11px] font-semibold uppercase tracking-[0.42em]" style={{ color: "var(--flame)" }}>
            What We Do
          </p>
          <div className="grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item, idx) => (
              <CapabilityCard key={item.title} item={item} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT LIST */}
      <section className="relative z-10 px-6 pb-20 pt-16 md:px-14 md:pb-28 md:pt-20">
        <div className="mx-auto max-w-6xl">
          {projects.map((project, idx) => (
            <ProjectRow key={project.id} project={project} idx={idx} />
          ))}
          <div className="border-t border-white/10" />
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-20 overflow-hidden bg-[#E94E34] px-6 py-24 text-white md:px-14 md:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-16 -bottom-16 h-64 w-64 rounded-full border border-white/15"
        />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="mb-8 text-[11px] font-semibold uppercase tracking-[0.42em] opacity-80">Your project here?</h2>
            <h3 className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl max-w-2xl">
              Let's build something worth linking to.
            </h3>
          </div>
          <button
            onClick={openChat}
            className="group inline-flex flex-shrink-0 items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.32em]"
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
