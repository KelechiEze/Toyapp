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

  return (
    <section className="promo-section">
      <div className="promo-container" ref={sectionRef}>
        <div className="promo-content">
          <div className="promo-badge">
            <Flame size={18} />
            <span>Limited Time Offer</span>
            <Flame size={18} />
          </div>
          <h2 className="promo-title">
            Get 25% discount on all educational toys
          </h2>
          <p className="promo-description">
            Don't miss out on this amazing deal! Shop now and save big on your favorite toys.
          </p>
          <button className="promo-btn">
            See Collection
            <ArrowRight size={18} />
          </button>
          <div className="promo-discount-badge">
            <span className="discount-number">25%</span>
            <span className="discount-text">OFF</span>
          </div>
        </div>
        <div className="promo-image-wrapper">
          <img src="/pointgirl.png" alt="25% Discount Offer" className="promo-image" />
        </div>
      </div>
    </section>
  );
};

export default PromoSection;