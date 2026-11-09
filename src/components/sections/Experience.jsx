"use client";

import { motion } from "framer-motion";
import { Briefcase, Award, ChevronRight } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import { useTranslations } from "next-intl";

const experiences = [
  {
    period: "2026 – Present",
    role: "Freelance React Developer",
    company: "Self-Employed",
    type: "work",
    achievements: [
      "Built small React projects and landing pages for practice",
      "Experimented with Tailwind and Next.js for UI improvements",
      "Gained experience in responsive and modern frontend design",
    ],
    stack: ["React", "TypeScript", "Tailwind", "Next.js"],
  },
  {
    period: "2025",
    role: "Frontend Developer Intern",
    company: "Creative IT",
    type: "work",
    achievements: [
      "Learned React fundamentals during internship",
      "Contributed to minor projects / small components",
      "Explored Redux, basic testing, and UI improvements",
    ],
    stack: ["React", "Redux", "JavaScript", "CSS"],
  },
  {
    period: "2025",
    role: "React Developer Certificate",
    company: "Creative IT",
    type: "award",
    achievements: [
      "Completed full React certification curriculum",
      "Built 5 small projects to practice React concepts",
      "Learned hooks, context, and basic state management",
    ],
    stack: ["React", "JavaScript", "CSS"],
  },
  {
    period: "2023 – 2024",
    role: "Self-taught Web Developer",
    company: "Personal Projects",
    type: "work",
    achievements: [
      "Learned HTML, CSS, JavaScript, and React from scratch",
      "Built 10+ projects on GitHub for learning",
      "Gained understanding of frontend basics and responsive UI",
    ],
    stack: ["HTML", "CSS", "JavaScript", "React"],
  },
];
export default function Experience() {
  const t = useTranslations("Experience");
  return (
    <SectionWrapper id="experience">
      <SectionHeading
        tag={t("tag")}
        title={t("title")}
        highlight={t("highlight")}
        subtitle={t("subtitle")}
      />

      <div className="relative max-w-3xl mx-auto">
        {/* Central timeline line */}
        <div
          className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
          style={{ background: "linear-gradient(to bottom, hsl(var(--primary)), hsl(var(--secondary)), transparent)" }}
        />

        {experiences.map((exp, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.55, ease: "easeOut" }}
              className={`relative flex md:items-center mb-10 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-col gap-4`}
            >
              {/* Content card */}
              <div className={`md:w-5/12 ${isLeft ? "md:text-right" : "md:text-left"}`}>
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.22 } }}
                  className="glass-card rounded-2xl p-5 transition-all"
                  style={{ cursor: "default" }}
                >
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-mono mb-3"
                    style={{
                      background: "hsl(var(--primary) / 0.08)",
                      color: "hsl(var(--primary))",
                      border: "1px solid hsl(var(--primary) / 0.25)",
                    }}
                  >
                    {exp.period}
                  </span>

                  <h3 className="font-display font-bold text-lg text-foreground mb-1">{exp.role}</h3>
                  <p className="text-muted-foreground text-sm mb-3 italic">{exp.company}</p>

                  <ul className={`space-y-1 mb-4 ${isLeft ? "md:text-right" : "md:text-left"}`}>
                    {exp.achievements.map((ach, j) => (
                      <li
                        key={j}
                        className={`text-muted-foreground text-xs leading-relaxed flex items-start gap-1.5 ${isLeft ? "flex-row-reverse text-right" : "text-left"}`}
                      >
                        <ChevronRight className={`mt-0.5 h-3 w-3 flex-shrink-0 ${isLeft ? "rotate-180" : ""}`} style={{ color: "hsl(var(--primary))" }} />
                        <span className="min-w-0 flex-1">{ach}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={`flex flex-wrap gap-2 ${isLeft ? "md:justify-end" : "md:justify-start"}`}>
                    {exp.stack.map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center whitespace-nowrap px-2 py-0.5 rounded text-xs font-mono"
                        style={{
                          background: "hsl(var(--muted))",
                          color: "hsl(var(--muted-foreground))",
                          border: "1px solid hsl(var(--border))",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Center icon */}
              <div className="md:w-2/12 flex items-center justify-center">
                <motion.div
                  whileInView={{ scale: [0.5, 1.15, 1] }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 + 0.2, duration: 0.4 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center z-10 flex-shrink-0"
                  style={{
                    background: "hsl(var(--background))",
                    border: "2px solid hsl(var(--primary))",
                    boxShadow: "0 0 14px hsl(var(--primary) / 0.35)",
                  }}
                >
                  {exp.type === "award"
                    ? <Award size={18} style={{ color: "hsl(var(--primary))" }} />
                    : <Briefcase size={18} style={{ color: "hsl(var(--primary))" }} />
                  }
                </motion.div>
              </div>

              <div className="hidden md:block md:w-5/12" />
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
