import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-techjus-light to-white min-h-screen flex items-center">
      <div className="container-custom py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-techjus-blue">
            Faire du droit du numérique, <span className="text-techjus-bleu">un levier d'excellence</span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://chat.whatsapp.com/D5pdYuXAnTB9MaXDZO9cOc"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-techjus-blue text-white text-center py-3 px-6 rounded-lg shadow-md transition-all duration-200 hover:bg-white hover:text-techjus-blue"
            >
              Rejoindre la communauté
            </a>
            <a
              href="/techjus_presentation.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary bg-techjus-yellow text-white text-center py-3 px-6 rounded-lg shadow-md transition-all duration-200 hover:bg-white hover:text-techjus-yellow">
              En savoir plus
            </a>

          </div>
        </div>

        <div className="relative">
          <img 
            src="/ezekiel.webp"
            alt="Ezekiel T. SOHOU"
            className="rounded-lg shadow-xl w-full object-cover aspect-[3/4]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg"></div>

          <div className={`absolute bottom-4 left-4 right-4 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <blockquote className="border-l-4 border-techjus-yellow pl-6 italic text-white text-sm md:text-base">
              "L'emblématique union entre le droit et le numérique a créé une nouvelle matière dynamique d'essence, parfois volatile mais surtout très subtile. Ensemble, nous pouvons mieux l'appréhender"
              <footer className="text-sm 4 mt-4 font-bold text-techjus-yellow">
                <a
                    href="https://www.linkedin.com/in/ez%C3%A9kiel-sohou-%F0%9F%87%A7%F0%9F%87%AF%F0%9F%92%AB-059126177/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline transition-all duration-300"
                  >
                    Ezékiel T. SOHOU
                  </a>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>

      <button 
        onClick={scrollToAbout}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-techjus-blue hover:text-techjus-red transition-colors duration-300"
        aria-label="Défiler vers la section À propos"
      >
        <ChevronDown size={36} />
      </button>
    </section>
  );
};

export default HeroSection;
