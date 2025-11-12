'use client';
import React, { useEffect, useState } from 'react';
import './ParticleEffect.css';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

const ParticleEffect = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = ['#78dbff', '#ff6b6b', '#667eea', '#764ba2', '#ffffff'];
    
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      setParticles(newParticles);
    };

    generateParticles();

    const animateParticles = () => {
      setParticles(prev => prev.map(particle => {
        // Calculate new position first
        let newX = particle.x + particle.speedX;
        let newY = particle.y + particle.speedY;
        
        // Handle wrapping around screen edges
        newX = newX > window.innerWidth ? 0 : newX < 0 ? window.innerWidth : newX;
        newY = newY > window.innerHeight ? 0 : newY < 0 ? window.innerHeight : newY;
        
        return {
          ...particle,
          x: newX,
          y: newY,
          opacity: particle.opacity > 0 ? particle.opacity - 0.001 : Math.random() * 0.5 + 0.2
        };
      }));
    };

    const interval = setInterval(animateParticles, 50);
    
    const handleResize = () => {
      generateParticles();
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="particle-container">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
          }}
        />
      ))}
    </div>
  );
};

export default ParticleEffect;