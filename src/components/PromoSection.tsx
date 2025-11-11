import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flame, ArrowRight } from "lucide-react";
import "./PromoSection.css";

gsap.registerPlugin(ScrollTrigger);

const PromoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(sectionRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
      scale: 0.95,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

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
    <section className="promo-section">
      <div className="promo-container" ref={sectionRef}>
        <div className="promo-content">
          <div className="promo-badge">
            <Flame size={18} />
            <span>Get Your Toys Here</span>
            <Flame size={18} />
          </div>
          <h2 className="promo-title">
            Amazing Toys Waiting For You!
          </h2>
          <p className="promo-description">
            Discover the perfect toys that will bring joy and creativity to your child's world. Your next favorite toy is just a click away!
          </p>
          <button className="promo-btn" onClick={scrollToToys}>
            Explore All Toys
            <ArrowRight size={18} />
          </button>
        </div>
        <div className="promo-image-wrapper">
          <img src="/pointgirl.png" alt="Amazing Toys Collection" className="promo-image" />
        </div>
      </div>
    </section>
  );
};

export default PromoSection;