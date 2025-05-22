import React, { useState, useEffect } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
    window.open("https://chat.whatsapp.com/D5pdYuXAnTB9MaXDZO9cOc", "_blank");
    setShowModal(false);
  };

  return (
    <section className="relative bg-gradient-to-b from-techjus-light to-white min-h-screen flex items-center">
      <div className="container-custom py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-techjus-blue">
            Faire du droit du numérique, <span className="text-techjus-bleu">un levier d'excellence</span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleJoinClick}
              className="btn-primary bg-techjus-blue text-white text-center py-3 px-6 rounded-lg shadow-md transition-all duration-200 hover:bg-white hover:text-techjus-blue animate-pulse"
              style={{
                animation: 'pulse 2s infinite',
                boxShadow: '0 0 0 0 rgba(52, 152, 219, 1)'
              }}
            >
              Rejoindre la communauté
            </button>
            <a
              href="/techjus_presentation.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary bg-techjus-yellow text-white text-center py-3 px-6 rounded-lg shadow-md transition-all duration-200 hover:bg-white hover:text-techjus-yellow"
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
              <footer className="text-sm mt-4 font-bold text-techjus-yellow">
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 max-w-2xl w-full text-center relative">
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
                className="bg-techjus-blue text-white px-5 py-2 rounded-lg hover:bg-techjus-dark transition font-medium"
              >
                Continuer
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(52, 152, 219, 0.7);
          }
          70% {
            transform: scale(1.05);
            box-shadow: 0 0 0 10px rgba(223, 11, 11, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(52, 152, 219, 0);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;