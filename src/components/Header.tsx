import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const navLinks = [
    { text: 'Accueil', url: '#' },
    { text: 'À propos', url: '#about' },
    { text: 'Équipe', url: '#founders' },
    { text: 'Valeurs', url: '#rules' },
    { text: 'Contact', url: '#contact' },
  ];

  const [activeLink, setActiveLink] = useState<string>('#');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => ({
        id: link.url.replace('#', ''),
        element: document.getElementById(link.url.replace('#', '')),
      }));

      for (let section of sections) {
        if (
          section.element &&
          window.scrollY >= section.element.offsetTop - 80 &&
          window.scrollY < section.element.offsetTop + section.element.offsetHeight
        ) {
          setActiveLink(`#${section.id}`);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container-custom py-2 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <img
            src="/logo-techjus.png"
            alt="Logo TechJus"
            className="h-12 w-auto"
          />
          <span className="sr-only">TechJus</span>
        </a>

        {/* Navigation */}
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className={`text-gray-700 font-medium transition-colors duration-200 hover:text-techjus-blue ${
                activeLink === link.url ? 'text-techjus-blue font-semibold underline' : ''
              }`}
              onClick={() => setActiveLink(link.url)}
            >
              {link.text}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
