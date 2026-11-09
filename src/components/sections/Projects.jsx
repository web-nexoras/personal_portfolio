import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/sections/ProjectCard";
import { getTranslations } from "next-intl/server";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

async function getProjects() {
  try {
    const res = await fetch(`${API_BASE}/projects`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    const list = Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : [];
    return list.map((p, i) => ({
      id: p._id || p.slug || i,
      slug: p.slug,
      title: p.title,
      desc: p.shortDescription || p.description || "",
      tags: p.techStack || [],
      color: "hsl(192 100% 50%)",
      demo: p.liveUrl || "",
      github: p.githubClientUrl || p.githubServerUrl || "",
      featured: !!p.featured,
      image: p.thumbnail?.url || "/assets/nexoras.png",
    }));
  } catch {
    return [];
  }
}

export default async function Projects() {
  const t = await getTranslations("Projects");
  const projects = await getProjects();

  return (
    <SectionWrapper id="projects">
      <SectionHeading
        tag={t("tag")}
        title={t("title")}
        highlight={t("highlight")}
        subtitle={t("subtitle")}
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
      <div className="text-center mt-14">
        <a
          href="https://github.com/web-nexoras"
          target="_blank"
          rel="noreferrer"
          className="btn-neon inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-medium"
          style={{ color: "hsl(var(--primary))" }}
        >
          {t("viewAll")}
        </a>
      </div>
    </SectionWrapper>
  );
}