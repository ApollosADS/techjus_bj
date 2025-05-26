import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, ExternalLink } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Empêcher le scroll du body quand le menu est ouvert
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  // Fermer le menu si on redimensionne vers desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        closeMenu();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Nettoyage à la destruction du composant
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `relative text-gray-700 font-medium hover:text-blue-600 transition-all duration-200 py-2 px-3 rounded-lg hover:bg-blue-50 ${
      isActive ? 'text-blue-600 after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-6 after:h-0.5 after:bg-blue-600 after:rounded-full' : ''
    }`;

  const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center w-full px-6 py-4 text-left text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 border-b border-gray-100 ${
      isActive ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' : ''
    }`;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-3 flex justify-between items-center">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3" onClick={closeMenu}>
            <img 
              src="/logo-techjus.png" 
              alt="Logo TechJus" 
              className="h-10 md:h-12 w-auto" 
            />
          </NavLink>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex gap-2 items-center">
            <NavLink to="/" end className={navLinkClasses}>
              Accueil
            </NavLink>
            <NavLink to="/presentation" className={navLinkClasses}>
              Présentation
            </NavLink>
            <NavLink to="/thematiques" className={navLinkClasses}>
              Thématiques
            </NavLink>
            <NavLink to="/resources" className={navLinkClasses}>
              Ressources
            </NavLink>
            <NavLink to="/formations" className={navLinkClasses}>
              Formations
            </NavLink>
            <NavLink to="/contact" className={navLinkClasses}>
              Contacts
            </NavLink>
          </nav>

          {/* Bouton Menu Mobile */}
          <button
            onClick={toggleMenu}
            className={`lg:hidden p-3 rounded-xl transition-all duration-200 min-w-[48px] min-h-[48px] flex items-center justify-center ${
              isMenuOpen 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'hover:bg-gray-100 text-gray-700'
            }`}
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>

      {/* Menu Mobile - Overlay plein écran */}
      {isMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={closeMenu}
        >
          {/* Menu container */}
          <div 
            className="fixed top-[72px] left-0 right-0 bottom-0 bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="h-full flex flex-col">
              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto">
                <NavLink 
                  to="/" 
                  end 
                  className={mobileNavLinkClasses}
                  onClick={closeMenu}
                >
                  <ExternalLink size={18} className="mr-4 text-blue-400 flex-shrink-0" />
                  <span className="text-lg">Accueil</span>
                </NavLink>
                <NavLink 
                  to="/presentation" 
                  className={mobileNavLinkClasses}
                  onClick={closeMenu}
                >
                  <ExternalLink size={18} className="mr-4 text-blue-400 flex-shrink-0" />
                  <span className="text-lg">Présentation</span>
                </NavLink>
                <NavLink 
                  to="/thematiques" 
                  className={mobileNavLinkClasses}
                  onClick={closeMenu}
                >
                  <ExternalLink size={18} className="mr-4 text-blue-400 flex-shrink-0" />
                  <span className="text-lg">Thématiques</span>
                </NavLink>
                <NavLink 
                  to="/resources" 
                  className={mobileNavLinkClasses}
                  onClick={closeMenu}
                >
                  <ExternalLink size={18} className="mr-4 text-blue-400 flex-shrink-0" />
                  <span className="text-lg">Ressources</span>
                </NavLink>
                <NavLink 
                  to="/formations" 
                  className={mobileNavLinkClasses}
                  onClick={closeMenu}
                >
                  <ExternalLink size={18} className="mr-4 text-blue-400 flex-shrink-0" />
                  <span className="text-lg">Formations</span>
                </NavLink>
                <NavLink 
                  to="/contact" 
                  className={mobileNavLinkClasses}
                  onClick={closeMenu}
                >
                  <ExternalLink size={18} className="mr-4 text-blue-400 flex-shrink-0" />
                  <span className="text-lg">Contacts</span>
                </NavLink>
              </div>
              
              {/* Section info mobile avec réseaux sociaux */}
              <div className="px-6 py-8 bg-gray-50 border-t border-gray-200">
                <div className="text-center">
                  <h4 className="font-bold text-gray-800 text-lg mb-2">TechJus</h4>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Communauté dédiée au droit du numérique au Bénin et en Afrique
                  </p>
                  {/* Boutons sociaux */}
                  <div className="flex justify-center space-x-4">
                    <button className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                      <span className="text-white text-sm font-bold">FB</span>
                    </button>
                    <button className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                      <span className="text-white text-sm font-bold">TW</span>
                    </button>
                    <button className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors">
                      <span className="text-white text-sm font-bold">IN</span>
                    </button>
                    <button className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                      <span className="text-white text-sm font-bold">IG</span>
                    </button>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;