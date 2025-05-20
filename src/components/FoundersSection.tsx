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
    role: 'CLERQUE DE NOTAIRE',
    quote: 'Auditrice en Master Droit des Affaireset du Numérique',
    imageUrl: '/murielle.webp'
  },
  {
    name: 'Fidéle DOSSOU',
    role: 'JURISTE CONSULTANT',
    quote: 'Auditeur en Master Droit des Affaires et du Numérique',
    imageUrl: '/fidele.webp'
  },
  {
    name: 'Espérence M. DEGBEY',
    role: 'STAGIAIRE-DPO',
    quote: 'Auditrice en Master Droit Privé Fondamental',
    imageUrl: '/mahuena.webp'
  }
];

const FoundersSection: React.FC = () => {
  return (
    <section id="founders" className="section bg-techjus-light">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Notre équipe</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Découvrez les experts passionnés qui ont créé TechJus pour rendre le droit du numérique accessible à tous.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {founders.map((founder, index) => (
            <MemberCard 
              key={index}
              name={founder.name}
              role={founder.role}
              quote={founder.quote}
              imageUrl={founder.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;