"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FolderKanban, Mail, MailOpen } from "lucide-react";
import { api } from "@/lib/api";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    api.getProjects().then(setProjects).catch(() => {});
    api.getContacts().then(setContacts).catch(() => {});
  }, []);

  const unread = contacts.filter((c) => !c.isRead).length;

  const cards = [
    { label: "Projects", value: projects.length, icon: FolderKanban },
    { label: "Contacts", value: contacts.length, icon: Mail },
    { label: "Unread", value: unread, icon: MailOpen },
  ];

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold font-display mb-6 text-foreground"
      >
        Dashboard
      </motion.h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl"
              style={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-muted-foreground text-sm">{c.label}</p>
                <Icon size={20} className="text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground">{c.value}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}