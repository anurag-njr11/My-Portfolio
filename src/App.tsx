/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, createContext } from 'react';
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

export const LenisContext = createContext<Lenis | null>(null);

export default function App() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [lenis, setLenis] = React.useState<Lenis | null>(null);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    setLenis(lenisInstance);

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisInstance.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
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
    </LenisContext.Provider>
  );
}

