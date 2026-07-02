// src/data/packages.ts
// Single source of truth for pricing shown in the chat widget.
// Edit prices/features here — nothing else needs to change.

export type Package = {
  id: string;
  name: string;
  pages: number | string; // number, or a free-text string like "As per requirement"
  originalPrice: number | null; // null when there's no strike-through price to show
  discountedPrice: number | "on_request";
  gstAmount: number | "on_request";
  features: string[]; // plan-specific features, shown in addition to commonFeatures
};

export const companyInfo = {
  name: "Riyotech",
  website: "https://riyotech.in",
  phone: "+91-8010409600",
  email: "support@riyotech.in",
  currency: "INR",
  gstNote: "18% GST additional on all plans",
  hostingAnnualRenewal: 4000,
  renewalNote: "₹4,000/year hosting renewal after the first free year",
};

// Included on every plan — shown once beneath the plan list rather than
// repeated in every card.
export const commonFeatures: string[] = [
  "1 year free domain (.com/.in/.org)",
  "1 year free cloud hosting",
  "Free SSL certificate",
  "100% responsive, SEO-friendly website",
  "Live chat integration",
  "Payment gateway integration",
  "Social media integration",
  "Call button & WhatsApp button integration",
  "Inquiry form",
  "1 year free technical support",
];

export const packages: Package[] = [
  {
    id: "standard",
    name: "Standard",
    pages: 5,
    originalPrice: 10000,
    discountedPrice: 7999,
    gstAmount: 1440,
    features: [
      "Dynamic premium design",
      "5 free business emails",
      "Live chat + payment gateway",
      "WhatsApp/call button integration",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    pages: 12,
    originalPrice: 20000,
    discountedPrice: 13999,
    gstAmount: 2520,
    features: [
      "All Standard features",
      "Google Search Console setup",
      "10 free business emails",
      "WooCommerce features",
    ],
  },
  {
    id: "custom",
    name: "Custom",
    pages: "As per requirement",
    originalPrice: null,
    discountedPrice: "on_request",
    gstAmount: "on_request",
    features: ["Same feature set as Premium", "Fully custom scope"],
  },
  {
    id: "premium-ecommerce",
    name: "Premium E-commerce",
    pages: 30,
    originalPrice: 30000,
    discountedPrice: 21999,
    gstAmount: 3960,
    features: [
      "20 product categories, 30 products listed by us",
      "Product variations",
      "Auto invoice generator",
      "Wallet system",
      "OTP verification",
    ],
  },
  {
    id: "multi-vendor",
    name: "Multi-vendor Business & E-commerce",
    pages: 40,
    originalPrice: 60000,
    discountedPrice: 50000,
    gstAmount: 9000,
    features: [
      "50 product categories",
      "Dynamic multi-vendor system",
      "20 free business emails",
      "All Premium E-commerce features",
    ],
  },
  {
    id: "custom-multi-vendor",
    name: "Custom Multi-vendor",
    pages: "As per requirement",
    originalPrice: null,
    discountedPrice: "on_request",
    gstAmount: "on_request",
    features: ["Fully custom multi-vendor e-commerce build"],
  },
];