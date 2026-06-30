import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [hoverType, setHoverType] = useState<'NAV' | 'ACTIVATE' | 'LINK' | null>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  // Position coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Soft spring physics for the outer crosshair ring
  const springConfig = { damping: 28, stiffness: 320, mass: 0.4 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only activate cursor for devices with precise pointers (mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) {
      setIsEnabled(false);
      return;
    }

    setIsEnabled(true);
    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseDown = () => {
      setIsClicked(true);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    const checkInteractive = (el: HTMLElement | null): boolean => {
      if (!el) return false;
      const tagName = el.tagName.toLowerCase();
      
      // Check if it is an interactive element
      if (
        tagName === 'a' ||
        tagName === 'button' ||
        tagName === 'input' ||
        tagName === 'select' ||
        tagName === 'textarea' ||
        el.getAttribute('role') === 'button' ||
        el.classList.contains('cursor-pointer') ||
        el.closest('a') ||
        el.closest('button')
      ) {
        return true;
      }
      return false;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = checkInteractive(target);
      setIsHovered(interactive);

      if (interactive) {
        const closestAnchor = target.closest('a');
        const closestButton = target.closest('button');
        
        if (closestAnchor) {
          setHoverType('NAV');
        } else if (closestButton) {
          setHoverType('ACTIVATE');
        } else {
          setHoverType('LINK');
        }
      } else {
        setHoverType(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isEnabled || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-visible">
      {/* 1. Center Dot (Instant translation) */}
      <motion.div
        className="absolute w-1 h-1 bg-primary-cyan rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          left: mouseX,
          top: mouseY,
        }}
        animate={{
          scale: isClicked ? 1.8 : isHovered ? 1.2 : 1,
          backgroundColor: isHovered ? '#22d3ee' : '#3b82f6',
        }}
        transition={{ duration: 0.1 }}
      />

      {/* 2. Outer Spring Crosshair Ring */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        style={{
          left: ringX,
          top: ringY,
        }}
      >
        {/* The rotating crosshair circle */}
        <motion.div
          className="relative rounded-full border flex items-center justify-center"
          animate={{
            width: isClicked ? 24 : isHovered ? 42 : 28,
            height: isClicked ? 24 : isHovered ? 42 : 28,
            borderColor: isHovered ? 'rgba(34,213,238,0.7)' : 'rgba(255,255,255,0.15)',
            rotate: isHovered ? 90 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
        >
          {/* Top tick */}
          <span className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-1.5 bg-primary-cyan/60" />
          {/* Bottom tick */}
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-1.5 bg-primary-cyan/60" />
          {/* Left tick */}
          <span className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] w-1.5 bg-primary-cyan/60" />
          {/* Right tick */}
          <span className="absolute right-0 top-1/2 -translate-y-1/2 h-[1px] w-1.5 bg-primary-cyan/60" />

          {/* Subtly pulse a grid target lock inside the ring on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.span
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: [0.1, 0.4, 0.1], scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-1 rounded-full border border-dashed border-primary-cyan/40"
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* 3. Tech indicator label beside crosshair */}
        <AnimatePresence>
          {isHovered && hoverType && (
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 22 }}
              exit={{ opacity: 0, x: 15 }}
              className="absolute left-0 flex flex-col items-start font-mono text-[7px] tracking-widest text-primary-cyan uppercase select-none leading-none bg-black/80 px-1 py-0.5 rounded border border-primary-cyan/20 backdrop-blur-sm"
            >
              <span>SYS_CONN</span>
              <span className="text-white/60 text-[6px] mt-0.5">[{hoverType}]</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
