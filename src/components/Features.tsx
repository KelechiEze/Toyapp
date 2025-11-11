import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DollarSign, Percent, Truck, Headphones } from "lucide-react";
import "./Features.css";

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const featuresRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    featuresRef.current.forEach((feature) => {
      gsap.from(feature, {
        scrollTrigger: {
          trigger: feature,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    });
  }, []);

  const addToFeaturesRef = (el: HTMLDivElement | null) => {
    if (el && !featuresRef.current.includes(el)) {
      featuresRef.current.push(el);
    }
  };

  const features = [
    {
      icon: DollarSign,
      title: "Money Return",
      description: "Back guarantee under 7 days",
      color: "orange",
    },
    {
      icon: Percent,
      title: "Member Discount",
      description: "On every order over $2000",
      color: "blue",
    },
    {
      icon: Truck,
      title: "Home Delivery",
      description: "Free delivery to your home",
      color: "teal",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Dedicated support in 24hrs",
      color: "pink",
    },
  ];

  return (
    <section id="features" className="features">
      <div className="features-container">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              ref={addToFeaturesRef}
              className={`feature-box feature-${feature.color}`}
            >
              <div className="feature-box-icon">
                <Icon size={32} />
              </div>
              <div className="feature-box-content">
                <h3 className="feature-box-title">{feature.title}</h3>
                <p className="feature-box-description">{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Features;
