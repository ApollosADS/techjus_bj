import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  ChevronDown, 
  ChevronUp,
  FileText,
  Newspaper,
  Briefcase,
  Users,
  BookOpen,
  Home,
  Heart,
  MessageSquare,
  Calendar,
  Search,
  Settings
} from 'lucide-react';

interface SocialLink {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
  label: string;
}

interface NavPage {
  path: string;
  label: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface NavGroup {
  label: string;
  items: NavPage[];
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface NavLinkProps {
  isActive: boolean;
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  const location = useLocation();
  // Un ref par dropdown pour éviter les conflits
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Configuration des liens sociaux
  const socialLinks: SocialLink[] = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' }
  ];

  // ===== STRUCTURE DE NAVIGATION =====
  
  // Pages principales (navigation directe)
  const mainPages: NavPage[] = [
    { path: '/', label: 'Accueil', icon: Home },
    { path: '/communaute', label: 'La Communauté', icon: Heart }
  ];

  // Groupes de navigation (avec dropdowns)
  const navGroups: NavGroup[] = [
    {
      label: 'Contenus',
      icon: FileText,
      items: [
        { path: '/thematiques', label: 'Thématiques', icon: Settings },
        { path: '/actualites', label: 'Actualités', icon: Newspaper }
      ]
    },
    {
      label: 'Opportunités',
      icon: Briefcase,
      items: [
        { path: '/annonces', label: 'Annonces', icon: Calendar },
        { path: '/recrutements', label: 'Recrutements', icon: Users }
      ]
    },
    {
      label: 'Ressources',
      icon: BookOpen,
      items: [
        { path: '/formations', label: 'Formations', icon: BookOpen },
        { path: '/resources', label: 'Centre de Ressources', icon: Search }
      ]
    }
  ];

  // Page de contact (action finale, séparée)
  const contactPage: NavPage = { path: '/contact', label: 'Contact', icon: MessageSquare };

  // Classes CSS réutilisables
  const navLinkClasses = ({ isActive }: NavLinkProps) => 
    `relative text-gray-700 font-medium hover:text-techjus-blue transition-all duration-200 py-2 px-3 rounded-lg flex items-center gap-2 ${
      isActive 
        ? 'text-techjus-blue after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-6 after:h-0.5 after:bg-techjus-blue after:rounded-full' 
        : ''
    }`;

  const mobileNavLinkClasses = ({ isActive }: NavLinkProps) =>
    `block py-3 px-4 sm:py-4 sm:px-6 text-base sm:text-lg font-medium border-b border-gray-100 transition-colors flex items-center gap-3 ${
      isActive ? 'text-techjus-blue bg-techjus-light' : 'text-gray-700 hover:bg-gray-50'
    }`;

  // Fonction pour déterminer si un lien est actif
  const isActiveLink = (path: string): boolean => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Fonction pour déterminer si un groupe est actif
  const isGroupActive = (group: NavGroup): boolean => {
    return group.items.some(item => isActiveLink(item.path));
  };

  // Gestion du menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

  // Gestion des dropdowns
  const toggleDropdown = (groupLabel: string) => {
    setOpenDropdown(openDropdown === groupLabel ? null : groupLabel);
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
    setHoveredDropdown(null);
  };

  // Gestion du hover pour les dropdowns
  const handleDropdownHover = (groupLabel: string) => {
    setHoveredDropdown(groupLabel);
  };

  const handleDropdownLeave = () => {
    setHoveredDropdown(null);
  };

  // Fermer le dropdown quand on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Vérifie si un dropdown est ouvert et si le clic est à l'extérieur de ce dropdown
      if (openDropdown && dropdownRefs.current[openDropdown]) {
        if (!dropdownRefs.current[openDropdown]?.contains(event.target as Node)) {
          closeDropdown();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  // Fermer le dropdown quand on change de route
  useEffect(() => {
    closeDropdown();
  }, [location.pathname]);

  // Fonction de rendu du menu mobile
  const renderMobileMenu = (): React.ReactNode => {
    return (
      <div 
        className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" 
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            closeMenu();
          }
        }}
      >
        <div 
          className="fixed top-[72px] left-0 right-0 bg-white shadow-xl border-t border-gray-100 h-[calc(100vh-72px)] overflow-y-auto" 
        >
          <nav className="h-full flex flex-col overflow-y-auto">
            <div className="p-4 border-b border-gray-100">
              <NavLink 
                to="/" 
                className="flex items-center gap-3" 
                onClick={closeMenu}
              >
                <img 
                  src="/logo-techjus.png" 
                  alt="Logo TechJus" 
                  className="h-10 md:h-12 w-auto" 
                />
              </NavLink>
            </div>

            <div className="p-4 space-y-2">
              {/* Pages principales */}
              {mainPages.map((page) => (
                <NavLink
                  key={page.path}
                  to={page.path}
                  end={page.path === '/'}
                  className={mobileNavLinkClasses({ isActive: isActiveLink(page.path) })}
                  onClick={closeMenu}
                >
                  {page.label}
                </NavLink>
              ))}

              {/* Page de contact */}
              <NavLink
                to={contactPage.path}
                className={mobileNavLinkClasses({ isActive: isActiveLink(contactPage.path) })}
                onClick={closeMenu}
              >
                {contactPage.label}
              </NavLink>

              {/* Groupes avec dropdowns */}
              {navGroups.map((group) => (
                <div key={group.label} className="border-b border-gray-100">
                  <button
                    onClick={() => toggleDropdown(group.label)}
                    className={`w-full text-left py-3 px-4 sm:py-4 sm:px-6 text-base sm:text-lg font-medium flex items-center justify-between ${
                      isGroupActive(group) ? 'text-techjus-blue bg-techjus-light' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {group.label}
                    </div>
                    {openDropdown === group.label ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                  
                  {openDropdown === group.label && (
                    <div className="bg-gray-50 border-t border-gray-100">
                      {group.items.map((item) => (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          className={`py-3 px-8 text-sm font-medium transition-colors flex items-center gap-3 ${
                            isActiveLink(item.path) ? 'text-techjus-blue bg-blue-50' : 'text-gray-600 hover:text-techjus-blue hover:bg-gray-100'
                          }`}
                          onClick={() => {
                            // Permettre à la navigation de se déclencher d'abord
                            setTimeout(() => {
                              closeDropdown();
                              closeMenu();
                            }, 0);
                          }}
                        >
                          {item.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-auto p-4 border-t border-gray-100 flex flex-wrap gap-4 justify-center">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  aria-label={link.label}
                >
                  <link.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        closeMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex justify-between items-center">
          {/* Logo */}
          <NavLink 
            to="/" 
            className="flex items-center gap-3" 
          >
            <img 
              src="/logo-techjus.png" 
              alt="Logo TechJus" 
              className="h-10 md:h-12 w-auto" 
            />
          </NavLink>

          {/* Navigation Bureau */}
          <nav className="hidden lg:flex gap-2 items-center">
            {/* Pages principales */}
            {mainPages.map((page) => (
              <NavLink
                key={page.path}
                to={page.path}
                end={page.path === '/'}
                className={navLinkClasses({ isActive: isActiveLink(page.path) })}
              >
                {page.label}
              </NavLink>
            ))}

            {/* Page de contact */}
            <NavLink
              to={contactPage.path}
              className={navLinkClasses({ isActive: isActiveLink(contactPage.path) })}
            >
              {contactPage.label}
            </NavLink>

            {/* Groupes avec dropdowns */}
            {navGroups.map((group) => (
              <div
                key={group.label}
                className="relative"
                ref={el => { dropdownRefs.current[group.label] = el; }}
                onMouseEnter={() => handleDropdownHover(group.label)}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  onClick={() => toggleDropdown(group.label)}
                  className={`relative text-gray-700 font-medium hover:text-techjus-blue transition-all duration-200 py-2 px-3 rounded-lg flex items-center gap-2 ${
                    isGroupActive(group) 
                      ? 'text-techjus-blue after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-6 after:h-0.5 after:bg-techjus-blue after:rounded-full' 
                      : ''
                  }`}
                >
                  {group.label}
                  {openDropdown === group.label ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>

                {/* Dropdown Menu */}
                {(openDropdown === group.label || hoveredDropdown === group.label) && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-3 z-50 animate-in slide-in-from-top-2 duration-200">
                    <div className="px-3 py-2 mb-2 border-b border-gray-100">
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {group.label}
                      </h3>
                    </div>
                    {group.items.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className={`px-4 py-3 text-sm font-medium transition-all duration-200 flex items-center gap-3 rounded-lg mx-2 ${
                          isActiveLink(item.path) 
                            ? 'text-techjus-blue bg-blue-50 shadow-sm' 
                            : 'text-gray-700 hover:text-techjus-blue hover:bg-gray-50'
                        }`}
                        onClick={closeDropdown}
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
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