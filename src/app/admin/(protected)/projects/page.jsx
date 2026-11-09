"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, Upload, X } from "lucide-react";
import { api } from "@/lib/api";

const emptyForm = {
  title: "",
  shortDescription: "",
  description: "",
  techStack: "",
  category: "frontend",
  liveUrl: "",
  githubClientUrl: "",
  githubServerUrl: "",
  featured: false,
  order: 0,
  thumbnail: null,
  images: [],
};

const inputClass =
  "w-full p-3 rounded-xl text-foreground placeholder:text-muted-foreground outline-none border border-transparent focus:border-primary/40 transition-colors";

const inputStyle = {
  background: "hsl(var(--card))",
  boxShadow: "inset 3px 3px 6px hsl(var(--background-2)), inset -3px -3px 6px hsl(var(--muted))",
};

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const load = () => api.getProjects().then(setProjects).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleUpload = async (e, field) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    try {
      const res = await api.uploadImages(files);
      const arr = Array.isArray(res) ? res : [res];
      if (field === "thumbnail") {
        setForm((f) => ({ ...f, thumbnail: arr[0] }));
      } else {
        setForm((f) => ({ ...f, images: [...f.images, ...arr] }));
      }
    } catch (err) {
      setMsg(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const payload = {
        title: form.title,
        shortDescription: form.shortDescription,
        description: form.description,
        techStack: form.techStack.split(",").map((s) => s.trim()).filter(Boolean),
        category: form.category,
        liveUrl: form.liveUrl,
        githubClientUrl: form.githubClientUrl,
        githubServerUrl: form.githubServerUrl,
        featured: form.featured,
        order: Number(form.order) || 0,
      };
      if (form.thumbnail) payload.thumbnail = form.thumbnail;
      if (form.images.length) payload.images = form.images;

      if (editingId) {
        await api.updateProject(editingId, payload);
        setMsg("Updated successfully");
      } else {
        await api.createProject(payload);
        setMsg("Created successfully");
      }
      setForm(emptyForm);
      setEditingId(null);
      load();
    } catch (err) {
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (p) => {
    setEditingId(p._id);
    setForm({
      title: p.title || "",
      shortDescription: p.shortDescription || "",
      description: p.description || "",
      techStack: (p.techStack || []).join(", "),
      category: p.category || "frontend",
      liveUrl: p.liveUrl || "",
      githubClientUrl: p.githubClientUrl || "",
      githubServerUrl: p.githubServerUrl || "",
      featured: !!p.featured,
      order: p.order || 0,
      thumbnail: p.thumbnail || null,
      images: p.images || [],
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this project?")) return;
    try {
      await api.deleteProject(id);
      load();
    } catch (err) {
      setMsg(err.message);
    }
  };

  const cardStyle = {
    background: "hsl(var(--card))",
    border: "1px solid hsl(var(--border))",
    boxShadow: "var(--shadow-card)",
  };

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold font-display mb-6 text-foreground"
      >
        Projects
      </motion.h1>

      {msg && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 text-primary text-sm"
        >
          {msg}
        </motion.p>
      )}

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="p-6 rounded-2xl space-y-4 mb-8"
        style={cardStyle}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required className={inputClass} style={inputStyle} />
          <select name="category" value={form.category} onChange={handleChange} className={inputClass} style={inputStyle}>
            <option value="frontend">frontend</option>
            <option value="backend">backend</option>
            <option value="fullstack">fullstack</option>
          </select>
        </div>
        <input name="shortDescription" value={form.shortDescription} onChange={handleChange} placeholder="Short description" className={inputClass} style={inputStyle} />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" rows={3} className={inputClass} style={inputStyle} />
        <input name="techStack" value={form.techStack} onChange={handleChange} placeholder="Tech stack (comma separated)" className={inputClass} style={inputStyle} />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input name="liveUrl" value={form.liveUrl} onChange={handleChange} placeholder="Live URL" className={inputClass} style={inputStyle} />
          <input name="githubClientUrl" value={form.githubClientUrl} onChange={handleChange} placeholder="GitHub client URL" className={inputClass} style={inputStyle} />
          <input name="githubServerUrl" value={form.githubServerUrl} onChange={handleChange} placeholder="GitHub server URL" className={inputClass} style={inputStyle} />
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="accent-primary" /> Featured
          </label>
          <input name="order" type="number" value={form.order} onChange={handleChange} placeholder="Order" className={inputClass + " w-24"} style={inputStyle} />
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <Upload size={16} /> Thumbnail:
          </label>
          <input type="file" accept="image/*" onChange={(e) => handleUpload(e, "thumbnail")} className="text-sm" />
          {form.thumbnail?.url && (
            <img src={form.thumbnail.url} alt="" className="h-12 rounded-lg border" style={{ borderColor: "hsl(var(--border))" }} />
          )}
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <Upload size={16} /> Images:
          </label>
          <input type="file" accept="image/*" multiple onChange={(e) => handleUpload(e, "images")} className="text-sm" />
        </div>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-primary-foreground disabled:opacity-50"
            style={{ background: "hsl(var(--primary))", boxShadow: "var(--shadow-neon-sm)" }}
          >
            {loading ? "Saving..." : editingId ? "Update Project" : "Create Project"}
          </motion.button>
          {editingId && (
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => { setEditingId(null); setForm(emptyForm); }}
              className="px-5 py-2.5 rounded-xl text-sm font-medium"
              style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))", color: "hsl(var(--foreground))" }}
            >
              Cancel
            </motion.button>
          )}
        </div>
      </motion.form>

      <div className="space-y-3">
        <AnimatePresence>
          {projects.map((p, i) => (
            <motion.div
              key={p._id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ delay: i * 0.04, duration: 0.35 }}
              whileHover={{ y: -2 }}
              className="flex items-center justify-between gap-4 p-4 rounded-2xl"
              style={cardStyle}
            >
              <div className="flex items-center gap-4">
                {p.thumbnail?.url && (
                  <img src={p.thumbnail.url} alt="" className="h-12 w-12 object-cover rounded-lg border" style={{ borderColor: "hsl(var(--border))" }} />
                )}
                <div>
                  <p className="font-semibold text-foreground">{p.title}</p>
                  <p className="text-sm text-muted-foreground">{p.category} · {(p.techStack || []).join(", ")}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleEdit(p)}
                  className="p-2 rounded-lg"
                  style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))", color: "hsl(var(--foreground))" }}
                >
                  <Pencil size={16} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(p._id)}
                  className="p-2 rounded-lg"
                  style={{ background: "hsl(var(--destructive) / 0.15)", border: "1px solid hsl(var(--destructive) / 0.4)", color: "hsl(var(--destructive))" }}
                >
                  <Trash2 size={16} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {projects.length === 0 && <p className="text-muted-foreground text-sm">No projects yet.</p>}
      </div>
    </div>
  );
}