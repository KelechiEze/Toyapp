import { Facebook, Twitter, Instagram, MapPin, Phone, Mail } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-column">
            <div className="footer-logo">
              <span className="logo-text">Toys</span>
              <span className="logo-accent">Place</span>
            </div>
            <p className="footer-description">
              Bringing joy to children through quality toys. Creating magical childhood moments that last a lifetime.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#toys">Shop</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-heading">Customer Support</h3>
            <ul className="footer-links">
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Shipping Info</a></li>
              <li><a href="#">Returns & Exchanges</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-heading">Contact Info</h3>
            <div className="footer-contact">
              <div className="contact-item">
                <MapPin size={18} />
                <span>15 Awolowo Road, Ikoyi, Lagos, Nigeria</span>
              </div>
              <div className="contact-item">
                <Phone size={18} />
                <span>+234 801 234 5678</span>
              </div>
              <div className="contact-item">
                <Mail size={18} />
                <span>info@toyup.ng</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Toyup. All rights reserved. Made with love for children.
          </p>
        </div>
      </div>

      <div className="footer-decoration">
        <img src="/pointgirl.png" alt="Decorative toy" className="footer-toy" />
      </div>
    </footer>
  );
};

export default Footer;