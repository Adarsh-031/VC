import { Company } from "./types";

export const companies: Company[] = [
  {
    id: "razorpay",
    name: "Razorpay",
    website: "https://razorpay.com/",
    sector: "Fintech",
    stage: "Private",
    location: "Bengaluru, Karnataka",
    description:
      "Payments platform for businesses to accept, process, and manage online transactions and payouts.",
    tags: ["payments", "gateway", "api"],
  },
  {
    id: "acko",
    name: "Acko",
    website: "https://www.acko.com/",
    sector: "Insurtech",
    stage: "Private",
    location: "Bengaluru, Karnataka",
    description:
      "Digital-first general insurer offering motor, health, travel, and other policies through online channels.",
    tags: ["insurance", "digital", "consumer"],
  },
  {
    id: "pharmeasy",
    name: "PharmEasy",
    website: "https://pharmeasy.in/",
    sector: "Healthtech",
    stage: "Private",
    location: "Mumbai, Maharashtra",
    description:
      "Online pharmacy and healthcare platform with medicine delivery, diagnostics, and telehealth services.",
    tags: ["pharmacy", "diagnostics", "telehealth"],
  },
  {
    id: "swiggy",
    name: "Swiggy",
    website: "https://www.swiggy.com/",
    sector: "Consumer",
    stage: "Public",
    location: "Bengaluru, Karnataka",
    description:
      "Online food ordering and delivery platform with quick-commerce and grocery offerings.",
    tags: ["food-delivery", "q-commerce", "marketplace"],
  },
  {
    id: "oyo",
    name: "OYO",
    website: "https://www.oyorooms.com/",
    sector: "Hospitality",
    stage: "Private",
    location: "Gurugram, Haryana",
    description:
      "Hospitality brand operating franchised and leased hotels, homes, and living spaces.",
    tags: ["travel", "hotels", "marketplace"],
  },
  {
    id: "delhivery",
    name: "Delhivery",
    website: "https://www.delhivery.com/",
    sector: "Logistics",
    stage: "Public",
    location: "Gurugram, Haryana",
    description:
      "Logistics and supply-chain company providing parcel, freight, and warehousing services.",
    tags: ["logistics", "supply-chain", "freight"],
  },
  {
    id: "ather-energy",
    name: "Ather Energy",
    website: "https://www.atherenergy.com/",
    sector: "Mobility",
    stage: "Public",
    location: "Bengaluru, Karnataka",
    description:
      "Electric two-wheeler manufacturer building EV scooters and charging ecosystem in India.",
    tags: ["ev", "mobility", "manufacturing"],
  },
  {
    id: "renew",
    name: "ReNew",
    website: "https://www.renew.com/",
    sector: "Climate",
    stage: "Public",
    location: "Gurugram, Haryana",
    description:
      "Renewable energy company operating large-scale wind and solar power assets.",
    tags: ["renewables", "solar", "wind"],
  },
  {
    id: "meesho",
    name: "Meesho",
    website: "https://www.meesho.com/",
    sector: "E-commerce",
    stage: "Public",
    location: "Bengaluru, Karnataka",
    description:
      "Value-focused online marketplace connecting sellers with buyers across India.",
    tags: ["marketplace", "value-commerce", "consumer"],
  },
  {
    id: "zoho",
    name: "Zoho",
    website: "https://www.zoho.com/",
    sector: "SaaS",
    stage: "Private",
    location: "Chennai, Tamil Nadu",
    description:
      "Enterprise software suite offering CRM, productivity, and IT management tools.",
    tags: ["enterprise", "crm", "cloud"],
  },
];

export const sectors = Array.from(new Set(companies.map((c) => c.sector)));
export const stages = Array.from(new Set(companies.map((c) => c.stage)));
export const locations = Array.from(new Set(companies.map((c) => c.location)));
