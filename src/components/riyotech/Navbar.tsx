// src/components/Navbar.tsx
import { useEffect, useRef, useState } from "react";
import { useChatWidget } from "./ChatWidgetContext";

const menuLinks = ["Work", "Services", "About", "Careers", "Contact"];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { open: openChat } = useChatWidget();
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [origin, setOrigin] = useState<{ x: number; y: number }>({ x: 100, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Listen for scroll to change the header colors when passing the dark hero section
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.9);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate where the circle clip-path should expand from (the hamburger button)
  useEffect(() => {
    const update = () => {
      const el = btnRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setOrigin({
        x: ((r.left + r.width / 2) / window.innerWidth) * 100,
        y: ((r.top + r.height / 2) / window.innerHeight) * 100,
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Determine header elements color: black if menu is open OR we scrolled into a white section
  const headerColor = open || scrolled ? "#0d0e12" : "#ffffff";
  const headerBorderColor = open || scrolled ? "rgba(13, 14, 18, 0.2)" : "rgba(255,255,255,0.35)";

  return (
    <>
      {/* TOP BAR (z-50) */}
      <div
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 md:px-14 md:py-9 pointer-events-none"
        style={{
          opacity: isMounted ? 1 : 0,
          transform: isMounted ? "translateX(0)" : "translateX(-30px)",
          transition: "opacity 800ms ease 600ms, transform 800ms cubic-bezier(0.16, 1, 0.3, 1) 600ms",
        }}
      >
        <a href="/" className="flex items-center gap-2 pointer-events-auto">
          <span
            className="grid h-11 w-11 place-items-center rounded-full border font-display text-lg font-bold"
            style={{
              borderColor: headerBorderColor,
              color: headerColor,
              transition: "color 400ms ease, border-color 400ms ease",
            }}
          >
            R
          </span>
          <span
            className="hidden text-xs font-semibold uppercase tracking-[0.28em] md:inline"
            style={{
              color: headerColor,
              transition: "color 400ms ease",
            }}
          >
            Riyotech
          </span>
        </a>

        <div className="flex items-center gap-6 md:gap-8 pointer-events-auto">
          <button
            onClick={openChat}
            className="relative text-[11px] font-semibold uppercase tracking-[0.24em] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-100 after:bg-current after:transition-transform hover:after:origin-left"
            style={{ color: headerColor, transition: "color 400ms ease" }}
          >
            Let's talk
          </button>

          <button
            ref={btnRef}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center rounded-full"
            style={{
              background: open ? "#0d0e12" : "transparent",
              border: `1px solid ${headerBorderColor}`,
              color: open ? "#fff" : headerColor,
              transition: "background 400ms ease, color 400ms ease, border-color 400ms ease",
            }}
          >
            <span className="relative block h-3 w-4">
              <span
                className="absolute left-0 h-[1.5px] w-4 bg-current transition-all duration-300"
                style={{
                  top: open ? "50%" : "0",
                  transform: open ? "translateY(-50%) rotate(45deg)" : "none",
                }}
              />
              <span
                className="absolute left-0 h-[1.5px] w-4 bg-current transition-all duration-300"
                style={{
                  top: open ? "50%" : "100%",
                  transform: open ? "translateY(-50%) rotate(-45deg)" : "translateY(-100%)",
                }}
              />
            </span>
          </button>
        </div>
      </div>

      {/* MENU OVERLAY (z-40) */}
      <div
        aria-hidden={!open}
        className="fixed inset-0 z-40"
        style={{
          background: "#ffffff",
          color: "#0d0e12",
          clipPath: `circle(${open ? 150 : 0}% at ${origin.x}% ${origin.y}%)`,
          transition: "clip-path 800ms cubic-bezier(0.77, 0, 0.175, 1)",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <div className="grid h-full grid-cols-1 gap-10 px-6 pt-32 pb-16 md:grid-cols-12 md:gap-12 md:px-14 md:pt-40">
          <div className="hidden md:col-span-1 md:block" style={{ opacity: open ? 1 : 0, transition: "opacity 400ms 500ms ease" }}>
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
              Menu
            </span>
          </div>

          <nav className="flex flex-col items-start gap-2 md:col-span-7">
            {menuLinks.map((l, i) => (
              <a
                key={l}
                href={`/${l.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="font-display text-5xl font-bold leading-[1.05] tracking-[-0.03em] transition-colors hover:text-[var(--flame)] md:text-6xl"
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(28px)",
                  transition: `opacity 550ms ${280 + i * 70}ms ease, transform 550ms ${280 + i * 70}ms cubic-bezier(0.2,0.7,0.2,1), color 200ms ease`,
                }}
              >
                {l}
              </a>
            ))}
          </nav>

          <div className="flex flex-col justify-end gap-4 text-base md:col-span-4" style={{ opacity: open ? 1 : 0, transition: "opacity 500ms 700ms ease" }}>
            <a href="mailto:support@riyotech.in" className="relative w-fit font-semibold underline-offset-4 hover:underline" style={{ color: "var(--flame)" }}>
              support@riyotech.in
            </a>
            <a href="https://riyotech.in" className="w-fit font-semibold" style={{ color: "var(--flame)" }}>
              riyotech.in
            </a>
            <div className="mt-6 leading-relaxed text-[color:#0d0e12]/80">
              Maharashtra,<br /> India
            </div>
            <div className="mt-8 flex items-center gap-5 text-[color:#0d0e12]/60">
              <a href="#" className="hover:text-[var(--flame)]">Instagram</a>
              <a href="#" className="hover:text-[var(--flame)]">LinkedIn</a>
              <a href="#" className="hover:text-[var(--flame)]">Twitter</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
