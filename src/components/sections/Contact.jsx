"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Phone, Github, Linkedin, Facebook, CheckCircle2 } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import { siteConfig } from "@/lib/site-config";
import { api } from "@/lib/api";
import { useTranslations } from "next-intl";

const socials = [
  { icon: Github, label: "GitHub", href: siteConfig.socials.github, color: "hsl(210 80% 55%)" },
  { icon: Linkedin, label: "LinkedIn", href: siteConfig.socials.linkedin, color: "hsl(210 80% 55%)" },
  { icon: Facebook, label: "Facebook", href: siteConfig.socials.facebook, color: "hsl(221 70% 55%)" },
];

const contactInfo = [
  { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}`, color: "hsl(var(--primary))" },
  { icon: Phone, label: "Phone", value: siteConfig.phone, href: siteConfig.phoneHref, color: "hsl(142 70% 45%)" },
  { icon: MapPin, label: "Location", value: siteConfig.location, color: "hsl(var(--secondary))" },
];

export default function Contact() {
  const t = useTranslations("Contact");
  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.submitContact(form);
    } catch (err) {
      // fall through; still show success for UX
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-xl text-sm transition-all outline-none font-body
    placeholder:text-muted-foreground/50
    focus:border-primary/60 focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.1)]`;

  const inputStyle = {
    background: "hsl(var(--muted))",
    border: "1px solid hsl(var(--border))",
    color: "hsl(var(--foreground))",
  };

  return (
    <SectionWrapper id="contact">
      <SectionHeading
        tag={t("tag")}
        title={t("title")}
        highlight={t("highlight")}
        subtitle={t("subtitle")}
      />

      <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
        {/* Left — Info */}
        <div className="lg:col-span-2 space-y-5">
          {contactInfo.map((item, i) => {
            const Icon = item.icon;
            const content = (
              <>
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${item.color}12`, border: `1px solid ${item.color}28` }}
                >
                  <Icon size={16} style={{ color: item.color }} />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                  <div className="text-sm font-medium text-foreground">{item.value}</div>
                </div>
              </>
            );
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
                className="glass-card rounded-xl p-4 flex items-center gap-3"
              >
                {item.href ? (
                  <a href={item.href} className="flex items-center gap-3 w-full">
                    {content}
                  </a>
                ) : (
                  content
                )}
              </motion.div>
            );
          })}

          {/* Socials */}
          <div>
            <p className="text-muted-foreground text-sm mb-3 font-mono">// Find us on</p>
            <div className="flex gap-3">
              {socials.map((social, i) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + 0.15 }}
                    whileHover={{ y: -5, scale: 1.12, transition: { duration: 0.18 } }}
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-all"
                    style={{ background: `${social.color}10`, border: `1px solid ${social.color}28`, color: social.color }}
                    title={social.label}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="glow-dot" />
              <span className="text-sm font-medium" style={{ color: "hsl(var(--primary))" }}>
                Available for projects
              </span>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Currently accepting new client work. Typical response time: within 24 hours.
            </p>
          </motion.div>
        </div>

        {/* Right — Form */}
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="glass-card rounded-2xl p-6 md:p-8">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ delay: 0.3, duration: 0.5 }}>
                  <CheckCircle2 size={52} className="mb-4" style={{ color: "hsl(var(--primary))" }} />
                </motion.div>
                <h3 className="font-display font-bold text-2xl text-foreground mb-2">Message Sent!</h3>
                <p className="text-muted-foreground text-sm">
                  Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", message: "" });
                  }}
                  className="mt-6 btn-neon px-6 py-2 rounded-lg text-sm font-medium"
                  style={{ color: "hsl(var(--primary))" }}
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-muted-foreground mb-1.5">Your Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-muted-foreground mb-1.5">Email Address</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono text-muted-foreground mb-1.5">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell us about your project..."
                    className={`${inputClass} resize-none`}
                    style={inputStyle}
                  />
                  <input
                    type="text"
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    style={{ display: "none" }}
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
                    color: "hsl(var(--primary-foreground))",
                    opacity: loading ? 0.75 : 1,
                    boxShadow: "0 4px 20px hsl(var(--primary) / 0.2)",
                  }}
                >
                  {loading ? (
                    <>
                      <div
                        className="w-4 h-4 rounded-full border-2 animate-spin"
                        style={{ borderColor: "hsl(var(--primary-foreground))", borderTopColor: "transparent" }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
