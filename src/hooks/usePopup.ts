import { useState, useEffect } from 'react';

export interface Annonce {
  id: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  heure: string;
  dateLabel?: string;
  heureLabel?: string;
  lieu: string;
  type: string;
  organisateur: string;
  tags?: string[];
  lienInscription?: string;
  featured?: boolean;
  /** Image principale (cartes, page annonces) */
  imageUrl?: string;
  /** Bannière haute du popup d'accueil (si défini, prioritaire sur imageUrl) */
  popupBannerUrl?: string;
  statut: 'en_cours' | 'a_venir' | 'termine' | 'annule';
}

export const usePopup = (annonces: Annonce[]) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAnnonce, setSelectedAnnonce] = useState<Annonce | null>(null);

  useEffect(() => {
    // Calcul dynamique du statut pour chaque annonce
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const annoncesDyn = annonces.map(annonce => {
      const dateDebut = new Date(annonce.date);
      dateDebut.setHours(0, 0, 0, 0);
      let statut: 'a_venir' | 'en_cours' | 'termine' | 'annule' = 'a_venir';
      if (dateDebut < today) {
        statut = 'termine';
      } else if (dateDebut.getTime() === today.getTime()) {
        statut = 'en_cours';
      } else if (dateDebut > today) {
        statut = 'a_venir';
      }
      return { ...annonce, statut };
    });
    // Filtrer les annonces selon le statut dynamique
    const annoncesEnCours = annoncesDyn.filter(annonce => annonce.statut === 'en_cours');
    const annoncesAVenir = annoncesDyn
      .filter(annonce => annonce.statut === 'a_venir')
      .sort((a, b) => {
        const featuredDiff = Number(!!b.featured) - Number(!!a.featured);
        if (featuredDiff !== 0) return featuredDiff;
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
    let annonceToShow: Annonce | null = null;
    if (annoncesEnCours.length > 0) {
      annonceToShow = annoncesEnCours[0];
    } else if (annoncesAVenir.length > 0) {
      annonceToShow = annoncesAVenir[0];
    }
    if (!annonceToShow) {
      return;
    }
    // Afficher le popup après 1 seconde à chaque actualisation
    const timer = setTimeout(() => {
      setSelectedAnnonce(annonceToShow);
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