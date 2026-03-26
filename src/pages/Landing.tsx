import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import FoundersSection from '../components/FoundersSection';
import RulesSection from '../components/RulesSection';
import AnnoncePopup from '../components/AnnoncePopup';
import CommunityHero from '../components/community/CommunityHero';
import CommunityGoals from '../components/community/CommunityGoals';
import CommunityTarget from '../components/community/CommunityTarget';
import CommunityCTA from '../components/community/CommunityCTA';
import TrustPartners from '../components/community/TrustPartners';
import ScrollReveal from '../components/shared/ScrollReveal';
import { usePopup } from '../hooks/usePopup';

// Utilisation de l'interface Annonce depuis usePopup
import type { Annonce } from '../hooks/usePopup';

// Type pour les tags qui peuvent être soit un objet avec une propriété name, soit une chaîne
type TagType = { name: string } | string;

// Interface pour les données JSON brutes
interface AnnonceJson {
  id: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  dateDebut: string;
  dateFin: string;
  heureDebut: string;
  heureFin: string;
  lieu: string;
  type: string;
  organisateur: string;
  tags: TagType[];
  lienInscription?: string;
  featured?: boolean;
  /** Optionnel dans le JSON : défaut appliqué au mapping */
  statut?: 'en_cours' | 'a_venir' | 'termine' | 'annule';
  imageUrl?: string;
  images?: string[];
  /** Bannière uniquement pour le popup (Landing) */
  popupBannerUrl?: string;
  dateLabel?: string;
  heureLabel?: string;
  urgent?: boolean;
  partenaires?: string[];
  prix?: string;
  capacite?: number;
  inscrits?: number;
  updatedAt?: string;
}

const Landing: React.FC = () => {
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  
  // Charger les annonces
  useEffect(() => {
    import('../data/annonces.json').then((module) => {
      const rows = module.default as AnnonceJson[];
      const statutPopup = (s: AnnonceJson['statut']): Annonce['statut'] =>
        s === 'en_cours' || s === 'a_venir' || s === 'termine' || s === 'annule'
          ? s
          : 'a_venir';

      const adaptedData: Annonce[] = rows.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        excerpt: item.excerpt,
        date: item.date,
        heure: item.heureDebut || '14:00',
        dateLabel: item.dateLabel,
        heureLabel: item.heureLabel,
        lieu: item.lieu,
        type: item.type,
        organisateur: item.organisateur,
        tags: (item.tags || []).map((tag: TagType) => 
          typeof tag === 'object' ? tag.name : String(tag || '')
        ),
        lienInscription: item.lienInscription,
        featured: item.featured,
        imageUrl: item.imageUrl,
        popupBannerUrl: item.popupBannerUrl,
        statut: statutPopup(item.statut)
      }));
      
      setAnnonces(adaptedData);
    }).catch(error => {
      console.error('Erreur lors du chargement des annonces:', error);
    });
  }, []);

  // Hook pour gérer le popup
  const { isOpen, selectedAnnonce, closePopup } = usePopup(annonces);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <HeroSection />

      {/* Section Communauté */}
      <ScrollReveal>
        <CommunityHero />
      </ScrollReveal>
      <ScrollReveal>
        <CommunityTarget />
      </ScrollReveal>
      <ScrollReveal>
        <CommunityGoals />
      </ScrollReveal>
      <ScrollReveal>
        <TrustPartners />
      </ScrollReveal>

      <ScrollReveal>
        <FoundersSection />
      </ScrollReveal>
      <ScrollReveal>
        <RulesSection />
      </ScrollReveal>

      <ScrollReveal>
        <CommunityCTA />
      </ScrollReveal>
      
      {/* Popup d'annonce */}
      <AnnoncePopup
        annonce={selectedAnnonce}
        isOpen={isOpen}
        onClose={closePopup}
      />
    </div>
  );
};

export default Landing;
