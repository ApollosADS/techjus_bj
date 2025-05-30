import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Configuration des liens sociaux
  const socialLinks = [
    { icon: <Facebook size={20} />, url: '#', label: 'Facebook' },
    { icon: <Twitter size={20} />, url: '#', label: 'Twitter' },
    { icon: <Linkedin size={20} />, url: '#', label: 'LinkedIn' },
    { icon: <Instagram size={20} />, url: '#', label: 'Instagram' },
  ];

  // Classes CSS réutilisables
  const navLinkClasses = ({ isActive }: { isActive: boolean }) => 
    `relative text-gray-700 font-medium hover:text-blue-600 transition-all duration-200 py-2 px-3 rounded-lg hover:bg-blue-50 ${
      isActive 
        ? 'text-blue-600 after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-6 after:h-0.5 after:bg-blue-600 after:rounded-full' 
        : ''
    }`;

  const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) => 
    `flex items-center w-full px-6 py-4 text-left text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 border-b border-gray-100 ${
      isActive ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' : ''
    }`;

  // Gestion du menu
  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    document.body.style.overflow = newState ? 'hidden' : 'unset';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  // Gestion du redimensionnement
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

  // Rendu du menu mobile
  const renderMobileMenu = () => (
    <div 
      className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50" 
      onClick={closeMenu}
    >
      <div 
        className="fixed top-[72px] left-0 right-0 bottom-0 bg-white shadow-xl" 
        onClick={(e) => e.stopPropagation()}
      >
        <nav className="h-full flex flex-col">
          <div className="flex-1 overflow-y-auto">
            {['/', '/presentation', '/thematiques', '/resources', '/formations', '/contact'].map((path, index) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                className={mobileNavLinkClasses}
                onClick={closeMenu}
              >
                <span className="text-lg">
                  {['Accueil', 'Présentation', 'Thématiques', 'Ressources', 'Formations', 'Contacts'][index]}
                </span>
              </NavLink>
            ))}
          </div>

          {/* Pied de page mobile */}
          <div className="px-6 py-8 bg-gray-50 border-t border-gray-200">
            <div className="text-center">
              <h4 className="font-bold text-gray-800 text-lg mb-2">TechJus</h4>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Communauté dédiée au droit du numérique au Bénin et en Afrique
              </p>
              <div className="flex justify-center space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    aria-label={social.label}
                    className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors text-white"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );

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

          {/* Navigation Bureau */}
          <nav className="hidden lg:flex gap-2 items-center">
            {['/', '/presentation', '/thematiques', '/resources', '/formations', '/contact'].map((path, index) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                className={navLinkClasses}
              >
                {['Accueil', 'Présentation', 'Thématiques', 'Ressources', 'Formations', 'Contacts'][index]}
              </NavLink>
            ))}
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
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Menu Mobile */}
      {isMenuOpen && renderMobileMenu()}
    </>
  );
};

export default Header;