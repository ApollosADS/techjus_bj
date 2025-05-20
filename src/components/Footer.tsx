import React from 'react';
import SocialLinks from './SocialLinks';
import { ExternalLink, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { text: 'Accueil', url: '#' },
    { text: 'À propos', url: '#about' },
    { text: 'Équipe', url: '#founders' },
    { text: 'Valeurs', url: '#rules' },
    { text: 'Contact', url: '#contact' },
    { text: 'Mentions légales', url: '#' },
    { text: 'Politique de confidentialité', url: '#' },
  ];

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <img src="/logo.png" alt="Logo TechJus" className="h-12 mb-4" />
            <p className="mb-4 text-gray-300">
              Une communauté dédiée au droit du numérique, rendant accessible les enjeux juridiques 
              de notre société digitale.
            </p>
            <SocialLinks className="mt-4" />
          </div>
          
          <div>
            <h3 className="text-xl font-heading font-bold mb-4 text-white">Liens rapides</h3>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url} 
                    className="text-gray-300 hover:text-techjus-yellow transition-colors duration-200 flex items-center"
                  >
                    <ExternalLink size={14} className="mr-2" />
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-heading font-bold mb-4 text-white">Restez informé</h3>
            <p className="text-gray-300 mb-4">
              Abonnez-vous à notre newsletter pour recevoir les dernières actualités 
              sur le droit du numérique.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Votre email" 
                className="px-4 py-2 w-full rounded-l-lg focus:outline-none text-gray-900"
              />
              <button className="bg-techjus-red px-4 py-2 rounded-r-lg hover:bg-red-700 transition-colors duration-200 flex items-center">
                <Mail size={18} className="mr-2" />
                S'abonner
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>© {currentYear} TechJus. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;