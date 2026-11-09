"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { api, setToken } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("adminDarkMode");
    const isDark = stored === null ? true : stored === "true";
    const root = document.documentElement;
    if (isDark) root.classList.remove("light");
    else root.classList.add("light");
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.login({ email, password });
      setToken(res.accessToken);
      router.replace("/admin");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const neoShadow = "8px 8px 16px hsl(var(--background-2)), -8px -8px 16px hsl(var(--muted))";
  const neoInset = "inset 3px 3px 6px hsl(var(--background-2)), inset -3px -3px 6px hsl(var(--muted))";

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "hsl(var(--background))" }}
    >
      <motion.form
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-8 rounded-3xl space-y-5"
        style={{
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border))",
          boxShadow: "var(--shadow-card), " + neoShadow,
        }}
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-3"
            style={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              boxShadow: neoShadow,
            }}
          >
            <span className="text-2xl">🔐</span>
          </motion.div>
          <h1 className="text-2xl font-bold font-display text-foreground">Admin Login</h1>
          <p className="text-sm text-muted-foreground mt-1">Welcome back</p>
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-sm text-center"
          >
            {error}
          </motion.p>
        )}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-4 rounded-2xl text-foreground placeholder:text-muted-foreground outline-none transition-colors"
            style={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              boxShadow: neoInset,
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-4 rounded-2xl text-foreground placeholder:text-muted-foreground outline-none transition-colors"
            style={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              boxShadow: neoInset,
            }}
          />
        </div>

        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading}
          className="w-full p-4 rounded-2xl font-semibold text-primary-foreground transition-all disabled:opacity-50"
          style={{
            background: "hsl(var(--primary))",
            border: "1px solid hsl(var(--primary) / 0.4)",
            boxShadow: "var(--shadow-neon-sm)",
          }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </motion.button>
      </motion.form>
    </div>
  );
}