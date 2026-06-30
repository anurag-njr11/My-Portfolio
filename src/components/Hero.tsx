import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import MagneticButton from './MagneticButton';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const roles = [
  "Machine Learning Engineer",
  "AI Research Assistant",
  "Full-Stack Developer",
  "Security Analyst"
];

const Typewriter: React.FC<{ text: string; delay: number }> = ({ text, delay }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, delay);
    return () => clearInterval(interval);
  }, [text, delay]);

  return <span>{displayText}</span>;
};

const CinematicLetter: React.FC<{ char: string; delay: number; gradient?: boolean }> = ({ char, delay, gradient }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  if (char === " ") {
    return <span className="w-[1.2rem] md:w-[2.4rem] lg:w-[3.6rem] inline-block" />;
  }

  return (
    <span className={`inline-block relative px-[1px] md:px-[2px] ${isRevealed ? "" : "overflow-hidden"}`}>
      <motion.span
        className={`inline-block font-display font-black leading-none select-none ${
          gradient
            ? "text-gradient bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-cyan-400 drop-shadow-[0_0_30px_rgba(34,211,238,0.25)]"
            : "text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        }`}
        initial={{ y: "110%", opacity: 0, filter: "blur(12px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        onAnimationComplete={() => setIsRevealed(true)}
        transition={{
          duration: 1.1,
          ease: [0.16, 1, 0.3, 1],
          delay: delay,
        }}
        whileHover={{
          y: -4,
          scale: 1.03,
          filter: gradient
            ? "drop-shadow(0 0 12px rgba(34,211,238,0.45))"
            : "drop-shadow(0 0 12px rgba(255,255,255,0.3))",
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 24,
          }
        }}
      >
        {char}
      </motion.span>
    </span>
  );
};

const LetterReveal: React.FC<{ text: string; gradient?: boolean; delayOffset: number }> = ({ text, gradient, delayOffset }) => {
  const letters = text.split("");
  
  return (
    <span className="inline-flex flex-row justify-center flex-wrap gap-0">
      {letters.map((letter, idx) => (
        <CinematicLetter
          key={idx}
          char={letter}
          gradient={gradient}
          delay={delayOffset + idx * 0.05}
        />
      ))}
    </span>
  );
};

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const circlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);

    if (circlesRef.current) {
        gsap.to(circlesRef.current.children, {
            y: (i) => (i + 1) * 50,
            scale: (i) => 1 + (i * 0.1),
            opacity: (i) => 1 / (i + 2),
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 text-center overflow-hidden">
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-[130px] pointer-events-none animate-pulse duration-[8s]" />

      {/* Decorative Circles */}
      <div ref={circlesRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-[800px] h-[800px] border border-white/5 rounded-full" />
        <div className="absolute w-[600px] h-[600px] border border-white/5 rounded-full" />
        <div className="absolute w-[400px] h-[400px] border border-white/10 rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center space-x-3 mb-6"
        >
          <span className="h-2 w-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span>
          <span className="text-[10px] font-mono tracking-[0.3em] text-blue-400 uppercase">System Terminal: Active</span>
        </motion.div>

        <div className="relative mb-4 sm:mb-6 overflow-visible flex flex-col items-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[9.5rem] font-display font-black tracking-tighter leading-[0.8] select-none flex flex-col items-center justify-center">
            <span className="block mb-1 sm:mb-2 md:mb-4">
              <LetterReveal text="ANURAG" delayOffset={0.3} />
            </span>
            <span className="block">
              <LetterReveal text="SINGH" gradient delayOffset={0.8} />
            </span>
          </h1>
        </div>

        <div className="h-8 sm:h-12 md:h-16 overflow-hidden mb-8 sm:mb-12 flex items-center justify-center">
          <p className="text-sm sm:text-base md:text-2xl lg:text-3xl text-white/60 font-light font-mono flex items-center">
            <span className="text-primary-neon mr-1 sm:mr-2">{">"}\"</span>
            <Typewriter 
              text={roles[roleIndex]} 
              delay={50} 
              key={roles[roleIndex]}
            />
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-block w-2 h-8 bg-primary-neon ml-1"
            />
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 w-full px-2 sm:px-0"
        >
          <MagneticButton>
            <a
              href="#projects"
              className="group relative inline-flex px-5 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-primary-neon text-black font-bold rounded-full overflow-hidden transition-all active:scale-95 w-full sm:w-auto justify-center"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              <span className="relative z-10 flex items-center">
                View Projects <ArrowRight className="ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </span>
            </a>
          </MagneticButton>
          
          <MagneticButton>
            <a
              href="#contact"
              className="inline-flex px-5 sm:px-8 py-3 sm:py-4 text-sm sm:text-base glass-card text-white font-bold rounded-full transition-all hover:bg-white/10 active:scale-95 border-white/20 hover:border-white/40 w-full sm:w-auto justify-center"
            >
              Contact Me
            </a>
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer"
        onClick={() => {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <ChevronDown size={32} className="text-white/30" />
      </motion.div>
    </section>
  );
}

