import HomeShell from "@/components/HomeShell";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

const FALLBACK_PROJECTS = [
  { title: "Nexora Social System", slug: "nexora-social-system", shortDescription: "Full-stack social platform featuring user authentication, real-time feed interactions, media sharing, and responsive design.", techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind"], category: "fullstack", liveUrl: "https://nexoras-social.vercel.app/signin/", githubClientUrl: "https://github.com/web-nexoras/Nexora_Social_Frontend.git", featured: true, order: 1, thumbnail: { url: "/assets/nexoras.png" } },
  { title: "Rent Nest Management System", slug: "rent-nest-management-system", shortDescription: "Comprehensive property management portal for landlords and tenants with lease tracking, role-based dashboards, and payment records.", techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind"], category: "fullstack", githubClientUrl: "https://github.com/web-nexoras/Rent_nest_Auth.git", featured: true, order: 2, thumbnail: { url: "/assets/rent.png" } },
  { title: "Money Expense Tracker", slug: "money-expense-tracker", shortDescription: "Personal finance and budget analytics application for tracking daily income, categorizing expenses, and visualizing cash flow.", techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind"], category: "fullstack", githubClientUrl: "https://github.com/web-nexoras/Money_Expense_Tracker.git", featured: true, order: 3, thumbnail: { url: "/assets/expense.png" } },
  { title: "Quick Sell BD — Fashion E-Commerce", slug: "quick-sell-bd-fashion-e-commerce", shortDescription: "Modern fashion e-commerce platform with interactive sales analytics, product catalog filtering, and seamless checkout experience.", techStack: ["React", "TypeScript", "Recharts", "Tailwind"], category: "frontend", liveUrl: "https://quick-sell-bd.vercel.app/", githubClientUrl: "https://github.com/mahirTheCoder/Quick_Sell_BD.git", featured: true, order: 4, thumbnail: { url: "/assets/quick.png" } },
  { title: "Bushu's Wear E-Commerce Store", slug: "bushu-s-wear-e-commerce-store", shortDescription: "Apparel storefront engineered with dynamic product filtering, persistent cart state management, and mobile-first responsive UI.", techStack: ["React", "Vite", "TypeScript", "Tailwind"], category: "frontend", liveUrl: "https://wear-store.vercel.app/", githubClientUrl: "https://github.com/mahirTheCoder/Bushu-s-Wear.git", featured: false, order: 5, thumbnail: { url: "/assets/bushus.png" } },
  { title: "FoodZoone BD — Restaurant Platform", slug: "foodzoone-bd-restaurant-website", shortDescription: "Interactive digital menu and online food ordering platform with category filtering, real-time cart updates, and smooth checkout flow.", techStack: ["React", "Vite", "TypeScript", "Tailwind"], category: "frontend", liveUrl: "https://khabarbari.vercel.app/", githubClientUrl: "https://github.com/mahirTheCoder/Foodie.git", featured: false, order: 6, thumbnail: { url: "/assets/restu.png" } },
  { title: "Nextone E-Commerce Store", slug: "nextone-e-commerce-store", shortDescription: "Scalable retail storefront featuring curated collections, multi-criteria product search, and optimized page transitions.", techStack: ["React", "Vite", "Tailwind"], category: "frontend", liveUrl: "https://nexton-e-commerce-eosin.vercel.app/", githubClientUrl: "https://github.com/mahirTheCoder/Nexton-E-commerce.git", featured: false, order: 7, thumbnail: { url: "/assets/next.png" } },
  { title: "Candle E-Commerce Boutique", slug: "candle-e-commerce-shop", shortDescription: "Bespoke e-commerce experience for artisanal home fragrances with clean product showcases, quick-view modals, and cart management.", techStack: ["React", "Vite", "Tailwind"], category: "frontend", liveUrl: "https://candle-xi-tan.vercel.app/", githubClientUrl: "https://github.com/mahirTheCoder/candle.git", featured: false, order: 8, thumbnail: { url: "/assets/can.png" } },
  { title: "LUXDRIVE — Luxury Car Rental", slug: "luxdrive-landing-page", shortDescription: "High-converting automotive showcase and reservation interface featuring fleet comparisons, pricing tiers, and streamlined booking.", techStack: ["React", "Vite", "Tailwind"], category: "frontend", liveUrl: "https://luxdrive-ueuq.vercel.app/", githubClientUrl: "https://github.com/mahirTheCoder/LUXDRIVE.git", featured: false, order: 9, thumbnail: { url: "/assets/Lux.png" } },
  { title: "Modern Furniture Showcase", slug: "furniture-landing-page", shortDescription: "Responsive interior design and furniture catalog website crafted with clean typography, smooth scroll animations, and cross-device support.", techStack: ["HTML", "CSS", "JavaScript", "Bootstrap"], category: "frontend", liveUrl: "https://mahirthecoder.github.io/project_-furniture/", githubClientUrl: "https://github.com/mahirTheCoder/project_-furniture.git", featured: false, order: 10, thumbnail: { url: "/assets/furniture.png" } },
];

async function getProjects() {
  try {
    const res = await fetch(`${API_BASE}/projects`, { next: { revalidate: 60 } });
    if (!res.ok) return FALLBACK_PROJECTS;
    const json = await res.json();
    const list = Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : [];
    return list.length > 0 ? list : FALLBACK_PROJECTS;
  } catch {
    return FALLBACK_PROJECTS;
  }
}

export default async function Home() {
  const projects = await getProjects();
  return <HomeShell projects={projects} />;
}
