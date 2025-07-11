import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, ExternalLink, ChevronLeft, ChevronRight, Play, Pause, Info } from 'lucide-react';
import { Annonce } from '../../types/annonce';

interface AnnonceCardProps {
  annonce: Annonce;
  onClick?: () => void;
  onMoreInfo?: () => void;
  isFull?: boolean;
}

const AnnonceCard: React.FC<AnnonceCardProps> = ({ annonce, onClick, onMoreInfo }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);

  // Combiner l'image principale avec les images supplémentaires
  const allImages = [annonce.imageUrl, ...(annonce.images || [])];

  // Auto-play du diaporama
  useEffect(() => {
    if (!isPlaying || allImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying, allImages.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'a_venir': return 'bg-blue-500/90 text-white';
      case 'en_cours': return 'bg-green-500/90 text-white';
      case 'termine': return 'bg-gray-500/90 text-white';
      case 'annule': return 'bg-red-500/90 text-white';
      default: return 'bg-gray-500/90 text-white';
    }
  };

  const getStatusText = (statut: string) => {
    switch (statut) {
      case 'a_venir': return 'À venir';
      case 'en_cours': return 'En cours';
      case 'termine': return 'Terminé';
      case 'annule': return 'Annulé';
      default: return statut;
    }
  };

  const isFull = annonce.capacite && annonce.inscrits && annonce.inscrits >= annonce.capacite;

  return (
    <article
      role="group"
      aria-labelledby={`titre-annonce-${annonce.id}`}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-100 overflow-hidden group"
      onClick={onClick}
    >
      {/* Diaporama d'images */}
      <div 
        className="relative h-52 overflow-hidden"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <img 
          src={allImages[currentImageIndex]} 
          alt={`${annonce.title} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
        />

        {/* Gradient overlay pour améliorer la lisibilité des badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

        {/* Indicateurs de navigation */}
        {allImages.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1.5">
            {allImages.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentImageIndex 
                    ? 'bg-white shadow-lg scale-110' 
                    : 'bg-white/60 hover:bg-white/90'
                }`}
              />
            ))}
          </div>
        )}

        {/* Contrôles du diaporama */}
        {allImages.length > 1 && showControls && (
          <div className="absolute inset-0 flex items-center justify-between p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="bg-black/60 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/80 transition-all duration-200 hover:scale-110"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlayPause();
              }}
              className="bg-black/60 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/80 transition-all duration-200 hover:scale-110"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="bg-black/60 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/80 transition-all duration-200 hover:scale-110"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Badges améliorés */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
          <span className={`text-[11px] font-medium px-2 py-1 rounded-md backdrop-blur-sm ${getStatusColor(annonce.statut)}`}>
            {getStatusText(annonce.statut)}
          </span>
          {annonce.urgent && (
            <span className="text-[11px] font-medium px-2 py-1 rounded-md backdrop-blur-sm bg-red-500/90 text-white animate-pulse">
              Urgent
            </span>
          )}
          {annonce.featured && (
            <span className="text-[11px] font-medium px-2 py-1 rounded-md backdrop-blur-sm bg-yellow-500/90 text-white">
              ⭐ À la une
            </span>
          )}
        </div>

        {/* Compteur d'images amélioré */}
        {allImages.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-md text-[11px] font-medium">
            {currentImageIndex + 1} / {allImages.length}
          </div>
        )}
      </div>

      {/* Contenu avec meilleur espacement */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 
            id={`titre-annonce-${annonce.id}`}
            className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200"
          >
            {annonce.title}
          </h3>
          
          <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
            {annonce.excerpt}
          </p>
        </div>

        {/* Tags avec meilleur espacement */}
        {annonce.tags && annonce.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {annonce.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Informations avec icônes plus espacées */}
        <div className="space-y-2.5">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-3 text-blue-500" />
            <span className="font-medium">
              {new Date(annonce.date).toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-3 text-green-500" />
            <span>{annonce.heure}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-3 text-red-500" />
            <span className="truncate">{annonce.lieu}</span>
          </div>
          
          {annonce.capacite && (
            <div className="flex items-center text-sm text-gray-600">
              <Users className="w-4 h-4 mr-3 text-purple-500" />
              <span>
                {annonce.inscrits || 0} / {annonce.capacite} inscrits
                {isFull && <span className="text-red-500 ml-1 font-medium">(Complet)</span>}
              </span>
            </div>
          )}
        </div>

        {/* Prix avec design amélioré */}
        {annonce.prix && (
          <div className="flex items-center">
            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
              annonce.prix === 'Gratuit' 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-blue-100 text-blue-700 border border-blue-200'
            }`}>
              {annonce.prix === 'Gratuit' ? '🎉' : '💰'} {annonce.prix}
            </span>
          </div>
        )}

        {/* Actions avec meilleur design */}
        <div className="flex gap-3 pt-2">
          {annonce.lienInscription && !isFull && (
            <button 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-xl hover:scale-105 transition-all duration-200 font-medium text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                window.open(annonce.lienInscription, '_blank');
              }}
            >
              <ExternalLink size={14} />
              S'inscrire
            </button>
          )}
          <button 
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 px-4 rounded-xl hover:scale-105 transition-all duration-200 font-medium text-sm border border-gray-200 hover:border-gray-300 flex items-center justify-center gap-2"
            onClick={(e) => {
              e.stopPropagation();
              onMoreInfo?.();
            }}
          >
            <Info size={14} />
            Plus d'infos
          </button>
        </div>
      </div>
    </article>
  );
};

export default AnnonceCard;