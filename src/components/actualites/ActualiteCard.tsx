// src/components/actualites/ActualiteCard.jsx
import { Link } from 'react-router-dom';
import Card from '../shared/Card';
import Tag from '../shared/Tag';
import { Actualite } from './types';

const ActualiteCard = ({ actualite }: { actualite: Actualite }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card hover={true} className="h-full flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={actualite.image}
          alt={actualite.titre}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
            {actualite.tempsLecture} min
          </span>
        </div>
      </div>

      {/* Contenu */}
      <div className="flex-1 flex flex-col">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {actualite.tags?.slice(0, 2).map((tag, index) => (
            <Tag key={index} variant={tag} size="xs">
              {tag}
            </Tag>
          ))}
          {actualite.tags && actualite.tags.length > 2 && (
            <Tag variant="default" size="xs">
              +{actualite.tags.length - 2}
            </Tag>
          )}
        </div>

        {/* Titre */}
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 hover:text-techjus-blue transition-colors font-heading">
          <Link to={`/actualites/${actualite.id}`}>
            {actualite.titre}
          </Link>
        </h3>

        {/* Extrait */}
        <p className="text-gray-500 font-body text-sm mb-4 flex-1 line-clamp-3">
          {actualite.extrait}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-500">
            <span>{actualite.auteur}</span>
            <span className="mx-2">•</span>
            <span>{formatDate(actualite.date)}</span>
          </div>
          
          <Link
            to={`/actualites/${actualite.id}`}
            className="inline-flex items-center text-techjus-blue hover:text-techjus-blue/80 font-medium text-sm transition-colors"
          >
            Lire plus
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default ActualiteCard;
