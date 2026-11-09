"use client";

import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Services from "@/components/sections/Services";

import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

const BackgroundCanvas = dynamic(() => import("@/components/BackgroundCanvas"), { ssr: false });

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) root.classList.remove("light");
    else root.classList.add("light");
  }, [darkMode]);

  return (
    <div>
      <Suspense fallback={null}>
        <BackgroundCanvas darkMode={darkMode} />
      </Suspense>

      <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}