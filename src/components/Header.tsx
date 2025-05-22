import React from 'react';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container-custom py-2 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3">
          <img
            src="/logo-techjus.png"
            alt="Logo TechJus"
            className="h-12 w-auto"
          />
          <span className="sr-only">TechJus</span>
        </NavLink>

        {/* Navigation */}
        <nav className="hidden md:flex gap-6 items-center relative">
          <NavLink 
            to="/" 
            end
            className={({ isActive }) => 
              `text-gray-700 font-medium hover:text-techjus-blue transition-colors ${
                isActive ? 'text-techjus-blue border-b-2 border-techjus-blue' : ''
              }`
            }
          >
            Accueil
          </NavLink>
          
          <NavLink 
            to="/presentation" 
            className={({ isActive }) => 
              `text-gray-700 font-medium hover:text-techjus-blue transition-colors ${
                isActive ? 'text-techjus-blue border-b-2 border-techjus-blue' : ''
              }`
            }
          >
            Présentation
          </NavLink>
          
          <NavLink 
            to="/resources" 
            className={({ isActive }) => 
              `text-gray-700 font-medium hover:text-techjus-blue transition-colors ${
                isActive ? 'text-techjus-blue border-b-2 border-techjus-blue' : ''
              }`
            }
          >
            Ressources
          </NavLink>
          
          <NavLink 
            to="/thematiques" 
            className={({ isActive }) => 
              `text-gray-700 font-medium hover:text-techjus-blue transition-colors ${
                isActive ? 'text-techjus-blue border-b-2 border-techjus-blue' : ''
              }`
            }
          >
            Thématiques
          </NavLink>
          
          <NavLink 
            to="/Formations" 
            className={({ isActive }) => 
              `text-gray-700 font-medium hover:text-techjus-blue transition-colors ${
                isActive ? 'text-techjus-blue border-b-2 border-techjus-blue' : ''
              }`
            }
          >
            Formations
          </NavLink>
          
          <NavLink 
            to="/#contact" 
            className={({ isActive }) => 
              `text-gray-700 font-medium hover:text-techjus-blue transition-colors ${
                isActive ? 'text-techjus-blue border-b-2 border-techjus-blue' : ''
              }`
            }
          >
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;