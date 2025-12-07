
import React, { useEffect, useRef } from 'react';
import { Personality } from '../types';
import { PERSONALITY_THEMES } from '../constants';

interface BackgroundProps {
  personality: Personality;
  darkMode: boolean;
}

const Background: React.FC<BackgroundProps> = ({ personality, darkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = PERSONALITY_THEMES[personality];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{x: number, y: number, vx: number, vy: number, size: number, color: string, originalSize: number}> = [];
    
    // Config based on personality
    const config = theme.particles;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const baseColor = darkMode ? '255, 255, 255' : '0, 0, 0';
      
      for (let i = 0; i < config.count; i++) {
        const size = Math.random() * config.size + 1;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * config.speed,
          vy: (Math.random() - 0.5) * config.speed,
          size: size,
          originalSize: size,
          color: baseColor
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw Particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${config.opacity})`;
        ctx.fill();

        // Connect particles logic
        if (config.connect) {
          const connectDist = (config as any).connectDist || 100;
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectDist) {
              ctx.beginPath();
              // Opacity based on distance
              const alpha = (1 - dist / connectDist) * (config.opacity * 0.5);
              ctx.strokeStyle = `rgba(${p.color}, ${alpha})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [personality, darkMode, theme]);

  return (
    <>
      {/* Texture Layer */}
      <div className={`fixed inset-0 ${theme.texture} pointer-events-none opacity-40 z-0 transition-opacity duration-1000 mix-blend-overlay`} />
      
      {/* Particles Layer */}
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 transition-opacity duration-1000"
      />
    </>
  );
};

export default Background;