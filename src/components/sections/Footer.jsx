"use client";

import { Github, Linkedin, Facebook, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { useTranslations } from "next-intl";

const socials = [
  { icon: Github, label: "GitHub", href: siteConfig.socials.github },
  { icon: Linkedin, label: "LinkedIn", href: siteConfig.socials.linkedin },
  { icon: Facebook, label: "Facebook", href: siteConfig.socials.facebook },
];

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const t = useTranslations("Footer");
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", targetId);
    }
  };

  return (
    <footer
      className="relative w-full"
      style={{ background: "hsl(var(--background-2))", borderTop: "1px solid hsl(var(--border))" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="font-display font-bold text-xl">
              <span className="gradient-text">{siteConfig.brandShort}</span>
              <span className="text-foreground">{siteConfig.brandRest}</span>
              <span className="text-primary">_</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              MERN stack developer crafting beautiful, performant web experiences.
              Available for freelance work worldwide.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-widest">
              {t("quickLinks")}
            </h4>
            <nav className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 hover:translate-x-1"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social & Status */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-widest">
              {t("connect")}
            </h4>
            <div className="flex gap-3 mb-6">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -4, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary transition-colors border border-transparent"
                    style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))" }}
                    title={s.label}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs text-muted-foreground font-medium">Available for new projects</span>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid hsl(var(--border))" }}
        >
          <p className="text-muted-foreground text-xs">
            {t("copyright", { year: new Date().getFullYear(), brand: siteConfig.brand })}
          </p>

          <motion.button
            onClick={scrollTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
