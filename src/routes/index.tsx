import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, MouseEvent } from "react";
import { Navbar } from "../components/riyotech/Navbar";
import { Footer } from "../components/riyotech/Footer" // Assuming you extracted this as discussed

export const Route = createFileRoute("/")({
  component: Index,
});

// --- DATA ---
const projects = [
  {
    id: "varjaymusic",
    title: "Varjay Music",
    category: "Music Academy",
    image: "/varjaymusic.png",
    color: "#FBBF24",
  },
  {
    id: "trikritistudio",
    title: "Trikriti Studio",
    category: "E-Commerce",
    image: "/trikritistudio.png",
    color: "#F87171",
  },
  {
    id: "sharpengineering",
    title: "Sharp Engineering",
    category: "Company Page",
    image: "/sharpengineering.png",
    color: "#60A5FA",
  },
];

const faqs = [
  {
    question: "What is the difference between web design and development?",
    answer: "Website development service and design are two distinct processes. While website development service involves writing code to provide functions and features on a website, website design focuses on designing the layout of a website and producing visually appealing content."
  },
  {
    question: "What is a front-end website developer?",
    answer: "Front-end developers, also known as client-side developers, are responsible for crafting the visual elements of a website or application that users directly interact with. This encompasses everything from layout and design to ensuring seamless functionality across various devices and browsers."
  },
  {
    question: "What is B2B website development?",
    answer: "B2B (Business-to-Business) website development focuses on building digital platforms tailored for companies to market, sell, and streamline operations with other corporate clients, often requiring complex integration like custom CRM or ERP systems."
  },
  {
    question: "What are CMS of a web development company?",
    answer: "CMS stands for Content Management System. It refers to software platforms (like WordPress) used by web development companies to allow clients to easily create, modify, and manage digital content on their websites without requiring advanced coding knowledge."
  },
  {
    question: "What is coding in website development?",
    answer: "Coding is a significant part of website development, which involves programming languages like HTML, CSS and JavaScript. It defines how the website will look and function. Code provides instructions to the browser so it knows how to display the content on the page, facilitating structured content that works as intended when accessed from multiple devices and web browsers. Without coding, websites would not be able to provide users with rich functionalities such as animations, interactivity, search bars, and forms."
  },
  {
    question: "What is WordPress website development?",
    answer: "WordPress website development involves creating, customizing, and scaling websites using the WordPress open-source content management system. It allows developers to configure settings, custom themes, and plugins to design personalized layouts and set up complex functionalities (like WooCommerce) without needing to code every single page completely from scratch."
  },
  {
    question: "What is the difference between developing a website using WordPress and PHP?",
    answer: "WordPress is a ready-to-use content management system built on PHP that offers customizable themes and plugins for faster deployment. Developing directly in Core PHP (or a framework like Laravel), on the other hand, means coding the backend and architecture entirely from scratch, offering absolute flexibility, custom security configurations, and unrestricted functionality for complex applications."
  },
  {
    question: "What is dynamic website development?",
    answer: "Dynamic website development is the process of creating a website that utilizes web technologies to generate content in response to user interaction. This interaction can come from either the server or the client side. Dynamic websites are more flexible, powerful, and interactive than static websites, as they can react to changes in data and provide real-time feedback on user actions."
  },
  {
    question: "What is e-commerce web development?",
    answer: "E-commerce web development is the building and designing of an online store that enables clients to purchase goods and services. Web design, e-commerce-specific coding languages, customer experience optimization, payment processing, sales analytics, and marketing strategies are all skills needed for this kind of development to produce significant revenue streams."
  },
  {
    question: "What is hosting in website development?",
    answer: "Hosting provides the space, services, and technology necessary for a website to be visible on the Internet. It entails renting a domain name or web server, buying SSL certificates, and configuring the web server. Accessible, secure, durable, and well-performing websites are all benefits of good hosting."
  },
  {
    question: "What is a domain in website development services?",
    answer: "A domain is an internet address that is used to identify and find a website. It normally consists of two components: a top-level domain like .com or .org, and the specific name of the website. You must purchase it from a registrar, who then provides continuing services like DNS hosting."
  },
  {
    question: "What is responsive website development?",
    answer: "Responsive website development is an approach where a website is coded and designed to automatically adjust, scale, and render perfectly across all screen sizes and devices—including smartphones, tablets, laptops, and desktop monitors—ensuring a fluid and consistent user experience."
  }
];

// --- COMPONENTS ---

// Individual Project Card
function ProjectCard({ project, idx }: { project: any; idx: number }) {
  const isEven = idx % 2 === 0;
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 25;
    const y = (e.clientY - rect.top - rect.height / 2) / 25;
    setMouseOffset({ x, y });
  };

  return (
    <div
      ref={cardRef}
      className={`grid grid-cols-1 md:grid-cols-12 gap-10 items-center ${!isEven ? "md:flex-row-reverse" : ""
        }`}
    >
      <div
        className={`md:col-span-8 relative group cursor-pointer ${!isEven ? "md:col-start-5" : "md:col-start-1"
          }`}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(80px)",
          transition: "opacity 800ms ease-out, transform 1000ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMouseOffset({ x: 0, y: 0 })}
      >
        <div
          className="relative w-full aspect-video rounded-sm overflow-hidden"
          style={{ backgroundColor: project.color + "15" }}
        >
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-200 ease-out"
            style={{
              backgroundImage: `url(${project.image})`,
              transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0) scale(1.1)`,
            }}
          >
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
          </div>
        </div>
      </div>

      <div
        className={`md:col-span-3 flex flex-col justify-center ${!isEven ? "md:col-start-1 md:row-start-1" : "md:col-start-10"
          }`}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(60px)",
          transition: "opacity 800ms ease-out 150ms, transform 1000ms cubic-bezier(0.16, 1, 0.3, 1) 150ms",
        }}
      >
        <h4 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">{project.title}</h4>
        <p className="text-gray-500 font-medium tracking-wide uppercase text-sm mb-8">{project.category}</p>
        <a href={`/work/${project.id}`} className="group inline-flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.24em]">
          <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-100 after:bg-[#0d0e12] after:transition-transform hover:after:origin-left">
            View Case Study
          </span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-1">
            <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}
// Add this alongside your other components (or import from MaskedReveal.tsx)
function MaskedReveal({
  children,
  show,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  show: boolean;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={`block overflow-hidden ${className}`}>
      <span
        className="block will-change-transform"
        style={{
          transform: show ? "translateY(0%)" : "translateY(115%)",
          opacity: show ? 1 : 0,
          transition: `transform 900ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, opacity 700ms ease ${delay}ms`,
        }}
      >
        {children}
      </span>
    </span>
  );
}

// Interactive FAQ Accordion Item — slides in from alternating sides toward center
function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
  idx,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  idx: number;
}) {
  const itemRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const fromLeft = idx % 2 === 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
    );

    if (itemRef.current) observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={itemRef}
      className="border-b border-[#0d0e12]/10 last:border-0"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateX(0)" : `translateX(${fromLeft ? "-48px" : "48px"})`,
        transition: `opacity 700ms ease-out ${idx * 60}ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 60}ms`,
      }}
    >
      <button
        onClick={onClick}
        className="w-full text-left py-5 flex justify-between items-center group gap-6"
        aria-expanded={isOpen}
      >
        <h4 className="font-display text-lg md:text-xl font-medium tracking-tight text-[#0d0e12] group-hover:text-[var(--flame)] transition-colors duration-300">
          {question}
        </h4>
        <span className="relative flex-shrink-0 grid place-items-center w-7 h-7 rounded-full border border-[#0d0e12]/20 group-hover:border-[var(--flame)] transition-colors duration-300">
          {/* Horizontal line (always visible) */}
          <span className="absolute w-2.5 h-[1.5px] bg-current text-[#0d0e12]" />
          {/* Vertical line (rotates flat when open to form a minus) */}
          <span
            className="absolute w-2.5 h-[1.5px] bg-current text-[#0d0e12] transition-transform duration-300 ease-out"
            style={{ transform: isOpen ? "rotate(0deg)" : "rotate(90deg)" }}
          />
        </span>
      </button>

      {/* CSS Grid trick for smooth auto-height animation */}
      <div
        className="grid transition-all duration-400 ease-in-out"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          opacity: isOpen ? 1 : 0
        }}
      >
        <div className="overflow-hidden">
          <p className="text-base text-[#0d0e12]/70 leading-relaxed max-w-3xl pb-5">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

// --- MAIN PAGE ---
function Index() {
  const [isMounted, setIsMounted] = useState(false);
  const [workVisible, setWorkVisible] = useState(false);
  const workRef = useRef<HTMLDivElement | null>(null);
  const [aboutVisible, setAboutVisible] = useState(false);
  const aboutRef = useRef<HTMLElement | null>(null);

  // State for FAQ accordion (tracks which index is open, or null if all closed)
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWorkVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (workRef.current) observer.observe(workRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAboutVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (aboutRef.current) observer.observe(aboutRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="relative min-h-screen font-display overflow-hidden text-white bg-[var(--ink)]">

      {/* NAVBAR */}
      <Navbar />

      {/* BACKGROUND FOR HERO */}
      <div
        className="absolute inset-0 z-0 h-screen"
        style={{
          background: "var(--ink)",
          transformOrigin: "left",
          transform: isMounted ? "scaleX(1)" : "scaleX(0)",
          transition: "transform 1000ms cubic-bezier(0.77, 0, 0.175, 1)",
        }}
      />

      {/* HERO SECTION */}
      <section className="relative z-10 flex min-h-screen items-center overflow-hidden px-6 pt-28 pb-16 md:px-14 md:pt-32">

        {/* STAGE 1 (0ms): giant "R" watermark wipes in top-to-bottom, BEFORE the dark bg covers it */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-[-6%] flex select-none items-center justify-end md:right-[-3%]">
          <span
            className="font-display font-bold leading-none"
            style={{
              fontSize: "min(90vh, 62vw)",
              color: "#ffffff",
              letterSpacing: "-0.06em",
              opacity: isMounted ? 0.045 : 0,
              clipPath: isMounted ? "inset(0% 0 0% 0)" : "inset(0% 0 100% 0)",
              transition: "clip-path 900ms cubic-bezier(0.65,0,0.35,1) 0ms, opacity 300ms ease 0ms",
            }}
          >
            R
          </span>
        </div>

        {/* STAGE 2 (150ms): dot-grid flame accent scales/fades in */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-[10%] top-[38%] hidden h-24 w-24 md:block"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, var(--flame) 1px, transparent 1.5px), radial-gradient(circle at 60% 40%, var(--flame) 1px, transparent 1.5px), radial-gradient(circle at 30% 70%, var(--flame) 1px, transparent 1.5px), radial-gradient(circle at 80% 80%, var(--flame) 1px, transparent 1.5px)",
            backgroundSize: "100% 100%",
            opacity: isMounted ? 0.9 : 0,
            transform: isMounted ? "scale(1)" : "scale(0.6)",
            transition: "opacity 600ms ease 150ms, transform 700ms cubic-bezier(0.16,1,0.3,1) 150ms",
          }}
        />

        {/* STAGE 3 (~500ms via the existing dark bg scaleX sweep — unchanged, already in your code above this section */}

        <div className="relative z-10 w-full max-w-6xl">
          {/* STAGE 4 (650ms): badge */}
          <div className="mb-10 overflow-hidden">
            <MaskedReveal show={isMounted} delay={650}>
              <span className="text-[11px] font-semibold uppercase tracking-[0.42em]" style={{ color: "var(--flame)" }}>
                We are Riyotech
              </span>
            </MaskedReveal>
          </div>

          {/* STAGE 5 (800ms / 950ms): headline, line by line */}
          <h1 className="font-display text-[10vw] font-bold leading-[0.98] tracking-[-0.03em] md:text-[6.5vw]">
            <MaskedReveal show={isMounted} delay={800}>A digital agency</MaskedReveal>
            <MaskedReveal show={isMounted} delay={950}>focused on web.</MaskedReveal>
          </h1>

          {/* STAGE 6 (1150ms): paragraph, soft fade+rise (not a hard mask, matches the video) */}
          <p
            className="mt-10 max-w-xl text-lg leading-relaxed text-white/70 md:text-xl"
            style={{
              opacity: isMounted ? 1 : 0,
              transform: isMounted ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 700ms ease 1150ms, transform 800ms cubic-bezier(0.16,1,0.3,1) 1150ms",
            }}
          >
            We are a creative team of designers, developers, and strategists building elevated websites and digital products from Maharashtra, India — for a greater India, and beyond.
          </p>

          {/* STAGE 7 (1300ms): CTA */}

          <a
            href="#work"
            className="group mt-14 inline-flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.32em]"
            style={{
              opacity: isMounted ? 1 : 0,
              transform: isMounted ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 700ms ease 1300ms, transform 800ms cubic-bezier(0.16,1,0.3,1) 1300ms",
            }}
          >
            <span className="grid h-12 w-12 place-items-center rounded-full border transition-all group-hover:bg-[var(--flame)] group-hover:border-[var(--flame)]" style={{ borderColor: "rgba(255,255,255,0.3)" }}>
              <span className="text-lg leading-none">+</span>
            </span>
            <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-100 after:bg-white after:transition-transform">
              See our work
            </span>
          </a>
        </div>

        {/* STAGE 8 (1450ms): scroll indicator, added new — matches the vertical "SCROLL" tick in the video */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-8 bottom-12 hidden flex-col items-center gap-3 md:flex md:right-14"
          style={{
            opacity: isMounted ? 1 : 0,
            transition: "opacity 700ms ease 1450ms",
          }}
        >
          <span className="h-10 w-px bg-white/30" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/50" style={{ writingMode: "vertical-rl" }}>
            Scroll
          </span>
        </div>
      </section >

      {/* WORK SECTION */}
      < section id="work" className="relative z-20 bg-[#F9F9F9] text-[#0d0e12] py-32 px-6 md:px-14 overflow-hidden" >
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full border border-gray-200 pointer-events-none translate-x-1/3 -translate-y-1/3" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div
            ref={workRef}
            className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-gray-200 pb-16"
            style={{
              opacity: workVisible ? 1 : 0,
              transform: workVisible ? "translateY(0)" : "translateY(50px)",
              transition: "opacity 800ms ease-out, transform 900ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div className="max-w-3xl">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.42em] mb-8" style={{ color: "var(--flame)" }}>
                Case Studies
              </h2>
              <h3 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] tracking-[-0.03em]">
                Some of our <br className="hidden md:block" /> finest work.
              </h3>
            </div>
            <p className="max-w-xs text-lg leading-relaxed text-[#0d0e12]/70 pb-2">
              Solving diverse business needs through great design and UX.
            </p>
          </div>

          <div className="mt-24 flex flex-col gap-32 md:gap-40">
            {projects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} idx={idx} />
            ))}
          </div>
        </div>
      </section >

      {/* DIGITAL COMPANY BANNER */}
      < section
        ref={aboutRef}
        className="relative z-20 flex items-center px-6 py-16 md:py-20 md:px-14 overflow-hidden text-white"
      >
        <div
          className="absolute inset-0 z-0 bg-[#E94E34]"
          style={{
            transformOrigin: "right",
            transform: aboutVisible ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 1000ms cubic-bezier(0.77, 0, 0.175, 1)"
          }}
        />

        <div
          className="relative z-10 w-full max-w-6xl mx-auto"
          style={{
            opacity: aboutVisible ? 1 : 0,
            transform: aboutVisible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 800ms ease 600ms, transform 800ms cubic-bezier(0.16, 1, 0.3, 1) 600ms",
          }}
        >
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.42em] mb-8 md:mb-12 opacity-80">
            A Digital Company
          </h2>
          <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.25] tracking-[-0.015em]">
            We are a web design and development company, building websites that drive traffic, engagement, and conversion for industry-leading brands and startups in India.
          </h3>
        </div>
      </section >

      {/* FAQ SECTION */}
      < section className="relative z-20 bg-white text-[#0d0e12] py-14 px-6 md:px-14" >
        <div className="max-w-3xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.42em] mb-4" style={{ color: "var(--flame)" }}>
              Insights & Knowledge
            </h2>
            <h3 className="font-display text-2xl md:text-4xl font-bold tracking-tight">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="flex flex-col border-t border-[#0d0e12]/10">
            {faqs.map((faq, idx) => (
              <FAQItem
                key={idx}
                idx={idx}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === idx}
                onClick={() => toggleFAQ(idx)}
              />
            ))}
          </div>
        </div>
      </section >
      <Footer />
    </div >
  );
}