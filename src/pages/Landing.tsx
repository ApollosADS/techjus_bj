<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======
import React from 'react';
>>>>>>> 03165f1a4a7f6e93679023d749bd62bab0652d35
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import FoundersSection from '../components/FoundersSection';
import RulesSection from '../components/RulesSection';
import ContactForm from '../components/ContactForm';
<<<<<<< HEAD
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

=======
// Footer retiré car déjà inclus dans ContactForm

const Landing: React.FC = () => {
>>>>>>> 03165f1a4a7f6e93679023d749bd62bab0652d35
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <AboutSection />
      <FoundersSection />
      <RulesSection />
      <ContactForm />
<<<<<<< HEAD
      
      {/* Popup d'annonce */}
      <AnnoncePopup
        annonce={selectedAnnonce}
        isOpen={isOpen}
        onClose={closePopup}
      />
=======
      {/* Footer supprimé car déjà dans ContactForm */}
>>>>>>> 03165f1a4a7f6e93679023d749bd62bab0652d35
    </div>
  );
};

export default Landing;