import React, { useState, useEffect } from 'react';
import { GraduationCap, Clock, Users, Award, BookOpen, Video, FileText, Calendar } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import FormationsFAQAccordion from '../components/FormationsFAQAccordion';
import { Button } from '@/components/ui/button';

interface Formation {
  id: number;
  title: string;
  description: string;
  duration: string;
  level: string;
  participants: string;
  modules: string[];
  color: string;
}

const Formations: React.FC = () => {
  const [shouldNavigateToContact, setShouldNavigateToContact] = useState(false);
  const [formations, setFormations] = useState<Formation[]>([]);
  useEffect(() => {
    import('../data/formations.json').then((data) => {
      setFormations(data.default || data);
    });
  }, []);

  const handleContactClick = () => {
    setShouldNavigateToContact(true);
  };

  if (shouldNavigateToContact) {
    return <Navigate to="/contact" replace />;
  }
  
  const avantages = [
    {
      icon: <Award className="text-blue-600" size={32} />,
      title: "Certification Reconnue",
      description: "Obtenez un certificat validé par des experts du secteur"
    },
    {
      icon: <Users className="text-green-600" size={32} />,
      title: "Formateurs Experts",
      description: "Apprenez auprès de praticiens expérimentés du numérique"
    },
    {
      icon: <Video className="text-yellow-600" size={32} />,
      title: "Format Hybride",
      description: "Formations en présentiel et à distance selon vos besoins"
    },
    {
      icon: <BookOpen className="text-red-600" size={32} />,
      title: "Ressources Complètes",
      description: "Accès à une bibliothèque de ressources juridiques actuelles"
    }
  ];
  
  return (
    <div className="page-canvas">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-techjus-blue to-slate-900 py-20 text-white">
        <div className="bg-opportunites-mesh absolute inset-0 opacity-20" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-white/5" aria-hidden />
        <div className="relative container mx-auto max-w-6xl px-4">
          <div className="text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-techjus-yellow/90">
              Parcours & certifications
            </p>
            <div className="mb-6 flex justify-center">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 shadow-lg backdrop-blur-sm">
                <GraduationCap className="text-white" size={56} />
              </div>
            </div>
            <h1 className="mb-6 font-heading text-4xl font-bold tracking-tight text-white md:text-5xl">
              Formations en Droit
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-lg text-slate-200 md:text-xl">
              Développez votre expertise juridique à l'ère du numérique avec nos
              formations spécialisées.
            </p>
          </div>
        </div>
      </section>
      
      {/* 2. Liste des formations disponibles */}
      <section className="border-t border-slate-200/80 py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-heading text-3xl font-bold tracking-tight text-slate-900">
              Nos Formations Disponibles
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Des programmes adaptés à tous les niveaux, du débutant à l'expert
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {formations.map((formation) => (
              <article
                key={formation.id}
                className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 shadow-techjus transition-all duration-300 hover:-translate-y-1 hover:shadow-techjus-lg"
              >
                <div className={`${formation.color} h-2`}></div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {formation.title}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        formation.level === 'Débutant'
                          ? 'bg-green-100 text-green-800'
                          : formation.level === 'Intermédiaire'
                          ? 'bg-yellow-100 text-yellow-800'
                          : formation.level === 'Avancé'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {formation.level}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{formation.description}</p>
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center text-gray-500">
                      <Clock className="mr-2" size={16} />
                      {formation.duration}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Users className="mr-2" size={16} />
                      {formation.participants}
                    </div>
                  </div>
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-2">Modules inclus :</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {formation.modules.map((module: string, index: number) => (
                        <li key={index} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                          {module}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-3">
                    {formation.id === 1 ? (
                      <>
                        <Button
                          type="button"
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          onClick={() =>
                            window.open(
                              'https://drive.google.com/file/d/1z9dUFo9qXHHzI7_-gpbxOR--5Z2-T4Ju/view?usp=sharing',
                              '_blank'
                            )
                          }
                        >
                          Disponible
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1 border-gray-300"
                          onClick={() =>
                            window.open('/Masterclass_IA_2025.PDF', '_blank')
                          }
                        >
                          En savoir plus
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          type="button"
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                          disabled
                        >
                          À venir
                        </Button>
                        <Button type="button" variant="outline" className="flex-1 border-gray-300" disabled>
                          En savoir plus
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      
      {/* 3. Avantages des formations */}
      <section className="border-t border-slate-200/80 bg-white/80 py-16 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Pourquoi Choisir Nos Formations ?
            </h2>
            <p className="text-gray-600 text-lg">
              Une approche pédagogique adaptée aux professionnels du droit
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {avantages.map((avantage, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-gray-100 transition-colors">
                  {avantage.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {avantage.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {avantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 4. Processus d'inscription */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Comment s'inscrire ?
            </h2>
            <p className="text-gray-600 text-lg">
              Un processus simple en 4 étapes
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: "Choisir sa formation",
                desc: "Sélectionnez la formation qui correspond à vos besoins",
                icon: <BookOpen className="text-white" size={24} />
              },
              {
                step: 2,
                title: "Remplir le formulaire",
                desc: "Complétez votre demande d'inscription en ligne",
                icon: <FileText className="text-white" size={24} />
              },
              {
                step: 3,
                title: "Confirmer",
                desc: "Recevez la confirmation et le programme détaillé",
                icon: <Calendar className="text-white" size={24} />
              },
              {
                step: 4,
                title: "Formation",
                desc: "Participez à votre formation et obtenez votre certificat",
                icon: <Award className="text-white" size={24} />
              }
            ].map((etape, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {etape.icon}
                </div>
                <div className="bg-gray-100 text-blue-600 font-bold text-sm px-3 py-1 rounded-full inline-block mb-3">
                  Étape {etape.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {etape.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {etape.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 5. Nouvelle section FAQ Accordéon */}
      <FormationsFAQAccordion />
      
      {/* 6. Section d'appel à l'action (CTA) */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 p-8 text-white shadow-2xl">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Prêt à Développer Votre Expertise ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Rejoignez nous
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              type="button"
              size="lg"
              variant="secondary"
              className="bg-white font-semibold text-blue-600 hover:bg-blue-50"
            >
              Voir le calendrier
            </Button>
            <Button
              type="button"
              size="lg"
              variant="outline"
              className="border-2 border-white bg-transparent font-semibold text-white hover:bg-white hover:text-blue-600"
              onClick={handleContactClick}
            >
              Nous contacter
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Formations;