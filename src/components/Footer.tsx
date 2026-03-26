import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, ChevronUp, ChevronDown } from 'lucide-react';

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
          className="rounded-full bg-slate-800 p-2 text-slate-200 transition-colors duration-200 hover:bg-slate-700 hover:text-amber-300"
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
};

const Footer: React.FC = () => {
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const [isClient, setIsClient] = React.useState(false);
  
  React.useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Structure de navigation conforme au header
  const mainLinks = [
    { text: 'Accueil', url: '/' },
    { text: 'Actualités', url: '/actualites' },
    { text: 'Opportunités', url: '/opportunites' },
  ];

  const navGroups = [
    {
      label: 'Ressources',
      links: [
        { text: 'Formations', url: '/formations' },
        { text: 'Centre de Ressources', url: '/resources' },
      ]
    }
  ];

  // Liens secondaires
  const secondaryLinks = [
    { text: 'Contact', url: '/contact' },
    { text: 'Mentions légales', url: '/mentions-legales' },
    { text: 'Politique de confidentialité', url: '/confidentialite' }
  ];
  
  const currentYear = new Date().getFullYear();

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <footer className="relative border-t border-techjus-blue/50 bg-slate-900 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 py-10 text-slate-100 md:py-14 [&_h4]:!text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(0,93,164,0.18),transparent)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" aria-hidden />
      <div className="relative z-[1] mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Section À propos avec logo */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img
                src="/logo-techjus.png"
                alt="Logo TechJus"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-base leading-relaxed text-slate-300 md:text-lg">
              Une plateforme dédiée au droit du numérique !
            </p>
            <div className="pt-2">
              <h4 className="mb-3 text-base font-bold !text-white md:text-lg">Suivez-nous</h4>
              <SocialLinks className="flex space-x-3" />
            </div>
          </div>

          {/* Section Navigation */}
          <div className="space-y-6 md:space-y-8">
            {/* Pages principales - Version mobile avec accordéon */}
            <div className="md:hidden">
              <button
                onClick={() => toggleDropdown('main')}
                className="flex w-full items-center justify-between rounded-lg bg-slate-800 px-4 py-3 text-left text-base font-medium text-white"
              >
                <span>Navigation</span>
                {openDropdown === 'main' ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
              
              {(openDropdown === 'main' || (isClient && window.innerWidth >= 768)) && (
                <div className="mt-2 space-y-2 pl-4">
                  {mainLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.url}
                      className="block rounded-md px-3 py-2 text-slate-300 transition-colors duration-200 hover:bg-slate-800 hover:text-amber-300"
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Pages principales - Version desktop */}
            <div className="hidden md:block">
              <h4 className="mb-4 text-lg font-semibold !text-white">Navigation</h4>
              <div className="space-y-2">
                {mainLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.url}
                    className="block rounded-md px-3 py-2 text-slate-300 transition-colors duration-200 hover:bg-slate-800 hover:text-amber-300"
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>

            {/* Groupes de navigation avec accordéon sur mobile */}
            <div className="space-y-4">
              {navGroups.map((group) => (
                <div key={group.label} className="border-b border-slate-700/80 pb-2">
                  <button
                    type="button"
                    onClick={() => toggleDropdown(group.label)}
                    className="flex w-full items-center justify-between rounded-lg bg-slate-800 px-4 py-3 text-left text-base font-medium text-white md:mb-2 md:bg-transparent md:p-0"
                  >
                    <span>{group.label}</span>
                    <ChevronDown 
                      className={`h-5 w-5 md:hidden transition-transform duration-200 ${
                        openDropdown === group.label ? 'transform rotate-180' : ''
                      }`} 
                    />
                  </button>
                  
                  <div 
                    className={`${openDropdown === group.label || (isClient && window.innerWidth >= 768) ? 'block' : 'hidden'} md:block`}
                  >
                    <div className="mt-2 space-y-2 pl-4 md:pl-0">
                      {group.links.map((link, linkIdx) => (
                        <Link
                          key={linkIdx}
                          to={link.url}
                          className="block rounded-md px-3 py-2 text-sm text-slate-300 transition-colors duration-200 hover:bg-slate-800 hover:text-amber-300"
                        >
                          {link.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ligne de séparation et copyright */}
        <div className="mt-12 border-t border-slate-700/80 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-slate-400 md:text-left">
              © {currentYear}{' '}
              <span className="font-semibold text-amber-400">TechJus</span> — Tous droits réservés.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {secondaryLinks.map((link, index) => (
                <Link 
                  key={index} 
                  to={link.url}
                  className="whitespace-nowrap text-xs text-slate-400 transition-colors hover:text-amber-300 sm:text-sm"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;