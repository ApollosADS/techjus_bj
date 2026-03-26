import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  ChevronDown, 
  ChevronUp,
  Newspaper,
  Briefcase,
  BookOpen,
  Home,
  MessageSquare,
  Search
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
  const navigate = useNavigate();
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
    { path: '/actualites', label: 'Actualités', icon: Newspaper },
    { path: '/opportunites', label: 'Opportunités', icon: Briefcase }
  ];

  // Groupes de navigation (avec dropdowns)
  const navGroups: NavGroup[] = [
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

  // Fonction pour gérer le menu
  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    
    // Gestion du défilement du body
    if (newState) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'static';
      document.body.style.width = 'auto';
    }
    
    if (!newState) {
      closeDropdown();
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    closeDropdown();
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
    if (!isMenuOpen) return null;
    
    return (
      <div 
        className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={closeMenu}
      >
        <div 
          className="fixed top-[72px] left-0 right-0 bottom-0 bg-white shadow-xl overflow-y-auto transform transition-transform duration-300 ease-in-out"
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-100">
              <NavLink 
                to="/" 
                className="flex items-center gap-3" 
                onClick={closeMenu}
              >
                <img 
                  src="/logo-techjus.png" 
                  alt="Logo TechJus" 
                  className="h-10 w-auto"
                />
              </NavLink>
            </div>

            <div className="flex-1 overflow-y-auto py-2">
              {/* Pages principales */}
              <div className="space-y-1 px-2 py-3">
                {mainPages.map((page) => (
                  <NavLink
                    key={page.path}
                    to={page.path}
                    end={page.path === '/'}
                    onClick={closeMenu}
                    className={({ isActive }) => 
                      `flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-blue-50 text-techjus-blue' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`
                    }
                  >
                    {page.icon && <page.icon className="mr-3 h-5 w-5 flex-shrink-0" />}
                    {page.label}
                  </NavLink>
                ))}
              </div>

              {/* Groupes avec dropdowns */}
              <div className="space-y-1 px-2 py-3 border-t border-gray-100">
                {navGroups.map((group) => (
                  <div key={group.label} className="space-y-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Empêche la propagation du clic
                        toggleDropdown(group.label);
                      }}
                      className={`w-full text-left py-3 px-4 text-base font-medium flex items-center justify-between rounded-lg ${
                        isGroupActive(group) 
                          ? 'text-techjus-blue bg-blue-50' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        {group.icon && <group.icon className="mr-3 h-5 w-5 flex-shrink-0" />}
                        {group.label}
                      </div>
                      {openDropdown === group.label ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                    
                    {openDropdown === group.label && (
                      <div className="space-y-1 py-2 pl-8">
                        {group.items.map((item) => (
                          <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                              `flex items-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                                isActive
                                  ? 'bg-blue-50 text-techjus-blue'
                                  : 'text-gray-600 hover:bg-gray-50'
                              }`
                            }
                            onClick={(e) => {
                              e.preventDefault();
                              closeDropdown();
                              closeMenu();
                              navigate(item.path);
                            }}
                          >
                            {item.icon && (
                              <item.icon className="mr-3 h-4 w-4 flex-shrink-0" />
                            )}
                            {item.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Page de contact */}
              <div className="px-2 py-3 border-t border-gray-100">
                <NavLink
                  to={contactPage.path}
                  className={({ isActive }) => 
                    `flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-blue-50 text-techjus-blue' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                  onClick={closeMenu}
                >
                  <MessageSquare className="mr-3 h-5 w-5 flex-shrink-0" />
                  {contactPage.label}
                </NavLink>
              </div>
            </div>

            {/* Pied de page mobile */}
            <div className="p-4 border-t border-gray-100 mt-auto">
              <div className="flex justify-center space-x-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-600 hover:text-techjus-blue hover:bg-gray-100 rounded-full transition-colors duration-200"
                    aria-label={link.label}
                  >
                    <link.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
              <p className="mt-4 text-center text-sm text-gray-500">
                {new Date().getFullYear()} TechJus. Tous droits réservés.
              </p>
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
  }, [closeMenu]);

  // Nettoyage des styles au démontage du composant
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'static';
      document.body.style.width = 'auto';
    };
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/70 bg-white/85 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-white/75">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
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
                  <div className="absolute left-0 top-full z-50 mt-2 w-56 rounded-xl border border-slate-200/80 bg-white/95 py-3 shadow-techjus-lg backdrop-blur-md animate-in slide-in-from-top-2 duration-200">
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

            {/* Lien Contact */}
            <NavLink
              to={contactPage.path}
              className={navLinkClasses({ isActive: isActiveLink(contactPage.path) })}
            >
              {contactPage.label}
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