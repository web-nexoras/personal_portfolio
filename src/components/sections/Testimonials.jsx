"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager @ TechFlow",
    quote: "Web_Nexoras delivered our dashboard rewrite on time and exceeded every expectation. The UI is incredibly smooth and our users love it. Highly recommended!",
    rating: 5,
    avatar: "SC",
    color: "hsl(192 100% 50%)",
  },
  {
    name: "James Morrison",
    role: "CTO @ LaunchPad",
    quote: "Working with Web_Nexoras was a game-changer. They turned our Figma designs into a pixel-perfect React app in record time, with zero bugs in production.",
    rating: 5,
    avatar: "JM",
    color: "hsl(262 70% 58%)",
  },
  {
    name: "Priya Sharma",
    role: "Founder @ DesignLab",
    quote: "The 3D landing page Web_Nexoras built for us increased our conversion rate by 28%. Their attention to animation detail is unmatched.",
    rating: 5,
    avatar: "PS",
    color: "hsl(142 70% 45%)",
  },
  {
    name: "David Kim",
    role: "Lead Dev @ Orbit",
    quote: "Web_Nexoras has a rare combination of strong engineering skills and a great design eye. Our codebase is cleaner and faster thanks to their work.",
    rating: 5,
    avatar: "DK",
    color: "hsl(30 90% 55%)",
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: rating }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.07 }}
          style={{ color: "hsl(48 90% 55%)" }}
          className="text-sm"
        >
          ★
        </motion.span>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -24, scale: 0.96 }}
      transition={{ duration: 0.38, ease: "easeOut" }}
      className="glass-card rounded-2xl p-8 max-w-2xl mx-auto"
      style={{ border: `1px solid ${testimonial.color}28` }}
    >
      <Quote size={32} className="mb-5 opacity-25" style={{ color: testimonial.color }} />

      <p className="text-foreground text-lg leading-relaxed mb-6 italic">
        "{testimonial.quote}"
      </p>

      <StarRating rating={testimonial.rating} />

      <div className="flex items-center gap-3 mt-5">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold font-mono flex-shrink-0"
          style={{
            background: `${testimonial.color}18`,
            border: `2px solid ${testimonial.color}45`,
            color: testimonial.color,
          }}
        >
          {testimonial.avatar}
        </div>
        <div>
          <div className="font-display font-bold text-foreground">{testimonial.name}</div>
          <div className="text-muted-foreground text-sm">{testimonial.role}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <SectionWrapper id="testimonials">
      <SectionHeading
        tag=" testimonials"
        title="What Clients"
        highlight="Say"
        subtitle="Don't take my word for it — hear from people I've worked with."
      />

      <div className="relative">
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <TestimonialCard key={current} testimonial={testimonials[current]} />
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <motion.button
            onClick={prev}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
            style={{
              background: "hsl(var(--muted))",
              border: "1px solid hsl(var(--border))",
              color: "hsl(var(--foreground))",
            }}
          >
            <ChevronLeft size={18} />
          </motion.button>

          {/* Dots */}
          <div className="flex gap-2 items-center">
            {testimonials.map((t, i) => (
              <motion.button
                key={i}
                onClick={() => setCurrent(i)}
                animate={{
                  width: i === current ? 24 : 8,
                  background: i === current ? t.color : "hsl(var(--muted))",
                }}
                transition={{ duration: 0.3 }}
                className="rounded-full h-2"
              />
            ))}
          </div>

          <motion.button
            onClick={next}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
            style={{
              background: "hsl(var(--muted))",
              border: "1px solid hsl(var(--border))",
              color: "hsl(var(--foreground))",
            }}
          >
            <ChevronRight size={18} />
          </motion.button>
        </div>

        {/* Author pills */}
        <div className="hidden lg:flex gap-3 justify-center mt-8">
          {testimonials.map((t, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrent(i)}
              whileHover={{ y: -3 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-sm"
              style={{
                background: i === current ? `${t.color}12` : "hsl(var(--muted))",
                border: `1px solid ${i === current ? t.color + "35" : "hsl(var(--border))"}`,
                opacity: i === current ? 1 : 0.65,
              }}
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono"
                style={{ background: `${t.color}18`, color: t.color }}
              >
                {t.avatar[0]}
              </div>
              <span className="text-muted-foreground">{t.name}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
