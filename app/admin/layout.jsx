"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, FolderKanban, Mail, LogOut, Sun, Moon } from "lucide-react";
import { api, getToken, setToken, clearToken } from "@/lib/api";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/contacts", label: "Contacts", icon: Mail },
];

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("adminDarkMode") : null;
    const isDark = stored === null ? true : stored === "true";
    setDarkMode(isDark);
    const root = document.documentElement;
    if (isDark) root.classList.remove("light");
    else root.classList.add("light");
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) root.classList.remove("light");
    else root.classList.add("light");
    if (typeof window !== "undefined") localStorage.setItem("adminDarkMode", String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setReady(true);
      return;
    }
    const init = async () => {
      try {
        if (!getToken()) await api.refresh();
        const me = await api.me();
        setUser(me);
        setReady(true);
      } catch {
        clearToken();
        router.replace("/admin/login");
      }
    };
    init();
  }, [pathname, router]);

  if (!ready && pathname !== "/admin/login") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "hsl(var(--background))" }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-8 h-8 rounded-full border-2"
          style={{ borderColor: "hsl(var(--primary))", borderTopColor: "transparent" }}
        />
      </div>
    );
  }

  if (pathname === "/admin/login") return <>{children}</>;

  const handleLogout = async () => {
    try { await api.logout(); } catch {}
    clearToken();
    router.replace("/admin/login");
  };

  const neoShadow = "6px 6px 12px hsl(var(--background-2)), -6px -6px 12px hsl(var(--muted))";

  return (
    <div className="min-h-screen flex" style={{ background: "hsl(var(--background))", color: "hsl(var(--foreground))" }}>
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="w-64 p-4 flex flex-col gap-2"
        style={{ background: "hsl(var(--background-2))", borderRight: "1px solid hsl(var(--border))" }}
      >
        <div className="mb-6 px-2">
          <h2 className="text-xl font-bold font-display">
            <span className="gradient-text">Admin</span>
            <span className="text-foreground"> Panel</span>
          </h2>
          {user && <p className="text-xs text-muted-foreground mt-1 truncate">{user.email}</p>}
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                  style={{
                    background: active ? "hsl(var(--primary) / 0.12)" : "transparent",
                    color: active ? "hsl(var(--primary))" : "hsl(var(--foreground-muted))",
                    border: active ? "1px solid hsl(var(--primary) / 0.3)" : "1px solid transparent",
                    boxShadow: active ? "var(--shadow-neon-sm)" : "none",
                  }}
                >
                  <Icon size={18} />
                  {item.label}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <div className="flex-1" />
        <motion.button
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setDarkMode((d) => !d)}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium"
          style={{
            background: "transparent",
            color: "hsl(var(--foreground-muted))",
            border: "1px solid hsl(var(--border))",
          }}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </motion.button>
        <motion.button
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium"
          style={{
            background: "transparent",
            color: "hsl(var(--destructive))",
            border: "1px solid hsl(var(--destructive) / 0.3)",
          }}
        >
          <LogOut size={18} />
          Logout
        </motion.button>
      </motion.aside>

      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 p-6 md:p-8 overflow-auto"
      >
        {children}
      </motion.main>
    </div>
  );
}