import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Preloader.css";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete,
        });
      },
    });

    // Ethereal entrance - shapes form from particles
    shapesRef.current.forEach((shape, index) => {
      // Initial ethereal state
      tl.fromTo(
        shape,
        {
          y: gsap.utils.random(-200, -100),
          x: gsap.utils.random(-100, 100),
          rotation: gsap.utils.random(-180, 180),
          opacity: 0,
          scale: 0,
          filter: "blur(20px)",
        },
        {
          y: gsap.utils.random(-50, 50),
          x: gsap.utils.random(-30, 30),
          rotation: gsap.utils.random(0, 360),
          opacity: 0.3,
          scale: gsap.utils.random(0.5, 0.8),
          filter: "blur(10px)",
          duration: 0.4,
          ease: "power2.out",
        },
        index * 0.1
      );
      
      // Solidify into final form (Nickelodeon-style bounce)
      tl.to(
        shape,
        {
          y: 0,
          x: 0,
          rotation: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "elastic.out(1, 0.6)",
        },
        index * 0.1 + 0.4
      );
    });

    // Playful bouncing animation
    tl.to(shapesRef.current, {
      y: -30,
      duration: 0.35,
      stagger: 0.08,
      ease: "power1.inOut",
      yoyo: true,
      repeat: 2,
    });

    // Rotate and wiggle
    tl.to(shapesRef.current, {
      rotation: (index) => (index % 2 === 0 ? 15 : -15),
      duration: 0.3,
      stagger: 0.05,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });

    // Final exit animation with ethereal dispersion
    tl.to(shapesRef.current, {
      y: gsap.utils.random(-150, -50),
      x: (index) => (index % 2 === 0 ? -100 : 100),
      rotation: gsap.utils.random(360, 720),
      scale: 0,
      opacity: 0,
      filter: "blur(15px)",
      duration: 0.6,
      stagger: 0.06,
      ease: "power2.in",
    });
  }, [onComplete]);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !shapesRef.current.includes(el)) {
      shapesRef.current.push(el);
    }
  };

  return (
    <div ref={containerRef} className="preloader">
      <div className="preloader-content">
        <div className="shapes-container">
          <div ref={addToRefs} className="shape shape-circle"></div>
          <div ref={addToRefs} className="shape shape-square"></div>
          <div ref={addToRefs} className="shape shape-triangle"></div>
          <div ref={addToRefs} className="shape shape-star"></div>
          <div ref={addToRefs} className="shape shape-heart"></div>
        </div>
        <p className="preloader-text">Lets Have Fun...</p>
      </div>
    </div>
  );
};

export default Preloader;
