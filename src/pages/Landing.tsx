import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import FoundersSection from '../components/FoundersSection';
import RulesSection from '../components/RulesSection';
import ContactForm from '../components/ContactForm';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <AboutSection />
      <FoundersSection />
      <RulesSection />
      <ContactForm />
    </div>
  );
};

export default Landing;