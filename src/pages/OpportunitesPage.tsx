import React from 'react';
import { Briefcase, Megaphone } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnnoncesPage from './AnnoncesPage';
import RecrutementsPage from './RecrutementsPage';

const OpportunitesPage: React.FC = () => {
  return (
    <div className="page-canvas">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14 lg:px-8 lg:pb-24">
        <header className="mx-auto mb-10 max-w-3xl text-center lg:mb-14 animate-fade-in">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-techjus-blue/10 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-techjus-blue shadow-sm backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-techjus-green" aria-hidden />
            Espace carrières & communauté
          </p>
          <h1 className="font-heading text-balance text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Opportunités
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-lg leading-relaxed text-slate-600 sm:text-xl">
            Annonces d&apos;événements et offres liées au droit du numérique : restez informé et avancez
            votre parcours avec TechJus.
          </p>
        </header>

        <Tabs defaultValue="annonces" className="w-full">
          <div className="mb-8 flex justify-center lg:mb-10">
            <TabsList
              className="inline-flex h-auto gap-1 rounded-2xl border border-slate-200/80 bg-white/90 p-1.5 shadow-techjus backdrop-blur-md supports-[backdrop-filter]:bg-white/70"
            >
              <TabsTrigger
                value="annonces"
                className="group relative flex min-h-[3rem] items-center gap-2.5 rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-600 transition-all data-[state=active]:bg-techjus-blue data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:hover:bg-slate-50 data-[state=inactive]:hover:text-slate-900 sm:px-7 sm:text-base"
              >
                <Megaphone
                  className="h-4 w-4 shrink-0 opacity-80 group-data-[state=active]:opacity-100 sm:h-5 sm:w-5"
                  aria-hidden
                />
                <span>Annonces</span>
              </TabsTrigger>
              <TabsTrigger
                value="recrutements"
                className="group relative flex min-h-[3rem] items-center gap-2.5 rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-600 transition-all data-[state=active]:bg-techjus-blue data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:hover:bg-slate-50 data-[state=inactive]:hover:text-slate-900 sm:px-7 sm:text-base"
              >
                <Briefcase
                  className="h-4 w-4 shrink-0 opacity-80 group-data-[state=active]:opacity-100 sm:h-5 sm:w-5"
                  aria-hidden
                />
                <span>Recrutements</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 shadow-techjus-lg ring-1 ring-slate-900/[0.03]">
            <TabsContent value="annonces" className="m-0 p-0 focus-visible:outline-none">
              <div className="border-b border-slate-100 bg-gradient-to-r from-techjus-light/50 to-white px-6 py-4 sm:px-8">
                <h2 className="font-heading text-lg font-semibold text-techjus-blue sm:text-xl">
                  Annonces &amp; événements
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-slate-600 sm:text-base">
                  Webinaires, conférences et partenariats de la communauté.
                </p>
              </div>
              <div className="p-6 sm:p-8 lg:p-10">
                <AnnoncesPage embedded />
              </div>
            </TabsContent>

            <TabsContent value="recrutements" className="m-0 p-0 focus-visible:outline-none">
              <div className="border-b border-slate-100 bg-gradient-to-r from-techjus-light/50 to-white px-6 py-4 sm:px-8">
                <h2 className="font-heading text-lg font-semibold text-techjus-blue sm:text-xl">
                  Offres d&apos;emploi
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-slate-600 sm:text-base">
                  Postes et missions autour du droit et de la technologie.
                </p>
              </div>
              <div className="p-6 sm:p-8 lg:p-10">
                <RecrutementsPage embedded />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default OpportunitesPage;
