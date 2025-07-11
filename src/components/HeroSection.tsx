import React, { useState, useEffect } from 'react';
import { ChevronDown, AlertCircle, ExternalLink } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isHoveringName, setIsHoveringName] = useState(false);

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

  const handleJoinClick = () => {
    setShowModal(true);
  };

  const confirmJoin = () => {
    window.open("https://chat.whatsapp.com/LWSxo3cWM0X7BJacOfXBw7", "_blank");
    setShowModal(false);
  };

  return (
    <>
      <section className="relative bg-gradient-to-b from-techjus-light to-white min-h-screen flex items-center">
        {/* Container principal avec marges uniformes */}
        <div className="w-full px-4 md:px-6 lg:px-8 py-20">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-techjus-blue">
                Faire du droit du numérique, <span className="text-techjus-blue">un levier d'excellence</span>
              </h1>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleJoinClick}
                  className="bg-techjus-blue text-white text-center py-3 px-6 rounded-lg shadow-techjus transition-all duration-200 hover:bg-white hover:text-techjus-blue hover:border-2 hover:border-techjus-blue custom-animate-pulse"
                >
                  Rejoindre la communauté
                </button>
                <a
                  href="/techjus_presentation.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-techjus-yellow text-white text-center py-3 px-6 rounded-lg shadow-md transition-all duration-200 hover:bg-white hover:text-techjus-yellow hover:border-2 hover:border-techjus-yellow"
                >
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
                  <footer className="text-sm mt-4 font-bold text-techjus-yellow relative">
                    <div className="flex items-center justify-start gap-2">
                      <a
                        href="https://www.linkedin.com/in/ez%C3%A9kiel-sohou-%F0%9F%87%A7%F0%9F%87%AF%F0%9F%92%AB-059126177/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative inline-flex items-center gap-1 group"
                        onMouseEnter={() => setIsHoveringName(true)}
                        onMouseLeave={() => setIsHoveringName(false)}
                      >
                        <span className="relative">
                          Ezékiel T. SOHOU
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                          <span className="absolute -inset-1 bg-white/20 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
                        </span>
                        <ExternalLink 
                          size={14} 
                          className={`transition-all duration-300 ${
                            isHoveringName 
                              ? 'opacity-100 transform translate-x-1 text-white' 
                              : 'opacity-70 text-techjus-yellow'
                          }`}
                        />
                      </a>
                    </div>
                    <div className={`text-xs text-white/80 mt-1 transition-all duration-300 ${
                      isHoveringName ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2'
                    }`}>
                      👆 Découvrir son profil LinkedIn
                    </div>
                  </footer>
                </blockquote>
              </div>
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

        {/* Modal avec marges uniformes */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-techjus-lg p-8 md:p-10 max-w-2xl w-full text-center relative">
              <AlertCircle className="w-12 h-12 text-techjus-blue mx-auto mb-4" />
              <h2 className="text-2xl font-extrabold mb-4 text-techjus-blue">Avant de continuer</h2>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                <strong>TechJus ne collecte aucune de vos données.</strong><br />
                En cliquant sur ce lien vous consentez à rejoindre la communauté TechJus sur WhatsApp et à respecter le code de bonne conduite de ladite communauté. <br />
                <span className="text-techjus-blue font-semibold">Bienvenue dans l'univers TechJus.</span>
              </p>
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
                >
                  Annuler
                </button>
                <button
                  onClick={confirmJoin}
                  className="bg-techjus-blue text-white px-5 py-2 rounded-lg hover:bg-techjus-blue hover:opacity-90 transition font-medium"
                >
                  Continuer
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      <style>{`
        @keyframes custom-pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
        
        .custom-animate-pulse {
          animation: custom-pulse 2s infinite;
        }
      `}</style>
    </>
  );
};

export default HeroSection;