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

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">
            {category}
          </span>
          <span className="bg-gray-600 text-white px-2 py-1 rounded text-sm">
            {type}
          </span>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-900">
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
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            <ExternalLink size={16} />
            Lire la suite
          </a>
          <button
            onClick={handleContactClick}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
          >
            Nous contacter
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;