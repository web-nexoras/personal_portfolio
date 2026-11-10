"use client";

import { motion } from "framer-motion";
import { Download, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import SkillsDisplay from "@/components/SkillsDisplay";
import { siteConfig } from "@/lib/site-config";
import { useTranslations } from "next-intl";

const stats = [
  { value: "10+", label: "Projects Shipped" },
  { value: "2+", label: "Years Experience" },
  { value: "100%", label: "Client Satisfaction" },
  { value: "15+", label: "Core Technologies" },
];

const highlights = [
  "End-to-end MERN stack development — MongoDB, Express.js, React.js, Next.js & Node.js",
  "Designing secure RESTful APIs with JWT authentication, validation, and role-based access control",
  "Engineering high-performance, SEO-optimized, and responsive user interfaces with Tailwind CSS",
  "Database schema modeling, indexing, and query optimization for production workloads",
  "Delivering clean, modular codebases with modern Git workflows and cloud deployments",
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -32 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 32 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function About() {
  const t = useTranslations("About");
  return (
    <SectionWrapper id="about">
      <SectionHeading
        tag={t("tag")}
        title={t("title")}
        highlight={t("highlight")}
        subtitle={t("subtitle")}
      />

      <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center mb-20">
        {/* Left — Photo block */}
        <motion.div {...fadeLeft(0)} className="flex justify-center lg:justify-end order-2 lg:order-1">
          <div className="relative">
            <div
              className="absolute -inset-6 rounded-3xl opacity-20 blur-2xl"
              style={{ background: "var(--gradient-primary)" }}
            />
            <div
              className="absolute -top-3 -right-3 w-24 h-24 rounded-2xl"
              style={{ background: "hsl(var(--primary) / 0.08)", border: "1px solid hsl(var(--primary) / 0.2)" }}
            />
            <div
              className="absolute -bottom-3 -left-3 w-16 h-16 rounded-xl"
              style={{ background: "hsl(var(--secondary) / 0.08)", border: "1px solid hsl(var(--secondary) / 0.2)" }}
            />

            <motion.div
              className="relative w-[min(18rem,calc(100vw-3rem))] aspect-[0.9] sm:w-80 sm:h-96 sm:aspect-auto rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.35 }}
              style={{ position: "relative", boxShadow: "0 20px 60px hsl(var(--primary) / 0.2), 0 4px 16px hsl(0 0% 0% / 0.15)" }}
            >
              <Image
                src="/assets/profile.jpg"
                alt={`${siteConfig.brand} — MERN Stack Developer`}
                fill
                sizes="320px"
                className="object-cover"
                style={{ filter: "brightness(0.72)" }}
              />
              <div className="absolute inset-0" style={{ background: "hsl(0 0% 0% / 0.25)" }} />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, hsl(var(--background) / 0.5) 0%, transparent 50%)" }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div
                  className="rounded-xl px-4 py-3 backdrop-blur-md"
                  style={{ background: "hsl(var(--background) / 0.75)", border: "1px solid hsl(var(--border) / 0.6)" }}
                >
                  <p className="font-display font-bold text-base text-foreground leading-none">
                    {siteConfig.brand}
                  </p>
                  <p className="text-xs font-mono mt-0.5" style={{ color: "hsl(var(--primary))" }}>
                    MERN Stack &amp; Full-Stack Developer
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -top-4 -left-4 flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold shadow-lg"
              style={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(142 70% 40% / 0.4)",
                color: "hsl(142 70% 38%)",
                boxShadow: "0 4px 20px hsl(142 70% 40% / 0.18)",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Open to Work
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-4 -right-4 flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold shadow-lg"
              style={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--primary) / 0.35)",
                color: "hsl(var(--primary))",
                boxShadow: "0 4px 20px hsl(var(--primary) / 0.15)",
              }}
            >
              ⚡ 10+ Projects
            </motion.div>
          </div>
        </motion.div>

        {/* Right — Bio content */}
        <motion.div {...fadeRight(0.1)} className="space-y-6 order-1 lg:order-2">
          <div>
            <p className="text-muted-foreground text-base leading-relaxed mb-4">
              Hello — I&apos;m <span className="gradient-text font-semibold">{siteConfig.brand}</span>,
              a full-stack MERN developer working at the intersection of software engineering and modern UI design. I
              transform complex business requirements into fast, reliable, and intuitive web applications.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed">
              With a strong focus on <span className="text-foreground font-medium">scalable architecture</span>,{" "}
              <span className="text-foreground font-medium">clean maintainable code</span>, and{" "}
              <span className="text-foreground font-medium">responsive user experience</span>, I bring both engineering
              rigor and attention to detail to every product I deliver.
            </p>
          </div>

          <ul className="space-y-2.5">
            {highlights.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 + 0.15, duration: 0.42, ease: "easeOut" }}
                className="flex items-start gap-3 text-sm text-muted-foreground"
              >
                <CheckCircle2 size={15} className="shrink-0 mt-0.5" style={{ color: "hsl(var(--primary))" }} />
                {item}
              </motion.li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3 pt-2">
            <motion.a
              href="#contact"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
              style={{
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
                boxShadow: "0 4px 18px hsl(var(--primary) / 0.35)",
              }}
            >
              Hire Me <ArrowUpRight size={14} />
            </motion.a>
            <motion.a
              href={siteConfig.resumeUrl}
              download
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
              className="btn-neon flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
            >
              Download CV <Download size={14} />
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Stats */}
      <motion.div {...fadeUp(0)} className="glass-card rounded-2xl mb-20">
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y divide-border">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col items-center justify-center py-8 px-4 text-center"
            >
              <span className="font-bold text-4xl gradient-text">{s.value}</span>
              <span className="text-muted-foreground text-xs uppercase tracking-widest mt-1">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Skills — animated auto-scrolling cards */}
      <motion.div {...fadeUp(0.1)} className="mb-20">
        <h3 className="font-bold text-xl mb-8 text-center text-foreground">
          Technical <span className="gradient-text">Skills</span>
        </h3>

        <div className="rounded-2xl py-2">
          <SkillsDisplay />
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
