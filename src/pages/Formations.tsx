import React, { useState } from 'react';
import { GraduationCap, Clock, Users, Award, BookOpen, Video, FileText, Calendar } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import FormationsFAQAccordion from '../components/FormationsFAQAccordion';

const Formations: React.FC = () => {
  const [shouldNavigateToContact, setShouldNavigateToContact] = useState(false);
  
  const handleContactClick = () => {
    setShouldNavigateToContact(true);
  };
  
  if (shouldNavigateToContact) {
    return <Navigate to="/contact" replace />;
  }
  
  const formations = [
    {
      id: 1,
      title: "Masterclass : Devenir Juriste 4.0 à l'ère du digital et de l'IA",
      description: "Enjeux juridiques et éthiques de l'IA dans le contexte africain",
      duration: "1 jour",
      level: "Intermédiaire",
      participants: "5-10",
      modules: [
        "IA et droit africain",
        "Éthique de l'IA",
        "Responsabilité algorithmique",
        "Régulation future"
      ],
      color: "bg-red-500"
    },
    {
      id: 2,
      title: "Fondamentaux du Droit du Numérique",
      description: "Introduction complète aux principes de base du droit du numérique au Bénin",
      duration: "3 Mois",
      level: "Débutant",
      participants: "15-20",
      modules: [
        "Introduction au droit du numérique",
        "Cadre juridique béninois",
        "Propriété intellectuelle numérique",
        "Contrats électroniques"
      ],
      color: "bg-blue-500"
    },
    {
      id: 3,
      title: "Cybersécurité et Droit",
      description: "Aspects juridiques de la cybersécurité et gestion des incidents",
      duration: "7 jours",
      level: "Avancé",
      participants: "8-12",
      modules: [
        "Cadre légal cybersécurité",
        "Gestion des incidents",
        "Responsabilités juridiques",
        "Audit et conformité"
      ],
      color: "bg-yellow-500"
    },
    {
      id: 4,
      title: "Intelligence Artificielle et Éthique",
      description: "Enjeux juridiques et éthiques de l'IA dans le contexte africain",
      duration: "1 jour",
      level: "Expert",
      participants: "5-10",
      modules: [
        "IA et droit africain",
        "Éthique de l'IA",
        "Responsabilité algorithmique",
        "Régulation future"
      ],
      color: "bg-red-500"
    },
    {
      id: 5,
      title: "Réussir au concours de magistrature",
      description: "Préparation complète au concours de magistrature",
      duration: "3 mois",
      level: "Expert",
      participants: "5-10",
      modules: [
        "Méthodologie juridique",
        "Droit civil et pénal",
        "Procédures judiciaires",
        "Épreuves pratiques"
      ],
      color: "bg-yellow-500"
    },
    {
      id: 6,
      title: "Protection des données à caractère personnel",
      description: "Maîtrisez la réglementation sur la protection des données personnelles",
      duration: "2 jours",
      level: "Intermédiaire",
      participants: "10-15",
      modules: [
        "Principes de protection des données",
        "Mise en conformité",
        "Droits des personnes",
        "Sanctions et recours"
      ],
      color: "bg-green-500"
    }
  ];
  
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
    <div className="min-h-screen bg-gray-50">
      {/* 1. Section Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <GraduationCap size={64} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Formations en Droit
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Développez votre expertise juridique à l'ère du numérique avec nos
              formations spécialisées.
            </p>
          </div>
        </div>
      </section>
      
      {/* 2. Liste des formations disponibles */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Nos Formations Disponibles
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Des programmes adaptés à tous les niveaux, du débutant à l'expert
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {formations.map((formation) => (
              <div
                key={formation.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
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
                      {formation.modules.map((module, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                          {module}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                      À venir
                    </button>
                    <button className="border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                      En savoir plus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 3. Avantages des formations */}
      <section className="py-16 bg-white">
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Voir le calendrier
            </button>
            <button 
              onClick={handleContactClick}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors cursor-pointer"
            >
              Nous contacter
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Formations;