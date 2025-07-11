import React, { useState } from 'react';
import { Calendar, Clock, User, ExternalLink } from 'lucide-react';
import { Navigate } from 'react-router-dom';

interface ResourceCardProps {
  title: string;
  description: string;
  category: string;
  type: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
  link: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  title, 
  description, 
  category, 
  type, 
  author, 
  date, 
  readTime, 
  imageUrl, 
  link 
}) => {
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const handleContactClick = () => {
    setShouldNavigate(true);
  };

  if (shouldNavigate) {
    return <Navigate to="/contact" replace />;
  }

  const getTypeColor = () => {
    switch (type) {
      case 'Guide': return 'bg-techjus-blue text-white';
      case 'Article': return 'bg-techjus-green text-white';
      case 'Étude de cas': return 'bg-techjus-purple text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-techjus overflow-hidden hover:shadow-techjus-lg transition-all duration-300">
      {/* Image */}
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`px-2 py-1 rounded text-sm font-medium ${getTypeColor()}`}>
            {type}
          </span>
          <span className="bg-techjus-gray-600 text-white px-2 py-1 rounded text-sm">
            {category}
          </span>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-heading font-semibold mb-2 text-gray-900">
            {title}
          </h3>
          <p className="text-gray-600 text-sm">
            {description}
          </p>
        </div>

        {/* Métadonnées */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <User size={16} />
            {author}
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            {date}
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            {readTime}
          </div>
        </div>

        {/* Boutons */}
        <div className="flex gap-2">
          <a 
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-techjus-blue text-white px-4 py-2 rounded hover:bg-techjus-blue-dark transition-colors"
          >
            <ExternalLink size={16} />
            Lire la suite
          </a>
          <button
            onClick={handleContactClick}
            className="bg-techjus-gray-600 text-white px-4 py-2 rounded hover:bg-techjus-gray-700 transition-colors"
          >
            Nous contacter
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;