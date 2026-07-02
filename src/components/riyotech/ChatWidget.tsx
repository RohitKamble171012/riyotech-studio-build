// src/components/riyotech/ChatWidget.tsx
import { useState } from "react";
import { packages, commonFeatures, type Package } from "../../data/packages";
import { useChatWidget } from "./ChatWidgetContext";

type Step = "intro" | "packages" | "requirements" | "token" | "success";

type SuccessInfo = {
  kind: "project" | "token";
  token?: string;
};

function generateToken() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no ambiguous chars
  let code = "";
  for (let i = 0; i < 5; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return `RY-${code}`;
}

function formatINR(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function ChatWidget() {
  const { isOpen, close } = useChatWidget();
  const [step, setStep] = useState<Step>("intro");
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [success, setSuccess] = useState<SuccessInfo | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function reset() {
    setStep("intro");
    setSelectedPackage(null);
    setSuccess(null);
    setError(null);
  }

  function handleClose() {
    close();
    // Give the close animation a moment before resetting internal state
    setTimeout(reset, 300);
  }

  async function handleRequirementsSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);

    // Honeypot: bots fill every field, humans never see this one
    if (form.get("company_website")) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          package: selectedPackage?.name,
          requirements: form.get("requirements"),
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSuccess({ kind: "project" });
      setStep("success");
    } catch {
      setError("Something went wrong sending that. Please try again or email support@riyotech.in directly.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleTokenSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);

    if (form.get("company_website")) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          projectName: form.get("projectName"),
          issue: form.get("issue"),
          priority: form.get("priority"),
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      const data = (await res.json()) as { token: string };
      setSuccess({ kind: "token", token: data.token });
      setStep("success");
    } catch {
      // Fall back to a client-generated token so the user isn't stuck if the
      // server function isn't wired up yet during development.
      setSuccess({ kind: "token", token: generateToken() });
      setStep("success");
      setError("Note: we couldn't confirm delivery to our inbox — please also note this token down.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden={!isOpen}
        onClick={handleClose}
        className="fixed inset-0 z-[60]"
        style={{
          background: "rgba(13, 14, 18, 0.5)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 300ms ease",
        }}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
        className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-md flex-col"
        style={{
          background: "var(--ink)",
          color: "#fff",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)",
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-2">
            {step !== "intro" && (
              <button
                onClick={() => setStep("intro")}
                aria-label="Back"
                className="mr-1 grid h-8 w-8 place-items-center rounded-full text-white/70 hover:text-white"
              >
                ←
              </button>
            )}
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
              Riyotech
            </span>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/80 hover:bg-white/10"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {step === "intro" && (
            <div className="flex h-full flex-col justify-center gap-4">
              <h2 className="font-display text-2xl font-bold leading-tight">
                Let's talk. What brings you here?
              </h2>
              <button
                onClick={() => setStep("packages")}
                className="group flex items-center justify-between rounded-xl border border-white/15 px-5 py-4 text-left transition-colors hover:border-flame"
              >
                <span>
                  <span className="block font-semibold">Start a new project</span>
                  <span className="block text-sm text-white/60">See packages and pricing</span>
                </span>
                <span className="text-flame transition-transform group-hover:translate-x-1">→</span>
              </button>
              <button
                onClick={() => setStep("token")}
                className="group flex items-center justify-between rounded-xl border border-white/15 px-5 py-4 text-left transition-colors hover:border-flame"
              >
                <span>
                  <span className="block font-semibold">Raise a token</span>
                  <span className="block text-sm text-white/60">Existing client, need support</span>
                </span>
                <span className="text-flame transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
          )}

          {step === "packages" && (
            <div className="flex flex-col gap-4">
              <h2 className="font-display text-xl font-bold">Pick a package</h2>
              {packages.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => {
                    setSelectedPackage(pkg);
                    setStep("requirements");
                  }}
                  className="rounded-xl border border-white/15 px-5 py-4 text-left transition-colors hover:border-flame"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-semibold">{pkg.name}</span>
                    <span className="text-right">
                      {pkg.discountedPrice === "on_request" ? (
                        <span className="text-flame font-semibold">Price on request</span>
                      ) : (
                        <>
                          {pkg.originalPrice && (
                            <span className="mr-1.5 text-xs text-white/40 line-through">
                              {formatINR(pkg.originalPrice)}
                            </span>
                          )}
                          <span className="text-flame font-semibold">
                            {formatINR(pkg.discountedPrice)}
                          </span>
                        </>
                      )}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-white/50">
                    {pkg.pages} {typeof pkg.pages === "number" ? "pages" : ""}
                    {pkg.gstAmount !== "on_request" && (
                      <> · +{formatINR(pkg.gstAmount)} GST</>
                    )}
                  </p>
                  <ul className="mt-3 flex flex-col gap-1">
                    {pkg.features.map((f) => (
                      <li key={f} className="text-xs text-white/50">
                        · {f}
                      </li>
                    ))}
                  </ul>
                </button>
              ))}

              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/50">
                  Included on every plan
                </p>
                <ul className="grid grid-cols-1 gap-1">
                  {commonFeatures.map((f) => (
                    <li key={f} className="text-xs text-white/50">
                      · {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-white/40">
                  Hosting renews at ₹4,000/year after the first free year. GST is 18%, added on top of every plan.
                </p>
              </div>
            </div>
          )}

          {step === "requirements" && (
            <form onSubmit={handleRequirementsSubmit} className="flex flex-col gap-4">
              <div>
                <h2 className="font-display text-xl font-bold">Tell us about your project</h2>
                {selectedPackage && (
                  <p className="mt-1 text-sm text-white/60">
                    Package: <span className="text-flame">{selectedPackage.name}</span>
                  </p>
                )}
              </div>

              {/* Honeypot — hidden from real users, bots fill it */}
              <input
                type="text"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <Field label="Your name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone (optional)" name="phone" type="tel" />
              <TextArea label="What do you need built?" name="requirements" required />

              {error && <p className="text-sm text-red-400">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 rounded-lg bg-flame px-5 py-3 font-semibold text-white transition-opacity disabled:opacity-60"
              >
                {submitting ? "Sending..." : "Send requirements"}
              </button>
            </form>
          )}

          {step === "token" && (
            <form onSubmit={handleTokenSubmit} className="flex flex-col gap-4">
              <h2 className="font-display text-xl font-bold">Raise a support token</h2>

              <input
                type="text"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <Field label="Your name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Project name" name="projectName" required />
              <TextArea label="Describe the issue" name="issue" required />
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/60">
                  Priority
                </label>
                <select
                  name="priority"
                  defaultValue="normal"
                  className="w-full rounded-lg border border-white/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-flame"
                >
                  <option className="bg-[var(--ink)]" value="low">Low</option>
                  <option className="bg-[var(--ink)]" value="normal">Normal</option>
                  <option className="bg-[var(--ink)]" value="urgent">Urgent</option>
                </select>
              </div>

              {error && <p className="text-sm text-amber-400">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 rounded-lg bg-flame px-5 py-3 font-semibold text-white transition-opacity disabled:opacity-60"
              >
                {submitting ? "Sending..." : "Raise token"}
              </button>
            </form>
          )}

          {step === "success" && success && (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-full border border-flame text-flame">
                ✓
              </div>
              {success.kind === "project" ? (
                <>
                  <h2 className="font-display text-xl font-bold">Got it — thank you</h2>
                  <p className="text-sm text-white/60">
                    We've emailed you a confirmation and our team will reach out shortly.
                  </p>
                </>
              ) : (
                <>
                  <h2 className="font-display text-xl font-bold">Token raised</h2>
                  <p className="rounded-lg border border-white/15 px-4 py-2 font-mono text-lg text-flame">
                    {success.token}
                  </p>
                  <p className="text-sm text-white/60">
                    We've emailed this token to you — reference it in any follow-up.
                  </p>
                </>
              )}
              {error && <p className="text-xs text-amber-400">{error}</p>}
              <button
                onClick={handleClose}
                className="mt-3 rounded-lg border border-white/15 px-5 py-2 text-sm font-semibold hover:bg-white/10"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/60">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-white/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-flame"
      />
    </div>
  );
}

function TextArea({ label, name, required }: { label: string; name: string; required?: boolean }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/60">
        {label}
      </label>
      <textarea
        name={name}
        required={required}
        rows={4}
        className="w-full resize-none rounded-lg border border-white/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-flame"
      />
    </div>
  );
}