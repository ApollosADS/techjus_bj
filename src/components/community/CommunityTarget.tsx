import React from 'react';
import { Check } from 'lucide-react';

const CommunityTarget: React.FC = () => {
  const targetGroups = [
    ['Avocats spécialisés en droit du numérique', 'Magistrats et conseillers juridiques', 'Professeurs et chercheurs en droit'],
    ['Responsables de la conformité', 'Consultants en transformation numérique', 'Étudiants en droit du numérique, etc.'],
  ];

  return (
    <section className="landing-section-alt py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-8 shadow-techjus-lg ring-1 ring-slate-900/[0.04] md:p-12 lg:p-14">
          <div className="absolute left-0 top-0 h-full w-1 rounded-l-3xl bg-gradient-to-b from-techjus-blue to-techjus-green" aria-hidden />

          <div className="relative mb-8 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-techjus-blue">
              Publics concernés
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Une communauté pour tous
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
              TechJus s&apos;adresse aux professionnels qui croisent droit, conformité et innovation numérique.
            </p>
          </div>

          <div className="relative grid gap-8 md:grid-cols-2 md:gap-10">
            {targetGroups.map((group, groupIndex) => (
              <ul key={groupIndex} className="space-y-3">
                {group.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3.5 transition-colors duration-200 hover:border-techjus-blue/20 hover:bg-white"
                  >
                    <span
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                        groupIndex === 0
                          ? 'bg-techjus-blue/15 text-techjus-blue'
                          : 'bg-techjus-green/15 text-techjus-green'
                      }`}
                    >
                      <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                    </span>
                    <span className="text-base leading-snug text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityTarget;
