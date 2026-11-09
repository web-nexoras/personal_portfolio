"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiJavascript,
  SiTailwindcss,
  SiTypescript,
  SiGit,
  SiFigma,
  SiHtml5,
  SiCss3,
  SiDocker,
  SiRedis,
} from "react-icons/si";

const defaultSkills = [
  { name: "React.js", color: "#61dafb", Icon: SiReact, category: "frontend" },
  { name: "Next.js",  color: "#a8a8a8", Icon: SiNextdotjs, category: "frontend" },
  { name: "JavaScript", color: "#f0db4f", Icon: SiJavascript, category: "frontend" },
  { name: "Tailwind CSS",  color: "#38bdf8", Icon: SiTailwindcss, category: "frontend" },
  { name: "HTML5", color: "#e34f26", Icon: SiHtml5, category: "frontend" },
  { name: "CSS3",  color: "#2965f1", Icon: SiCss3, category: "frontend" },
  { name: "Node.js", color: "#3fa845", Icon: SiNodedotjs, category: "backend" },
  { name: "Express.js", color: "#a0a0a0", Icon: SiExpress, category: "backend" },
  { name: "MongoDB", color: "#47a248", Icon: SiMongodb, category: "backend" },
  { name: "Docker", color: "#2496ed", Icon: SiDocker, category: "tools" },
  { name: "Redis", color: "#dc382d", Icon: SiRedis, category: "backend" },
  { name: "TypeScript",color: "#3178c6", Icon: SiTypescript, category: "tools" },
  { name: "Git & GitHub", color: "#f05133", Icon: SiGit, category: "tools" },
  { name: "Figma",  color: "#f24e1e", Icon: SiFigma, category: "tools" },
];

function SkillCard({ skill }) {
  const { name, color, Icon } = skill;
  return (
    <div
      className="skill-card group"
      style={{ "--skill-color": color }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${color}66`;
        e.currentTarget.style.boxShadow = `0 16px 40px ${color}33, 0 0 0 1px ${color}22`;
        e.currentTarget.style.background = `linear-gradient(160deg, ${color}14, hsl(var(--card)))`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "";
        e.currentTarget.style.boxShadow = "";
        e.currentTarget.style.background = "";
      }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
        style={{ background: `${color}18`, border: `1px solid ${color}35` }}
      >
        <Icon size={22} style={{ color }} />
      </div>
      <p className="font-display font-semibold text-sm text-foreground leading-tight mb-1">
        {name}
      </p>
    </div>
  );
}

function MarqueeRow({ items, direction = "left", speed = 32 }) {
  const [paused, setPaused] = useState(false);
  const duration = Math.max(items.length * (100 / speed), 12);

  return (
    <div
      className="skills-marquee-wrap py-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className={`skills-marquee-track dir-${direction} ${paused ? "paused" : ""}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {[...items, ...items].map((skill, i) => (
          <SkillCard key={`${skill.name}-${i}`} skill={skill} />
        ))}
      </div>
    </div>
  );
}

export default function SkillsDisplay({ skills = defaultSkills }) {
  const half = Math.ceil(skills.length / 2);
  const rowOne = skills.slice(0, half);
  const rowTwo = skills.slice(half);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="space-y-2"
    >
      <MarqueeRow items={rowOne} direction="left" />
      <MarqueeRow items={rowTwo.length ? rowTwo : rowOne} direction="right" />
    </motion.div>
  );
}
