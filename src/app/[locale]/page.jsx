import HomeShell from "@/components/HomeShell";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

async function getProjects() {
  try {
    const res = await fetch(`${API_BASE}/projects`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const projects = await getProjects();
  return <HomeShell projects={projects} />;
}