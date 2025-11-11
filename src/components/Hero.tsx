import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import "./Hero.css";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const sideCard1Ref = useRef<HTMLDivElement>(null);
  const sideCard2Ref = useRef<HTMLDivElement>(null);
  const floatingToysRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.from(mainCardRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out",
    })
      .from(
        sideCard1Ref.current,
        {
          opacity: 0,
          x: 50,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      )
      .from(
        sideCard2Ref.current,
        {
          opacity: 0,
          x: 50,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      );

    // Floating animation for toys
    gsap.to(floatingToysRef.current, {
      y: -20,
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.3,
    });
  }, []);

  const addToFloatingRefs = (el: HTMLImageElement | null) => {
    if (el && !floatingToysRef.current.includes(el)) {
      floatingToysRef.current.push(el);
    }
  };

  const scrollToToys = () => {
    const toysSection = document.getElementById("toys");
    if (toysSection) {
      toysSection.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero-container">
        <div ref={mainCardRef} className="hero-main-card">
          <div className="hero-content">
            <span className="hero-badge">Special Discount</span>
            <h1 className="hero-title">
              Find The Best Toys For Your Kids
            </h1>
            <p className="hero-description">
              Discover amazing toys that spark creativity and joy. Quality toys for endless fun and learning.
            </p>
            <div className="hero-price-section">
              <div className="hero-price">
                <span className="price-current">₦24,500</span>
                <span className="price-old">₦29,500</span>
              </div>
            </div>
            <button className="hero-btn" onClick={scrollToToys}>
              Shop Now
              <ArrowRight size={18} />
            </button>
          </div>
          <div className="hero-image-container">
            <img
              src="/wow.png"
              alt="Happy child with toy"
              className="hero-main-image"
            />
            <img
              ref={addToFloatingRefs}
              src="/hero3.png"
              alt="Toy car"
              className="floating-toy toy-1"
            />
            <img
              ref={addToFloatingRefs}
              src="/hero2.png"
              alt="Building blocks"
              className="floating-toy toy-2"
            />
          </div>
          <div className="hero-pattern"></div>
        </div>

        <div className="hero-side-cards">
          <div ref={sideCard1Ref} className="side-card card-orange">
            <div className="side-card-content">
              <h3 className="side-card-title">Educational Toy Set</h3>
              <p className="side-card-subtitle">Discover Amazing Offers!</p>
              <button className="side-card-btn" onClick={scrollToToys}>
                See Collection
                <ArrowRight size={16} />
              </button>
            </div>
            <img src="/hero2.png" alt="Educational toys" className="side-card-image" />
          </div>

          <div ref={sideCard2Ref} className="side-card card-pink">
            <div className="side-card-content">
              <h3 className="side-card-title">Children's Day Collection</h3>
              <p className="side-card-subtitle">15% OFF on Kids' Toys and Gifts!</p>
              <button className="side-card-btn" onClick={scrollToToys}>
                See Collection
                <ArrowRight size={16} />
              </button>
            </div>
            <img src="/hero3.png" alt="Children's day toys" className="side-card-image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;