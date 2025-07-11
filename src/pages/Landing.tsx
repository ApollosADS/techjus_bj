import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import FoundersSection from '../components/FoundersSection';
import RulesSection from '../components/RulesSection';
import ContactForm from '../components/ContactForm';
import AnnoncePopup from '../components/AnnoncePopup';
import { usePopup } from '../hooks/usePopup';

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

const Landing: React.FC = () => {
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  
  // Charger les annonces
  useEffect(() => {
    import('../data/annonces.json').then((data) => {
      const adaptedData: Annonce[] = data.default.map((item: {
        id: string;
        title: string;
        description: string;
        excerpt: string;
        date: string;
        heureDebut?: string;
        lieu: string;
        type: string;
        organisateur: string;
        tags?: Array<{ name: string } | string>;
        lienInscription?: string;
        featured?: boolean;
      }) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        excerpt: item.excerpt,
        date: item.date,
        heure: item.heureDebut || '14:00',
        lieu: item.lieu,
        type: item.type,
        organisateur: item.organisateur,
        tags: Array.isArray(item.tags) 
          ? item.tags.map((tag) => 
              typeof tag === 'object' && tag && 'name' in tag ? tag.name : String(tag || '')
            )
          : [],
        lienInscription: item.lienInscription,
        featured: item.featured
      }));
      
      setAnnonces(adaptedData);
    });
  }, []);

  // Hook pour gérer le popup
  const { isOpen, selectedAnnonce, closePopup } = usePopup(annonces);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <AboutSection />
      <FoundersSection />
      <RulesSection />
      <ContactForm />
      
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