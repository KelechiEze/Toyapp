import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, MessageCircle, ChevronLeft, ChevronRight, Instagram, Facebook, Twitter } from "lucide-react";
import "./Toys.css";

gsap.registerPlugin(ScrollTrigger);

interface Toy {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  image: string;
}

export interface ToysRef {
  searchToy: (query: string) => void;
}

const Toys = forwardRef<ToysRef>((props, ref) => {
  const [selectedToy, setSelectedToy] = useState<Toy | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notFoundModalOpen, setNotFoundModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("All Items");
  const carouselRef = useRef<HTMLDivElement>(null);
  const toysSectionRef = useRef<HTMLDivElement>(null);

  const whatsappNumber = "2347030346947";

  const toys: Toy[] = [
    {
      id: 1,
      name: "Colorful Building Blocks Set",
      category: "Indoor Play",
      price: 15000,
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      name: "Electronic Learning Tablet",
      category: "Indoor Play",
      price: 23000,
      oldPrice: 28000,
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      name: "Creative Art & Craft Kit",
      category: "Indoor Play",
      price: 18000,
      oldPrice: 22000,
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      name: "Football & Sports Set",
      category: "Outdoor Toy",
      price: 25000,
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop",
    },
    {
      id: 5,
      name: "Musical Instrument Set",
      category: "Indoor Play",
      price: 28000,
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop",
    },
    {
      id: 6,
      name: "Bicycle for Kids",
      category: "Outdoor Toy",
      price: 35000,
      oldPrice: 42000,
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=300&fit=crop",
    },
    {
      id: 7,
      name: "Puzzle Game Collection",
      category: "Indoor Play",
      price: 12000,
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=300&fit=crop",
    },
    {
      id: 8,
      name: "Water Play Set",
      category: "Outdoor Toy",
      price: 20000,
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=300&fit=crop",
    },
  ];

  const filteredToys = activeFilter === "All Items" 
    ? toys 
    : toys.filter(toy => toy.category === activeFilter);

  useImperativeHandle(ref, () => ({
    searchToy: (query: string) => {
      const foundToy = toys.find(toy => 
        toy.name.toLowerCase().includes(query.toLowerCase())
      );
      
      if (foundToy) {
        setSelectedToy(foundToy);
        setIsModalOpen(true);
        
        // Smooth scroll to toys section for found toy
        setTimeout(() => {
          const toysSection = document.getElementById("toys");
          if (toysSection) {
            toysSection.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 100);
      } else {
        setNotFoundModalOpen(true);
        
        // Smooth scroll to toys section for not found modal
        setTimeout(() => {
          const toysSection = document.getElementById("toys");
          if (toysSection) {
            toysSection.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 100);
      }
    }
  }));

  useEffect(() => {
    const section = document.querySelector(".toys");
    if (section) {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  }, []);

  const handleToyClick = (toy: Toy) => {
    console.log("Toy clicked:", toy);
    setSelectedToy(toy);
    setIsModalOpen(true);
  };

  const handleWhatsAppClick = () => {
    if (selectedToy) {
      const message = encodeURIComponent(
        `Hi! I'm interested in: ${selectedToy.name}\nPrice: ₦${selectedToy.price.toLocaleString()}\nCategory: ${selectedToy.category}`
      );
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
    }
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const nextSlide = () => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const scrollAmount = container.clientWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const prevSlide = () => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const scrollAmount = container.clientWidth;
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  // Auto-scroll to modal when it opens
  useEffect(() => {
    if (notFoundModalOpen) {
      // Small delay to ensure modal is rendered before scrolling
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight / 3, // Scroll to middle of viewport
          behavior: 'smooth'
        });
      }, 300);
    }
  }, [notFoundModalOpen]);

  // Auto-scroll to modal when it opens for found toy
  useEffect(() => {
    if (isModalOpen && selectedToy) {
      // Small delay to ensure modal is rendered before scrolling
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight / 3, // Scroll to middle of viewport
          behavior: 'smooth'
        });
      }, 300);
    }
  }, [isModalOpen, selectedToy]);

  return (
    <section id="toys" className="toys" ref={toysSectionRef}>
      <div className="toys-container">
        <div className="toys-header">
          <h2 className="toys-title">Available Toys</h2>
          <div className="toys-filters">
            <button 
              className={`filter-btn ${activeFilter === "All Items" ? "active" : ""}`}
              onClick={() => handleFilterClick("All Items")}
            >
              All Items ({toys.length})
            </button>
            <button 
              className={`filter-btn ${activeFilter === "Outdoor Toy" ? "active" : ""}`}
              onClick={() => handleFilterClick("Outdoor Toy")}
            >
              Outdoor Toy ({toys.filter(t => t.category === "Outdoor Toy").length})
            </button>
            <button 
              className={`filter-btn ${activeFilter === "Indoor Play" ? "active" : ""}`}
              onClick={() => handleFilterClick("Indoor Play")}
            >
              Indoor Play ({toys.filter(t => t.category === "Indoor Play").length})
            </button>
          </div>
        </div>

        <div className="toys-carousel-wrapper">
          <button className="carousel-nav-btn carousel-prev" onClick={prevSlide}>
            <ChevronLeft size={20} />
          </button>
          
          <div className="toys-carousel" ref={carouselRef}>
            <div className="toys-carousel-content">
              {filteredToys.map((toy) => (
                <div
                  key={toy.id}
                  className="toy-carousel-item"
                >
                  <div
                    className="toy-card"
                    onClick={() => handleToyClick(toy)}
                  >
                    <div className="toy-image-wrapper">
                      <img src={toy.image} alt={toy.name} className="toy-image" />
                      <button className="wishlist-btn" onClick={(e) => e.stopPropagation()}>
                        <Heart size={18} />
                      </button>
                    </div>
                    <div className="toy-info">
                      <span className="toy-category">{toy.category}</span>
                      <h3 className="toy-name">{toy.name}</h3>
                      <div className="toy-rating">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className="star">★</span>
                        ))}
                        <span className="rating-count">({toy.rating.toFixed(1)})</span>
                      </div>
                      <div className="toy-price">
                        <span className="price">₦{toy.price.toLocaleString()}</span>
                        {toy.oldPrice && (
                          <span className="old-price">₦{toy.oldPrice.toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="carousel-nav-btn carousel-next" onClick={nextSlide}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Simple Modal Implementation */}
      {isModalOpen && selectedToy && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="toy-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                ×
              </button>
              <div className="modal-image">
                <img src={selectedToy.image} alt={selectedToy.name} />
              </div>
              <h3 className="modal-title">{selectedToy.name}</h3>
              <p className="modal-price">₦{selectedToy.price.toLocaleString()}</p>
              {selectedToy.oldPrice && (
                <p className="modal-old-price">₦{selectedToy.oldPrice.toLocaleString()}</p>
              )}
              <p className="modal-category">{selectedToy.category}</p>
              <button className="whatsapp-btn" onClick={handleWhatsAppClick}>
                <MessageCircle size={20} />
                Contact via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Not Found Modal */}
      {notFoundModalOpen && (
        <div className="modal-overlay" onClick={() => setNotFoundModalOpen(false)}>
          <div className="not-found-modal" onClick={(e) => e.stopPropagation()}>
            <div className="not-found-content">
              <button className="modal-close" onClick={() => setNotFoundModalOpen(false)}>
                ×
              </button>
              <div className="not-found-icon">😔</div>
              <h3 className="not-found-title">Toy Not Available</h3>
              <p className="not-found-description">
                We don't have that toy in stock at the moment. Please reach out to us on social media to check availability or make a special request.
              </p>
              <div className="not-found-social">
                <a
                  href="https://wa.me/2348012345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="not-found-social-btn whatsapp"
                >
                  <MessageCircle size={20} />
                  <span>WhatsApp</span>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="not-found-social-btn instagram"
                >
                  <Instagram size={20} />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="not-found-social-btn facebook"
                >
                  <Facebook size={20} />
                  <span>Facebook</span>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="not-found-social-btn twitter"
                >
                  <Twitter size={20} />
                  <span>Twitter</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
});

export default Toys;