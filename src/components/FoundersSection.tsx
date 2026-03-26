import React from 'react';
import MemberCard from './MemberCard';

const founders = [
  {
    name: 'Philippe V. DJOKO',
    role: 'JURISTE CONSULTANT',
    quote: 'Master Droit Privé Fondamental',
    imageUrl: '/philippe.webp',
    fallbackUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Marielle I. KPASSASSI',
    role: 'CLERC DE NOTAIRE',
    quote: 'Auditrice en Master Droit des Affaires et du Numérique',
    imageUrl: '/murielle.webp',
    fallbackUrl:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Fidèle DOSSOU',
    role: 'JURISTE CONSULTANT',
    quote: 'Auditeur en Master Droit des Affaires et du Numérique',
    imageUrl: '/fidele.webp',
    fallbackUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Espérance M. DEGBEY',
    role: 'STAGIAIRE-DPO',
    quote: 'Auditrice en Master Droit Privé Fondamental',
    imageUrl: '/mahuena1.webp',
    fallbackUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Ulrich Apollos ADINSI',
    role: 'Developpeur Full Stack',
    quote: 'Technicien en Informatique Industriel et Maintenance',
    imageUrl: '/apollos.webp',
    fallbackUrl:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
  },
];

const FoundersSection: React.FC = () => {
  const duplicatedFounders = [...founders, ...founders];

  return (
    <section
      id="founders"
      className="section border-t border-slate-200/80 bg-gradient-to-b from-techjus-light/60 via-white to-techjus-light/40 py-12 md:py-18"
    >
      <div className="w-full px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center md:mb-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-techjus-blue">
              L&apos;équipe
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Découvrez notre équipe
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-600">
              Des profils complémentaires au service du droit du numérique.
            </p>
          </div>

          <div className="relative">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-16 bg-gradient-to-r from-white to-transparent md:w-24"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-16 bg-gradient-to-l from-white to-transparent md:w-24"
              aria-hidden
            />

            <div className="overflow-hidden">
              <div className="flex w-max animate-scroll-slow hover:animation-paused">
                {duplicatedFounders.map((founder, index) => (
                  <div key={`${founder.name}-${index}`} className="w-[22rem] shrink-0 px-3 sm:w-96 sm:px-4">
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
      </div>
    </section>
  );
};

export default FoundersSection;
