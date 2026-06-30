import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionProps {
  children: React.ReactNode;
  id: string;
  className?: string;
  title?: string;
}

export default function Section({ children, id, className, title }: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current, 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} id={id} className={cn("py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1500px] mx-auto overflow-hidden", className)}>
      {title && (
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-10%" }}
          className="mb-12 sm:mb-16 text-center relative"
        >
          <div className="flex flex-col items-center justify-center space-y-1">
            <div className="flex items-center justify-center space-x-2 text-[8px] sm:text-[10px] font-mono text-primary-neon tracking-[0.3em] sm:tracking-[0.4em] uppercase opacity-75">
              <span>{"//"} SEC_INIT</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary-neon animate-ping" />
            </div>
            
            <div className="flex items-center justify-center space-x-2 sm:space-x-4">
              <span className="font-mono text-[8px] sm:text-xs text-white/30 select-none font-light">{"[ "}</span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tighter text-gradient px-2 sm:px-4">
                {title.toUpperCase()}
              </h2>
              <span className="font-mono text-[8px] sm:text-xs text-white/30 select-none font-light">{" ]"}</span>
            </div>
            
            <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mt-2" />
          </div>
        </motion.div>
      )}
      <div ref={contentRef}>
        {children}
      </div>
    </section>
  );
}
