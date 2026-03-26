import React from 'react';
import { MessageSquare } from 'lucide-react';

const CommunityHero: React.FC = () => {
  return (
    <section
      id="about"
      className="landing-section-alt scroll-mt-20 py-12 md:py-18"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="mb-10 text-center md:mb-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-techjus-blue">
            Communauté
          </p>
          <h1 className="mb-5 font-heading text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
            Bienvenue dans la communauté{' '}
            <span className="block sm:inline sm:pl-2">
              <span className="font-extrabold text-techjus-blue">
                TechJus.bj
              </span>
            </span>
          </h1>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-techjus-blue to-techjus-green" />
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-8 shadow-techjus-lg ring-1 ring-slate-900/[0.04] md:p-12 lg:p-14">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-techjus-blue/8 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-techjus-green/10 blur-3xl" aria-hidden />

          <div className="relative mb-10 flex justify-center">
            <div className="rounded-2xl border border-techjus-blue/10 bg-gradient-to-br from-techjus-light to-white p-5 shadow-inner">
              <MessageSquare className="text-techjus-blue" size={36} strokeWidth={1.75} />
            </div>
          </div>

          <h2 className="relative mb-8 text-center font-heading text-2xl font-bold text-techjus-blue md:text-3xl">
            Message de bienvenue
          </h2>

          <div className="relative mx-auto max-w-prose space-y-6 font-body text-slate-700">
            <p className="text-center text-xl font-semibold text-techjus-blue md:text-left">
              Chers membres,
            </p>
            <p className="text-lg leading-relaxed md:text-justify">
              Nous avons l&apos;immense plaisir de vous présenter{' '}
              <strong className="rounded-md bg-techjus-light/80 px-1.5 py-0.5 font-semibold text-techjus-blue">
                TechJus
              </strong>
              , une plateforme entièrement dédiée au droit du numérique.
            </p>
            <p className="text-lg leading-relaxed md:text-justify">
              Elle vise à rassembler les juristes experts et passionnés des thématiques liées aux nouvelles technologies pour créer un espace de travail et un incubateur de solutions juridiques et d&apos;innovation technologique.
            </p>
            <p className="text-lg leading-relaxed md:text-justify">
              Notre ambition est de fédérer une communauté scientifique : partage des connaissances, veille sur les évolutions législatives, jurisprudentielles et doctrinales, et échanges exigeants sur les enjeux juridiques du numérique.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityHero;
