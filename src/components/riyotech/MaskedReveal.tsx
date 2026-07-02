// src/components/riyotech/MaskedReveal.tsx
export function MaskedReveal({
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