import React from 'react';
import MemberCard from './MemberCard';

const founders = [
  {
    name: 'Philippe V. DJOKO',
    role: 'JURISTE CONSULTANT',
    quote: 'Master Droit Privé Fondamental',
    imageUrl: '/philippe.webp'
  },
  {
    name: 'Marielle I. KPASSASSI',
    role: 'CLERC DE NOTAIRE',
    quote: 'Auditrice en Master Droit des Affaires et du Numérique',
    imageUrl: '/murielle.webp'
  },
  {
    name: 'Fidèle DOSSOU',
    role: 'JURISTE CONSULTANT',
    quote: 'Auditeur en Master Droit des Affaires et du Numérique',
    imageUrl: '/fidele.webp'
  },
  {
    name: 'Espérance M. DEGBEY',
    role: 'STAGIAIRE-DPO',
    quote: 'Auditrice en Master Droit Privé Fondamental',
    imageUrl: '/mahuena.webp'
  },
  {
    name: 'Ulrich Apollos ADINSI',
    role: 'Developpeur Full Stack',
    quote: 'Technicien en Informatique Industriel et Maintenance',
    imageUrl: '/apollos.webp'
  }
];

const FoundersSection: React.FC = () => {
  // Dupliquer les fondateurs pour un défilement continu
  const duplicatedFounders = [...founders, ...founders];

  return (
    <section id="founders" className="section bg-techjus-light">
      {/* Container principal avec marges uniformes */}
      <div className="w-full px-4 md:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Découvrez notre équipe</h2>
          </div>
          
          {/* Container du carrousel */}
          <div className="relative overflow-hidden w-full">
            <div className="flex animate-scroll-slow">
              {duplicatedFounders.map((founder, index) => (
                <div key={`${founder.name}-${index}`} className="flex-shrink-0 w-80 px-4">
                  <MemberCard 
                    name={founder.name}
                    role={founder.role}
                    quote={founder.quote}
                    imageUrl={founder.imageUrl}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-slow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll-slow {
          animation: scroll-slow 40s linear infinite;
          width: max-content;
        }
        
        .animate-scroll-slow:hover {
          animation-play-state: paused;
        }
        
        /* Responsive pour différentes tailles d'écran */
        @media (max-width: 640px) {
          .animate-scroll-slow {
            animation-duration: 35s;
          }
        }
      `}</style>
    </section>
  );
};

export default FoundersSection;