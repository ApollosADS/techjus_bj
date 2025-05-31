import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

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
  
  const footerLinks = [
    { text: 'Accueil', url: '/' },
    { text: 'Présentation', url: '/presentation' },
    { text: 'Thématiques', url: '/thematiques' },
    { text: 'Ressources', url: '/resources' },
    { text: 'Formations', url: '/Formations' },
    { text: 'Contact', url: '/contact' },
    { text: 'Mentions légales', url: '/mentions-legales' },
    { text: 'Politique de confidentialité', url: '/politique-confidentialite' },
  ];

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
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ligne de séparation et copyright */}
        <div className="pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-lg">
            © {currentYear} <span className="text-400 font-semibold">TechJus</span> - Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;