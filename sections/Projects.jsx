"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import { siteConfig } from "@/lib/site-config";

import { api } from "@/lib/api";

// Projects are now fetched from the separate portfolio backend API.

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: cy * 10, y: cx * -10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${hovered ? "-8px" : "0px"})`,
        transition: hovered ? "transform 0.1s ease" : "transform 0.4s ease",
      }}
      className="relative rounded-2xl overflow-hidden group cursor-pointer h-full flex flex-col"
    >
      <div
        className="h-full flex flex-col rounded-2xl overflow-hidden"
        style={{
          background: "hsl(var(--card))",
          border: hovered ? `1px solid ${project.color}55` : "1px solid hsl(var(--border))",
          boxShadow: hovered ? `0 24px 64px ${project.color}22, 0 8px 32px hsl(220 30% 10% / 0.15)` : "var(--shadow-card)",
          transition: "border-color 0.35s ease, box-shadow 0.35s ease",
        }}
      >
        <div className="relative h-44 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
            style={{
              transform: hovered ? "scale(1.06)" : "scale(1)",
              transition: "transform 0.5s ease",
              filter: hovered ? "brightness(1.05)" : "brightness(0.92)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to bottom, ${project.color}08 0%, hsl(var(--card)) 100%)` }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5"
            style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}44)` }}
          />
          {project.featured && (
            <div
              className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-mono font-medium backdrop-blur-sm"
              style={{ background: `${project.color}22`, color: project.color, border: `1px solid ${project.color}44` }}
            >
              ✦ Featured
            </div>
          )}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center gap-3"
                style={{ background: `${project.color}18`, backdropFilter: "blur(2px)" }}
              >
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-105"
                  style={{ background: project.color, color: "hsl(var(--primary-foreground))" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={13} /> Live Demo
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-105"
                  style={{ background: "hsl(var(--background))", color: "hsl(var(--foreground))", border: "1px solid hsl(var(--border))" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={13} /> Code
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-2 gap-2">
            <h3 className="font-display font-bold text-lg text-foreground leading-tight">{project.title}</h3>
            <motion.div
              animate={{ rotate: hovered ? 45 : 0 }}
              transition={{ duration: 0.25 }}
              className="flex-shrink-0 mt-0.5"
              style={{ color: project.color }}
            >
              <ArrowUpRight size={18} />
            </motion.div>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{project.desc}</p>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-xs font-mono rounded-md"
                style={{ background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))", border: "1px solid hsl(var(--border))" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api
      .getProjects()
      .then((data) => {
        if (!mounted) return;
        const list = Array.isArray(data) ? data : [];
        const mapped = list.map((p, i) => ({
          id: p._id || p.slug || i,
          slug: p.slug,
          title: p.title,
          desc: p.shortDescription || p.description || "",
          tags: p.techStack || [],
          color: "hsl(192 100% 50%)",
          demo: p.liveUrl || "",
          github: p.githubClientUrl || p.githubServerUrl || "",
          featured: !!p.featured,
          image: p.thumbnail?.url || p.image || "/assets/nexoras.png",
        }));
        setProjects(mapped);
      })
      .catch(() => {
        if (mounted) setProjects([]);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <SectionWrapper id="projects">
      <SectionHeading
        tag="projects"
        title="What We've"
        highlight="Built"
        subtitle="A collection of projects that showcase our skills, creativity, and passion for great software."
      />
      {loading ? (
        <p className="text-center text-muted-foreground">Loading projects...</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id || i} project={project} index={i} />
          ))}
        </div>
      )}
      <motion.div
        className="text-center mt-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <a
          href={siteConfig.socials.github}
          target="_blank"
          rel="noreferrer"
          className="btn-neon inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-medium"
          style={{ color: "hsl(var(--primary))" }}
        >
          <Github size={16} />
          View All on GitHub
        </a>
      </motion.div>
    </SectionWrapper>
  );
}
