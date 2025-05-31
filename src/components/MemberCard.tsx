import React, { useState } from 'react';

interface MemberCardProps {
  name: string;
  role: string;
  quote: string;
  imageUrl: string;
  fallbackUrl?: string;
}

const MemberCard: React.FC<MemberCardProps> = ({ 
  name, 
  role, 
  quote, 
  imageUrl, 
  fallbackUrl 
}) => {
  const [imgSrc, setImgSrc] = useState(imageUrl);
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (!hasError && fallbackUrl) {
      setImgSrc(fallbackUrl);
      setHasError(true);
    } else if (!hasError) {
      // Si pas de fallbackUrl, utiliser une image par défaut
      setImgSrc('https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=400&fit=crop&crop=face');
      setHasError(true);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 h-full hover:shadow-xl transition-shadow duration-300 min-h-[320px]">
      <div className="text-center">
        <div className="relative mb-8">
          <img
            src={imgSrc}
            alt={`Portrait de ${name}`}
            className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-techjus-blue shadow-md"
            onError={handleImageError}
            loading="lazy"
          />
          {hasError && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
              Image temporaire
            </div>
          )}
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-3">{name}</h3>
        <p className="text-techjus-blue font-semibold mb-4 text-base">{role}</p>
        <p className="text-gray-600 text-sm leading-relaxed">{quote}</p>
      </div>
    </div>
  );
};

export default MemberCard;