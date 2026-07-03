import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-[#0d0e12] text-white py-24 px-6 md:px-14">
      <div className="grid md:grid-cols-2 gap-16 md:gap-24">
        {/* Left: mark, tagline, socials */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center text-xl font-bold mb-10">
              R
            </div>
            <p className="text-2xl md:text-3xl font-medium leading-snug max-w-sm">
              Making great things
              <br />
              in India.
            </p>
          </div>

          <div className="flex items-center gap-6 mt-16">
            <a
              href="#"
              aria-label="Instagram"
              className="text-white/70 hover:text-[#E94E34] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4.2" />
                <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="text-white/70 hover:text-[#E94E34] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M15 3h-2.5A4.5 4.5 0 0 0 8 7.5V10H5.5v3.5H8V21h3.5v-7.5h3l.5-3.5h-3.5V7.5c0-.83.67-1.5 1.5-1.5H15V3z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="text-white/70 hover:text-[#E94E34] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M21 5.5c-.7.35-1.5.6-2.3.7a4 4 0 0 0 1.75-2.2c-.77.47-1.62.8-2.53.98a4 4 0 0 0-6.8 3.65A11.3 11.3 0 0 1 3 4.9a4 4 0 0 0 1.24 5.34 4 4 0 0 1-1.8-.5v.05a4 4 0 0 0 3.2 3.92 4 4 0 0 1-1.8.07 4 4 0 0 0 3.73 2.77A8 8 0 0 1 2 18.4a11.3 11.3 0 0 0 6.13 1.8c7.36 0 11.4-6.1 11.4-11.4l-.01-.52c.79-.56 1.47-1.27 2.01-2.08" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-white/70 hover:text-[#E94E34] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="2.5" y="2.5" width="19" height="19" rx="3" />
                <line x1="7.5" y1="10" x2="7.5" y2="17" />
                <circle cx="7.5" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
                <path d="M11.5 17v-4.2c0-1.5 1-2.5 2.3-2.5 1.3 0 2.2 1 2.2 2.5V17" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right: Get in Touch + Explore */}
        <div className="flex flex-col gap-16">
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/50 mb-6">
              Get in Touch
            </h4>
            <a
              href="mailto:support@riyotech.in"
              className="block w-fit text-lg md:text-xl text-[#E94E34] underline underline-offset-4 decoration-[#E94E34]/40 hover:decoration-[#E94E34] mb-3 transition-colors"
            >
              support@riyotech.in
            </a>
            <a
              href="tel:+918010031808"
              className="block w-fit text-lg md:text-xl text-[#E94E34] underline underline-offset-4 decoration-[#E94E34]/40 hover:decoration-[#E94E34] transition-colors"
            >
              +91 80100 31808
            </a>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/50 mb-6">
              Explore
            </h4>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {[
                { label: "Work", to: "/" },
                { label: "Services", to: "/services" },
                { label: "About", to: "/about" },
                { label: "Careers", to: "/careers" },
                { label: "Contact", to: "/contact" },
              ].map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-white/80 hover:text-[#E94E34] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
