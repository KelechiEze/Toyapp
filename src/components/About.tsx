import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Award, Sparkles, Users } from "lucide-react";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cards = cardsRef.current;

    gsap.from(cards, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, []);

  const addToCardsRef = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const features = [
    {
      icon: Heart,
      title: "Made with Love",
      description: "Every toy is carefully selected for quality and safety",
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Only the best toys for your precious children",
    },
    {
      icon: Sparkles,
      title: "Spark Creativity",
      description: "Toys that inspire imagination and learning",
    },
    {
      icon: Users,
      title: "Family Approved",
      description: "Trusted by thousands of happy families",
    },
  ];

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="about-container">
        <div className="about-header">
          <h2 className="about-title">About Our Toy Store</h2>
          <p className="about-subtitle">
            Bringing joy to children through quality toys and endless fun
          </p>
        </div>

        <div className="about-content">
          <div className="about-image-wrapper">
            <img src="/pointgirl.png" alt="Happy children with toys" className="about-image" />
          </div>

          <div className="about-text">
            <h3 className="about-heading">Your Trusted Toy Partner</h3>
            <p className="about-description">
              We're passionate about bringing happiness to children through carefully curated toys. 
              Our collection features safe, high-quality toys that promote learning, creativity, 
              and endless hours of fun.
            </p>
            <p className="about-description">
              From educational building blocks to imaginative playsets, each toy is selected with 
              care to ensure it meets our high standards for quality and safety. We believe in 
              creating magical childhood moments that last a lifetime.
            </p>
          </div>
        </div>

        <div className="about-features">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} ref={addToCardsRef} className="feature-card">
                <div className="feature-icon">
                  <Icon size={32} />
                </div>
                <h4 className="feature-title">{feature.title}</h4>
                <p className="feature-description">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;