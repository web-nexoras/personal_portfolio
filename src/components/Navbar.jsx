"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const navLinks = [
  { key: "home", href: "#home" },
  { key: "about", href: "#about" },
  { key: "projects", href: "#projects" },
  { key: "experience", href: "#experience" },
  { key: "services", href: "#services" },
  { key: "contact", href: "#contact" },
];

export default function Navbar({ darkMode, toggleDarkMode }) {
  const t = useTranslations("Nav");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navTo = (href) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const navBg = scrolled
    ? darkMode
      ? "hsl(240 50% 3% / 0.88)"
      : "hsl(220 30% 98% / 0.92)"
    : "transparent";

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-3" : "py-5"
        }`}
        style={{
          background: navBg,
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid hsl(var(--border))" : "none",
          boxShadow: scrolled
            ? darkMode
              ? "0 1px 32px hsl(240 50% 2% / 0.6)"
              : "0 1px 16px hsl(220 30% 60% / 0.08)"
            : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              navTo("#home");
            }}
            className="font-display font-bold text-xl"
          >
            <span className="gradient-text">{siteConfig.brandShort}</span>
            <span className="text-foreground">{siteConfig.brandRest}</span>
            <span className="text-primary animate-[typing-cursor_1s_ease-in-out_infinite]">_</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              return (
                <button
                  key={link.key}
                  onClick={() => navTo(link.href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                    active === id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {active === id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: "hsl(var(--primary) / 0.08)",
                        border: "1px solid hsl(var(--primary) / 0.25)",
                      }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{t(link.key)}</span>
                </button>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2.5">
            <LanguageSwitcher />
            <motion.button
              onClick={toggleDarkMode}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg transition-all"
              style={{
                border: "1px solid hsl(var(--border))",
                color: "hsl(var(--muted-foreground))",
                background: "hsl(var(--card))",
              }}
              title={darkMode ? "Light mode" : "Dark mode"}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={darkMode ? "sun" : "moon"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {darkMode ? <Sun size={17} /> : <Moon size={17} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
            <button
              className="hidden md:block btn-neon px-5 py-2 rounded-lg text-sm font-medium font-mono"
              onClick={() => navTo("#contact")}
              style={{ color: "hsl(var(--primary))" }}
            >
              {t("hireMe")}
            </button>
            <button
              className="md:hidden p-2 rounded-lg transition-all"
              style={{
                border: "1px solid hsl(var(--border))",
                color: "hsl(var(--muted-foreground))",
                background: "hsl(var(--card))",
              }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed top-[60px] left-0 right-0 z-40 md:hidden"
            style={{
              background: darkMode ? "hsl(240 50% 3% / 0.97)" : "hsl(220 30% 98% / 0.97)",
              backdropFilter: "blur(20px) saturate(180%)",
              borderBottom: "1px solid hsl(var(--border))",
              boxShadow: darkMode
                ? "0 8px 40px hsl(240 50% 2% / 0.5)"
                : "0 4px 24px hsl(220 30% 60% / 0.1)",
            }}
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.key}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => navTo(link.href)}
                  className="text-left px-4 py-3 rounded-lg text-muted-foreground hover:text-primary transition-all text-sm font-medium"
                  style={{
                    background:
                      active === link.href.replace("#", "") ? "hsl(var(--primary) / 0.06)" : "transparent",
                  }}
                >
                  {t(link.key)}
                </motion.button>
              ))}
              <button
                className="btn-neon mt-2 py-3 rounded-lg text-sm font-medium font-mono"
                onClick={() => navTo("#contact")}
                style={{ color: "hsl(var(--primary))" }}
              >
                {t("hireMe")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
