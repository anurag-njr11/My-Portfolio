/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import Lenis from '@studio-freight/lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Research from './components/Research';
import Milestones from './components/Milestones';
import Contact from './components/Contact';
import Background from './components/Background';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={scrollRef} className="relative min-h-screen text-white font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
      <CustomCursor />
      <Background />
      <Navbar />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Research />
        <Milestones />
        <Contact />
      </motion.main>
    </div>
  );
}

