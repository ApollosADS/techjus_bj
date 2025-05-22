import React from 'react';
import { Calendar, Clock, User, ExternalLink } from 'lucide-react';

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
  title, description, category, type, author, date, readTime, imageUrl, link
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-techjus-blue text-white px-3 py-1 rounded-full text-xs font-semibold">
            {category}
          </span>
          <span className="bg-techjus-yellow text-white px-3 py-1 rounded-full text-xs font-semibold">
            {type}
          </span>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg font-semibold text-techjus-blue mb-2 group-hover:text-techjus-red transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {description}
          </p>
        </div>

        {/* Métadonnées */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <User size={14} />
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{readTime}</span>
          </div>
        </div>

        {/* Bouton */}
        <a 
          href={link}
          className="inline-flex items-center gap-2 text-sm bg-techjus-blue text-white px-4 py-2 rounded-lg hover:bg-techjus-red transition-colors duration-300"
        >
          Lire la suite <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
};

export default ResourceCard;