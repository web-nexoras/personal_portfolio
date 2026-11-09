"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setVisible(false), 400);
          return 100;
        }
        return prev + 1.5;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black overflow-hidden flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Electric sweep line */}
          <motion.div
            className="absolute top-0 left-0 h-full w-[2px] bg-cyan-400"
            animate={{ x: ["-10%", "110%"] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            style={{ boxShadow: "0 0 20px #22d3ee, 0 0 60px #22d3ee" }}
          />

          {/* Lightning fragments */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[2px] bg-cyan-300"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${20 + Math.random() * 60}px`,
              }}
              animate={{ opacity: [0, 1, 0], x: [0, 40, -20] }}
              transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}

          {/* Main content */}
          <div className="relative z-10 text-center">
            <motion.h1
              className="text-cyan-400 text-3xl font-bold tracking-widest"
              animate={{
                textShadow: ["0 0 5px #22d3ee", "0 0 25px #22d3ee", "0 0 5px #22d3ee"],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {siteConfig.brand}
            </motion.h1>

            <p className="text-gray-400 text-sm font-mono mt-2 mb-6">
              Initializing Energy Flow...
            </p>

            <div className="w-80 max-w-[80vw] h-[3px] bg-gray-800 relative overflow-hidden rounded-full">
              <motion.div className="h-full bg-cyan-400" style={{ width: `${progress}%` }} />
              <motion.div
                className="absolute top-0 h-full w-10 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                animate={{ x: ["-100%", "300%"] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              />
            </div>

            <motion.span
              className="text-cyan-400 font-mono text-xs mt-3 block"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {Math.floor(progress)}%
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
