import React from "react";
import HeroSection from "../components/home/HeroSection";
import ServicesSection from "../components/home/ServicesSection";
import ProductsSection from "../components/home/ProductsSection";
import AboutSection from "../components/home/AboutSection";
import ContactSection from "../components/home/ContactSection";

const HomePage = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <HeroSection />
      <ServicesSection />
      <ProductsSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
};

export default HomePage;
