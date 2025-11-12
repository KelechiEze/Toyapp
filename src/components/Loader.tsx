import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Preloader.css";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const blocksContainerRef = useRef<HTMLDivElement>(null);
  const charactersRef = useRef<HTMLDivElement[]>([]);
  const textRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const confettiRef = useRef<HTMLDivElement[]>([]);
  const sparklesRef = useRef<HTMLDivElement[]>([]);
  const buildingBlocksRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Auto-complete after 6 seconds
    const timeout = setTimeout(() => {
      onComplete();
    }, 6000);

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" }
    });

    // Initial blocks flying in from different 3D directions
    buildingBlocksRef.current.forEach((block, index) => {
      const row = Math.floor(index / 4);
      const col = index % 4;
      
      // Set initial positions in 3D space (far away)
      gsap.set(block, {
        x: gsap.utils.random(-1000, 1000),
        y: gsap.utils.random(-800, 800),
        z: gsap.utils.random(-1500, -500),
        rotationX: gsap.utils.random(-720, 720),
        rotationY: gsap.utils.random(-720, 720),
        rotationZ: gsap.utils.random(-360, 360),
        scale: 0,
        opacity: 0
      });

      // Blocks fly in and assemble with realistic physics
      tl.to(block, {
        x: (col - 1.5) * 60,
        y: (row - 1.5) * 60,
        z: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "back.out(1.5)",
        delay: index * 0.08
      }, index * 0.06);

      // Individual block bounce when they land
      tl.to(block, {
        y: `-=${gsap.utils.random(15, 30)}`,
        duration: 0.3,
        ease: "power1.out",
        yoyo: true,
        repeat: 1
      }, `+=${0.1 + index * 0.01}`);
    });

    // Blocks form complete structure with interlocking animation
    tl.to(buildingBlocksRef.current, {
      rotationY: 360,
      duration: 2,
      stagger: {
        each: 0.03,
        from: "center"
      },
      ease: "power2.inOut"
    }, "+=0.3");

    // Blocks pulse with color to show connection
    tl.to(buildingBlocksRef.current, {
      boxShadow: "0 0 30px currentColor",
      duration: 0.4,
      stagger: 0.02,
      yoyo: true,
      repeat: 2,
      ease: "sine.inOut"
    }, "+=0.2");

    // Characters emerge from within the block structure
    charactersRef.current.forEach((char, index) => {
      // Start characters inside blocks
      gsap.set(char, {
        scale: 0.5,
        y: 50,
        z: -100,
        rotationY: 180,
        opacity: 0
      });

      // Characters pop out with spring effect
      tl.to(char, {
        scale: 1,
        y: 0,
        z: 0,
        rotationY: 0,
        opacity: 1,
        duration: 0.8,
        ease: "elastic.out(1.2, 0.6)",
        delay: index * 0.2
      }, "-=0.5");

      // Characters dance on their blocks
      tl.to(char, {
        y: -40,
        rotation: index % 2 === 0 ? 20 : -20,
        duration: 0.5,
        ease: "power1.inOut",
        yoyo: true,
        repeat: 2,
      }, `+=${index * 0.1}`);

      // Character glow effects
      tl.to(char, {
        boxShadow: "0 0 60px currentColor",
        duration: 0.5,
        yoyo: true,
        repeat: 1,
      }, "-=0.4");
    });

    // Blocks reconfigure around characters
    tl.to(buildingBlocksRef.current, {
      x: (i) => {
        const row = Math.floor(i / 4);
        const col = i % 4;
        const charIndex = Math.floor(i / 4);
        return (col - 1.5) * 80 + gsap.utils.random(-10, 10);
      },
      y: (i) => {
        const row = Math.floor(i / 4);
        return (row - 1.5) * 80 + gsap.utils.random(-5, 5);
      },
      z: (i) => gsap.utils.random(-20, 20),
      rotationY: (i) => gsap.utils.random(-30, 30),
      rotationX: (i) => gsap.utils.random(-15, 15),
      duration: 1.2,
      stagger: 0.02,
      ease: "elastic.out(1, 0.8)"
    }, "+=0.3");

    // Text builds up letter by letter with block-like effect
    const text = textRef.current;
    if (text) {
      const letters = text.textContent?.split('') || [];
      text.innerHTML = letters.map(letter => 
        `<span class="text-block">${letter}</span>`
      ).join('');

      gsap.set('.text-block', {
        display: 'inline-block',
        y: 100,
        rotationX: -90,
        opacity: 0
      });

      tl.to('.text-block', {
        y: 0,
        rotationX: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=0.5");
    }

    // Text color wave animation
    tl.to(textRef.current, {
      backgroundPosition: "200% 0%",
      duration: 3,
      ease: "sine.inOut",
      repeat: -1
    }, "-=0.3");

    // Massive particle explosion from block structure
    particlesRef.current.forEach((particle, index) => {
      // Start particles at block positions
      const blockIndex = index % buildingBlocksRef.current.length;
      const block = buildingBlocksRef.current[blockIndex];
      const rect = block?.getBoundingClientRect();
      
      if (rect) {
        gsap.set(particle, {
          x: rect.left + rect.width / 2 - window.innerWidth / 2,
          y: rect.top + rect.height / 2 - window.innerHeight / 2,
          z: 0,
          scale: 0,
          opacity: 0
        });
      }

      tl.to(particle, {
        x: gsap.utils.random(-1000, 1000),
        y: gsap.utils.random(-800, 800),
        z: gsap.utils.random(-500, 500),
        rotation: gsap.utils.random(0, 1080),
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: "power2.out",
        stagger: 0.01,
      }, "-=1");

      // Particles bounce like they have weight
      tl.to(particle, {
        y: "+=40",
        duration: 0.8,
        yoyo: true,
        repeat: 1,
        ease: "bounce.out",
      }, "-=1.5");
    });

    // Sparkles burst from block connections
    sparklesRef.current.forEach((sparkle, index) => {
      const blockIndex = index % buildingBlocksRef.current.length;
      const block = buildingBlocksRef.current[blockIndex];
      const rect = block?.getBoundingClientRect();
      
      if (rect) {
        gsap.set(sparkle, {
          x: rect.left + rect.width / 2 - window.innerWidth / 2,
          y: rect.top + rect.height / 2 - window.innerHeight / 2,
          z: 50,
          scale: 0,
          opacity: 0
        });
      }

      tl.to(sparkle, {
        scale: 1,
        opacity: 1,
        z: 200,
        duration: 0.6,
        stagger: 0.02,
        ease: "power2.out"
      }, "-=1.2");

      tl.to(sparkle, {
        scale: 0,
        opacity: 0,
        z: 400,
        duration: 0.5,
        stagger: 0.015,
        ease: "power2.in"
      }, "+=0.2");
    });

    // Confetti explosion from the structure
    confettiRef.current.forEach((confetti, index) => {
      tl.fromTo(confetti,
        {
          y: -50,
          z: -100,
          rotation: 0,
          opacity: 0,
          scale: 0
        },
        {
          y: 1200,
          z: gsap.utils.random(-200, 200),
          rotation: gsap.utils.random(1440, 2880),
          opacity: 1,
          scale: 1,
          duration: gsap.utils.random(2.5, 4),
          ease: "power1.in",
          stagger: 0.015,
        },
        "-=0.8"
      );
    });

    // Final epic transformation - blocks fly out to form logo
    tl.to(buildingBlocksRef.current, {
      x: (i) => {
        const angle = (i / buildingBlocksRef.current.length) * Math.PI * 2;
        return Math.cos(angle) * 400;
      },
      y: (i) => {
        const angle = (i / buildingBlocksRef.current.length) * Math.PI * 2;
        return Math.sin(angle) * 300;
      },
      z: (i) => gsap.utils.random(-300, 300),
      rotationY: 1080,
      rotationX: 360,
      scale: 1.5,
      duration: 1.5,
      stagger: 0.02,
      ease: "power2.out",
    }, "+=0.5");

    // Characters jump to center and wave goodbye
    tl.to(charactersRef.current, {
      x: 0,
      y: -150,
      scale: 1.2,
      rotationY: 180,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
    }, "-=1.2");

    tl.to(charactersRef.current, {
      rotationY: 0,
      duration: 0.3,
      stagger: 0.05,
    }, "-=0.5");

    // Final collapse into center
    tl.to([...buildingBlocksRef.current, ...charactersRef.current], {
      scale: 0,
      rotationY: 180,
      opacity: 0,
      duration: 1,
      stagger: 0.01,
      ease: "power2.in",
    }, "+=0.5");

    return () => clearTimeout(timeout);
  }, [onComplete]);

  const addToRefs = (el: HTMLDivElement | null, refArray: React.MutableRefObject<HTMLDivElement[]>) => {
    if (el && !refArray.current.includes(el)) {
      refArray.current.push(el);
    }
  };

  const createBuildingBlocks = () => {
    const blocks = [];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        blocks.push(
          <div
            key={`block-${row}-${col}`}
            ref={(el) => addToRefs(el, buildingBlocksRef)}
            className={`building-block block-${row}-${col} block-color-${(row + col) % 4}`}
          >
            <div className="block-face block-front"></div>
            <div className="block-face block-back"></div>
            <div className="block-face block-left"></div>
            <div className="block-face block-right"></div>
            <div className="block-face block-top"></div>
            <div className="block-face block-bottom"></div>
            <div className="block-connector"></div>
          </div>
        );
      }
    }
    return blocks;
  };

  const createParticles = () => {
    return Array.from({ length: 120 }, (_, i) => (
      <div
        key={`particle-${i}`}
        ref={(el) => addToRefs(el, particlesRef)}
        className={`particle particle-${i % 12}`}
      />
    ));
  };

  const createConfetti = () => {
    return Array.from({ length: 80 }, (_, i) => (
      <div
        key={`confetti-${i}`}
        ref={(el) => addToRefs(el, confettiRef)}
        className={`confetti confetti-${i % 12}`}
      />
    ));
  };

  const createSparkles = () => {
    return Array.from({ length: 60 }, (_, i) => (
      <div
        key={`sparkle-${i}`}
        ref={(el) => addToRefs(el, sparklesRef)}
        className={`sparkle sparkle-${i % 8}`}
      />
    ));
  };

  return (
    <div ref={containerRef} className="preloader">
      {/* Animated Geometric Background */}
      <div className="geometric-bg">
        <div className="geo-shape geo-1"></div>
        <div className="geo-shape geo-2"></div>
        <div className="geo-shape geo-3"></div>
        <div className="geo-shape geo-4"></div>
      </div>

      {/* 3D Building Blocks Container */}
      <div ref={blocksContainerRef} className="building-blocks-container">
        {createBuildingBlocks()}
      </div>

      {/* Main Content */}
      <div className="preloader-content">
        {/* Animated Characters */}
        <div className="characters-container">
          <div ref={(el) => addToRefs(el, charactersRef)} className="character character-1">
            <div className="character-face">
              <div className="eye"></div>
              <div className="eye"></div>
              <div className="mouth laughing"></div>
            </div>
            <div className="character-glow"></div>
            <div className="character-shadow"></div>
          </div>
          <div ref={(el) => addToRefs(el, charactersRef)} className="character character-2">
            <div className="character-face">
              <div className="eye"></div>
              <div className="eye"></div>
              <div className="mouth happy"></div>
            </div>
            <div className="character-glow"></div>
            <div className="character-shadow"></div>
          </div>
          <div ref={(el) => addToRefs(el, charactersRef)} className="character character-3">
            <div className="character-face">
              <div className="eye"></div>
              <div className="eye"></div>
              <div className="mouth surprised"></div>
            </div>
            <div className="character-glow"></div>
            <div className="character-shadow"></div>
          </div>
          <div ref={(el) => addToRefs(el, charactersRef)} className="character character-4">
            <div className="character-face">
              <div className="eye"></div>
              <div className="eye"></div>
              <div className="mouth excited"></div>
            </div>
            <div className="character-glow"></div>
            <div className="character-shadow"></div>
          </div>
        </div>

        {/* Animated Text */}
        <div ref={textRef} className="preloader-text">
          BUILDING FUN!
        </div>

        {/* Particles */}
        <div className="particles-container">
          {createParticles()}
        </div>

        {/* Sparkles */}
        <div className="sparkles-container">
          {createSparkles()}
        </div>

        {/* Confetti */}
        <div className="confetti-container">
          {createConfetti()}
        </div>
      </div>
    </div>
  );
};

export default Preloader;