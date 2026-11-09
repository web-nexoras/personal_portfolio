"use client";

import { motion } from "framer-motion";
import { Server, Database, Palette, Rocket, Layers } from "lucide-react";
import { SiReact } from "react-icons/si";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import { useTranslations } from "next-intl";

const services = [
  {
    icon: SiReact,
    title: "Frontend Development",
    desc: "Building fast, scalable interfaces with React & Next.js — modern hooks, clean component architecture, and best practices.",
    color: "hsl(192 100% 50%)",
    features: ["React & Next.js", "Reusable Components", "Responsive UI", "State Management"],
  },
  {
    icon: Server,
    title: "Backend Development",
    desc: "Designing robust REST APIs and server logic with Node.js & Express.js, built for reliability and scale.",
    color: "hsl(142 70% 45%)",
    features: ["Node.js & Express.js", "REST API Design", "Authentication & JWT", "Error Handling"],
  },
  {
    icon: Database,
    title: "Database Design",
    desc: "Modeling and managing data with MongoDB & Mongoose — schema design, indexing, and query optimisation.",
    color: "hsl(142 60% 40%)",
    features: ["MongoDB / Mongoose", "Schema Design", "Data Relationships", "Query Optimisation"],
  },
  {
    icon: Layers,
    title: "MERN Stack Development",
    desc: "End-to-end web applications — from database to UI — using MongoDB, Express.js, React and Node.js as one cohesive stack.",
    color: "hsl(262 70% 58%)",
    features: ["Full-Stack Architecture", "API Integration", "Auth & Authorization", "Admin Dashboards"],
  },
  {
    icon: Palette,
    title: "UI / UX Design",
    desc: "Translating wireframes and designs into pixel-perfect, accessible, and responsive interfaces with Tailwind CSS.",
    color: "hsl(340 80% 55%)",
    features: ["Responsive Design", "Design Systems", "Accessibility", "Micro-interactions"],
  },
  {
    icon: Rocket,
    title: "Deployment & Performance",
    desc: "Shipping production-ready apps with optimised performance, SEO-friendly rendering, and smooth CI/CD deployment.",
    color: "hsl(48 90% 55%)",
    features: ["Vercel / Cloud Hosting", "Performance Tuning", "SEO Best Practices", "CI/CD Basics"],
  },
];

export default function Services() {
  const t = useTranslations("Services");
  return (
    <SectionWrapper id="services">
      <SectionHeading
        tag={t("tag")}
        title={t("title")}
        highlight={t("highlight")}
        subtitle={t("subtitle")}
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -7, transition: { duration: 0.22 } }}
              className="glass-card rounded-2xl p-6 group"
            >
              <motion.div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                whileHover={{ scale: 1.12, rotate: 5 }}
                transition={{ duration: 0.22 }}
                style={{ background: `${service.color}12`, border: `1px solid ${service.color}28` }}
              >
                <Icon size={24} style={{ color: service.color }} />
              </motion.div>

              <h3 className="font-display font-bold text-xl text-foreground mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.desc}</p>

              <ul className="space-y-1.5">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: service.color }} />
                    {f}
                  </li>
                ))}
              </ul>

              <div
                className="mt-5 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
                style={{ background: `linear-gradient(90deg, ${service.color}, ${service.color}33)` }}
              />
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
