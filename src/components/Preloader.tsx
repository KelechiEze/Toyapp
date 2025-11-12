"use client";

import React, { useState, useEffect, useRef } from 'react';
import './Preloader.css';
import AnimatedLogo from './AnimatedLogo';
import ProgressBar from './ProgressBar';
import ParticleEffect from './ParticleEffect';
import { gsap } from 'gsap';

const Preloader = ({ onComplete }: { onComplete?: () => void }) => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showSubtitle, setShowSubtitle] = useState(false);
  
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const toysRef = useRef<HTMLSpanElement>(null);
  const dashRef = useRef<HTMLSpanElement>(null);
  const placeRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAnimating || !overlayRef.current) return;

    console.log('Preloader started - debugging');

    // Reset all elements to initial state
    gsap.set(overlayRef.current, { opacity: 1 });
    gsap.set(contentRef.current, { opacity: 0, y: 50 });
    gsap.set([toysRef.current, dashRef.current, placeRef.current], { 
      opacity: 0, 
      y: 100 
    });
    gsap.set(subtitleRef.current, { opacity: 0 });
    gsap.set(logoRef.current, { opacity: 0, scale: 0.8 });
    gsap.set(".preloader-loading-dots span", { opacity: 0, scale: 0 });

    const tl = gsap.timeline();

    // Main animation sequence
    tl.to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    })
    .to(toysRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "back.out(2.5)"
    }, "+=0.2")
    .to(dashRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5")
    .to(placeRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "back.out(2.5)",
      onComplete: () => {
        setShowSubtitle(true);
      }
    }, "-=0.8")
    .to(logoRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "elastic.out(1.2, 0.8)"
    }, "-=0.5")
    .add(() => {
      // Start subtitle typewriter effect after TOYS-PLACE is fully visible
      if (showSubtitle) {
        typewriterSubtitle();
      }
    }, "-=0.3")
    .to(".preloader-loading-dots span", {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.2,
      ease: "back.out(2)"
    }, "-=0.2")
    .add(() => {
      // Start progress animation
      startProgressAnimation();
    });

  }, [isAnimating]);

  const typewriterSubtitle = () => {
    const subtitle = "Where Imagination Comes to Play!";
    const subtitleElement = subtitleRef.current;
    
    if (!subtitleElement) return;

    // Clear any existing content
    subtitleElement.textContent = '';
    gsap.set(subtitleElement, { opacity: 1 });

    const chars = subtitle.split('');
    const tl = gsap.timeline();

    chars.forEach((char, index) => {
      tl.to(subtitleElement, {
        duration: 0,
        onComplete: () => {
          subtitleElement.textContent += char;
        }
      }, index * 0.05); // 50ms between characters for smooth typewriter effect
    });
  };

  const startProgressAnimation = () => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          exitAnimation();
        }, 500);
      }
    }, 60);
  };

  const exitAnimation = () => {
    const tl = gsap.timeline();
    
    tl.to(".preloader-loading-dots span", {
      opacity: 0,
      scale: 0,
      duration: 0.4,
      stagger: 0.1
    })
    .to(subtitleRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.5
    }, "-=0.3")
    .to([toysRef.current, dashRef.current, placeRef.current], {
      opacity: 0,
      y: -50,
      duration: 0.8,
      stagger: 0.1
    }, "-=0.4")
    .to(logoRef.current, {
      opacity: 0,
      scale: 0.5,
      duration: 0.6
    }, "-=0.5")
    .to(contentRef.current, {
      opacity: 0,
      y: -30,
      duration: 0.8
    }, "-=0.3")
    .to(overlayRef.current, {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        setIsAnimating(false);
        onComplete?.();
      }
    });
  };

  if (!isAnimating) return null;

  return (
    <div 
      ref={overlayRef}
      className="preloader-overlay"
    >
      <ParticleEffect />
      <div className="preloader-background"></div>

      <div ref={contentRef} className="preloader-content">
        <div ref={logoRef} className="preloader-logo-section">
          <AnimatedLogo show={true} />
        </div>

        <div className="preloader-text-container">
          <span ref={toysRef} className="preloader-letter toys-text">
            TOYS
          </span>
          <span ref={dashRef} className="preloader-letter dash">
            -
          </span>
          <span ref={placeRef} className="preloader-letter place-text">
            PLACE
          </span>
        </div>

        <div className="preloader-subtitle">
          <span ref={subtitleRef} className="subtitle-text">
            {/* Text will be added by typewriter effect */}
          </span>
        </div>

        <ProgressBar progress={progress} />

        <div ref={dotsRef} className="preloader-loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;