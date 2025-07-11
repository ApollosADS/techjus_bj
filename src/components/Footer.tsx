<<<<<<< HEAD
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, ChevronDown, ChevronUp } from 'lucide-react';
=======
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
>>>>>>> 03165f1a4a7f6e93679023d749bd62bab0652d35

const SocialLinks: React.FC<{ className?: string }> = ({ className = '' }) => {
  const socialLinks = [
    { icon: <Facebook size={20} />, url: '#', label: 'Facebook' },
    { icon: <Twitter size={20} />, url: '#', label: 'Twitter' },
    { icon: <Linkedin size={20} />, url: '#', label: 'LinkedIn' },
    { icon: <Instagram size={20} />, url: '#', label: 'Instagram' },
  ];

  return (
    <div className={`flex space-x-4 ${className}`}>
      {socialLinks.map((social, index) => (
        <a
          key={index}
          href={social.url}
          aria-label={social.label}
          className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 p-2 bg-gray-700 rounded-full hover:bg-gray-600"
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
};

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
<<<<<<< HEAD
  // Structure de navigation conforme au header
  const mainLinks = [
    { text: 'Accueil', url: '/' },
    { text: 'La Communauté', url: '/communaute' },
    { text: 'Contact', url: '/contact' },
  ];

  const navGroups = [
    {
      label: 'Contenus',
      links: [
        { text: 'Thématiques', url: '/thematiques' },
        { text: 'Actualités', url: '/actualites' },
      ]
    },
    {
      label: 'Opportunités',
      links: [
        { text: 'Annonces', url: '/annonces' },
        { text: 'Recrutements', url: '/recrutements' },
      ]
    },
    {
      label: 'Ressources',
      links: [
        { text: 'Formations', url: '/formations' },
        { text: 'Centre de Ressources', url: '/resources' },
      ]
    }
  ];

  // État pour gérer l'ouverture des dropdowns (conforme au header)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

=======
  const footerLinks = [
    { text: 'Accueil', url: '/' },
    { text: 'Présentation', url: '/presentation' },
    { text: 'Thématiques', url: '/thematiques' },
    { text: 'Ressources', url: '/resources' },
    { text: 'Formations', url: '/Formations' },
    { text: 'Contact', url: '/contact' },
    //{ text: 'Mentions légales', url: '/mentions-legales' },
    //{ text: 'Politique de confidentialité', url: '/politique-confidentialite' },
  ];

>>>>>>> 03165f1a4a7f6e93679023d749bd62bab0652d35
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
          
          {/* Section À propos avec logo */}
          <div>
            <div className="flex items-center mb-6">
              <img
                src="/logo.png"
                alt="Logo TechJus"
                className="h-12 w-auto mr-3"
              />
            </div>
            <p className="mb-6 text-gray-300 text-lg leading-relaxed">
              Une plateforme dédiée au droit du numérique !
            </p>
            <div>
              <h4 className="text-lg font-bold mb-4 text-white">Suivez-nous</h4>
              <SocialLinks />
            </div>
          </div>

<<<<<<< HEAD
          {/* Section Navigation */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">Navigation</h3>
            
            {/* Pages principales */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3 text-white">Pages principales</h4>
              <div className="space-y-2">
                {mainLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.url}
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 block py-1"
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>

            {/* Groupes de navigation avec style conforme au header */}
            <div className="space-y-3">
              {navGroups.map((group) => (
                <div key={group.label} className="border-b border-gray-700 pb-2">
                  <button
                    onClick={() => toggleDropdown(group.label)}
                    className="w-full text-left py-3 px-4 text-lg font-medium flex items-center justify-between text-white hover:text-yellow-400 transition-all duration-200 rounded-lg hover:bg-gray-700"
                    aria-expanded={openDropdown === group.label}
                  >
                    <span>{group.label}</span>
                    {openDropdown === group.label ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                  
                  {openDropdown === group.label && (
                    <div className="bg-gray-700 rounded-lg mt-2 py-2">
                      {group.links.map((link, linkIdx) => (
                        <Link
                          key={linkIdx}
                          to={link.url}
                          className="block py-2 px-6 text-gray-300 hover:text-yellow-400 hover:bg-gray-600 transition-all duration-200 rounded-lg mx-2"
                        >
                          {link.text}
                        </Link>
                      ))}
                    </div>
=======
          {/* Section Liens rapides */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">Liens rapides</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {footerLinks.map((link, index) => (
                <div key={index}>
                  {link.url.startsWith('#') ? (
                    <a
                      href={link.url}
                      className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 block py-2 px-3 rounded-lg hover:bg-gray-700"
                    >
                      {link.text}
                    </a>
                  ) : (
                    <Link
                      to={link.url}
                      className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 block py-2 px-3 rounded-lg hover:bg-gray-700"
                    >
                      {link.text}
                    </Link>
>>>>>>> 03165f1a4a7f6e93679023d749bd62bab0652d35
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ligne de séparation et copyright */}
        <div className="pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-lg">
<<<<<<< HEAD
            © {currentYear} <span className="text-yellow-400 font-semibold">TechJus</span> - Tous droits réservés.
=======
            © {currentYear} <span className="text-400 font-semibold">TechJus</span> - Tous droits réservés.
>>>>>>> 03165f1a4a7f6e93679023d749bd62bab0652d35
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;