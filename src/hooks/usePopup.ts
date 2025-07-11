import { useState, useEffect } from 'react';

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

export const usePopup = (annonces: Annonce[]) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAnnonce, setSelectedAnnonce] = useState<Annonce | null>(null);

  useEffect(() => {
    // Trouver une annonce mise en avant
    const featuredAnnonce = annonces.find(annonce => annonce.featured);
    
    if (!featuredAnnonce) {
      return;
    }

    // Afficher le popup après 1 seconde à chaque actualisation
    const timer = setTimeout(() => {
      setSelectedAnnonce(featuredAnnonce);
      setIsOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [annonces]);

  const closePopup = () => {
    setIsOpen(false);
    setSelectedAnnonce(null);
  };

  return {
    isOpen,
    selectedAnnonce,
    closePopup
  };
}; 