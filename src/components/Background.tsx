import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
}

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false });
  const { scrollYProgress } = useScroll();
  
  // Subtle parallax effect on grid
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    // Determine responsive particle counts
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 35 : 95;
    const connectionDistance = isMobile ? 90 : 130;
    const mouseConnectionDistance = isMobile ? 120 : 200;

    const colors = [
      'rgba(34, 211, 238, ',  // Cyan
      'rgba(59, 130, 246, ',  // Blue
      'rgba(139, 92, 246, ',  // Purple
    ];

    // Resize canvas
    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        radius: Math.random() * 1.5 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.2 + 0.15,
      });
    }

    // Capture global mouse move to support tracking over whole viewport
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Track scroll velocity with high performance
      const currentScrollY = window.scrollY;
      const rawScrollDelta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Smooth velocity decay
      scrollVelocity += (rawScrollDelta - scrollVelocity) * 0.12;
      const speed = Math.abs(scrollVelocity);

      // Smooth mouse interpolation
      const mouse = mouseRef.current;
      if (mouse.active) {
        if (mouse.x === -1000) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
        } else {
          mouse.x += (mouse.targetX - mouse.x) * 0.15;
          mouse.y += (mouse.targetY - mouse.y) * 0.15;
        }
      } else {
        mouse.x = -1000;
        mouse.y = -1000;
      }

      // Draw and update particles
      particles.forEach((p) => {
        // Normal vector velocity + scroll shift (rushing opposite to scroll direction, gentler parallax)
        const scrollShift = -scrollVelocity * 0.35;
        
        p.x += p.vx;
        p.y += p.vy + scrollShift;

        // Wrap around boundaries gracefully (instead of bouncing) to keep a continuous field
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -50) p.y = canvas.height + 50;
        if (p.y > canvas.height + 50) p.y = -50;

        // Mouse avoidance/push force (only effective if moving relatively slowly)
        if (mouse.active && speed < 15) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            const angle = Math.atan2(dy, dx);
            // Gently push away
            p.x += Math.cos(angle) * force * 1.5;
            p.y += Math.sin(angle) * force * 1.5;
          }
        }

        // Draw particle (stretch into continuous motion blur trail when speed increases)
        if (speed > 0.8) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          // Trail length is elegant and responsive (1.8x amplification for refined cosmic warp effect)
          const trailLength = scrollVelocity * 1.8;
          ctx.lineTo(p.x, p.y + trailLength);
          
          // Soft, extremely elegant outer glow trail
          ctx.strokeStyle = `${p.color}${p.alpha * 0.35})`;
          ctx.lineWidth = p.radius * (0.8 + speed * 0.05);
          ctx.lineCap = 'round';
          ctx.stroke();
        } else {
          // Normal elegant circular node
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.alpha})`;
          ctx.fill();
        }
      });

      // Connections fade out as speed increases (dissolving into star streams)
      const connectionAlphaMultiplier = Math.max(0, 1 - speed / 12);

      // Draw Connection Lines
      if (connectionAlphaMultiplier > 0.02) {
        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i];

          // Lines to other particles
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectionDistance) {
              const alpha = (1 - dist / connectionDistance) * 0.12 * connectionAlphaMultiplier;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              
              // Neon gradient line
              const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
              grad.addColorStop(0, `${p1.color}${alpha})`);
              grad.addColorStop(1, `${p2.color}${alpha})`);
              
              ctx.strokeStyle = grad;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }

          // Lines to Mouse (Interactive Constellation, disabled at high speed)
          if (mouse.active && speed < 10) {
            const dx = p1.x - mouse.x;
            const dy = p1.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouseConnectionDistance) {
              const alpha = (1 - dist / mouseConnectionDistance) * 0.35 * (1 - speed / 10);
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(mouse.x, mouse.y);
              
              // Highly bright neon gradient to the cursor
              const grad = ctx.createLinearGradient(p1.x, p1.y, mouse.x, mouse.y);
              grad.addColorStop(0, `${p1.color}${alpha * 0.5})`);
              grad.addColorStop(1, `rgba(34, 211, 238, ${alpha})`); // Cyan neon point
              
              ctx.strokeStyle = grad;
              ctx.lineWidth = 0.8;
              ctx.stroke();

              // Subtle highlight on particle near mouse
              ctx.beginPath();
              ctx.arc(p1.x, p1.y, p1.radius * 1.5, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(34, 211, 238, ${alpha * 0.8})`;
              ctx.fill();
            }
          }
        }
      }

      // Draw faint cursor circular glow ring
      if (mouse.active) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 15, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(34, 211, 238, 0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34, 211, 238, 0.5)';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 bg-[#030303] overflow-hidden pointer-events-none">
      {/* Interactive Canvas Grid */}
      <canvas ref={canvasRef} className="absolute inset-0 block" />

      {/* Futuristic Grid Overlay with Parallax */}
      <motion.div 
        style={{ y: gridY }}
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] opacity-60"
      />
      
      {/* Glowing Ambient Nebulae */}
      <div className="absolute top-[-20%] left-[-20%] w-[70%] h-[70%] rounded-full bg-blue-900/10 blur-[150px]" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full bg-purple-900/10 blur-[180px]" />

      {/* Cybernetic Grid Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#000000bf_100%)]" />

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
