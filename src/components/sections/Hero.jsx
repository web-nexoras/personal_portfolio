"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/site-config";

/* ---- Typing animation hook ---- */
const roles = [
  "MERN Stack Developer",
  "Full Stack Web Developer",
  "React & Next.js Developer",
  "Node.js & API Developer",
];

function useTyping() {
  const [text, setText] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          if (charIdx < current.length) {
            setText(current.slice(0, charIdx + 1));
            setCharIdx((c) => c + 1);
          } else {
            setTimeout(() => setDeleting(true), 1600);
          }
        } else {
          if (charIdx > 0) {
            setText(current.slice(0, charIdx - 1));
            setCharIdx((c) => c - 1);
          } else {
            setDeleting(false);
            setRoleIdx((r) => (r + 1) % roles.length);
          }
        }
      },
      deleting ? 38 : 78,
    );
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, roleIdx]);

  return text;
}

/* ---- Hero Section ---- */
export default function Hero() {
  const t = useTranslations("Hero");
  const typedText = useTyping();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div
        className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full blur-[130px] opacity-[0.06] pointer-events-none"
        style={{ background: "hsl(var(--primary))" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[110px] opacity-[0.05] pointer-events-none"
        style={{ background: "hsl(var(--secondary))" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Text */}
          <div className="order-1 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono mb-6"
              style={{
                background: "hsl(var(--primary) / 0.08)",
                border: "1px solid hsl(var(--primary) / 0.3)",
                color: "hsl(var(--primary))",
              }}
            >
              <span className="glow-dot" />
              {t("tag")}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="font-display font-bold leading-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              <span className="text-foreground">{t("title")} </span>
              <br />
              <span className="gradient-text">{siteConfig.brand}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-4 mb-6 font-mono text-xl md:text-2xl font-medium flex items-center gap-1"
              style={{ color: "hsl(var(--primary))" }}
            >
              <span>&gt;&nbsp;</span>
              <span>{typedText}</span>
              <span className="inline-block w-0.5 h-[1.1em] bg-primary animate-[typing-cursor_1s_ease-in-out_infinite] align-middle" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-muted-foreground text-lg leading-relaxed max-w-lg mb-8"
            >
              {t("description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72, duration: 0.5 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <a
                href="#projects"
                className="btn-neon px-8 py-3 rounded-xl font-medium text-sm inline-block cursor-pointer"
                style={{ color: "hsl(var(--primary))" }}
              >
                {t("ctaSecondary")}
              </a>
              <a
                href="#contact"
                className="px-8 py-3 rounded-xl font-medium text-sm inline-block cursor-pointer transition-all hover:scale-105 hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
                  color: "hsl(var(--primary-foreground))",
                  boxShadow: "0 4px 24px hsl(var(--primary) / 0.25)",
                }}
              >
                {t("ctaPrimary")}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.88, duration: 0.5 }}
              className="flex gap-8"
            >
              {[
                { value: "10+", label: "Projects Built" },
                { value: "2+", label: "Years Coding" },
                { value: "15+", label: "Tech Skills" },
              ].map((stat) => (
                <motion.div key={stat.label} whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 300 }}>
                  <div className="gradient-text font-display font-bold text-2xl">{stat.value}</div>
                  <div className="text-muted-foreground text-xs mt-0.5">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right — Profile card */}
          <motion.div
            className="order-2 lg:order-2 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative">
              <div className="absolute -inset-6 rounded-3xl opacity-20 blur-2xl" style={{ background: "var(--gradient-primary)" }} />
              <div className="absolute -top-3 -right-3 w-24 h-24 rounded-2xl" style={{ background: "hsl(var(--primary) / 0.08)", border: "1px solid hsl(var(--primary) / 0.2)" }} />
              <div className="absolute -bottom-3 -left-3 w-16 h-16 rounded-xl" style={{ background: "hsl(var(--secondary) / 0.08)", border: "1px solid hsl(var(--secondary) / 0.2)" }} />
              <div className="relative w-72 h-80 sm:w-80 sm:h-96">

                <motion.div
                  className="absolute inset-0 rounded-2xl overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.35 }}
                  style={{
                    boxShadow: "0 20px 60px hsl(var(--primary) / 0.2), 0 4px 16px hsl(0 0% 0% / 0.15)",
                  }}
                >
                  <Image
                    src="/assets/profile.jpg"
                    alt={`${siteConfig.brand} — MERN Stack Developer`}
                    fill
                    sizes="320px"
                    priority
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
                      <p className="font-display font-bold text-base text-foreground leading-none">{siteConfig.brand}</p>
                      <p className="text-xs font-mono mt-0.5" style={{ color: "hsl(var(--primary))" }}>
                        MERN Stack &amp; Full Stack Developer
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-12 left-1/2 translate-x-1/2 flex-col items-center gap-2 hidden lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        <span className="text-muted-foreground text-xs font-mono tracking-wider">scroll</span>
        <motion.div className="w-5 h-8 rounded-full flex justify-center pt-1.5 border border-primary/35">
          <motion.div
            className="w-1 h-2 rounded-full bg-primary"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
