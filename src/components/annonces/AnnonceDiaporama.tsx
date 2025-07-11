import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Pause, Download, Fullscreen } from 'lucide-react';
import { Annonce } from '../../types/annonce';

interface AnnonceDiaporamaProps {
  annonce: Annonce;
  isOpen: boolean;
  onClose: () => void;
}

const AnnonceDiaporama: React.FC<AnnonceDiaporamaProps> = ({ annonce, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Combiner l'image principale avec les images supplémentaires
  const allImages = [annonce.imageUrl, ...(annonce.images || [])];

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  }, [allImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Erreur plein écran:', error);
    }
  }, []);

  // Auto-play du diaporama
  useEffect(() => {
    if (!isPlaying || allImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying, allImages.length]);

  // Gestion des touches clavier
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case ' ':
          e.preventDefault();
          togglePlayPause();
          break;
        case 'f':
          toggleFullscreen();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, nextImage, prevImage, togglePlayPause, toggleFullscreen]);

  // Gestion du plein écran
  useEffect(() => {
    if (!isOpen) return;

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [isOpen]);

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = allImages[currentImageIndex];
    link.download = `${annonce.title}-image-${currentImageIndex + 1}.jpg`;
    link.click();
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center">
      {/* Contrôles principaux */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        <button
          onClick={toggleFullscreen}
          className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          title={isFullscreen ? 'Quitter le plein écran' : 'Plein écran'}
        >
          <Fullscreen size={20} />
        </button>
        <button
          onClick={downloadImage}
          className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          title="Télécharger l'image"
        >
          <Download size={20} />
        </button>
        <button
          onClick={onClose}
          className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          title="Fermer"
        >
          <X size={20} />
        </button>
      </div>

      {/* Image principale */}
      <div 
        className="relative max-w-7xl max-h-[90vh] mx-4"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <img 
          src={allImages[currentImageIndex]} 
          alt={`${annonce.title} - Image ${currentImageIndex + 1}`}
          className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
        />

        {/* Navigation gauche/droite */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
              title="Image précédente"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
              title="Image suivante"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Contrôles du diaporama */}
        {allImages.length > 1 && showControls && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-black/50 text-white p-3 rounded-full">
            <button
              onClick={togglePlayPause}
              className="hover:bg-white/20 p-1 rounded transition-colors"
              title={isPlaying ? 'Pause' : 'Lecture'}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            
            <div className="flex items-center gap-2">
              {allImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentImageIndex 
                      ? 'bg-white' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  title={`Image ${index + 1}`}
                />
              ))}
            </div>
            
            <span className="text-sm font-medium">
              {currentImageIndex + 1} / {allImages.length}
            </span>
          </div>
        )}
      </div>

      {/* Informations de l'annonce */}
      <div className="absolute bottom-4 left-4 bg-black/50 text-white p-4 rounded-lg max-w-md">
        <h3 className="text-lg font-bold mb-2">{annonce.title}</h3>
        <p className="text-sm text-gray-300 mb-2">{annonce.excerpt}</p>
        <div className="flex items-center gap-4 text-xs">
          <span>{new Date(annonce.date).toLocaleDateString('fr-FR')}</span>
          <span>{annonce.lieu}</span>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute top-4 left-4 bg-black/50 text-white p-3 rounded-lg text-sm">
        <div className="flex items-center gap-4">
          <span>← → Navigation</span>
          <span>Espace Lecture/Pause</span>
          <span>F Plein écran</span>
          <span>Échap Fermer</span>
        </div>
      </div>
    </div>
  );
};

export default AnnonceDiaporama; 