import React from 'react';
import { Twitter, Linkedin, Youtube, Facebook } from 'lucide-react';

interface SocialLinksProps {
  className?: string;
  iconSize?: number;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ className = '', iconSize = 20 }) => {
  const socialMedia = [
    {
      name: 'LinkedIn',
      icon: <Linkedin size={iconSize} />,
      url: 'https://linkedin.com/',
      ariaLabel: 'Visitez notre page LinkedIn'
    },
    {
      name: 'Twitter',
      icon: <Twitter size={iconSize} />,
      url: 'https://twitter.com/',
      ariaLabel: 'Suivez-nous sur Twitter'
    },
    {
      name: 'Facebook',
      icon: <Facebook size={iconSize} />,
      url: 'https://facebook.com/',
      ariaLabel: 'Rejoignez notre page Facebook'
    },
    {
      name: 'YouTube',
      icon: <Youtube size={iconSize} />,
      url: 'https://youtube.com/',
      ariaLabel: 'Découvrez notre chaîne YouTube'
    }
  ];

  return (
    <div className={`flex space-x-4 ${className}`}>
      {socialMedia.map((social, index) => (
        <a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.ariaLabel}
          className="text-gray-600 hover:text-techjus-blue transition-colors duration-200"
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;