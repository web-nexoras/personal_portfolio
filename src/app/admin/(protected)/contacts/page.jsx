"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Trash2, MailOpen } from "lucide-react";
import { api } from "@/lib/api";

export default function ContactsAdmin() {
  const [contacts, setContacts] = useState([]);
  const [msg, setMsg] = useState("");

  const load = () => api.getContacts().then(setContacts).catch((e) => setMsg(e.message));
  useEffect(() => { load(); }, []);

  const handleRead = async (id) => {
    try {
      await api.markContactRead(id);
      load();
    } catch (e) {
      setMsg(e.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this contact?")) return;
    try {
      await api.deleteContact(id);
      load();
    } catch (e) {
      setMsg(e.message);
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
        Contacts
      </motion.h1>
      {msg && <p className="mb-4 text-red-400 text-sm">{msg}</p>}

      <div className="space-y-3">
        <AnimatePresence>
          {contacts.map((c, i) => (
            <motion.div
              key={c._id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ delay: i * 0.04, duration: 0.35 }}
              whileHover={{ y: -2 }}
              className="p-4 rounded-2xl"
              style={cardStyle}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground">
                    {c.name}{" "}
                    <span className="text-muted-foreground text-sm font-normal">&lt;{c.email}&gt;</span>
                    {!c.isRead && (
                      <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30">
                        New
                      </span>
                    )}
                  </p>
                  {c.subject && <p className="text-sm text-muted-foreground mt-0.5">{c.subject}</p>}
                  <p className="mt-2 text-sm text-foreground/90 whitespace-pre-wrap">{c.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">{new Date(c.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  {!c.isRead && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleRead(c._id)}
                      className="p-2 rounded-lg"
                      style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))", color: "hsl(var(--foreground))" }}
                      title="Mark read"
                    >
                      <Check size={16} />
                    </motion.button>
                  )}
                  {c.isRead && (
                    <span className="p-2 text-muted-foreground" title="Read">
                      <MailOpen size={16} />
                    </span>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(c._id)}
                    className="p-2 rounded-lg"
                    style={{ background: "hsl(var(--destructive) / 0.15)", border: "1px solid hsl(var(--destructive) / 0.4)", color: "hsl(var(--destructive))" }}
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {contacts.length === 0 && <p className="text-muted-foreground text-sm">No contacts yet.</p>}
      </div>
    </div>
  );
}