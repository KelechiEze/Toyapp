import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, MessageCircle } from "lucide-react";
import "./ContactInfo.css";

gsap.registerPlugin(ScrollTrigger);

const ContactInfo = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(sectionRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  return (
    <section id="contact" className="contact-info" ref={sectionRef}>
      <div className="contact-info-container">
        <div className="contact-info-header">
          <h2 className="contact-info-title">Get In Touch</h2>
          <p className="contact-info-subtitle">
            We'd love to hear from you! Reach out through any of these channels
          </p>
        </div>

        <div className="contact-info-grid">
          <div className="contact-info-card">
            <div className="contact-info-icon">
              <MapPin size={28} />
            </div>
            <h3 className="contact-info-heading">Visit Us</h3>
            <p className="contact-info-text">
              No. 324, Taiwo Road , Newlayout
              <br />
              Kogi State, Nigeria
            </p>
          </div>

          <div className="contact-info-card">
            <div className="contact-info-icon">
              <Phone size={28} />
            </div>
            <h3 className="contact-info-heading">Call Us</h3>
            <p className="contact-info-text">
              +234 803 285 5075
              <br />
              +234 815 235 6307
            </p>
          </div>

          <div className="contact-info-card">
            <div className="contact-info-icon">
              <Mail size={28} />
            </div>
            <h3 className="contact-info-heading">Email Us</h3>
            <p className="contact-info-text">
              janetbako50@gmail.com
              <br />
              support@toyup.ng
            </p>
          </div>

          <div className="contact-info-card">
            <div className="contact-info-icon">
              <Clock size={28} />
            </div>
            <h3 className="contact-info-heading">Working Hours</h3>
            <p className="contact-info-text">
              Mon - Sat: 9:00 AM - 6:00 PM
              <br />
              Sunday: Closed
            </p>
          </div>
        </div>

        <div className="contact-social-section">
          <h3 className="contact-social-title">Connect With Us</h3>
          <div className="contact-social-links">
            <a
              href="https://wa.me/2348012345678"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-btn whatsapp"
              aria-label="WhatsApp"
            >
              <MessageCircle size={24} />
              <span>WhatsApp</span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-btn instagram"
              aria-label="Instagram"
            >
              <Instagram size={24} />
              <span>Instagram</span>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-btn facebook"
              aria-label="Facebook"
            >
              <Facebook size={24} />
              <span>Facebook</span>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-btn twitter"
              aria-label="Twitter"
            >
              <Twitter size={24} />
              <span>Twitter</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
