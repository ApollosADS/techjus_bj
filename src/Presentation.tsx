import React from 'react';
import { Users, BookOpen, Globe, MessageSquare, Target, Heart } from 'lucide-react';

const Presentation: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Bienvenue dans la communauté 
              <span className="block text-blue-600 mt-2">TechJus.bj</span>
            </h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          </div>

          {/* Message de bienvenue */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-blue-100 p-4 rounded-full">
                <MessageSquare className="text-blue-600" size={32} />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Message de bienvenue
            </h2>
            
            <div className="prose prose-lg mx-auto text-gray-700 leading-relaxed">
              <p className="text-lg font-medium text-gray-800 mb-4">
                Chers Membres,
              </p>
              
              <p className="mb-4">
                Nous avons l'immense plaisir de vous annoncer la création d'un espace de discussion 
                via la communauté nommée <strong className="text-blue-600">"TechJus BENIN"</strong>, 
                entièrement dédié au droit du numérique au Bénin.
              </p>
              
              <p className="mb-4">
                Cette initiative stratégique vise à rassembler des juristes experts, praticiens et 
                passionnés du secteur pour créer un espace d'échange dynamique et collaboratif.
              </p>
              
              <p className="mb-0">
                Notre ambition est de créer une communauté scientifique pour faciliter le partage de 
                connaissances, analyser ensemble les évolutions législatives actuelles, et stimuler 
                des discussions enrichissantes sur les enjeux juridiques du numérique dans notre 
                contexte béninois et international.
              </p>
            </div>
          </div>

          {/* Objectifs de la communauté */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Partage de Connaissances</h3>
              <p className="text-gray-600">
                Faciliter l'échange d'expertises et de savoir-faire entre professionnels du droit du numérique
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-purple-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Analyse</h3>
              <p className="text-gray-600">
                Analyser ensemble l'évolution du cadre juridique numérique au Bénin et à l'international
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-orange-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Réseau Professionnel</h3>
              <p className="text-gray-600">
                Créer un réseau solide de juristes spécialisés dans les technologies
              </p>
            </div>
          </div>

          {/* Public cible */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                <Heart className="text-blue-600" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Une communauté pour tous
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                TechJus s'adresse à tous les professionnels passionnés par l'intersection 
                entre le droit et la technologie
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Juristes Experts</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    Avocats spécialisés en droit du numérique
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    Magistrats et conseillers juridiques
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    Professeurs et chercheurs en droit
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Praticiens & Passionnés</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                    Legal Compliance Officer
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                    Consultants en transformation digitale
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                    Étudiants en droit du numérique
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <Globe className="mx-auto mb-4" size={48} />
              <h2 className="text-2xl font-bold mb-4">
                Rejoignez notre communauté dès aujourd'hui
              </h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Participez aux discussions, partagez vos expertises et contribuez au développement 
                du droit numérique au Bénin
              </p>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Nous contacter
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Presentation;