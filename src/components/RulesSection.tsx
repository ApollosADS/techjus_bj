import React from 'react';
import { Check } from 'lucide-react';

const rules = [
  'Respect et bienveillance envers tous',
  "Fiabilité et disponibilité de l'information",
  "Transparence et équité dans l'exécution des activités",
  'Confidentialité et protection des données',
  "Promotion de l'égalité sous toutes ses formes",
];

const RulesSection: React.FC = () => {
  return (
    <section id="rules" className="section landing-section-alt py-12 md:py-18">
      <div className="container-custom">
        <div className="mb-10 text-center md:mb-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-techjus-blue">
            Engagement
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Nos valeurs
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Des principes clairs qui guident chaque initiative TechJus.
          </p>
        </div>

        <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200/90 bg-white p-8 shadow-techjus md:p-10">
          <ul className="space-y-5">
            {rules.map((rule, index) => (
              <li
                key={index}
                className="group flex gap-4 rounded-2xl border border-transparent px-2 py-2 transition-all duration-300 hover:border-slate-100 hover:bg-slate-50/80"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-techjus-yellow to-amber-500 shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <Check className="h-5 w-5 text-white" strokeWidth={2.5} aria-hidden />
                </div>
                <p className="pt-1.5 text-lg leading-snug text-slate-700">{rule}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default RulesSection;
