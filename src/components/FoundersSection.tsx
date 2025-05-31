import React from 'react';
import MemberCard from './MemberCard';

const founders = [
  {
    name: 'Philippe V. DJOKO',
    role: 'JURISTE CONSULTANT',
    quote: 'Master Droit Privé Fondamental',
    imageUrl: '/philippe.webp',
    fallbackUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
  },
  {
    name: 'Marielle I. KPASSASSI',
    role: 'CLERC DE NOTAIRE',
    quote: 'Auditrice en Master Droit des Affaires et du Numérique',
    imageUrl: '/murielle.webp',
    fallbackUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face'
  },
  {
    name: 'Fidèle DOSSOU',
    role: 'JURISTE CONSULTANT',
    quote: 'Auditeur en Master Droit des Affaires et du Numérique',
    imageUrl: '/fidele.webp',
    fallbackUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
  },
  {
    name: 'Espérance M. DEGBEY',
    role: 'STAGIAIRE-DPO',
    quote: 'Auditrice en Master Droit Privé Fondamental',
    imageUrl: '/mahuena.webp',
    fallbackUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'
  },
  {
    name: 'Ulrich Apollos ADINSI',
    role: 'Developpeur Full Stack',
    quote: 'Technicien en Informatique Industriel et Maintenance',
    imageUrl: '/apollos.webp',
    fallbackUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face'
  }
];

const FoundersSection: React.FC = () => {
  // Dupliquer les fondateurs pour un défilement continu
  const duplicatedFounders = [...founders, ...founders];

  const scrollKeyframes = `
    @keyframes scroll-slow {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }
  `;

  const scrollStyles = {
    animation: 'scroll-slow 40s linear infinite',
    width: 'max-content',
  };

  return (
    <section id="founders" className="section bg-techjus-light">
      <style dangerouslySetInnerHTML={{ __html: scrollKeyframes }} />
      
      {/* Container principal avec marges uniformes */}
      <div className="w-full px-4 md:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Découvrez notre équipe</h2>
          </div>
          
          {/* Container du carrousel */}
          <div className="relative overflow-hidden w-full">
            <div 
              className="flex hover:animation-pause"
              style={scrollStyles}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.animationPlayState = 'paused';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.animationPlayState = 'running';
              }}
            >
              {duplicatedFounders.map((founder, index) => (
                <div key={`${founder.name}-${index}`} className="flex-shrink-0 w-96 px-4">
                  <MemberCard 
                    name={founder.name}
                    role={founder.role}
                    quote={founder.quote}
                    imageUrl={founder.imageUrl}
                    fallbackUrl={founder.fallbackUrl}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;