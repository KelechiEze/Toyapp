import { useState, useRef } from "react";
import Preloader from "../components/Preloader";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Features from "../components/Features";
import Toys, { ToysRef } from "../components/Toys";
import Team from "../components/Team";
import PromoSection from "../components/PromoSection";
import ContactInfo from "../components/ContactInfo";
import Footer from "../components/Footer";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const toysRef = useRef<ToysRef>(null);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  const handleSearch = (query: string) => {
    if (toysRef.current) {
      toysRef.current.searchToy(query);
    }
  };

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      {!isLoading && (
        <div className="min-h-screen bg-background">
          <Navbar onSearch={handleSearch} />
          <Hero />
          <About />
          <Features />
          <Toys ref={toysRef} />
          <Team />
          <PromoSection />
          <ContactInfo />
          <Footer />
        </div>
      )}
    </>
  );
};

export default Index;
