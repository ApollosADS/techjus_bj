import React from 'react';
import { BookOpen, Scale, Users, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GoalItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconClass: string;
}

const CommunityGoals: React.FC = () => {
  const goals: GoalItem[] = [
    {
      icon: <BookOpen className="h-7 w-7" strokeWidth={1.75} />,
      title: "Ressources éducatives",
      description:
        "Articles, guides et formations sur les aspects juridiques du numérique.",
      iconClass: "bg-techjus-blue/12 text-techjus-blue",
    },
    {
      icon: <Scale className="h-7 w-7" strokeWidth={1.75} />,
      title: "Veille juridique",
      description:
        "Législation, jurisprudence et doctrine autour des nouvelles technologies.",
      iconClass: "bg-techjus-green/12 text-techjus-green",
    },
    {
      icon: <Users className="h-7 w-7" strokeWidth={1.75} />,
      title: "Communauté d'experts",
      description:
        "Échanges avec des juristes et des experts du numérique.",
      iconClass: "bg-techjus-yellow/18 text-slate-800",
    },
    {
      icon: <Lightbulb className="h-7 w-7" strokeWidth={1.75} />,
      title: "Événements",
      description:
        "Conférences, webinaires et ateliers sur les enjeux actuels.",
      iconClass: "bg-techjus-red/12 text-techjus-red",
    },
  ];

  return (
    <section className="border-t border-slate-200/80 bg-gradient-to-b from-white via-slate-50/50 to-white py-12 md:py-18">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="mb-10 text-center md:mb-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-techjus-blue">
            Notre feuille de route
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Nos objectifs
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Quatre axes pour structurer la vie de la communauté TechJus.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {goals.map((goal, index) => (
            <article
              key={index}
              className="group relative flex flex-col rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-techjus-blue/20 hover:shadow-techjus-lg"
            >
              <div
                className={cn(
                  "mb-5 inline-flex rounded-xl p-3.5 ring-1 ring-black/[0.04]",
                  goal.iconClass
                )}
              >
                {goal.icon}
              </div>
              <h3 className="mb-3 font-heading text-lg font-bold text-slate-900">
                {goal.title}
              </h3>
              <p className="flex-1 text-sm leading-relaxed text-slate-600">
                {goal.description}
              </p>
              <div className="mt-4 h-0.5 w-8 rounded-full bg-gradient-to-r from-techjus-blue to-techjus-green opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityGoals;
