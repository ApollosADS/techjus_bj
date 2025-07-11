import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, ExternalLink, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Annonce {
  id: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  heure: string;
  lieu: string;
  type: string;
  organisateur: string;
  tags?: string[];
  lienInscription?: string;
  featured?: boolean;
}

interface AnnoncePopupProps {
  annonce: Annonce | null;
  isOpen: boolean;
  onClose: () => void;
}

const AnnoncePopup: React.FC<AnnoncePopupProps> = ({ annonce, isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => setIsVisible(true), 50);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = 'unset';
      };
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !annonce) return null;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const handleViewAll = () => {
    onClose();
    navigate('/annonces');
  };

  const handleInscription = () => {
    if (annonce.lienInscription) {
      window.open(annonce.lienInscription, '_blank');
    }
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-2xl lg:max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden transform transition-all duration-500 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-techjus-blue to-techjus-purple text-white p-4 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={18} className="sm:w-5 sm:h-5" />
          </button>
          
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-1.5 sm:p-2 bg-white/20 rounded-lg sm:rounded-xl">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-xs sm:text-sm font-semibold bg-white/20 px-2 py-1 sm:px-4 sm:py-2 rounded-full">
              Événement à la une
            </span>
          </div>
          
          <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 text-white drop-shadow-lg leading-tight">
            {annonce.title}
          </h2>
          <p className="text-sm sm:text-lg text-white/90 leading-relaxed">
            {annonce.excerpt}
          </p>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(95vh-200px)] sm:max-h-[calc(90vh-200px)]">
          {/* Info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-blue-100">
              <div className="flex items-center gap-2 sm:gap-3">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Date</p>
                  <p className="text-sm sm:text-base font-semibold">{formatDate(annonce.date)}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-purple-100">
              <div className="flex items-center gap-2 sm:gap-3">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Heure</p>
                  <p className="text-sm sm:text-base font-semibold">{annonce.heure}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-green-100">
              <div className="flex items-center gap-2 sm:gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Lieu</p>
                  <p className="text-sm sm:text-base font-semibold">{annonce.lieu}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-orange-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-orange-100">
              <div className="flex items-center gap-2 sm:gap-3">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Organisateur</p>
                  <p className="text-sm sm:text-base font-semibold">{annonce.organisateur}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Description</h3>
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg sm:rounded-xl">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {annonce.description.length > 300 
                  ? `${annonce.description.substring(0, 300)}...` 
                  : annonce.description
                }
              </p>
            </div>
          </div>

          {/* Tags */}
          {annonce.tags && annonce.tags.length > 0 && (
            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Tags</h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {annonce.tags.slice(0, 4).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 sm:px-3 sm:py-1 bg-blue-100 text-blue-800 text-xs sm:text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            {annonce.lienInscription && (
              <button 
                onClick={handleInscription}
                className="flex-1 bg-gradient-to-r from-techjus-blue to-techjus-purple text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-techjus-blue/90 hover:to-techjus-purple/90 transition-all text-sm sm:text-base"
              >
                <ExternalLink size={16} className="sm:w-[18px] sm:h-[18px]" />
                S'inscrire maintenant
              </button>
            )}
            
            <button 
              onClick={handleViewAll}
              className="flex-1 bg-gray-100 text-gray-700 py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors text-sm sm:text-base"
            >
              <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
              Voir tous les événements
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnoncePopup; 