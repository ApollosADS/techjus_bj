import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-gray-700 font-medium hover:text-techjus-blue transition-colors ${
      isActive ? 'text-techjus-blue border-b-2 border-techjus-blue' : ''
    }`;

  const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-3 text-gray-700 font-medium hover:text-techjus-blue hover:bg-gray-50 transition-colors ${
      isActive ? 'text-techjus-blue bg-blue-50 border-l-4 border-techjus-blue' : ''
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 lg:px-8 py-2 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3" onClick={closeMenu}>
          <img 
            src="/logo-techjus.png" 
            alt="Logo TechJus" 
            className="h-10 md:h-12 w-auto" 
          />
          <span className="sr-only">TechJus</span>
        </NavLink>

        {/* Navigation Desktop */}
        <nav className="hidden lg:flex gap-6 items-center">
          <NavLink to="/" end className={navLinkClasses}>
            Accueil
          </NavLink>
          <NavLink to="/presentation" className={navLinkClasses}>
            Présentation
          </NavLink>
          <NavLink to="/resources" className={navLinkClasses}>
            Ressources
          </NavLink>
          <NavLink to="/thematiques" className={navLinkClasses}>
            Thématiques
          </NavLink>
          <NavLink to="/formations" className={navLinkClasses}>
            Formations
          </NavLink>
          <NavLink to="/#contact" className={navLinkClasses}>
            Contact
          </NavLink>
        </nav>

        {/* Bouton Menu Mobile */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-700" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Menu Mobile */}
      <div
        className={`lg:hidden bg-white border-t border-gray-200 transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? 'max-h-96 opacity-100 visible'
            : 'max-h-0 opacity-0 invisible overflow-hidden'
        }`}
      >
        <nav className="py-2">
          <NavLink 
            to="/" 
            end 
            className={mobileNavLinkClasses}
            onClick={closeMenu}
          >
            Accueil
          </NavLink>
          <NavLink 
            to="/presentation" 
            className={mobileNavLinkClasses}
            onClick={closeMenu}
          >
            Présentation
          </NavLink>
          <NavLink 
            to="/resources" 
            className={mobileNavLinkClasses}
            onClick={closeMenu}
          >
            Ressources
          </NavLink>
          <NavLink 
            to="/thematiques" 
            className={mobileNavLinkClasses}
            onClick={closeMenu}
          >
            Thématiques
          </NavLink>
          <NavLink 
            to="/formations" 
            className={mobileNavLinkClasses}
            onClick={closeMenu}
          >
            Formations
          </NavLink>
          <NavLink 
            to="/#contact" 
            className={mobileNavLinkClasses}
            onClick={closeMenu}
          >
            Contact
          </NavLink>
        </nav>
      </div>

      {/* Overlay pour fermer le menu */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={closeMenu}
        />
      )}
    </header>
  );
};

export default Header;